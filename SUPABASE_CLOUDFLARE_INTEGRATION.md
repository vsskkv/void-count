# Setting Up Supabase with Cloudflare Pages Using Official Integration

## ✅ **Easiest Method: Use Supabase Cloudflare Integration**

Cloudflare has an official Supabase integration that automatically sets up environment variables for you! This is much easier than manual setup.

**Reference:** [Supabase Cloudflare Workers Integration](https://supabase.com/partners/integrations/cloudflare-workers)

---

## 🚀 **Step-by-Step Setup**

### **Step 1: Enable Supabase Integration in Cloudflare**

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Navigate to **Workers & Pages** → Your Project
3. Click **Settings** tab
4. Click **Integrations** (in the left sidebar or under Settings)
5. Find the **Supabase** card
6. Click **Add Integration**

### **Step 2: Connect Your Supabase Account**

1. A Supabase popup will appear
2. Select your **Supabase Organization**
3. Select your **Supabase Project**
4. If you don't have a project, create one at [Supabase Dashboard](https://app.supabase.com)

### **Step 3: Choose Your Supabase Key**

You'll be asked which key to use:

- **Anon Key** (Recommended for public forms)
  - ✅ Respects Row Level Security (RLS) policies
  - ✅ Safe for public-facing forms
  - ✅ Use this for waitlist forms

- **Service Role Key** (For backend/admin operations)
  - ⚠️ Bypasses RLS policies
  - ⚠️ Has full database access
  - ⚠️ Only use in secure backend contexts

**For the waitlist form, choose "Anon Key"**

### **Step 4: Verify Integration**

After connecting, the integration will automatically inject:
- `SUPABASE_URL` - Your Supabase project URL
- `SUPABASE_KEY` - Your selected key (anon or service role)

These are now available in your Cloudflare Pages Functions!

### **Step 5: Deploy Your Site**

1. Make sure `functions/api/waitlist.ts` is in your repository
2. Push to git or trigger a new deployment
3. The function will automatically use the Supabase credentials

---

## 🔍 **How It Works**

The integration automatically:
1. ✅ Connects your Supabase account
2. ✅ Injects `SUPABASE_URL` and `SUPABASE_KEY` into your Functions
3. ✅ No manual environment variable setup needed!
4. ✅ Works with Cloudflare Pages Functions (built on Workers)

---

## 🧪 **Testing**

### **1. Test the Function**

After deployment, test with curl:

```bash
curl -X POST https://your-site.pages.dev/api/waitlist \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","fullName":"Test User","source":"website"}'
```

### **2. Test the Form**

1. Go to your site
2. Submit the waitlist form
3. Check Supabase Dashboard → Table Editor → `waitlist_signups` for new entries

---

## 🔒 **Supabase RLS Policy Setup**

Since we're using the **Anon Key**, make sure your table allows anonymous inserts:

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

## 🐛 **Troubleshooting**

### **"Supabase configuration missing"**

- ✅ Make sure you've added the Supabase integration
- ✅ Check Settings → Integrations → Supabase is connected
- ✅ Verify you selected a project and key
- ✅ Redeploy after adding integration

### **"Permission denied" or RLS error**

- ✅ Check you're using **Anon Key** (not Service Role)
- ✅ Verify RLS policy allows anonymous inserts (see above)
- ✅ Check Supabase Dashboard → Table Editor → Policies

### **Integration not showing up**

- ✅ Make sure you're in **Workers & Pages** (not just Pages)
- ✅ Check you're on the correct project
- ✅ Try refreshing the dashboard
- ✅ Make sure your account has access to integrations

### **Function not found (404)**

- ✅ Check `functions/api/waitlist.ts` exists in your repo
- ✅ Verify function appears in Deployments → Functions tab
- ✅ Make sure you're calling `/api/waitlist` (not `/api/waitlist/`)

---

## 📝 **Code Changes**

The function code has been updated to use:
- `context.env.SUPABASE_URL` (from integration)
- `context.env.SUPABASE_KEY` (from integration)

With fallback to manual env vars if needed.

---

## ✅ **Advantages of Using Integration**

- ✅ **No manual setup** - Just click and connect
- ✅ **Automatic updates** - If you change Supabase project, just reconnect
- ✅ **Secure** - Credentials managed by Cloudflare
- ✅ **Easy to manage** - See all integrations in one place
- ✅ **Works with Pages Functions** - Built on Workers platform

---

## 🔄 **Alternative: Manual Environment Variables**

If you prefer not to use the integration, you can still set environment variables manually:

1. Go to Settings → **Environment Variables** (or Functions → Environment Variables)
2. Add:
   - `SUPABASE_URL` = Your Supabase project URL
   - `SUPABASE_KEY` = Your Supabase anon key

The function code supports both methods!

---

## 📚 **References**

- [Supabase Cloudflare Workers Integration Docs](https://supabase.com/partners/integrations/cloudflare-workers)
- [Cloudflare Dashboard](https://dash.cloudflare.com)
- [Supabase Dashboard](https://app.supabase.com)

---

**Last Updated:** 2026-01-19  
**Status:** Ready for Production
