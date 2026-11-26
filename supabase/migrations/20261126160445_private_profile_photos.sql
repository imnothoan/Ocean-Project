insert into storage.buckets (id,name,public,file_size_limit,allowed_mime_types)
values ('profile-photos','profile-photos',false,10485760,array['image/jpeg','image/png','image/webp']);
create policy "owner views profile photo" on storage.objects for select to authenticated
using (bucket_id='profile-photos' and name=(select auth.uid())::text||'/avatar');
create policy "owner adds profile photo" on storage.objects for insert to authenticated
with check (bucket_id='profile-photos' and name=(select auth.uid())::text||'/avatar');
create policy "owner replaces profile photo" on storage.objects for update to authenticated
using (bucket_id='profile-photos' and name=(select auth.uid())::text||'/avatar')
with check (bucket_id='profile-photos' and name=(select auth.uid())::text||'/avatar');
create policy "owner removes profile photo" on storage.objects for delete to authenticated
using (bucket_id='profile-photos' and name=(select auth.uid())::text||'/avatar');
