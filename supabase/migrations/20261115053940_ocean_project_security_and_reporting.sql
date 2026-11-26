create extension if not exists pgcrypto;

alter table public.reports add column if not exists owner_id uuid references auth.users(id) on delete cascade;
alter table public.event_registrations add column if not exists owner_id uuid references auth.users(id) on delete cascade;
alter table public.donations add column if not exists donor_id uuid references auth.users(id) on delete cascade;

create table if not exists public.report_status_history (
  id uuid primary key default gen_random_uuid(),
  report_id uuid not null references public.reports(id) on delete cascade,
  status text not null check (status in ('submitted', 'reviewing', 'resolved')),
  note text not null default '',
  actor_id uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  body text not null,
  report_id uuid references public.reports(id) on delete set null,
  read_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.report_evidence (
  id uuid primary key default gen_random_uuid(),
  report_id uuid not null references public.reports(id) on delete cascade,
  owner_id uuid not null references auth.users(id) on delete cascade,
  storage_path text not null unique,
  content_type text not null check (content_type in ('image/jpeg', 'image/png', 'image/webp')),
  byte_size bigint not null check (byte_size > 0 and byte_size <= 10485760),
  created_at timestamptz not null default now()
);

alter table public.reports enable row level security;
alter table public.events enable row level security;
alter table public.event_registrations enable row level security;
alter table public.donations enable row level security;
alter table public.impact_metrics enable row level security;
alter table public.report_status_history enable row level security;
alter table public.notifications enable row level security;
alter table public.report_evidence enable row level security;

drop policy if exists "public can read reports" on public.reports;
drop policy if exists "public can submit reports" on public.reports;
drop policy if exists "authenticated can read own reports" on public.reports;
create policy "authenticated can read own reports" on public.reports for select to authenticated using (owner_id = auth.uid());
drop policy if exists "authenticated can submit own reports" on public.reports;
create policy "authenticated can submit own reports" on public.reports for insert to authenticated with check (owner_id = auth.uid());
drop policy if exists "authenticated can delete own reports" on public.reports;
create policy "authenticated can delete own reports" on public.reports for delete to authenticated using (owner_id = auth.uid());

drop policy if exists "public can read events" on public.events;
create policy "public can read events" on public.events for select to anon, authenticated using (true);

drop policy if exists "public can register events" on public.event_registrations;
drop policy if exists "authenticated can register own events" on public.event_registrations;
create policy "authenticated can register own events" on public.event_registrations for insert to authenticated with check (owner_id = auth.uid());
drop policy if exists "authenticated can read own event registrations" on public.event_registrations;
create policy "authenticated can read own event registrations" on public.event_registrations for select to authenticated using (owner_id = auth.uid());

drop policy if exists "public can read donations" on public.donations;
drop policy if exists "public can create donations" on public.donations;
drop policy if exists "authenticated can read own donations" on public.donations;
create policy "authenticated can read own donations" on public.donations for select to authenticated using (donor_id = auth.uid());
drop policy if exists "authenticated can create own donations" on public.donations;
create policy "authenticated can create own donations" on public.donations for insert to authenticated with check (donor_id = auth.uid());

drop policy if exists "public can read metrics" on public.impact_metrics;
create policy "public can read metrics" on public.impact_metrics for select to anon, authenticated using (true);

drop policy if exists "public can read report history" on public.report_status_history;
drop policy if exists "authenticated can read own report history" on public.report_status_history;
create policy "authenticated can read own report history" on public.report_status_history for select to authenticated using (exists (select 1 from public.reports where reports.id = report_status_history.report_id and reports.owner_id = auth.uid()));

drop policy if exists "public can read notifications" on public.notifications;
drop policy if exists "authenticated can read own notifications" on public.notifications;
create policy "authenticated can read own notifications" on public.notifications for select to authenticated using (user_id = auth.uid());
drop policy if exists "public can update notifications" on public.notifications;
drop policy if exists "authenticated can update own notifications" on public.notifications;
create policy "authenticated can update own notifications" on public.notifications for update to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());

drop policy if exists "authenticated can read own evidence" on public.report_evidence;
create policy "authenticated can read own evidence" on public.report_evidence for select to authenticated using (owner_id = auth.uid());
drop policy if exists "authenticated can insert own evidence" on public.report_evidence;
create policy "authenticated can insert own evidence" on public.report_evidence for insert to authenticated with check (owner_id = auth.uid() and exists (select 1 from public.reports where reports.id = report_evidence.report_id and reports.owner_id = auth.uid()));

create or replace function public.record_report_status_history()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if tg_op = 'INSERT' then
    insert into public.report_status_history (report_id, status, note, actor_id)
    values (new.id, new.status, 'Báo cáo đã được tiếp nhận.', new.owner_id);
  elsif new.status is distinct from old.status then
    insert into public.report_status_history (report_id, status, note, actor_id)
    values (new.id, new.status, 'Trạng thái báo cáo đã được cập nhật.', auth.uid());
  end if;
  return new;
end;
$$;

drop trigger if exists reports_status_history on public.reports;
create trigger reports_status_history after insert or update of status on public.reports for each row execute function public.record_report_status_history();

insert into storage.buckets (id, name, public) values ('report-evidence', 'report-evidence', false) on conflict (id) do update set public = false;
drop policy if exists "users can upload own report evidence" on storage.objects;
create policy "users can upload own report evidence" on storage.objects for insert to authenticated with check (bucket_id = 'report-evidence' and (storage.foldername(name))[1] = auth.uid()::text);
drop policy if exists "users can read own report evidence" on storage.objects;
create policy "users can read own report evidence" on storage.objects for select to authenticated using (bucket_id = 'report-evidence' and (storage.foldername(name))[1] = auth.uid()::text);
drop policy if exists "users can delete own report evidence" on storage.objects;
create policy "users can delete own report evidence" on storage.objects for delete to authenticated using (bucket_id = 'report-evidence' and (storage.foldername(name))[1] = auth.uid()::text);
