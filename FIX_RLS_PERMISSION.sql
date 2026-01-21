-- Fix RLS Permission Error for waitlist_signups
-- Run this ENTIRE script in Supabase SQL Editor

-- Step 1: Enable RLS on the table (if not already enabled)
ALTER TABLE public.waitlist_signups ENABLE ROW LEVEL SECURITY;

-- Step 2: Drop existing policy if it exists (to avoid conflicts)
DROP POLICY IF EXISTS "Allow anonymous inserts" ON public.waitlist_signups;
DROP POLICY IF EXISTS "Allow public inserts" ON public.waitlist_signups;
DROP POLICY IF EXISTS "Enable insert for anonymous users" ON public.waitlist_signups;

-- Step 3: Create the policy to allow anonymous inserts
CREATE POLICY "Allow anonymous inserts"
ON public.waitlist_signups
FOR INSERT
TO anon
WITH CHECK (true);

-- Step 4: Verify the policy was created
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies 
WHERE tablename = 'waitlist_signups';

-- Expected output should show:
-- - tablename: waitlist_signups
-- - policyname: Allow anonymous inserts
-- - roles: {anon}
-- - cmd: INSERT
