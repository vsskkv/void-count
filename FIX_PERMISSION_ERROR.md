# Fix "Permission Denied" Error - RLS Policy Setup

## 🔴 **The Problem**

You're getting:
- **Error:** "Permission denied. Please check Supabase RLS policies allow anonymous inserts."
- **Status:** 401 (Unauthorized)
- **Cause:** Supabase Row Level Security (RLS) is blocking anonymous inserts

---

## ✅ **The Solution: Create RLS Policy**

### **Step 1: Go to Supabase SQL Editor**

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Click **SQL Editor** in the left sidebar
4. Click **New query**

### **Step 2: Run This SQL**

Copy and paste this entire script:

```sql
-- Enable RLS
ALTER TABLE public.waitlist_signups ENABLE ROW LEVEL SECURITY;

-- Remove any existing policies (to avoid conflicts)
DROP POLICY IF EXISTS "Allow anonymous inserts" ON public.waitlist_signups;
DROP POLICY IF EXISTS "Allow public inserts" ON public.waitlist_signups;
DROP POLICY IF EXISTS "Enable insert for anonymous users" ON public.waitlist_signups;

-- Create policy to allow anonymous inserts
CREATE POLICY "Allow anonymous inserts"
ON public.waitlist_signups
FOR INSERT
TO anon
WITH CHECK (true);
```

### **Step 3: Click "Run"**

Click the **Run** button (or press Ctrl/Cmd + Enter)

### **Step 4: Verify It Worked**

You should see:
- ✅ "Success. No rows returned"
- ✅ Or a message confirming the policy was created

---

## 🧪 **Test Immediately**

After running the SQL:

1. Go back to your website
2. Submit the waitlist form
3. **It should work now!** ✅

---

## 🔍 **Verify the Policy**

To check if the policy exists:

1. Go to **Supabase Dashboard** → **Table Editor** → `waitlist_signups`
2. Click **Policies** tab
3. You should see: **"Allow anonymous inserts"** policy

Or run this in SQL Editor:

```sql
SELECT * FROM pg_policies WHERE tablename = 'waitlist_signups';
```

---

## 🐛 **If Still Not Working**

### **Check 1: Table Name**

Make sure your table is named exactly `waitlist_signups` (case-sensitive).

Check in Supabase:
- **Table Editor** → Look for `waitlist_signups`

### **Check 2: Policy Created**

Run this to see all policies:

```sql
SELECT * FROM pg_policies WHERE tablename = 'waitlist_signups';
```

You should see a row with:
- `policyname` = "Allow anonymous inserts"
- `roles` = `{anon}`
- `cmd` = `INSERT`

### **Check 3: RLS Enabled**

Run this:

```sql
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'waitlist_signups';
```

`rowsecurity` should be `true`.

---

## 📝 **What This Does**

The SQL script:
1. ✅ Enables RLS on the table
2. ✅ Removes any conflicting policies
3. ✅ Creates a new policy that allows `anon` role to INSERT
4. ✅ The `WITH CHECK (true)` means any insert is allowed

---

## ✅ **After Running the SQL**

1. ✅ RLS will be enabled
2. ✅ Anonymous users can insert
3. ✅ Your form will work
4. ✅ Data will save to Supabase

---

**Run the SQL script and test your form - it should work immediately!**

**Last Updated:** 2026-01-19
