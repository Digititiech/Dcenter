-- Create user_profiles table
create table if not exists public.user_profiles (
  id uuid references auth.users on delete cascade primary key,
  email text not null,
  role text not null default 'staff', -- 'manager' or 'staff'
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.user_profiles enable row level security;

-- RLS Policies
create policy "Allow all authenticated users to read profiles"
  on public.user_profiles for select
  to authenticated
  using (true);

create policy "Allow managers to insert profiles"
  on public.user_profiles for insert
  to authenticated
  with check (
    exists (
      select 1 from public.user_profiles
      where id = auth.uid() and role = 'manager'
    )
  );

create policy "Allow managers to update profiles"
  on public.user_profiles for update
  to authenticated
  using (
    exists (
      select 1 from public.user_profiles
      where id = auth.uid() and role = 'manager'
    )
  );

create policy "Allow managers to delete profiles"
  on public.user_profiles for delete
  to authenticated
  using (
    exists (
      select 1 from public.user_profiles
      where id = auth.uid() and role = 'manager'
    )
  );

-- Trigger function for auto profile creation on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.user_profiles (id, email, role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'role', 'manager') -- Default to manager if created directly/manually from auth dashboard
  );
  return new;
end;
$$ language plpgsql security definer;

-- Trigger definition
create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
