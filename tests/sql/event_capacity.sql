begin;
do $$
declare
  organizer uuid:=gen_random_uuid(); alice uuid:=gen_random_uuid(); bob uuid:=gen_random_uuid();
  activity uuid:=gen_random_uuid(); blocked boolean:=false;
begin
  insert into auth.users(id,aud,role,created_at,updated_at)
    select member,'authenticated','authenticated',now(),now() from unnest(array[organizer,alice,bob]) member;
  insert into public.events(id,owner_id,title,location,event_date,capacity) values(activity,organizer,'Classroom exercise','Classroom',now()+interval '1 day',1);
  insert into public.event_registrations(event_id,owner_id,participant_name,participant_email)
    values(activity,alice,'Test volunteer A','a@example.invalid'),(activity,bob,'Test volunteer B','b@example.invalid');
  perform set_config('request.jwt.claim.sub',organizer::text,true);
  perform set_config('request.jwt.claims',json_build_object('sub',organizer,'role','authenticated')::text,true);
  set local role authenticated;
  update public.event_registrations set status='approved' where event_id=activity and owner_id=alice;
  if not found then raise exception 'Approval missing'; end if;
  begin
    update public.event_registrations set status='approved' where event_id=activity and owner_id=bob;
  exception when raise_exception then
    if sqlerrm <> 'All places have been filled.' then raise; end if;
    blocked:=true;
  end;
  if not blocked then raise exception 'Event capacity exceeded'; end if;
  reset role;
end $$;
select 'one approval accepted, second approval blocked at capacity' as verification;
rollback;
