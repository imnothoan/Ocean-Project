alter table public.community_posts add column photo_paths text[] not null default '{}' check(cardinality(photo_paths)<=4);
insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types) values
('community-photos','community-photos',true,10485760,array['image/jpeg','image/png','image/webp']) on conflict(id) do nothing;
create policy "members upload their public post photos" on storage.objects for insert to authenticated with check (
 bucket_id='community-photos' and (storage.foldername(name))[1]=(select auth.uid())::text);
create policy "members remove their public post photos" on storage.objects for delete to authenticated using (
 bucket_id='community-photos' and (storage.foldername(name))[1]=(select auth.uid())::text);
create policy "members manage their uploaded photos" on storage.objects for select to authenticated using (
 bucket_id='community-photos' and (storage.foldername(name))[1]=(select auth.uid())::text);
