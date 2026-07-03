-- Create google_calendar_tokens table
create table if not exists google_calendar_tokens (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade,
  access_token text not null,
  refresh_token text not null,
  expiry_date timestamp with time zone not null,
  email text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table google_calendar_tokens enable row level security;

-- Create policy to allow authenticated users to manage their own tokens
create policy "Users can manage their own calendar tokens"
  on google_calendar_tokens
  for all
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
