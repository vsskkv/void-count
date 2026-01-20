# Setting Environment Variables in Cloudflare Pages

## 🔴 **The Problem**

You're seeing "Configuration error" because the environment variables aren't set in your Cloudflare Pages deployment.

With Next.js static exports, `NEXT_PUBLIC_*` environment variables **must be set in Cloudflare Pages** for them to be available in your built site.

---

## ✅ **Solution: Add Environment Variables**

### **Step 1: Get Your Supabase Credentials**

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Go to **Settings** → **API**
4. Copy these two values:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon public** key (under "Project API keys")

### **Step 2: Add to Cloudflare Pages**

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Navigate to **Pages** → Your Project
3. Click **Settings** → **Environment variables**
4. Click **Add variable** for **Production** environment

Add these two variables:

**Variable 1:**
- **Name:** `NEXT_PUBLIC_SUPABASE_URL`
- **Value:** Your Supabase Project URL (e.g., `https://xxxxx.supabase.co`)
- **Environment:** Production (and Preview if you want)

**Variable 2:**
- **Name:** `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY`
- **Value:** Your Supabase anon/public key
- **Environment:** Production (and Preview if you want)

### **Step 3: Rebuild Your Site**

After adding the variables:

1. Go to **Pages** → Your Project → **Deployments**
2. Click **Retry deployment** on your latest build
   - OR trigger a new deployment by pushing to your git repo
3. Wait for the build to complete

---

## 🧪 **Verify It's Working**

After rebuild, test the form:

1. Open your site
2. Open DevTools (F12) → Console
3. Type: `console.log(process.env.NEXT_PUBLIC_SUPABASE_URL)`
4. You should see your Supabase URL printed (not `undefined`)

If you see `undefined`, the variables aren't set correctly.

---

## ⚠️ **Important Notes**

### **For Static Exports:**
- Environment variables must be set **during the build**
- They're baked into the JavaScript bundle at build time
- If you change them, you need to **rebuild** the site

### **Security:**
- ✅ `NEXT_PUBLIC_*` variables are safe to expose (they're in the client bundle)
- ✅ The anon/public key is safe to expose
- ⚠️ Never expose your service role key!

---

## 🔍 **Troubleshooting**

### **Still seeing "Configuration error"?**

1. **Check variables are set:**
   - Cloudflare Pages → Settings → Environment Variables
   - Make sure they're set for **Production** environment

2. **Verify variable names:**
   - Must be exactly: `NEXT_PUBLIC_SUPABASE_URL`
   - Must be exactly: `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY`
   - Case-sensitive!

3. **Check build logs:**
   - Go to Cloudflare Pages → Deployments
   - Click on the latest deployment
   - Check if there are any errors about missing variables

4. **Trigger a new build:**
   - After adding variables, you MUST rebuild
   - Just saving variables isn't enough - the build needs to run again

---

## 📝 **Quick Checklist**

- [ ] Got Supabase URL from Supabase Dashboard
- [ ] Got anon/public key from Supabase Dashboard
- [ ] Added `NEXT_PUBLIC_SUPABASE_URL` to Cloudflare Pages
- [ ] Added `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY` to Cloudflare Pages
- [ ] Variables are set for Production environment
- [ ] Triggered a new build/deployment
- [ ] Tested the form after rebuild

---

## 🆘 **If Still Not Working**

1. Check browser console for the exact error
2. Verify Supabase project is active (not paused)
3. Check Supabase RLS policies allow anonymous inserts
4. Test Supabase connection manually in browser console

See `WAITLIST_TROUBLESHOOTING.md` for more details.

---

**Last Updated:** 2026-01-19
