alter table public.donations add column campaign_id uuid references public.fundraising_campaigns(id);
create index donations_campaign_id on public.donations(campaign_id);
create function private.link_published_campaign() returns trigger language plpgsql security invoker set search_path='' as $$
declare campaign public.fundraising_campaigns%rowtype;
begin
  select c.* into campaign from public.fundraising_campaigns c
  where c.published_at <= now() and (c.id=new.campaign_id or (new.campaign_id is null and c.name=new.campaign));
  if not found then raise exception 'Choose a published campaign first.' using errcode='23514'; end if;
  new.campaign_id:=campaign.id;
  new.campaign:=campaign.name;
  return new;
end $$;
revoke all on function private.link_published_campaign() from public, anon, authenticated;
create trigger link_published_campaign before insert on public.donations
  for each row execute function private.link_published_campaign();
grant insert(campaign_id) on public.donations to authenticated;

create table public.campaign_updates (
  id uuid primary key default gen_random_uuid(),
  campaign_id uuid not null references public.fundraising_campaigns(id) on delete cascade,
  title text not null check(char_length(trim(title)) between 1 and 160),
  body text not null,
  kind text not null check(kind in ('update','impact')),
  published_at timestamptz
);
alter table public.campaign_updates enable row level security;
revoke all on public.campaign_updates from public,anon,authenticated;
grant select on public.campaign_updates to anon,authenticated;
create index campaign_updates_campaign_time on public.campaign_updates(campaign_id,published_at desc);
create policy "read published campaign records" on public.campaign_updates for select
  to anon,authenticated using(published_at <= now() and exists (
    select 1 from public.fundraising_campaigns c where c.id=campaign_id and c.published_at <= now()
  ));
