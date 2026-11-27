begin;
do $$
declare
  member uuid := gen_random_uuid();
  observer uuid := gen_random_uuid();
  first_post uuid := gen_random_uuid();
  second_post uuid := gen_random_uuid();
begin
  insert into auth.users (id, aud, role, created_at, updated_at) values
    (member, 'authenticated', 'authenticated', now(), now()),
    (observer, 'authenticated', 'authenticated', now(), now());
  insert into public.community_posts (id, author_id, body) values
    (first_post, observer, 'Class exercise one'), (second_post, observer, 'Class exercise two');

  perform set_config('request.jwt.claim.sub', member::text, true);
  perform set_config('request.jwt.claims', json_build_object('sub', member, 'role', 'authenticated')::text, true);
  set local role authenticated;
  insert into public.post_likes (post_id, user_id) values (first_post, member), (second_post, member);
  insert into public.post_comments (post_id, body) values (first_post, 'Class comment');
  if public.supported_posts_since(now() - interval '1 minute') <> 2 then
    raise exception 'A like and a comment on the same post must count once';
  end if;
  delete from public.post_likes where post_id = second_post and user_id = member;
  if public.supported_posts_since(now() - interval '1 minute') <> 1 then
    raise exception 'Removing a like must update the mission';
  end if;
  if public.supported_posts_since(now() + interval '1 minute') <> 0 then
    raise exception 'Past interactions must not count towards a later day';
  end if;

  perform set_config('request.jwt.claim.sub', observer::text, true);
  perform set_config('request.jwt.claims', json_build_object('sub', observer, 'role', 'authenticated')::text, true);
  if public.supported_posts_since(now() - interval '1 minute') <> 0 or
    exists (select from private.member_like_times where user_id = member) then
    raise exception 'Another member must not see private activity times';
  end if;
  reset role;
end $$;
select 'daily post support, unique posts, unlike, date boundary and owner scope passed' as verification;
rollback;
