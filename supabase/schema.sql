create extension if not exists pgcrypto;

create table if not exists public.reports (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid references auth.users(id) on delete cascade,
  category text not null check (category in ('pollution', 'animal', 'recycle')),
  title text not null check (char_length(title) between 3 and 500),
  location text not null check (char_length(location) between 2 and 500),
  status text not null default 'submitted' check (status in ('submitted', 'reviewing', 'resolved')),
  created_at timestamptz not null default now()
);

create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid references auth.users(id) on delete set null,
  title text not null,
  description text not null default '',
  event_date timestamptz not null,
  location text not null,
  capacity integer not null default 0 check (capacity >= 0),
  created_at timestamptz not null default now()
);

create table if not exists public.event_registrations (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references public.events(id) on delete cascade,
  owner_id uuid references auth.users(id) on delete cascade,
  participant_name text not null,
  participant_email text not null,
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  created_at timestamptz not null default now(),
  unique (event_id, participant_email)
);

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

create table if not exists public.event_messages (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references public.events(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  body text not null check (char_length(body) between 1 and 2000),
  created_at timestamptz not null default now()
);

create table if not exists public.event_recaps (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references public.events(id) on delete cascade,
  author_id uuid not null references auth.users(id) on delete cascade,
  body text not null check (char_length(body) between 3 and 5000),
  created_at timestamptz not null default now()
);

create table if not exists public.donations (
  id uuid primary key default gen_random_uuid(),
  donor_id uuid references auth.users(id) on delete cascade,
  donor_name text not null,
  amount numeric(12, 2) not null check (amount > 0),
  campaign text not null,
  note text not null default '' check (char_length(note) <= 500),
  status text not null default 'confirmed' check (status in ('pending', 'confirmed', 'failed')),
  created_at timestamptz not null default now()
);

create table if not exists public.impact_metrics (
  id uuid primary key default gen_random_uuid(),
  metric_date date not null unique,
  total_kg numeric(12, 2) not null default 0 check (total_kg >= 0),
  plastic_kg numeric(12, 2) not null default 0 check (plastic_kg >= 0),
  organic_kg numeric(12, 2) not null default 0 check (organic_kg >= 0),
  other_kg numeric(12, 2) not null default 0 check (other_kg >= 0)
);

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

create table if not exists public.community_posts (
  id uuid primary key default gen_random_uuid(),
  author_id uuid not null references auth.users(id) on delete cascade,
  body text not null check (char_length(body) between 3 and 2000),
  topic text not null default 'General',
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

alter table public.reports add column if not exists owner_id uuid references auth.users(id) on delete cascade;
alter table public.events add column if not exists owner_id uuid references auth.users(id) on delete set null;
alter table public.event_registrations add column if not exists owner_id uuid references auth.users(id) on delete cascade;
alter table public.donations add column if not exists donor_id uuid references auth.users(id) on delete cascade;
alter table public.donations add column if not exists note text not null default '' check (char_length(note) <= 500);
alter table public.report_status_history add column if not exists actor_id uuid references auth.users(id) on delete set null;
alter table public.notifications add column if not exists user_id uuid references auth.users(id) on delete cascade;

alter table public.reports enable row level security;
alter table public.events enable row level security;
alter table public.event_registrations enable row level security;
alter table public.event_checkins enable row level security;
alter table public.event_feedback enable row level security;
alter table public.event_messages enable row level security;
alter table public.event_recaps enable row level security;
alter table public.donations enable row level security;
alter table public.impact_metrics enable row level security;
alter table public.report_status_history enable row level security;
alter table public.notifications enable row level security;
alter table public.community_posts enable row level security;
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
drop policy if exists "authenticated can create own events" on public.events;
create policy "authenticated can create own events" on public.events for insert to authenticated with check (owner_id = auth.uid());
drop policy if exists "authenticated can update own events" on public.events;
create policy "authenticated can update own events" on public.events for update to authenticated using (owner_id = auth.uid()) with check (owner_id = auth.uid());
drop policy if exists "public can register events" on public.event_registrations;
create policy "authenticated can register own events" on public.event_registrations for insert to authenticated with check (owner_id = auth.uid());
drop policy if exists "authenticated can read own event registrations" on public.event_registrations;
create policy "authenticated can read own event registrations" on public.event_registrations for select to authenticated using (owner_id = auth.uid());
create policy "event owners can read registrations" on public.event_registrations for select to authenticated
using (exists (select 1 from public.events where events.id = event_registrations.event_id and events.owner_id = auth.uid()));
create policy "authenticated can create own checkins" on public.event_checkins for insert to authenticated with check (user_id = auth.uid());
create policy "authenticated can read own checkins" on public.event_checkins for select to authenticated using (user_id = auth.uid());
create policy "authenticated can create own feedback" on public.event_feedback for insert to authenticated with check (user_id = auth.uid());
create policy "authenticated can update own feedback" on public.event_feedback for update to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "authenticated can read own feedback" on public.event_feedback for select to authenticated using (user_id = auth.uid());
create policy "authenticated can create event messages" on public.event_messages for insert to authenticated with check (user_id = auth.uid());
create policy "authenticated can read event messages" on public.event_messages for select to authenticated using (true);
create policy "authenticated can create own event recaps" on public.event_recaps for insert to authenticated with check (author_id = auth.uid());
create policy "authenticated can read event recaps" on public.event_recaps for select to authenticated using (true);
create policy "event owners can moderate registrations" on public.event_registrations for update to authenticated
using (exists (select 1 from public.events where events.id = event_registrations.event_id and events.owner_id = auth.uid()))
with check (exists (select 1 from public.events where events.id = event_registrations.event_id and events.owner_id = auth.uid()));

drop policy if exists "public can read donations" on public.donations;
drop policy if exists "public can create donations" on public.donations;
drop policy if exists "authenticated can read own donations" on public.donations;
create policy "authenticated can read own donations" on public.donations for select to authenticated using (donor_id = auth.uid());
drop policy if exists "authenticated can create own donations" on public.donations;
create policy "authenticated can create own donations" on public.donations for insert to authenticated with check (donor_id = auth.uid());

drop policy if exists "public can read metrics" on public.impact_metrics;
create policy "public can read metrics" on public.impact_metrics for select to anon, authenticated using (true);

drop policy if exists "public can read report history" on public.report_status_history;
create policy "authenticated can read own report history" on public.report_status_history for select to authenticated using (exists (select 1 from public.reports where reports.id = report_status_history.report_id and reports.owner_id = auth.uid()));
drop policy if exists "public can read notifications" on public.notifications;
create policy "authenticated can read own notifications" on public.notifications for select to authenticated using (user_id = auth.uid());
drop policy if exists "public can update notifications" on public.notifications;
create policy "authenticated can update own notifications" on public.notifications for update to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());
drop policy if exists "public can read community posts" on public.community_posts;
create policy "public can read community posts" on public.community_posts for select to anon, authenticated using (true);
drop policy if exists "authenticated can create community posts" on public.community_posts;
create policy "authenticated can create community posts" on public.community_posts for insert to authenticated with check (author_id = auth.uid());
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
create trigger reports_status_history
after insert or update of status on public.reports
for each row execute function public.record_report_status_history();

insert into storage.buckets (id, name, public)
values ('report-evidence', 'report-evidence', false)
on conflict (id) do update set public = false;

drop policy if exists "users can upload own report evidence" on storage.objects;
create policy "users can upload own report evidence" on storage.objects for insert to authenticated
with check (bucket_id = 'report-evidence' and (storage.foldername(name))[1] = auth.uid()::text);
drop policy if exists "users can read own report evidence" on storage.objects;
create policy "users can read own report evidence" on storage.objects for select to authenticated
using (bucket_id = 'report-evidence' and (storage.foldername(name))[1] = auth.uid()::text);
drop policy if exists "users can delete own report evidence" on storage.objects;
create policy "users can delete own report evidence" on storage.objects for delete to authenticated
using (bucket_id = 'report-evidence' and (storage.foldername(name))[1] = auth.uid()::text);

insert into public.events (title, description, event_date, location, capacity)
select * from (values
  ('Làm sạch bãi biển', 'Thu gom và phân loại rác cùng cộng đồng.', now() + interval '5 days', 'Bãi biển Tân Thành', 50),
  ('Đêm quan sát sinh vật biển', 'Tìm hiểu hệ sinh thái biển cùng chuyên gia.', now() + interval '13 days', 'Trạm nghiên cứu Cù Lao Chàm', 30)
) as seed(title, description, event_date, location, capacity)
where not exists (select 1 from public.events);

insert into public.impact_metrics (metric_date, total_kg, plastic_kg, organic_kg, other_kg)
values
  (current_date - 6, 240, 100, 75, 65),
  (current_date - 5, 310, 130, 95, 85),
  (current_date - 4, 280, 115, 90, 75),
  (current_date - 3, 390, 165, 115, 110),
  (current_date - 2, 330, 140, 105, 85),
  (current_date - 1, 480, 200, 150, 130),
  (current_date, 420, 175, 130, 115)
on conflict (metric_date) do nothing;
