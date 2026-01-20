# Setting Up Supabase with Cloudflare Pages

## ✅ **Solution: Use Cloudflare Pages Functions**

Since Cloudflare Pages doesn't allow environment variables for static-only deployments, we use **Cloudflare Pages Functions** which CAN access environment variables.

---

## 📋 **Step-by-Step Setup**

### **Step 1: Enable Functions in Cloudflare Pages**

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Navigate to **Pages** → Your Project
3. Click **Settings** tab
4. Scroll down to **Functions** section
   - If you don't see it, Functions might be enabled automatically when you deploy
   - The function file at `functions/api/waitlist.ts` will be detected automatically

### **Step 2: Set Environment Variables for Functions**

**Important:** You need to set environment variables in the **Functions** section, NOT the static assets section.

1. In your Cloudflare Pages project, go to **Settings**
2. Look for **Functions** section (or **Environment Variables** under Functions)
3. Click **Add variable** for **Production** environment

Add these two variables:

**Variable 1:**
- **Name:** `NEXT_PUBLIC_SUPABASE_URL`
- **Value:** Your Supabase Project URL (e.g., `https://xxxxx.supabase.co`)
- **Environment:** Production

**Variable 2:**
- **Name:** `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY`
- **Value:** Your Supabase anon/public key
- **Environment:** Production

**Alternative names (function checks both):**
- `SUPABASE_URL` (instead of NEXT_PUBLIC_SUPABASE_URL)
- `SUPABASE_ANON_KEY` (instead of NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY)

### **Step 3: Get Your Supabase Credentials**

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Go to **Settings** → **API**
4. Copy:
   - **Project URL** (under "Project URL")
   - **anon public** key (under "Project API keys" → "anon public")

### **Step 4: Deploy Your Site**

1. Make sure `functions/api/waitlist.ts` is in your repository
2. Push to your git repository (or trigger a new deployment)
3. Cloudflare Pages will automatically detect and deploy the function

### **Step 5: Verify Function is Deployed**

1. After deployment, go to **Pages** → Your Project → **Deployments**
2. Click on the latest deployment
3. Check the **Functions** tab - you should see `/api/waitlist` listed

---

## 🔍 **If You Don't See Functions Tab**

### **Option A: Functions Auto-Enable**

Cloudflare Pages Functions are automatically enabled when you have a `functions/` directory in your project. Just deploy and they'll work.

### **Option B: Check Build Settings**

1. Go to **Settings** → **Builds & deployments**
2. Make sure:
   - **Build command:** `npm run build`
   - **Build output directory:** `out`
   - **Root directory:** `/` (or your repo root)

### **Option C: Manual Function Setup**

If Functions still don't appear:

1. Make sure `functions/api/waitlist.ts` exists in your repo
2. The file structure should be:
   ```
   your-repo/
   ├── functions/
   │   └── api/
   │       └── waitlist.ts
   ├── app/
   ├── components/
   └── ...
   ```
3. Deploy again - Functions should be detected

---

## 🧪 **Testing**

### **1. Test the Function Directly**

After deployment, test with curl:

```bash
curl -X POST https://your-site.pages.dev/api/waitlist \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","fullName":"Test User","source":"website"}'
```

You should get a JSON response.

### **2. Test the Form**

1. Go to your site
2. Submit the waitlist form
3. Check browser console for any errors
4. Check Supabase Dashboard → Table Editor → `waitlist_signups` for new entries

---

## 🔒 **Supabase RLS Policy Setup**

Make sure your Supabase table allows anonymous inserts:

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
-- Enable insert for anonymous users
ALTER TABLE waitlist_signups ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable insert for anonymous users"
ON waitlist_signups
FOR INSERT
TO anon
WITH CHECK (true);
```

---

## 🐛 **Troubleshooting**

### **"Configuration error" or "Supabase configuration missing"**

- ✅ Check environment variables are set in **Functions** section (not static assets)
- ✅ Variable names must match exactly (case-sensitive)
- ✅ Make sure they're set for **Production** environment
- ✅ Redeploy after adding variables

### **"Permission denied" or "RLS" error**

- ✅ Check Supabase RLS policies allow anonymous inserts
- ✅ See "Supabase RLS Policy Setup" above

### **Function not found (404)**

- ✅ Check `functions/api/waitlist.ts` exists in your repo
- ✅ Verify function appears in Cloudflare Pages → Deployments → Functions tab
- ✅ Make sure you're calling `/api/waitlist` (not `/api/waitlist/`)

### **Check Function Logs**

1. Cloudflare Dashboard → Pages → Your Project
2. Click on a deployment
3. Check **Functions** tab for logs
4. Look for any error messages

---

## ✅ **Verification Checklist**

- [ ] `functions/api/waitlist.ts` exists in your repository
- [ ] Environment variables set in Functions section (not static assets)
- [ ] Variables set for Production environment
- [ ] Supabase RLS policy allows anonymous inserts
- [ ] Site deployed after adding variables
- [ ] Function appears in Cloudflare Pages Functions tab
- [ ] Form submission works
- [ ] Data appears in Supabase table

---

## 📝 **How It Works**

1. **User submits form** → Calls `/api/waitlist`
2. **Cloudflare Pages Function** intercepts the request
3. **Function reads environment variables** (from Functions settings)
4. **Function connects to Supabase** using the credentials
5. **Function inserts data** into `waitlist_signups` table
6. **Function returns success/error** to the form

---

## 🎯 **Key Points**

- ✅ Functions CAN access environment variables (unlike static assets)
- ✅ Function runs server-side (more secure)
- ✅ No API keys exposed to client
- ✅ Works with static exports
- ✅ Automatic deployment when `functions/` directory exists

---

**Last Updated:** 2026-01-19  
**Status:** Ready for Production
