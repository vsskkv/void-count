# Waitlist Troubleshooting Guide

## 🔍 **Common Issues & Solutions**

### **Issue: "Something went wrong. Please try again."**

This error can occur for several reasons. Here's how to diagnose and fix:

---

## 1. ✅ **Check Environment Variables**

Your build/deployment needs these environment variables set:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=your-publishable-key
```

### **How to Check:**
1. **Local Development:**
   - Create `.env.local` file in project root
   - Add both variables above

2. **Cloudflare Pages:**
   - Go to Pages → Your Project → Settings → Environment Variables
   - Add both variables for Production environment

3. **Other Hosting:**
   - Check your hosting platform's environment variable settings
   - Make sure variables are set for **production** build

### **Test if variables are available:**
Open browser console on your site and run:
```javascript
console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
console.log('Supabase Key:', process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY ? 'Set' : 'Missing');
```

If they're `undefined`, the variables aren't being passed to the client.

---

## 2. 🔒 **Check Supabase Row Level Security (RLS)**

### **Problem:**
Supabase RLS policies might be blocking inserts from anonymous users.

### **Solution:**

1. **Go to Supabase Dashboard:**
   - Navigate to: Table Editor → `waitlist_signups` → Policies

2. **Check if you have an INSERT policy:**
   ```sql
   -- Should allow anonymous inserts
   CREATE POLICY "Allow public inserts"
   ON waitlist_signups
   FOR INSERT
   TO anon
   WITH CHECK (true);
   ```

3. **Or disable RLS temporarily for testing:**
   ```sql
   -- ONLY FOR TESTING - NOT RECOMMENDED FOR PRODUCTION
   ALTER TABLE waitlist_signups DISABLE ROW LEVEL SECURITY;
   ```

4. **Recommended Production Policy:**
   ```sql
   -- Allow anyone to insert
   CREATE POLICY "Enable insert for all users"
   ON waitlist_signups
   FOR INSERT
   TO public
   WITH CHECK (true);
   
   -- Only allow users to see their own email (optional)
   CREATE POLICY "Enable read for own email"
   ON waitlist_signups
   FOR SELECT
   TO public
   USING (true);
   ```

---

## 3. 📋 **Check Table Structure**

Verify your `waitlist_signups` table has these columns:

```sql
CREATE TABLE waitlist_signups (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT,
  source TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### **Key Points:**
- ✅ `email` should be `NOT NULL` and `UNIQUE`
- ✅ Columns should match what we're inserting:
  - `email` → `email`
  - `full_name` → `full_name`
  - `source` → `source`

---

## 4. 🌐 **Check CORS & Network**

### **Test in Browser Console:**

Open DevTools → Console → Network tab, then submit the form. Look for:

1. **CORS Error:**
   ```
   Access to fetch at '...' from origin '...' has been blocked by CORS policy
   ```
   **Fix:** Check Supabase Dashboard → Settings → API → CORS settings

2. **401/403 Error:**
   - Missing or incorrect API key
   - Check environment variables

3. **404 Error:**
   - Wrong Supabase URL
   - Check `NEXT_PUBLIC_SUPABASE_URL`

4. **500 Error:**
   - Server-side issue
   - Check Supabase Dashboard → Logs

---

## 5. 🧪 **Test Supabase Connection Manually**

Run this in your browser console on the deployed site:

```javascript
// Test Supabase connection
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

console.log('URL:', supabaseUrl);
console.log('Key present:', !!supabaseKey);

if (supabaseUrl && supabaseKey) {
  import('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm').then(({ createClient }) => {
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    // Test insert
    supabase.from('waitlist_signups').insert({
      email: 'test@example.com',
      source: 'test'
    }).then(({ data, error }) => {
      if (error) {
        console.error('Insert error:', error);
      } else {
        console.log('Success!', data);
      }
    });
  });
} else {
  console.error('Environment variables missing!');
}
```

---

## 6. 🔧 **Quick Fixes**

### **Option A: Use Google Sheets (Temporary)**

If Supabase isn't working, you can temporarily use the Google Sheets integration:

1. Update `WaitlistSection.tsx` to use the Google Script URL
2. Or use the Cloudflare Pages Function (if deployed there)

### **Option B: Check Error Logs**

1. **Browser Console:**
   - Open DevTools → Console
   - Look for red error messages when submitting

2. **Supabase Dashboard:**
   - Go to Logs → API Logs
   - Check for failed requests

3. **Cloudflare Pages:**
   - Check Functions logs in Cloudflare Dashboard

---

## 7. ✅ **Verification Checklist**

- [ ] Environment variables set in deployment platform
- [ ] Environment variables accessible in browser (check console)
- [ ] Supabase RLS policy allows INSERT for `anon` role
- [ ] Table `waitlist_signups` exists with correct columns
- [ ] Supabase URL is correct (no trailing slash)
- [ ] Supabase API key is the **anon/public** key (not service role)
- [ ] CORS is configured in Supabase
- [ ] Network tab shows request being made (not blocked)

---

## 📝 **Debug Steps**

1. **Check browser console for errors** when submitting
2. **Check Network tab** for failed requests
3. **Verify environment variables** are set correctly
4. **Test Supabase connection** manually in console
5. **Check Supabase logs** for server-side errors
6. **Verify RLS policies** allow anonymous inserts

---

## 🆘 **If Still Not Working**

1. **Check the exact error message** in browser console
2. **Share the error** - it will help diagnose the issue
3. **Verify Supabase project is active** (not paused)
4. **Check if you're hitting rate limits** (free tier has limits)

---

## 🔐 **Security Note**

- ✅ Using `NEXT_PUBLIC_` variables is safe for client-side use
- ✅ The publishable/anon key is safe to expose
- ⚠️ **NEVER** expose your service role key
- ✅ RLS policies protect your data

---

**Last Updated:** 2026-01-19  
**Version:** 1.2.1
