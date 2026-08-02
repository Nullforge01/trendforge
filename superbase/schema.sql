-- Run this once in your Supabase project's SQL editor (Database > SQL Editor)

create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  password_hash text not null,
  business_name text not null,
  niche text not null,
  content_type text not null,
  created_at timestamptz default now()
);

create table if not exists trends (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  type text not null,              -- 'hot' | 'rising' | 'niche'
  niche text not null,
  why_it_works text,
  example_url text,
  status text default 'pending',   -- 'pending' | 'approved' (human review gate)
  created_at timestamptz default now()
);

create table if not exists ideas (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id),
  trend_id uuid references trends(id),
  niche text,
  hook text,
  script text,
  caption text,
  hashtags text,
  created_at timestamptz default now()
);

create table if not exists chat_messages (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id),
  role text not null,              -- 'user' | 'ai'
  content text not null,
  created_at timestamptz default now()
);

create table if not exists collabs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id),
  offering text,
  seeking text,
  niche text,
  city text,
  created_at timestamptz default now()
);

create table if not exists tips (
  id uuid primary key default gen_random_uuid(),
  niche text not null,
  text text not null,
  created_at timestamptz default now()
);
