alter table public.events
  add column category text not null default 'Cleanup',
  add column preparation text[] not null default '{}',
  add column safety text not null default '',
  add column duration_minutes integer check (duration_minutes between 1 and 10080),
  add column cover_path text,
  add column ended_at timestamptz;
alter table public.event_recaps
  add column total_kg numeric check (total_kg >= 0),
  add column recyclable_kg numeric check (recyclable_kg >= 0 and total_kg is not null and recyclable_kg <= total_kg),
  add column photo_path text;
create unique index event_registration_per_member on public.event_registrations(event_id,owner_id) where owner_id is not null;
create function private.check_event_capacity() returns trigger language plpgsql security invoker set search_path='' as $$
declare places integer;
begin
  if new.status='approved' and new.status is distinct from old.status then
    select capacity into strict places from public.events where id=new.event_id for update;
    if places>0 and (select count(*) from public.event_registrations where event_id=new.event_id and status='approved')>=places then
      raise exception 'All places have been filled.';
    end if;
  end if;
  return new;
end $$;
create trigger event_capacity before update of status on public.event_registrations
  for each row execute function private.check_event_capacity();
revoke all on function private.check_event_capacity() from public,anon,authenticated;
alter policy "authenticated can register own events" on public.event_registrations with check (
  owner_id=(select auth.uid()) and status='pending'
  and exists(select 1 from public.events e where e.id=event_id and e.ended_at is null and e.event_date>now())
);
insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types)
values('event-photos','event-photos',true,10485760,array['image/jpeg','image/png','image/webp']);
create policy "members upload event photos" on storage.objects for insert to authenticated
with check(bucket_id='event-photos' and (storage.foldername(name))[1]=(select auth.uid())::text);
create policy "owners read their event photo objects" on storage.objects for select to authenticated
using(bucket_id='event-photos' and (storage.foldername(name))[1]=(select auth.uid())::text);
create policy "owners remove their event photo objects" on storage.objects for delete to authenticated
using(bucket_id='event-photos' and (storage.foldername(name))[1]=(select auth.uid())::text);
