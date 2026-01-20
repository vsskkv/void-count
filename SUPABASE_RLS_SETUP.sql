-- Supabase RLS Policy Setup for waitlist_signups
-- Run this in Supabase SQL Editor

-- 1. Enable Row Level Security on the table
ALTER TABLE public.waitlist_signups ENABLE ROW LEVEL SECURITY;

-- 2. Create policy to allow anonymous users to insert
CREATE POLICY "Allow anonymous inserts"
ON public.waitlist_signups
FOR INSERT
TO anon
WITH CHECK (true);

-- 3. Optional: Allow anonymous users to read (if you want to show count later)
CREATE POLICY "Allow anonymous reads"
ON public.waitlist_signups
FOR SELECT
TO anon
USING (true);

-- Verify the policies were created
SELECT * FROM pg_policies WHERE tablename = 'waitlist_signups';
