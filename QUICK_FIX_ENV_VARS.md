# Quick Fix - Add Environment Variables

## 🔴 **The Problem**

You're seeing: "Configuration error. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY"

The console shows: `{url: false, key: false}`

---

## ✅ **The Solution**

You have `SUPABASE_URL` and `SUPABASE_ANON_KEY` set, but you need the `NEXT_PUBLIC_*` versions for the browser.

---

## 📋 **Step-by-Step Fix**

### **Step 1: Go to Cloudflare Pages (Not Workers)**

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Click **Pages** (not Workers & Pages → Workers)
3. Click on your **void-count** project

### **Step 2: Add Environment Variables**

1. Click **Settings** tab
2. Scroll to **Environment variables** section
3. Click **Add variable** for **Production**

**Add Variable 1:**
- **Name:** `NEXT_PUBLIC_SUPABASE_URL`
- **Value:** Copy the value from your `SUPABASE_URL` variable (should be `https://bqzwiiaopsm...`)
- **Environment:** Production

**Add Variable 2:**
- **Name:** `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **Value:** Copy the value from your `SUPABASE_ANON_KEY` variable
- **Environment:** Production

### **Step 3: Clear Build Cache**

1. Still in Settings
2. Find **Build cache** section
3. Click **Clear Cache**

### **Step 4: Rebuild**

1. Go to **Deployments** tab
2. Click **Retry deployment** on your latest build
3. Wait for build to complete

---

## 🧪 **Test After Rebuild**

1. Go to your site
2. Open browser console (F12)
3. Type: `console.log(process.env.NEXT_PUBLIC_SUPABASE_URL)`
4. You should see your URL (not `undefined`)

Then test the form!

---

## ⚠️ **Important Notes**

- **NEXT_PUBLIC_*** variables are baked into the JavaScript bundle at build time
- You MUST rebuild after adding them
- They're safe to expose (anon key respects RLS)

---

## 🔒 **Don't Forget RLS Policy**

Run this in Supabase SQL Editor:

```sql
ALTER TABLE public.waitlist_signups ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous inserts"
ON public.waitlist_signups
FOR INSERT
TO anon
WITH CHECK (true);
```

---

**After these steps, your waitlist will work!**
