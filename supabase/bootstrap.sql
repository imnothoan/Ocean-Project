-- Original tables required before the first recorded migration. For a new, empty Supabase database.


create table if not exists public.reports (
  id uuid primary key default gen_random_uuid(),
  category text not null check (category in ('pollution', 'animal', 'recycle')),
  title text not null check (char_length(title) between 3 and 500),
  location text not null check (char_length(location) between 2 and 500),
  status text not null default 'submitted' check (status in ('submitted', 'reviewing', 'resolved')),
  created_at timestamptz not null default now()
);

alter table public.reports enable row level security;

create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null default '',
  event_date timestamptz not null,
  location text not null,
  capacity integer not null default 0 check (capacity >= 0),
  created_at timestamptz not null default now()
);

alter table public.events enable row level security;

create table if not exists public.event_registrations (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references public.events(id) on delete cascade,
  participant_name text not null,
  participant_email text not null,
  created_at timestamptz not null default now(),
  unique (event_id, participant_email)
);

alter table public.event_registrations enable row level security;

create table if not exists public.donations (
  id uuid primary key default gen_random_uuid(),
  donor_name text not null,
  amount numeric(12, 2) not null check (amount > 0),
  campaign text not null,
  status text not null default 'confirmed' check (status in ('pending', 'confirmed', 'failed')),
  created_at timestamptz not null default now()
);

alter table public.donations enable row level security;

create table if not exists public.impact_metrics (
  id uuid primary key default gen_random_uuid(),
  metric_date date not null unique,
  total_kg numeric(12, 2) not null default 0 check (total_kg >= 0),
  plastic_kg numeric(12, 2) not null default 0 check (plastic_kg >= 0),
  organic_kg numeric(12, 2) not null default 0 check (organic_kg >= 0),
  other_kg numeric(12, 2) not null default 0 check (other_kg >= 0)
);

alter table public.impact_metrics enable row level security;
