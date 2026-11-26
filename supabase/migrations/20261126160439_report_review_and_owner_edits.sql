alter table public.reports drop constraint reports_status_check;
alter table public.reports add constraint reports_status_check check (status in ('submitted','reviewing','resolved','rejected'));
alter table public.report_status_history drop constraint report_status_history_status_check;
alter table public.report_status_history add constraint report_status_history_status_check check (status in ('submitted','reviewing','resolved','rejected'));

grant update(details) on public.reports to authenticated;
alter policy "authenticated can update own reports" on public.reports
using (owner_id = (select auth.uid()) and status = 'submitted')
with check (owner_id = (select auth.uid()) and status = 'submitted');

create policy "moderators read evidence metadata" on public.report_evidence for select to authenticated
using (((select auth.jwt())->'app_metadata'->>'role') = 'admin');
create policy "moderators read report timeline" on public.report_status_history for select to authenticated
using (((select auth.jwt())->'app_metadata'->>'role') = 'admin');
create policy "moderators read followups" on public.report_followups for select to authenticated
using (((select auth.jwt())->'app_metadata'->>'role') = 'admin');
create policy "moderators read attached evidence" on storage.objects for select to authenticated using (
  bucket_id = 'report-evidence' and ((select auth.jwt())->'app_metadata'->>'role') = 'admin' and (
    exists (select 1 from public.report_evidence e where e.storage_path = name
      and e.owner_id::text = split_part(name,'/',1) and e.report_id::text = split_part(name,'/',2))
    or exists (select 1 from public.report_followups f where f.evidence_path = name
      and f.author_id::text = split_part(name,'/',1) and f.report_id::text = split_part(name,'/',2))
  )
);

create function private.review_report(target uuid, expected_status text, next_status text, reason text)
returns void language plpgsql security definer set search_path = '' as $$
declare reporter uuid;
begin
  if auth.uid() is null or ((select auth.jwt())->'app_metadata'->>'role') is distinct from 'admin' then
    raise exception 'Administrator role required.' using errcode='42501';
  end if;
  if expected_status is null or next_status is null or not (
    (expected_status='submitted' and next_status in ('reviewing','rejected','resolved')) or
    (expected_status='reviewing' and next_status in ('rejected','resolved'))
  ) then raise exception 'Invalid review transition.'; end if;
  if next_status='rejected' and (reason is null or char_length(trim(reason)) not between 1 and 500) then
    raise exception 'Please choose a reason for rejecting the report.';
  end if;
  update public.reports set status=next_status where id=target and status=expected_status returning owner_id into reporter;
  if not found then raise exception 'Report has already changed. Refresh and retry.'; end if;
  if next_status='rejected' then
    update public.report_status_history set note=trim(reason) where report_id=target and status='rejected';
  end if;
  if reporter is not null then
    insert into public.notifications(user_id,report_id,title,body) values(reporter,target,'Report update',
      case when next_status='rejected' then 'Rejected · '||trim(reason) else 'Status: '||next_status end);
  end if;
end $$;
create function public.review_report(target uuid, expected_status text, next_status text, reason text)
returns void language sql security invoker set search_path='' as $$ select private.review_report(target,expected_status,next_status,reason) $$;
revoke all on function private.review_report(uuid,text,text,text), public.review_report(uuid,text,text,text) from public,anon;
grant execute on function private.review_report(uuid,text,text,text), public.review_report(uuid,text,text,text) to authenticated;

-- Preserve older clients while keeping a rejected report terminal.
create or replace function private.moderate_report(target uuid,next_status text)
returns void language plpgsql security invoker set search_path='' as $$
declare previous text;
begin
  select status into previous from public.reports where id=target;
  perform private.review_report(target,previous,next_status,null);
end $$;
