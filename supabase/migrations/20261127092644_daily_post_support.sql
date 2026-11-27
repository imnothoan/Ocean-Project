-- Earlier likes have no recorded time. Track new ones without inferring a date for old rows.
create table private.member_like_times (
  user_id uuid not null,
  post_id uuid not null,
  liked_at timestamptz not null default now(),
  primary key (user_id, post_id),
  foreign key (post_id, user_id) references public.post_likes(post_id, user_id) on delete cascade
);
alter table private.member_like_times enable row level security;
revoke all on table private.member_like_times from public, anon, authenticated;
grant select on table private.member_like_times to authenticated;
create policy "members read their own like times" on private.member_like_times
  for select to authenticated using (user_id = (select auth.uid()));

create function private.record_member_like_time()
returns trigger language plpgsql security definer set search_path = '' as $$
begin
  insert into private.member_like_times (user_id, post_id) values (new.user_id, new.post_id);
  return new;
end;
$$;
revoke all on function private.record_member_like_time() from public, anon, authenticated;
create trigger record_member_like_time after insert on public.post_likes
  for each row execute function private.record_member_like_time();

create function public.supported_posts_since(day_start timestamptz)
returns integer language sql stable security invoker set search_path = '' as $$
  select count(*)::integer from (
    select post_id from private.member_like_times
      where user_id = (select auth.uid()) and liked_at >= day_start
    union
    select post_id from public.post_comments
      where author_id = (select auth.uid()) and created_at >= day_start
  ) as supported;
$$;
revoke all on function public.supported_posts_since(timestamptz) from public, anon;
grant execute on function public.supported_posts_since(timestamptz) to authenticated;
