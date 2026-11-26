create table public.community_groups (
  id text primary key,
  name text not null,
  category text not null,
  description text not null
);
create table public.community_group_members (
  group_id text not null references public.community_groups(id) on delete cascade,
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  joined_at timestamptz not null default now(),
  primary key (group_id, user_id)
);
create index community_group_members_user on public.community_group_members(user_id);

create table public.community_follows (
  follower_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  followed_id uuid not null references auth.users(id) on delete cascade,
  primary key (follower_id, followed_id),
  check (follower_id <> followed_id)
);
create index community_follows_followed on public.community_follows(followed_id);

alter table public.community_groups enable row level security;
alter table public.community_group_members enable row level security;
alter table public.community_follows enable row level security;

revoke all privileges on public.community_groups, public.community_group_members, public.community_follows from public, anon, authenticated;
grant select on public.community_groups, public.community_group_members to anon, authenticated;
grant insert (group_id), delete on public.community_group_members to authenticated;
grant select, insert (followed_id), delete on public.community_follows to authenticated;

create policy "view public community groups" on public.community_groups
  for select to anon, authenticated using (true);
create policy "view public group members" on public.community_group_members
  for select to anon, authenticated using (true);
create policy "join a public group" on public.community_group_members
  for insert to authenticated with check (user_id = (select auth.uid()));
create policy "leave a public group" on public.community_group_members
  for delete to authenticated using (user_id = (select auth.uid()));
create policy "read own following list" on public.community_follows
  for select to authenticated using (follower_id = (select auth.uid()));
create policy "follow a community member" on public.community_follows
  for insert to authenticated with check (follower_id = (select auth.uid()));
create policy "unfollow a community member" on public.community_follows
  for delete to authenticated using (follower_id = (select auth.uid()));

-- The directory is authored content from the design. Membership starts empty.
insert into public.community_groups (id, name, category, description) values
  ('da-nang-green-crew', 'Da Nang Green Crew', 'Cleanup', 'Weekly beach and street cleanups.'),
  ('ocean-guardians', 'Ocean Guardians', 'Wildlife', 'Protect marine life and habitats.'),
  ('zero-waste-campus', 'Zero Waste Campus', 'Education', 'Make sustainable habits easier.'),
  ('local-biodiversity-club', 'Local Biodiversity Club', 'Wildlife', 'Discover and protect local biodiversity.');
