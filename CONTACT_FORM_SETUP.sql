-- Contact Form Database Setup for Supabase
-- Run this SQL in your Supabase SQL Editor

-- Create contact_submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(255) NOT NULL,
  subject VARCHAR(200) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  read BOOLEAN DEFAULT false,
  replied BOOLEAN DEFAULT false
);

-- Add indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at ON contact_submissions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_read ON contact_submissions(read) WHERE read = false;

-- Enable Row Level Security
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (for re-running this script)
DROP POLICY IF EXISTS "Allow anonymous inserts" ON contact_submissions;
DROP POLICY IF EXISTS "Allow authenticated reads" ON contact_submissions;

-- Allow anonymous inserts (users can submit the form)
CREATE POLICY "Allow anonymous inserts" ON contact_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Only authenticated admins can read submissions
-- Note: You'll need to set up authentication and modify this policy based on your admin setup
-- For now, this allows all authenticated users to read. Restrict to admin role later.
CREATE POLICY "Allow authenticated reads" ON contact_submissions
  FOR SELECT
  TO authenticated
  USING (true);

-- Optional: Add rate limiting function
CREATE OR REPLACE FUNCTION check_submission_rate_limit(email_address TEXT)
RETURNS BOOLEAN AS $$
DECLARE
  recent_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO recent_count
  FROM contact_submissions
  WHERE email = email_address
    AND created_at > NOW() - INTERVAL '1 hour';
  
  RETURN recent_count < 3; -- Max 3 submissions per hour per email
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Add check constraint for rate limiting
-- Note: If this fails due to existing data, you can skip it or adjust the logic
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'check_rate_limit'
  ) THEN
    ALTER TABLE contact_submissions
    ADD CONSTRAINT check_rate_limit
    CHECK (check_submission_rate_limit(email));
  END IF;
END $$;

-- Grant necessary permissions
GRANT INSERT ON contact_submissions TO anon;
GRANT SELECT ON contact_submissions TO authenticated;

-- Verification query (run after setup to test)
-- SELECT * FROM contact_submissions ORDER BY created_at DESC LIMIT 10;
