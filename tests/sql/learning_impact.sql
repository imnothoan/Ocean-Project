begin;
do $$
declare person uuid:=gen_random_uuid(); total integer;
begin
  insert into auth.users(id,aud,role,created_at,updated_at) values(person,'authenticated','authenticated',now(),now());
  perform set_config('request.jwt.claim.sub',person::text,true);
  perform set_config('request.jwt.claims',json_build_object('sub',person,'role','authenticated')::text,true);
  set local role authenticated;
  insert into public.ocean_profiles(id,display_name) values(person,'Class participant');
  perform public.complete_green_guide();perform public.complete_green_guide();perform public.complete_sorting_quiz('recycling');
  if public.ocean_points()<>20 then raise exception 'Learning credits should only be awarded once';end if;
  if exists(select 1 from public.ocean_ranking('all') where member_id=person) then raise exception 'Unexpected public ranking';end if;
  update public.ocean_profiles set public_ranking=true where id=person;

  select points into strict total from public.ocean_ranking('week') where member_id=person;
  if total<>20 then raise exception 'Missing opted-in score';end if;
  reset role;
end $$;
select 'idempotent learning awards, private defaults, opt-in member ranking passed' as verification;
rollback;
