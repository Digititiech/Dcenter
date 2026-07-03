-- Create leads table
create table if not exists leads (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  phone text not null,
  company text not null,
  timeframe text not null,
  status text not null default 'Pending',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS on leads
alter table leads enable row level security;

-- Policies for leads
create policy "Allow public lead creation"
  on leads for insert
  to anon, authenticated
  with check (true);

create policy "Allow authenticated admin read/write on leads"
  on leads for all
  to authenticated
  using (true)
  with check (true);


-- Create bookings table
create table if not exists bookings (
  id uuid default gen_random_uuid() primary key,
  "clientName" text not null,
  "clientEmail" text not null,
  "clientPhone" text not null,
  day integer not null,
  "timeSlot" text not null,
  status text not null default 'Pending',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS on bookings
alter table bookings enable row level security;

-- Policies for bookings
create policy "Allow public booking creation"
  on bookings for insert
  to anon, authenticated
  with check (true);

create policy "Allow authenticated admin read/write on bookings"
  on bookings for all
  to authenticated
  using (true)
  with check (true);
