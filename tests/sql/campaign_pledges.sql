begin;
do $$
declare member uuid:=gen_random_uuid(); published uuid; unpublished uuid; actual text;
begin
  insert into auth.users(id,aud,role,created_at,updated_at) values(member,'authenticated','authenticated',now(),now());
  insert into public.fundraising_campaigns(name,category,goal_usd,description,organizer,published_at)
    values('Transactional coastline fundraiser','Cleanups',150,'SQL test','Class organizer',now()) returning id into published;
  insert into public.fundraising_campaigns(name,category,goal_usd,description,organizer)
    values('Transactional draft fundraiser','Cleanups',150,'SQL test','Class organizer') returning id into unpublished;
  insert into public.campaign_updates(campaign_id,title,body,kind,published_at)
    values(published,'Public update','Test','update',now()),(unpublished,'Private update','Test','impact',now());
  perform set_config('request.jwt.claim.sub',member::text,true);
  set local role authenticated;
  insert into public.donations(donor_id,donor_name,amount,campaign_id,campaign,status)
    values(member,'Member',5,published,'Stale title','pending') returning campaign into actual;
  if actual<>'Transactional coastline fundraiser' then raise exception 'Missing canonical campaign'; end if;
  if exists(select 1 from public.campaign_updates where campaign_id=unpublished) then raise exception 'Draft update visible'; end if;
  begin
    insert into public.donations(donor_id,donor_name,amount,campaign,status) values(member,'Member',5,'Absent fundraiser','pending');
    raise exception 'Invalid campaign accepted';
  exception when check_violation then null; end;
end $$;
rollback;
