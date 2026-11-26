-- Run as the migration role; all fixtures are rolled back, including Auth users.
begin;
do $$
declare alice uuid:=gen_random_uuid(); bob uuid:=gen_random_uuid();
  target uuid:=gen_random_uuid(); first_report uuid:=gen_random_uuid(); token uuid; seen integer;
begin
  insert into auth.users(id,aud,role,created_at,updated_at)
    values(alice,'authenticated','authenticated',now(),now()),(bob,'authenticated','authenticated',now(),now());
  perform set_config('request.jwt.claim.sub',alice::text,true);
  perform set_config('request.jwt.claims',json_build_object('sub',alice,'role','authenticated')::text,true);
  set local role authenticated;
  insert into public.reports(id,owner_id,title,location,category) values(first_report,alice,'Class verification','Test location','pollution');
  insert into public.events(id,owner_id,title,location,event_date) values(target,alice,'Class verification','Test location',now()+interval '1 day');
  token:=public.get_event_checkin_code(target);
  if token is null then raise exception 'organizer code missing';end if;
  select count(*) into seen from public.report_status_history where report_id=first_report;
  if seen<>1 then raise exception 'history trigger did not create one entry';end if;
  perform set_config('request.jwt.claim.sub',bob::text,true);
  perform set_config('request.jwt.claims',json_build_object('sub',bob,'role','authenticated')::text,true);
  select count(*) into seen from public.reports where id=first_report;
  if seen<>0 then raise exception 'private report visible to second participant';end if;
  insert into public.event_registrations(event_id,owner_id,participant_name,participant_email) values(target,bob,'QA participant','qa@example.invalid');
  perform set_config('request.jwt.claim.sub',alice::text,true);
  perform set_config('request.jwt.claims',json_build_object('sub',alice,'role','authenticated')::text,true);
  update public.event_registrations set status='approved' where event_id=target and owner_id=bob;
  if not found then raise exception 'organizer could not approve';end if;
  perform set_config('request.jwt.claim.sub',bob::text,true);
  perform set_config('request.jwt.claims',json_build_object('sub',bob,'role','authenticated')::text,true);
  perform public.check_in_to_event(target,token::text);
  perform public.check_in_to_event(target,token::text);
  select count(*) into seen from public.event_checkins where event_id=target;
  if seen<>1 then raise exception 'attendance must be idempotent';end if;
  insert into public.event_feedback(event_id,user_id,rating) values(target,bob,4);
  insert into public.event_messages(event_id,user_id,body) values(target,bob,'Class verification');
  reset role;
end $$;
select 'ownership, status history, organizer approval, repeat check-in, feedback and chat passed' as verification;
rollback;
