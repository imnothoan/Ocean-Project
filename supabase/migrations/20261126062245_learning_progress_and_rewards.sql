create table public.learning_progress (
  user_id uuid not null references auth.users(id) on delete cascade,
  activity text not null, completed_at timestamptz not null default now(),
  primary key(user_id,activity)
);
alter table public.learning_progress enable row level security;
create policy "read own learning progress" on public.learning_progress for select to authenticated using(user_id=(select auth.uid()));
grant select on public.learning_progress to authenticated;
create table public.reward_claims (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  claimed_at timestamptz not null default now(),
  cost integer not null default 300 check(cost=300)
);
alter table public.reward_claims enable row level security;
create policy "read own reward claims" on public.reward_claims for select to authenticated using(user_id=(select auth.uid()));
grant select on public.reward_claims to authenticated;
revoke insert,update,delete on public.learning_progress, public.reward_claims from public,anon,authenticated;
create index reward_claims_user_time on public.reward_claims(user_id,claimed_at desc);
create function public.ocean_points() returns integer language sql stable security invoker set search_path='' as $$
 select (10*(select count(*) from public.learning_progress where user_id=(select auth.uid()))
 +50*(select count(*) from public.event_checkins where user_id=(select auth.uid()))
 +30*(select count(*) from public.reports where owner_id=(select auth.uid()) and status='resolved')
 -coalesce((select sum(cost) from public.reward_claims where user_id=(select auth.uid())),0))::integer;
$$;
create function private.complete_sorting(answer text) returns void language plpgsql security definer set search_path='' as $$
begin
 if auth.uid() is null or answer is distinct from 'recycling' then raise exception 'Complete the sorting question first.';end if;
 insert into public.learning_progress(user_id,activity) values(auth.uid(),'pet-bottle') on conflict do nothing;
end $$;
create function public.complete_sorting_quiz(answer text) returns void language sql security invoker set search_path='' as $$ select private.complete_sorting(answer) $$;
create function private.claim_class_reward() returns uuid language plpgsql security definer set search_path='' as $$
declare voucher uuid;
begin
 if auth.uid() is null then raise exception 'Sign in first.';end if;
 perform pg_advisory_xact_lock(hashtextextended(auth.uid()::text,0));
 if public.ocean_points()<300 then raise exception 'At least 300 points are required.';end if;
 if exists(select 1 from public.reward_claims where user_id=auth.uid() and claimed_at >= now()-interval '7 days') then raise exception 'One reward per seven days.';end if;
 insert into public.reward_claims(user_id) values(auth.uid()) returning id into voucher;
 return voucher;
end $$;
create function public.redeem_class_reward() returns uuid language sql security invoker set search_path='' as $$select private.claim_class_reward()$$;
revoke all on function private.complete_sorting(text),public.complete_sorting_quiz(text),private.claim_class_reward(),public.redeem_class_reward(),public.ocean_points() from public,anon;
grant execute on function private.complete_sorting(text),public.complete_sorting_quiz(text),private.claim_class_reward(),public.redeem_class_reward(),public.ocean_points() to authenticated;
create table public.saved_guides(
 user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
 frame_id text not null check(frame_id in ('269:124','274:297','682:5569')),
 primary key(user_id,frame_id)
);
alter table public.saved_guides enable row level security;
create policy "read own saved guides" on public.saved_guides for select to authenticated using(user_id=(select auth.uid()));
create policy "save own guides" on public.saved_guides for insert to authenticated with check(user_id=(select auth.uid()));
create policy "remove own guides" on public.saved_guides for delete to authenticated using(user_id=(select auth.uid()));
grant select,insert,delete on public.saved_guides to authenticated;
