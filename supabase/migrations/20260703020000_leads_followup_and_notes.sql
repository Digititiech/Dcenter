-- Add notes and flagged_for_followup to leads table
alter table leads add column if not exists notes text;
alter table leads add column if not exists flagged_for_followup boolean default false;
