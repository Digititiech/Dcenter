-- Create settings table
create table if not exists settings (
  key text primary key,
  value text not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table settings enable row level security;

-- Policies
create policy "Allow public read on settings"
  on settings for select
  to anon, authenticated
  using (true);

create policy "Allow authenticated admin manage on settings"
  on settings for all
  to authenticated
  using (true)
  with check (true);
