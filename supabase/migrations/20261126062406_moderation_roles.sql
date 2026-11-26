create policy "moderators can read reports" on public.reports for select to authenticated
using ((select auth.jwt())->'app_metadata'->>'role'='admin');
create function private.moderate_report(target uuid, next_status text) returns void language plpgsql security definer set search_path='' as $$
declare owner uuid;
begin
 if auth.uid() is null or ((select auth.jwt())->'app_metadata'->>'role') is distinct from 'admin' then raise exception 'Administrator role required.' using errcode='42501'; end if;
 if next_status not in ('reviewing','resolved') or next_status is null then raise exception 'Invalid status';end if;
 update public.reports set status=next_status where id=target and status<>next_status and status<>'resolved' returning owner_id into owner;
 if not found then raise exception 'Report has already changed. Refresh and retry.';end if;
 if owner is not null then insert into public.notifications(user_id,report_id,title,body) values(owner,target,'Report update','Status: '||next_status);end if;
end $$;
create function public.moderate_report(target uuid,next_status text) returns void language sql security invoker set search_path='' as $$ select private.moderate_report(target,next_status) $$;
revoke all on function private.moderate_report(uuid,text),public.moderate_report(uuid,text) from public,anon;
grant execute on function private.moderate_report(uuid,text),public.moderate_report(uuid,text) to authenticated;
