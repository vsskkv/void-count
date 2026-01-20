# Cloudflare Pages Function Setup for Waitlist

## ✅ **Solution: Use Cloudflare Pages Functions**

Since Cloudflare Pages doesn't allow environment variables for static-only deployments, we're using a **Cloudflare Pages Function** that can access environment variables.

---

## 🔧 **How It Works**

1. **Form submits to** `/api/waitlist`
2. **Cloudflare Pages Function** (in `functions/api/waitlist.ts`) handles the request
3. **Function can access environment variables** (unlike static assets)
4. **Function saves to Supabase** (or falls back to Google Sheets)

---

## 📝 **Setup Instructions**

### **Step 1: Set Environment Variables in Cloudflare Pages Function**

1. Go to **Cloudflare Dashboard** → **Pages** → Your Project
2. Click **Settings** → **Functions**
3. Scroll to **Environment Variables** section
4. Add these variables:

**Variable 1:**
- **Name:** `NEXT_PUBLIC_SUPABASE_URL`
- **Value:** Your Supabase Project URL
- **Environment:** Production

**Variable 2:**
- **Name:** `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY`
- **Value:** Your Supabase anon/public key
- **Environment:** Production

**OR use shorter names:**
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`

The function will check both naming conventions.

---

### **Step 2: Deploy Your Function**

The function is already in your repo at `functions/api/waitlist.ts`.

**Important:** Make sure your Cloudflare Pages deployment includes the `functions/` directory.

1. **Check your build settings:**
   - Build command: `npm run build`
   - Build output directory: `out`
   - Root directory: `/` (or your repo root)

2. **Verify function is deployed:**
   - After deployment, check Cloudflare Pages → Functions tab
   - You should see `/api/waitlist` listed

---

### **Step 3: Test**

1. Deploy your site
2. Go to your site
3. Submit the waitlist form
4. Check browser console for any errors

---

## 🔄 **How It Works**

### **Priority Order:**

1. **First:** Tries Supabase (if env vars are set)
2. **Fallback:** Uses Google Sheets (always works)

This means:
- ✅ If Supabase is configured → Uses Supabase
- ✅ If Supabase not configured → Uses Google Sheets
- ✅ Always works, even without Supabase setup

---

## 🧪 **Testing Locally**

Cloudflare Pages Functions can be tested locally with Wrangler:

```bash
# Install Wrangler CLI
npm install -g wrangler

# Test the function locally
wrangler pages dev out --functions functions
```

---

## 📋 **Function Features**

- ✅ Email validation
- ✅ Handles duplicate emails gracefully
- ✅ Saves full name (optional)
- ✅ Saves source (website, etc.)
- ✅ Error handling
- ✅ Fallback to Google Sheets

---

## 🔍 **Troubleshooting**

### **Function not found (404)**

- Check that `functions/api/waitlist.ts` exists
- Verify Cloudflare Pages detected the function
- Check Functions tab in Cloudflare Dashboard

### **Still getting errors**

1. **Check function logs:**
   - Cloudflare Dashboard → Pages → Your Project
   - Click on a deployment
   - Check Functions logs

2. **Test function directly:**
   ```bash
   curl -X POST https://your-site.pages.dev/api/waitlist \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com"}'
   ```

3. **Check environment variables:**
   - Settings → Functions → Environment Variables
   - Make sure they're set for Production

---

## ✅ **Advantages of This Approach**

- ✅ Works with static exports
- ✅ Can access environment variables
- ✅ Server-side processing (more secure)
- ✅ Automatic fallback to Google Sheets
- ✅ No client-side API keys needed

---

**Last Updated:** 2026-01-19
