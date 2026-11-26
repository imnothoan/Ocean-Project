begin;
do $$
declare
  reporter uuid := gen_random_uuid();
  moderator uuid := gen_random_uuid();
  target uuid := gen_random_uuid();
  group_key text := 'da-nang-green-crew';
begin
  insert into auth.users(id,aud,role,created_at,updated_at)
  values (reporter,'authenticated','authenticated',now(),now()), (moderator,'authenticated','authenticated',now(),now());
  perform set_config('request.jwt.claim.sub', reporter::text, true);
  perform set_config('request.jwt.claims', json_build_object('sub', reporter, 'role', 'authenticated')::text, true);
  set local role authenticated;
  insert into public.community_group_members(group_id) values(group_key);
  insert into public.community_follows(followed_id) values(moderator);
  if not exists(select 1 from public.community_follows where follower_id=reporter and followed_id=moderator) then raise exception 'Follow not saved'; end if;
  insert into public.reports(id,owner_id,title,category,location) values(target,reporter,'Class practice','pollution','Classroom');
  update public.reports set details='{"severity":"Low"}'::jsonb where id=target;
  if not found then raise exception 'Draft edit failed'; end if;
  perform set_config('request.jwt.claim.sub', moderator::text, true);
  perform set_config('request.jwt.claims', json_build_object('sub',moderator,'role','authenticated','app_metadata',json_build_object('role','admin'))::text,true);
  if exists(select 1 from public.community_follows where follower_id=reporter) then raise exception 'Private follow list visible'; end if;
  perform public.review_report(target,'submitted','reviewing','');
  perform public.review_report(target,'reviewing','rejected','Unclear photo');
  if not exists(select 1 from public.report_status_history where report_id=target and status='rejected' and note='Unclear photo') then raise exception 'Missing decision'; end if;
  perform set_config('request.jwt.claim.sub',reporter::text,true);
  perform set_config('request.jwt.claims',json_build_object('sub',reporter,'role','authenticated')::text,true);
  if not exists(select 1 from public.notifications where report_id=target and body like '%Unclear photo') then raise exception 'Missing decision notice'; end if;
  update public.reports set title='Changed after review' where id=target;
  if found then raise exception 'Reviewed report editable'; end if;
  delete from public.community_group_members where group_id=group_key and user_id=reporter;
  if not found then raise exception 'Leave failed'; end if;
  delete from public.community_follows where followed_id=moderator;
  if not found then raise exception 'Unfollow failed'; end if;
  reset role;
end $$;
select 'membership, following, report editing, reviewer transitions, timeline and notice passed' as verification;
rollback;
