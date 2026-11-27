begin;
do $$
declare member uuid:=gen_random_uuid(); staff uuid:=gen_random_uuid(); other_id uuid:=gen_random_uuid(); blocked boolean:=false;
begin
 insert into auth.users(id,aud,role,created_at,updated_at)
 select candidate,'authenticated','authenticated',now(),now() from unnest(array[member,staff,other_id]) candidate;
 perform set_config('request.jwt.claim.sub',member::text,true);
 perform set_config('request.jwt.claims',json_build_object('sub',member,'role','authenticated')::text,true);
 set local role authenticated;
 begin
  insert into public.volunteer_applications(full_name,birth_date,email,location,motivation,hours,terms_accepted)
    values('Class member','1990-01-01','qa@example.invalid','Classroom','Protect our coast','2-4 hours',true);
 exception when insufficient_privilege then blocked:=true;
 end;
 if not blocked then raise exception 'Ineligible application accepted'; end if;
 reset role;
 insert into public.reports(owner_id,title,category,location,status)
 select member,'Class example','pollution','Classroom','resolved' from generate_series(1,3);
 set local role authenticated;
 insert into public.volunteer_applications(full_name,birth_date,email,location,motivation,hours,terms_accepted)
 values('Class member','1990-01-01','qa@example.invalid','Classroom','Protect our coast','2-4 hours',true);
 update public.volunteer_applications set status='approved' where user_id=member;
 if found then raise exception 'Applicant could approve their own application'; end if;
 perform set_config('request.jwt.claim.sub',other_id::text,true);
 perform set_config('request.jwt.claims',json_build_object('sub',other_id,'role','authenticated')::text,true);
 if exists(select 1 from public.volunteer_applications where user_id=member) then raise exception 'Application disclosed to another member'; end if;
 perform set_config('request.jwt.claim.sub',staff::text,true);
 perform set_config('request.jwt.claims',json_build_object('sub',staff,'role','authenticated','app_metadata',json_build_object('role','admin'))::text,true);
 update public.volunteer_applications set status='approved' where user_id=member;
 if not found then raise exception 'Decision missing'; end if;
 perform set_config('request.jwt.claim.sub',member::text,true);
 perform set_config('request.jwt.claims',json_build_object('sub',member,'role','authenticated')::text,true);
 perform public.advance_volunteer_training(1);
 perform public.advance_volunteer_training(2);
 perform public.advance_volunteer_training(3);
 if public.advance_volunteer_training(3,array[2,1,3,2,1,3,1,2,3,2])<>10 then raise exception 'Quiz score incorrect'; end if;
 if not exists(select 1 from public.notifications where user_id=member and title='Volunteer application') then raise exception 'Decision notice missing'; end if;
 reset role;
end $$;
select 'eligibility, private application, moderator decision, notification, lessons and quiz passed' as verification;
rollback;
