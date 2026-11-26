create table public.ocean_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null check (char_length(trim(display_name)) between 1 and 80),
  handle text unique check (handle ~ '^[a-z0-9_]{3,30}$'),
  location text not null default '' check (char_length(location)<=150),
  bio text not null default '' check (char_length(bio)<=150),
  interests text[] not null default '{}' check (cardinality(interests)<=12)
);
create table public.post_comments (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.community_posts(id) on delete cascade,
  author_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  body text not null check (char_length(trim(body)) between 1 and 2000),
  created_at timestamptz not null default now()
);
create table public.post_likes (
  post_id uuid not null references public.community_posts(id) on delete cascade,
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  primary key(post_id,user_id)
);
alter table public.ocean_profiles enable row level security;
alter table public.post_comments enable row level security;
alter table public.post_likes enable row level security;
create policy "read shared profiles" on public.ocean_profiles for select to anon,authenticated using(true);
create policy "create own profile" on public.ocean_profiles for insert to authenticated with check (id=(select auth.uid()));
create policy "edit own profile" on public.ocean_profiles for update to authenticated using (id=(select auth.uid())) with check (id=(select auth.uid()));
create policy "read shared comments" on public.post_comments for select to anon, authenticated using(true);
create policy "comment as self" on public.post_comments for insert to authenticated with check(author_id=(select auth.uid()));
create policy "read shared likes" on public.post_likes for select to anon, authenticated using(true);
create policy "like as self" on public.post_likes for insert to authenticated with check(user_id=(select auth.uid()));
create policy "remove own like" on public.post_likes for delete to authenticated using(user_id=(select auth.uid()));
grant select on public.ocean_profiles,public.post_comments,public.post_likes to anon,authenticated;
grant insert(id,display_name,handle,location,bio,interests),update(display_name,handle,location,bio,interests) on public.ocean_profiles to authenticated;
grant insert(post_id,body) on public.post_comments to authenticated;
grant insert(post_id,user_id),delete on public.post_likes to authenticated;
create index post_comments_chronological on public.post_comments(post_id,created_at);
create index post_comments_author on public.post_comments(author_id);
create index post_likes_user on public.post_likes(user_id);
alter table public.reports add column if not exists details jsonb not null default '{}' check (jsonb_typeof(details)='object' and octet_length(details::text)<=10000);
alter table public.community_posts add column if not exists location text not null default '' check (char_length(location)<=150);
alter table public.community_posts add column if not exists mention text not null default '' check (char_length(mention)<=150);
alter table public.event_registrations add column if not exists phone text not null default '' check (char_length(phone)<=32);
alter table public.event_registrations add column if not exists volunteer_role text not null default '' check (char_length(volunteer_role)<=80);
