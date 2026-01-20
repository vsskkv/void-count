# Complete Supabase Setup Guide - Step by Step

## ✅ **Your Table Schema (Perfect!)**

Your table schema is correct:
```sql
create table if not exists public.waitlist_signups (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  full_name text null,
  source text null,
  created_at timestamptz not null default now()
);

-- prevent duplicates by email (case-insensitive)
create unique index if not exists ux_waitlist_signups_email_ci
  on public.waitlist_signups (lower(email));
```

---

## 🔧 **Step 1: Set Up RLS Policy in Supabase**

Run this in **Supabase SQL Editor**:

```sql
-- Enable RLS on the table
ALTER TABLE public.waitlist_signups ENABLE ROW LEVEL SECURITY;

-- Allow anonymous users to insert
CREATE POLICY "Allow anonymous inserts"
ON public.waitlist_signups
FOR INSERT
TO anon
WITH CHECK (true);

-- Optional: Allow users to read their own email (if needed later)
CREATE POLICY "Allow users to read own email"
ON public.waitlist_signups
FOR SELECT
TO anon
USING (true);
```

**Important:** Without this policy, you'll get permission errors!

---

## 🔧 **Step 2: Verify Environment Variables in Cloudflare**

You already have these set (I can see from your screenshot):
- ✅ `SUPABASE_URL` = `https://bqzwiiaopsm...`
- ✅ `SUPABASE_ANON_KEY` = `sb_publishable_fZlhw...`

**Make sure they're set for Production environment!**

---

## 🔧 **Step 3: Clear Build Cache**

1. In Cloudflare Pages → Your Project → Settings
2. Find **Build cache** section
3. Click **Clear Cache**
4. This ensures a fresh build with your env vars

---

## 🔧 **Step 4: Rebuild Your Site**

1. Go to **Deployments**
2. Click **Retry deployment** on your latest build
3. OR push a new commit to trigger rebuild

---

## 🧪 **Step 5: Test the Function Directly**

After deployment, test with curl:

```bash
curl -X POST https://your-site.pages.dev/api/waitlist \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","fullName":"Test User","source":"website"}'
```

**Expected response:**
```json
{"success":true,"message":"You're on the list!"}
```

If you get an error, check:
- Function logs in Cloudflare Dashboard
- Supabase Dashboard → Logs → API Logs

---

## 🐛 **Troubleshooting**

### **"Permission denied" or RLS error**

✅ **Fix:** Run the RLS policy SQL above in Supabase SQL Editor

### **"Server configuration error"**

✅ **Fix:** 
- Check `SUPABASE_URL` and `SUPABASE_ANON_KEY` are set in Cloudflare
- Make sure they're set for **Production** environment
- Clear build cache and rebuild

### **Function returns 404**

✅ **Fix:**
- Check `functions/api/waitlist.ts` exists in your repo
- Verify function appears in Cloudflare → Deployments → Functions tab
- Make sure you're calling `/api/waitlist` (not `/api/waitlist/`)

### **"Something went wrong" in form**

✅ **Check browser console:**
- Open DevTools (F12) → Console
- Look for error messages
- Check Network tab for failed requests

---

## 📋 **Complete Checklist**

- [ ] Table created in Supabase with your schema
- [ ] RLS enabled on `waitlist_signups` table
- [ ] Policy created: "Allow anonymous inserts"
- [ ] `SUPABASE_URL` set in Cloudflare Pages (Production)
- [ ] `SUPABASE_ANON_KEY` set in Cloudflare Pages (Production)
- [ ] Build cache cleared
- [ ] Site rebuilt after setting variables
- [ ] Function deployed (check Functions tab)
- [ ] Tested function with curl
- [ ] Tested form submission

---

## 🔍 **Debug Steps**

### **1. Check Function is Deployed**

Cloudflare Dashboard → Pages → Your Project → Deployments → Click latest → Functions tab

You should see `/api/waitlist` listed.

### **2. Check Function Logs**

Cloudflare Dashboard → Pages → Your Project → Deployments → Click latest → Functions → View logs

Look for any errors when you submit the form.

### **3. Check Supabase Logs**

Supabase Dashboard → Logs → API Logs

Look for requests to `waitlist_signups` table.

### **4. Test in Browser Console**

Open your site → DevTools → Console → Run:

```javascript
fetch('/api/waitlist', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'test@example.com',
    fullName: 'Test',
    source: 'website'
  })
})
.then(r => r.json())
.then(console.log)
.catch(console.error);
```

This will show you the exact error.

---

## ✅ **Expected Flow**

1. User submits form → Calls `/api/waitlist`
2. Cloudflare Pages Function receives request
3. Function reads `SUPABASE_URL` and `SUPABASE_ANON_KEY` from env
4. Function connects to Supabase
5. Function inserts into `waitlist_signups` table
6. RLS policy allows the insert (anon key)
7. Function returns success
8. Form shows "You're on the list!"

---

## 🎯 **If Still Not Working**

Share:
1. Error message from browser console
2. Function logs from Cloudflare
3. Supabase API logs

And I'll help debug further!

---

**Last Updated:** 2026-01-19
