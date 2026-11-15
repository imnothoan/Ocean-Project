alter table public.events add column if not exists owner_id uuid references auth.users(id) on delete set null;

alter table public.events enable row level security;

drop policy if exists "authenticated can create own events" on public.events;
create policy "authenticated can create own events"
on public.events for insert to authenticated
with check (owner_id = auth.uid());

drop policy if exists "authenticated can update own events" on public.events;
create policy "authenticated can update own events"
on public.events for update to authenticated
using (owner_id = auth.uid())
with check (owner_id = auth.uid());
