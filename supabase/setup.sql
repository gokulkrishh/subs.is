-- Drop existing tables, functions, and triggers if they exist
drop trigger if exists on_auth_user_created on auth.users;
drop function if exists handle_new_user;
drop table if exists subscriptions cascade;
drop table if exists users cascade;

CREATE TABLE users (
  id uuid references auth.users on delete cascade not null primary key,
  email text unique not null,
  full_name text,
  avatar_url text,
  updated_at timestamp with time zone default current_timestamp,
  created_at timestamp with time zone default current_timestamp,
  plan_status text default 'free',
  currency_code text not null default 'INR'
);

-- Set up Row Level Security (RLS)
-- See https://supabase.com/docs/guides/auth/row-level-security for more details.
alter table users
  enable row level security;

create policy "Allow operations for users table for authenticated users only" on users
  for all using (auth.uid () = id);

-- This trigger automatically creates a user profile entry when a new user signs up via Supabase Auth.
-- See https://supabase.com/docs/guides/auth/managing-user-data#using-triggers for more details.
create function public.handle_new_user()
returns trigger as $$
begin
  insert into public.users (id, email, full_name, avatar_url)
  values (new.id, new.raw_user_meta_data->>'email', new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security definer;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid references users on delete cascade not null,
  name text not null,
  cost text not null,
  billing_date date not null,
  url text,
  payment_cycle text not null,
  active boolean not null default true,
  color text,
  notes text,
  notify boolean not null default false,
  created_at timestamp with time zone default current_timestamp,
  updated_at timestamp with time zone default current_timestamp
);

-- Set up Row Level Security (RLS)
-- See https://subscriptions.com/docs/guides/auth/row-level-security for more details.
alter table subscriptions
  enable row level security;

create policy "Allow operations for subscriptions table for authenticated users only" on subscriptions
  for all using (auth.uid () = user_id);


-- Create a moddtime extension to automatically update the updated_at column
create extension if not exists moddatetime schema extensions;

-- assuming the table name is "subscriptions and, "users", and a timestamp column "updated_at"
-- this trigger will set the "updated_at" column to the current timestamp for every update
create trigger
  handle_updated_at_users before update
on users
for each row execute
  procedure moddatetime(updated_at);

create trigger
  handle_updated_at_subscriptions before update
on subscriptions
for each row execute
  procedure moddatetime(updated_at);