# Fix 404 Error - Cloudflare Pages Function Not Found

## 🔴 **The Problem**

You're getting a **404 error** for `/api/waitlist`. This means Cloudflare Pages isn't detecting or deploying your function.

**Error in console:**
```
Failed to load resource: the server responded with a status of 404 () /api/waitlist:1
```

---

## ✅ **Quick Fix: Verify Function Deployment**

### **Step 1: Check Function is in Your Repo**

Make sure `functions/api/waitlist.ts` is:
- ✅ In your repository root
- ✅ Committed to Git
- ✅ NOT in `.gitignore`

### **Step 2: Check Cloudflare Pages Detected It**

1. Go to **Cloudflare Dashboard** → **Pages** → Your Project
2. Click **Deployments** → Click your **latest deployment**
3. Look for **Functions** tab
4. You should see `/api/waitlist` listed

**If you DON'T see it:**
- The function isn't being detected
- See troubleshooting below

---

## 🔧 **Solution: Manual Verification**

### **Option A: Verify Function File Structure**

Your function should be at:
```
your-repo/
├── functions/
│   └── api/
│       └── waitlist.ts  ← This file
├── app/
├── components/
└── ...
```

### **Option B: Check Build Output**

1. After build, check if `functions/` directory is in your build output
2. Cloudflare should automatically detect it

### **Option C: Use Wrangler to Test Locally**

```bash
# Install Wrangler
npm install -g wrangler

# Test locally
wrangler pages dev out --functions functions
```

Then test: `curl -X POST http://localhost:8788/api/waitlist -d '{"email":"test@example.com"}'`

---

## 🚨 **If Function Still Not Working**

### **Temporary Workaround: Use Supabase Directly from Browser**

Since Functions aren't working, we can use Supabase directly from the browser. This requires:

1. Set `NEXT_PUBLIC_SUPABASE_URL` in Cloudflare Pages
2. Set `NEXT_PUBLIC_SUPABASE_ANON_KEY` in Cloudflare Pages
3. Rebuild your site

Then the form will call Supabase directly (no function needed).

**Should I set this up for you?**

---

## 📋 **Checklist to Fix 404**

- [ ] `functions/api/waitlist.ts` exists in repo root
- [ ] Function is committed to Git
- [ ] `functions/` is NOT in `.gitignore`
- [ ] Code is pushed to GitHub (if using Git)
- [ ] Cloudflare Pages deployment completed
- [ ] Check Deployments → Functions tab for `/api/waitlist`
- [ ] Environment variables set (`SUPABASE_URL`, `SUPABASE_ANON_KEY`)

---

## 🔍 **Debug Steps**

1. **Check build logs:**
   - Cloudflare Pages → Deployments → Latest → Build logs
   - Look for any errors about functions

2. **Check if function file is being uploaded:**
   - The `functions/` directory should be in your repo
   - Cloudflare should detect it automatically

3. **Test after deployment:**
   ```bash
   curl -X POST https://your-site.pages.dev/api/waitlist \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com"}'
   ```

---

**The function code is correct - the issue is deployment/detection.**
