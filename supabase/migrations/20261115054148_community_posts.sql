create table if not exists public.community_posts (
  id uuid primary key default gen_random_uuid(),
  author_id uuid not null references auth.users(id) on delete cascade,
  body text not null check (char_length(body) between 3 and 2000),
  topic text not null default 'General',
  created_at timestamptz not null default now()
);
alter table public.community_posts enable row level security;
drop policy if exists "public can read community posts" on public.community_posts;
create policy "public can read community posts" on public.community_posts for select to anon, authenticated using (true);
drop policy if exists "authenticated can create community posts" on public.community_posts;
create policy "authenticated can create community posts" on public.community_posts for insert to authenticated with check (author_id = auth.uid());
