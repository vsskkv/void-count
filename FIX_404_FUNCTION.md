# Fix 404 Error - Function Not Deployed

## 🔴 **The Problem**

You're getting a **404 error** for `/api/waitlist`, which means the Cloudflare Pages Function isn't being deployed or detected.

---

## ✅ **Solution Steps**

### **Step 1: Verify Function File Structure**

Make sure your function is at:
```
functions/
  └── api/
      └── waitlist.ts
```

The file should export `onRequestPost` (which it does ✅).

---

### **Step 2: Check Cloudflare Pages Build Settings**

1. Go to **Cloudflare Dashboard** → **Pages** → Your Project
2. Click **Settings** → **Builds & deployments**
3. Verify:
   - **Build command:** `npm run build`
   - **Build output directory:** `out`
   - **Root directory:** `/` (or your repo root)

---

### **Step 3: Ensure Functions Directory is Included**

The `functions/` directory should be in your repository root and **NOT** in `.gitignore`.

Check `.gitignore` - make sure `functions/` is NOT ignored.

---

### **Step 4: Deploy and Verify**

1. **Push your code** to GitHub (if using Git)
2. **OR trigger a new deployment** in Cloudflare Pages
3. **Wait for build to complete**

---

### **Step 5: Check Function is Deployed**

After deployment:

1. Go to **Pages** → Your Project → **Deployments**
2. Click on your **latest deployment**
3. Look for **Functions** tab
4. You should see `/api/waitlist` listed

**If you don't see it:**
- The function file might not be in the right location
- Or Cloudflare isn't detecting it

---

### **Step 6: Test Function Directly**

After deployment, test with curl:

```bash
curl -X POST https://your-site.pages.dev/api/waitlist \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","fullName":"Test","source":"website"}'
```

**Expected:**
- If function is deployed: JSON response
- If not deployed: 404 error

---

## 🔧 **Alternative: Use Direct Supabase Client (Temporary Fix)**

If Functions still don't work, we can use Supabase directly from the browser as a temporary solution. But this requires `NEXT_PUBLIC_*` environment variables to be set at build time.

---

## 🐛 **Common Issues**

### **Function file not in repo**

- ✅ Make sure `functions/api/waitlist.ts` is committed to Git
- ✅ Check it's not in `.gitignore`

### **Build output doesn't include functions**

- ✅ Cloudflare should auto-detect `functions/` directory
- ✅ Make sure it's in the repo root, not in `out/` or `.next/`

### **Function detected but returns 404**

- ✅ Check function logs in Cloudflare Dashboard
- ✅ Verify the function exports `onRequestPost` correctly
- ✅ Make sure environment variables are set

---

## 📝 **Quick Checklist**

- [ ] `functions/api/waitlist.ts` exists in repo root
- [ ] Function exports `onRequestPost`
- [ ] `functions/` directory is NOT in `.gitignore`
- [ ] Code is pushed to GitHub (if using Git)
- [ ] Cloudflare Pages deployment completed
- [ ] Function appears in Deployments → Functions tab
- [ ] Environment variables set (`SUPABASE_URL`, `SUPABASE_ANON_KEY`)

---

## 🆘 **If Still Not Working**

1. **Check build logs** in Cloudflare Pages
2. **Check function logs** (if function appears but errors)
3. **Try manual deployment** using Wrangler CLI:

```bash
npm install -g wrangler
wrangler pages deploy out --project-name=your-project-name
```

4. **Contact Cloudflare support** if function still doesn't appear

---

**Last Updated:** 2026-01-19
