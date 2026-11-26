create table public.report_followups (
 id uuid primary key default gen_random_uuid(), report_id uuid not null references public.reports(id) on delete cascade,
 author_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
 note text not null default '' check(char_length(note)<=1000),
 evidence_path text, created_at timestamptz not null default now(),
 check(char_length(trim(note))>0 or evidence_path is not null)
);
alter table public.report_followups enable row level security;
create policy "read own report followups" on public.report_followups for select to authenticated using(author_id=(select auth.uid()));
create policy "add followup to owned report" on public.report_followups for insert to authenticated with check (
 author_id=(select auth.uid()) and exists(select 1 from public.reports r where r.id=report_id and r.owner_id=(select auth.uid()))
 and (evidence_path is null or (split_part(evidence_path,'/',1)=auth.uid()::text and split_part(evidence_path,'/',2)=report_id::text))
);
grant select,insert on public.report_followups to authenticated;
create index report_followups_timeline on public.report_followups(report_id,created_at);
create index report_followups_author on public.report_followups(author_id);
