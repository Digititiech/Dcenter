-- Add unique constraint on user_id in google_calendar_tokens to support upsert onConflict
ALTER TABLE google_calendar_tokens 
ADD CONSTRAINT google_calendar_tokens_user_id_key UNIQUE (user_id);
