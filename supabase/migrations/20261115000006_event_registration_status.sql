alter table public.event_registrations
  add column if not exists status text not null default 'pending';

alter table public.event_registrations
  drop constraint if exists event_registrations_status_check;

alter table public.event_registrations
  add constraint event_registrations_status_check check (status in ('pending', 'approved', 'rejected'));

drop policy if exists "event owners can moderate registrations" on public.event_registrations;

create policy "event owners can moderate registrations" on public.event_registrations
for update to authenticated
using (exists (select 1 from public.events where events.id = event_registrations.event_id and events.owner_id = auth.uid()))
with check (exists (select 1 from public.events where events.id = event_registrations.event_id and events.owner_id = auth.uid()));

drop policy if exists "event owners can read registrations" on public.event_registrations;

create policy "event owners can read registrations" on public.event_registrations
for select to authenticated
using (exists (select 1 from public.events where events.id = event_registrations.event_id and events.owner_id = auth.uid()));
