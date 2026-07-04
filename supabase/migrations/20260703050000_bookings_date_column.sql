-- Add booking_date column to bookings table
alter table bookings add column if not exists booking_date text not null default '2026-10-01';
