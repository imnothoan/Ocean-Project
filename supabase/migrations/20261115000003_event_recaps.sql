create table if not exists public.event_recaps (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references public.events(id) on delete cascade,
  author_id uuid not null references auth.users(id) on delete cascade,
  body text not null check (char_length(body) between 3 and 5000),
  created_at timestamptz not null default now()
);

alter table public.event_recaps enable row level security;
create policy "authenticated can create own event recaps" on public.event_recaps for insert to authenticated with check (author_id = auth.uid());
create policy "authenticated can read event recaps" on public.event_recaps for select to authenticated using (true);
