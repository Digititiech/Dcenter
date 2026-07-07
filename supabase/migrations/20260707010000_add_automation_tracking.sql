-- Add automation tracking columns to bookings table
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS reminder_24h_sent boolean DEFAULT false;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS reminder_1h_sent boolean DEFAULT false;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS thank_you_sent boolean DEFAULT false;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS thank_you_due_at timestamp with time zone;
