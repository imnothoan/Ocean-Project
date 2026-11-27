begin;
do $$
declare first_member uuid := gen_random_uuid(); second_member uuid := gen_random_uuid(); counts jsonb;
begin
  insert into auth.users(id,aud,role,created_at,updated_at)
    select id,'authenticated','authenticated',now(),now() from unnest(array[first_member,second_member]) id;
  insert into public.learning_progress(user_id,activity,completed_at)
    values (first_member,'pet-bottle','2026-01-01T23:45:00Z'),(first_member,'green-guide','2026-01-02T18:30:00Z');
  insert into public.fundraising_campaigns(name,category,goal_usd,organizer,description,published_at)
    values ('SQL lesson published','Reefs',500,'SQL test','Transactional test',now()),
           ('SQL lesson draft','Reefs',500,'SQL test','Transactional test',null);
  set local role anon;
  if exists(select 1 from public.fundraising_campaigns where name='SQL lesson draft')
    or not exists(select 1 from public.fundraising_campaigns where name='SQL lesson published')
    or has_function_privilege(current_user,'public.ocean_badge_metrics(text)','execute')
    then raise exception 'Invalid guest access'; end if;
  reset role;
  perform set_config('request.jwt.claim.sub',first_member::text,true);
  set local role authenticated;
  counts := public.ocean_badge_metrics('Asia/Ho_Chi_Minh');
  if counts->>'learning'<>'2' or counts->>'streak'<>'2' then raise exception 'Invalid badge progress'; end if;
  perform set_config('request.jwt.claim.sub',second_member::text,true);
  if public.ocean_badge_metrics()->>'actions'<>'0' then raise exception 'Another member affected this result'; end if;
end $$;
rollback;
