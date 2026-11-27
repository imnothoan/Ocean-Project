-- App-owned campaigns are published by an organizer through the project dashboard.
create table public.fundraising_campaigns (
  id uuid primary key default gen_random_uuid(),
  name text not null unique check (char_length(trim(name)) between 1 and 140),
  category text not null check (category in ('Cleanups','Wildlife','Reefs','Other')),
  goal_usd numeric(14,2) not null check (goal_usd > 0),
  description text not null,
  organizer text not null,
  cover_url text check (cover_url is null or cover_url like 'https://%'),
  published_at timestamptz
);
alter table public.fundraising_campaigns enable row level security;
revoke all on public.fundraising_campaigns from public, anon, authenticated;
grant select on public.fundraising_campaigns to anon, authenticated;
create policy "read published campaigns" on public.fundraising_campaigns for select
  to anon, authenticated using (published_at <= now());

-- Return only the calling member's activity, including records outside the feed's page.
create function public.ocean_badge_metrics(zone_name text default 'UTC') returns jsonb
language sql stable security invoker set search_path='' as $$
  with mine as (select auth.uid() as id),
  resolved as (
    select r.id, r.category, coalesce((select max(h.created_at) from public.report_status_history h
        where h.report_id = r.id and h.status = 'resolved'), r.created_at) as at
    from public.reports r where r.owner_id = (select id from mine) and r.status = 'resolved'
  ),
  attended as (select created_at as at from public.event_checkins where user_id = (select id from mine)),
  learned as (select completed_at as at from public.learning_progress where user_id = (select id from mine)),
  activity as (select at from resolved union all select at from attended union all select at from learned),
  days as (select distinct (at at time zone zone_name)::date as day from activity),
  islands as (select day - (row_number() over (order by day))::int as island from days),
  streaks as (select count(*) as length from islands group by island)
  select jsonb_build_object(
    'actions',(select count(*) from activity),
    'resolved',(select count(*) from resolved),
    'wildlife',(select count(*) from resolved where category='animal'),
    'recycling',(select count(*) from resolved where category='recycle'),
    'pollution',(select count(*) from resolved where category='pollution'),
    'events',(select count(*) from attended),
    'learning',(select count(*) from learned),
    'streak',coalesce((select max(length) from streaks),0),
    'posts',(select count(*) from public.community_posts where author_id=(select id from mine)),
    'comments',(select count(*) from public.post_comments where author_id=(select id from mine)),
    'saved',(select count(*) from public.saved_guides where user_id=(select id from mine)),
    'claims',(select count(*) from public.reward_claims where user_id=(select id from mine))
  );
$$;
revoke all on function public.ocean_badge_metrics(text) from public, anon;
grant execute on function public.ocean_badge_metrics(text) to authenticated;
