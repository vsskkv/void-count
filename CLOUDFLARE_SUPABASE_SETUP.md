# Supabase + Cloudflare Pages Setup (Next.js)

## ✅ **Your Setup: Next.js + Cloudflare Pages (Static Export)**

Based on your codebase, you're using:
- **Framework:** Next.js 16
- **Deployment:** Cloudflare Pages
- **Build Type:** Static Export (`output: 'export'`)

---

## 📋 **Step-by-Step Setup**

### **Step 1: Get Your Supabase Keys**

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Go to **Settings** → **API**
4. Copy:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon public key** (safe for browser use)
   - ⚠️ **service_role key** (keep secret - only for server-side)

---

### **Step 2: Set Environment Variables in Cloudflare Pages**

**Important:** For Next.js static exports, `NEXT_PUBLIC_*` variables are baked into the build at build time.

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Navigate to **Pages** → Your Project
3. Click **Settings** → **Environment variables**
4. Add these for **Production** (and Preview if needed):

**For Browser/Client-Side:**
- **Name:** `NEXT_PUBLIC_SUPABASE_URL`
- **Value:** Your Supabase Project URL
- **Environment:** Production

- **Name:** `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **Value:** Your Supabase anon public key
- **Environment:** Production

**For Cloudflare Pages Functions (Server-Side):**
- **Name:** `SUPABASE_URL`
- **Value:** Your Supabase Project URL
- **Environment:** Production

- **Name:** `SUPABASE_ANON_KEY`
- **Value:** Your Supabase anon public key
- **Environment:** Production

**Optional (for privileged operations):**
- **Name:** `SUPABASE_SERVICE_ROLE_KEY`
- **Value:** Your Supabase service_role key
- **Environment:** Production
- ⚠️ **Only use in Functions, never expose to browser!**

---

### **Step 3: Rebuild Your Site**

After setting environment variables:

1. Go to **Pages** → Your Project → **Deployments**
2. Click **Retry deployment** on your latest build
   - OR push a new commit to trigger a rebuild
3. **Important:** Environment variables are baked into the build, so you MUST rebuild after adding them

---

### **Step 4: Verify RLS Policies**

Since you're using the **anon key** in the browser, make sure your Supabase table allows anonymous inserts:

1. Go to Supabase Dashboard → **Table Editor** → `waitlist_signups`
2. Click **Policies** tab
3. Create a new policy:

```sql
-- Allow anonymous users to insert
CREATE POLICY "Allow public inserts"
ON waitlist_signups
FOR INSERT
TO anon
WITH CHECK (true);
```

Or use the SQL Editor:

```sql
-- Enable RLS and allow anonymous inserts
ALTER TABLE waitlist_signups ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable insert for anonymous users"
ON waitlist_signups
FOR INSERT
TO anon
WITH CHECK (true);
```

---

## 🔧 **How It Works**

### **Client-Side (Browser)**
- Uses `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- These are baked into the JavaScript bundle at build time
- Safe to expose (anon key respects RLS policies)

### **Server-Side (Cloudflare Pages Function)**
- Uses `SUPABASE_URL` and `SUPABASE_ANON_KEY` from `context.env`
- Function at `functions/api/waitlist.ts` uses these
- Can also use `SUPABASE_SERVICE_ROLE_KEY` for privileged operations

---

## 📝 **Code Structure**

### **Client-Side Client** (`lib/supabaseClient.ts`)
```typescript
// Uses NEXT_PUBLIC_* variables (baked into build)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);
```

### **Server-Side Function** (`functions/api/waitlist.ts`)
```typescript
// Uses env vars from Cloudflare (context.env)
const supabaseUrl = context.env.SUPABASE_URL;
const supabaseKey = context.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);
```

---

## 🧪 **Testing**

### **1. Verify Environment Variables**

After rebuild, open your site and check browser console:

```javascript
console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
console.log('Supabase Key:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'Set' : 'Missing');
```

If they're `undefined`, the variables weren't set during build.

### **2. Test the Form**

1. Submit the waitlist form
2. Check browser console for errors
3. Check Supabase Dashboard → Table Editor → `waitlist_signups` for new entries

### **3. Test the Function**

```bash
curl -X POST https://your-site.pages.dev/api/waitlist \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","fullName":"Test","source":"website"}'
```

---

## 🐛 **Troubleshooting**

### **"Missing Supabase configuration"**

- ✅ Check environment variables are set in Cloudflare Pages
- ✅ Make sure they're set for **Production** environment
- ✅ **Rebuild your site** after adding variables
- ✅ Variable names must be exact (case-sensitive)

### **Variables are `undefined` in browser**

- ✅ Make sure you're using `NEXT_PUBLIC_` prefix
- ✅ Rebuild after adding variables
- ✅ Check build logs for any errors

### **"Permission denied" or RLS error**

- ✅ Check you're using **anon key** (not service_role)
- ✅ Verify RLS policy allows anonymous inserts
- ✅ Check Supabase Dashboard → Table Editor → Policies

### **Function not working**

- ✅ Check `functions/api/waitlist.ts` exists
- ✅ Verify function appears in Cloudflare Pages → Deployments → Functions
- ✅ Check function logs for errors
- ✅ Make sure `SUPABASE_URL` and `SUPABASE_ANON_KEY` are set (not just `NEXT_PUBLIC_*`)

---

## ✅ **Checklist**

- [ ] Got Supabase URL and anon key from Supabase Dashboard
- [ ] Set `NEXT_PUBLIC_SUPABASE_URL` in Cloudflare Pages (Production)
- [ ] Set `NEXT_PUBLIC_SUPABASE_ANON_KEY` in Cloudflare Pages (Production)
- [ ] Set `SUPABASE_URL` in Cloudflare Pages (Production) - for Functions
- [ ] Set `SUPABASE_ANON_KEY` in Cloudflare Pages (Production) - for Functions
- [ ] Rebuilt site after adding variables
- [ ] Created RLS policy for anonymous inserts
- [ ] Tested form submission
- [ ] Verified data appears in Supabase table

---

## 🔒 **Security Notes**

- ✅ **Anon key** is safe to expose in browser (respects RLS)
- ✅ **Service role key** should ONLY be used in Functions/Workers
- ✅ Never put `service_role` in `NEXT_PUBLIC_*` variables
- ✅ Always enable RLS on tables that store user data
- ✅ Create specific policies for each operation (insert, select, etc.)

---

## 📚 **References**

- [Next.js Environment Variables](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables)
- [Supabase RLS Guide](https://supabase.com/docs/guides/auth/row-level-security)
- [Cloudflare Pages Environment Variables](https://developers.cloudflare.com/pages/platform/build-configuration/#environment-variables)

---

**Last Updated:** 2026-01-19  
**Status:** Ready for Production
