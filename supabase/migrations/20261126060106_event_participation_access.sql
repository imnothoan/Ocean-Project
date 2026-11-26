create table if not exists public.event_checkins (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references public.events(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  code text not null,
  created_at timestamptz not null default now(),
  unique (event_id, user_id)
);

create table if not exists public.event_feedback (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references public.events(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  rating integer not null check (rating between 1 and 5),
  thoughts text not null default '',
  enjoyed text not null default '',
  join_again text not null default '',
  created_at timestamptz not null default now(),
  unique (event_id, user_id)
);

alter table public.event_checkins enable row level security;

alter table public.event_feedback enable row level security;

create table if not exists public.event_messages (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references public.events(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  body text not null check (char_length(body) between 1 and 2000),
  created_at timestamptz not null default now()
);

alter table public.event_messages enable row level security;

create table if not exists public.event_recaps (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references public.events(id) on delete cascade,
  author_id uuid not null references auth.users(id) on delete cascade,
  body text not null check (char_length(body) between 3 and 5000),
  created_at timestamptz not null default now()
);

alter table public.event_recaps enable row level security;

-- Group conversations are visible to approved participants and the event organizer.
create schema if not exists private;
create or replace function private.is_event_member(target uuid)
returns boolean language sql stable security invoker set search_path = '' as $$
  select exists(select 1 from public.events e where e.id = target and e.owner_id = (select auth.uid()))
      or exists(select 1 from public.event_registrations r where r.event_id = target and r.owner_id = (select auth.uid()) and r.status = 'approved');
$$;
revoke all on function private.is_event_member(uuid) from public, anon;
grant usage on schema private to authenticated;
grant execute on function private.is_event_member(uuid) to authenticated;

drop policy if exists "authenticated can create event messages" on public.event_messages;
drop policy if exists "authenticated can read event messages" on public.event_messages;
create policy "members read conversation" on public.event_messages for select to authenticated using (private.is_event_member(event_id));
create policy "members send messages" on public.event_messages for insert to authenticated with check (user_id = (select auth.uid()) and private.is_event_member(event_id));
grant select, insert on public.event_messages to authenticated;

drop policy if exists "authenticated can create own event recaps" on public.event_recaps;
drop policy if exists "authenticated can read event recaps" on public.event_recaps;
create policy "read published recaps" on public.event_recaps for select to anon, authenticated using (true);
create policy "organizer publishes recap" on public.event_recaps for insert to authenticated with check (
  author_id = (select auth.uid()) and exists (select 1 from public.events e where e.id = event_id and e.owner_id = (select auth.uid()))
);
grant select on public.event_recaps to anon, authenticated;
grant insert on public.event_recaps to authenticated;

drop policy if exists "authenticated can create own checkins" on public.event_checkins;
drop policy if exists "authenticated can read own checkins" on public.event_checkins;
create policy "participants see own attendance" on public.event_checkins for select to authenticated using (user_id = (select auth.uid()));
revoke insert,update,delete on public.event_checkins from public, anon, authenticated;
grant select on public.event_checkins to authenticated;
create table if not exists private.event_attendance_codes (
  event_id uuid primary key references public.events(id) on delete cascade,
  code uuid not null default gen_random_uuid()
);
revoke all on private.event_attendance_codes from public, anon, authenticated;
create or replace function private.event_code(target uuid) returns uuid
language plpgsql security definer set search_path = '' as $$
declare result uuid;
begin
  if not exists(select 1 from public.events where id = target and owner_id = (select auth.uid())) then
    raise exception 'Only the event organizer can issue a check-in code.' using errcode = '42501';
  end if;
  insert into private.event_attendance_codes(event_id) values (target) on conflict do nothing;
  select code into strict result from private.event_attendance_codes where event_id=target;
  return result;
end $$;
create or replace function private.attend_event(target uuid, supplied_code text) returns uuid
language plpgsql security definer set search_path = '' as $$
declare result uuid;
begin
  if not exists(select 1 from public.event_registrations where event_id=target and owner_id=(select auth.uid()) and status='approved') then
    raise exception 'An approved registration is required.' using errcode='42501';
  end if;
  if not exists(select 1 from private.event_attendance_codes where event_id=target and code::text=lower(trim(supplied_code))) then
    raise exception 'Incorrect event check-in code.';
  end if;
  insert into public.event_checkins(event_id,user_id,code) values(target,(select auth.uid()),'verified')
    on conflict(event_id,user_id) do nothing;
  select id into strict result from public.event_checkins where event_id=target and user_id=(select auth.uid());
  return result;
end $$;
create or replace function public.get_event_checkin_code(target uuid) returns uuid
language sql security invoker set search_path='' as $$ select private.event_code(target) $$;
create or replace function public.check_in_to_event(target uuid, supplied_code text) returns uuid
language sql security invoker set search_path='' as $$ select private.attend_event(target,supplied_code) $$;
revoke all on function private.event_code(uuid), private.attend_event(uuid,text), public.get_event_checkin_code(uuid), public.check_in_to_event(uuid,text) from public, anon;
grant execute on function private.event_code(uuid), private.attend_event(uuid,text), public.get_event_checkin_code(uuid), public.check_in_to_event(uuid,text) to authenticated;

drop policy if exists "authenticated can create own feedback" on public.event_feedback;
drop policy if exists "authenticated can update own feedback" on public.event_feedback;
drop policy if exists "authenticated can read own feedback" on public.event_feedback;
create policy "read own feedback" on public.event_feedback for select to authenticated using (user_id=(select auth.uid()));
create policy "attendees submit feedback" on public.event_feedback for insert to authenticated with check (
  user_id=(select auth.uid()) and exists(select 1 from public.event_checkins c where c.event_id=event_feedback.event_id and c.user_id=(select auth.uid()))
);
create policy "attendees revise feedback" on public.event_feedback for update to authenticated using (user_id=(select auth.uid())) with check (user_id=(select auth.uid()) and exists(select 1 from public.event_checkins c where c.event_id=event_feedback.event_id and c.user_id=(select auth.uid())));
grant select,insert,update on public.event_feedback to authenticated;
create index if not exists event_messages_timeline on public.event_messages(event_id,created_at);
create index if not exists event_recaps_timeline on public.event_recaps(event_id,created_at);
