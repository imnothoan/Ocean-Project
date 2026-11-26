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

create policy "authenticated can create own checkins" on public.event_checkins for insert to authenticated with check (user_id = auth.uid());
create policy "authenticated can read own checkins" on public.event_checkins for select to authenticated using (user_id = auth.uid());
create policy "authenticated can create own feedback" on public.event_feedback for insert to authenticated with check (user_id = auth.uid());
create policy "authenticated can update own feedback" on public.event_feedback for update to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "authenticated can read own feedback" on public.event_feedback for select to authenticated using (user_id = auth.uid());
