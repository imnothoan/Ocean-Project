alter table public.ocean_profiles add column public_ranking boolean not null default false;
grant update(public_ranking) on public.ocean_profiles to authenticated;
create function private.ocean_ranking(period text) returns table(member_id uuid,display_name text,points bigint)
 language sql stable security definer set search_path='' as $$
 with cutoff as (select case period when 'week' then date_trunc('week',now()) when 'month' then date_trunc('month',now()) else '-infinity'::timestamptz end as since),
 earned as (
  select l.user_id,10 as points from public.learning_progress l,cutoff where l.completed_at>=since
  union all select c.user_id,50 from public.event_checkins c,cutoff where c.created_at>=since
  union all select r.owner_id,30 from public.reports r,cutoff where r.status='resolved'
    and coalesce((select max(h.created_at) from public.report_status_history h where h.report_id=r.id and h.status='resolved'),r.created_at)>=since
 )
 select p.id,p.display_name,sum(e.points)::bigint from public.ocean_profiles p join earned e on e.user_id=p.id
 where p.public_ranking group by p.id,p.display_name order by sum(e.points) desc,p.display_name,p.id limit 100
$$;
create function public.ocean_ranking(period text default 'all') returns table(member_id uuid,display_name text,points bigint)
 language sql stable security invoker set search_path='' as $$select * from private.ocean_ranking(period)$$;
create function private.finish_green_guide() returns void language sql security definer set search_path='' as $$
 insert into public.learning_progress(user_id,activity) values(auth.uid(),'green-guide') on conflict do nothing
$$;
create function public.complete_green_guide() returns void language sql security invoker set search_path='' as $$select private.finish_green_guide()$$;
revoke all on function private.finish_green_guide(), public.complete_green_guide() from public,anon;
grant execute on function private.finish_green_guide(), public.complete_green_guide() to authenticated;
revoke all on function private.ocean_ranking(text),public.ocean_ranking(text) from public,anon;
grant execute on function private.ocean_ranking(text),public.ocean_ranking(text) to authenticated;
