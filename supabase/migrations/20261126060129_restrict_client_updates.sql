-- Restrict client-editable columns even when the caller owns the row.
revoke update on public.reports, public.notifications, public.event_registrations from public, anon, authenticated;
grant update(title,location) on public.reports to authenticated;
grant update(read_at) on public.notifications to authenticated;
grant update(status) on public.event_registrations to authenticated;
alter policy "authenticated can submit own reports" on public.reports with check (owner_id = (select auth.uid()) and status='submitted');
alter policy "authenticated can register own events" on public.event_registrations with check (owner_id = (select auth.uid()) and status='pending');
alter policy "authenticated can create own donations" on public.donations with check (donor_id = (select auth.uid()) and status='pending');
alter table public.donations alter column status set default 'pending';
update storage.buckets set file_size_limit=10485760, allowed_mime_types=array['image/jpeg','image/png','image/webp'] where id='report-evidence';
