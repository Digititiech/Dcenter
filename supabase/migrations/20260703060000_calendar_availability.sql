-- Create calendar_availability table
create table if not exists calendar_availability (
  day_of_week int primary key, -- 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  is_available boolean not null default true,
  time_from text not null default '09:00',
  time_to text not null default '18:00',
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table calendar_availability enable row level security;

-- Policies
create policy "Allow public read on calendar_availability"
  on calendar_availability for select
  to anon, authenticated
  using (true);

create policy "Allow authenticated admin manage on calendar_availability"
  on calendar_availability for all
  to authenticated
  using (true)
  with check (true);

-- Seed default values (Sunday to Thursday available 09:00 - 18:00, Friday and Saturday unavailable)
insert into calendar_availability (day_of_week, is_available, time_from, time_to)
values
  (0, true, '09:00', '18:00'),
  (1, true, '09:00', '18:00'),
  (2, true, '09:00', '18:00'),
  (3, true, '09:00', '18:00'),
  (4, true, '09:00', '18:00'),
  (5, false, '09:00', '18:00'),
  (6, false, '09:00', '18:00')
on conflict (day_of_week) do nothing;
