-- Trigger to automatically set thank_you_due_at timestamp 15 minutes after status updates to 'Attended'
CREATE OR REPLACE FUNCTION set_thank_you_due_at()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'Attended' AND (OLD.status IS NULL OR OLD.status <> 'Attended') THEN
    NEW.thank_you_due_at := NOW() + INTERVAL '15 minutes';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER tr_bookings_status_attended
  BEFORE UPDATE ON bookings
  FOR EACH ROW
  EXECUTE FUNCTION set_thank_you_due_at();
