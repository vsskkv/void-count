-- Contact screen: RLS and permissions for contact_submissions
-- Run this in the Supabase SQL Editor so the /contact form can submit.

-- 1. Create table if it doesn't exist yet
CREATE TABLE IF NOT EXISTS public.contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(255) NOT NULL,
  subject VARCHAR(200) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  read BOOLEAN DEFAULT false,
  replied BOOLEAN DEFAULT false
);

CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at ON public.contact_submissions(created_at DESC);

-- 2. Enable RLS
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- 3. Allow anonymous inserts (contact form submissions)
DROP POLICY IF EXISTS "Allow anonymous inserts" ON public.contact_submissions;
CREATE POLICY "Allow anonymous inserts"
  ON public.contact_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- 4. Grant table/schema permissions to the public role
GRANT USAGE ON SCHEMA public TO anon;
GRANT INSERT ON TABLE public.contact_submissions TO anon;
