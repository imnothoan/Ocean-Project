create table if not exists public.event_messages (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references public.events(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  body text not null check (char_length(body) between 1 and 2000),
  created_at timestamptz not null default now()
);

alter table public.event_messages enable row level security;
create policy "authenticated can create event messages" on public.event_messages for insert to authenticated with check (user_id = auth.uid());
create policy "authenticated can read event messages" on public.event_messages for select to authenticated using (true);
