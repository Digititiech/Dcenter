-- Create whatsapp_presets table
create table if not exists whatsapp_presets (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  text text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table whatsapp_presets enable row level security;

-- Policies
create policy "Allow public read on presets"
  on whatsapp_presets for select
  to anon, authenticated
  using (true);

create policy "Allow authenticated admin manage on presets"
  on whatsapp_presets for all
  to authenticated
  using (true)
  with check (true);
