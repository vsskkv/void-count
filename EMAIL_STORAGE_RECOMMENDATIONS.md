# Email Storage Recommendations for Void Count Waitlist

## Current Implementation
You're currently using a Google Apps Script to collect emails, which is stored in a Google Sheet. This works but has limitations.

## Recommended Solutions (Ranked by Ease & Features)

### 1. **Google Sheets + Google Apps Script** ✅ (Current - Quick Setup)
**Pros:**
- Free
- Easy to set up
- No backend needed
- Can export data easily
- Works with static sites

**Cons:**
- Limited automation
- No email verification
- Manual export for email marketing
- Rate limits (100 submissions per 100 seconds)

**Setup:**
1. Create a Google Sheet
2. Create a Google Apps Script with this code:
```javascript
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = JSON.parse(e.postData.contents);
  
  // Add email and timestamp
  sheet.appendRow([
    new Date(),
    data.email,
    data.source || 'website'
  ]);
  
  return ContentService.createTextOutput(JSON.stringify({success: true}))
    .setMimeType(ContentService.MimeType.JSON);
}
```
3. Deploy as web app with "Execute as me" and "Anyone can access"
4. Update `GOOGLE_SCRIPT_URL` in `lib/constants.ts`

---

### 2. **Resend + Cloudflare Workers** ⭐ (Recommended - Best Balance)
**Pros:**
- Professional email handling
- Automatic email verification
- Integrates with email marketing tools
- Affordable ($20/month for 50k emails)
- Great developer experience
- Can trigger welcome emails automatically

**Setup:**
```bash
npm install resend
```

Create a Cloudflare Worker:
```typescript
// functions/api/waitlist.ts
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const onRequestPost = async (context) => {
  const { email } = await context.request.json();
  
  // Save to Resend contacts (or your database)
  await resend.contacts.create({
    email,
    unsubscribed: false,
  });
  
  // Send welcome email
  await resend.emails.send({
    from: 'Void Count <hello@voidcount.com>',
    to: email,
    subject: 'Welcome to the Void Count Waitlist!',
    html: '<h1>Thanks for joining!</h1><p>We'll notify you when we launch.</p>',
  });
  
  return new Response(JSON.stringify({ success: true }), {
    headers: { 'Content-Type': 'application/json' },
  });
};
```

**Cost:** $20/month (50k emails) + Free tier available

---

### 3. **Supabase** 🔥 (Most Flexible)
**Pros:**
- Free tier (up to 50k emails/month)
- Built-in database
- Automatic email verification
- Can build full admin panel
- Real-time subscriptions
- Row Level Security

**Setup:**
```bash
npm install @supabase/supabase-js
```

```typescript
// functions/api/waitlist.ts
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

export const onRequestPost = async (context) => {
  const { email } = await context.request.json();
  
  // Insert into waitlist table
  const { error } = await supabase
    .from('waitlist')
    .insert([{ 
      email, 
      created_at: new Date().toISOString(),
      source: 'website'
    }]);
  
  if (error) throw error;
  
  return new Response(JSON.stringify({ success: true }));
};
```

**Cost:** Free tier (50k emails) then $25/month

---

### 4. **ConvertKit / Mailchimp / EmailOctopus** 📧 (Email Marketing Focused)
**Pros:**
- Built for email marketing
- Beautiful signup forms
- Automation workflows
- Segmenting subscribers
- Analytics

**Cons:**
- More expensive
- Less flexible for custom logic

**Setup Example (ConvertKit):**
```typescript
// functions/api/waitlist.ts
export const onRequestPost = async (context) => {
  const { email } = await context.request.json();
  
  const response = await fetch(
    `https://api.convertkit.com/v3/forms/${FORM_ID}/subscribe`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        api_key: process.env.CONVERTKIT_API_KEY,
        email,
      }),
    }
  );
  
  return new Response(JSON.stringify({ success: response.ok }));
};
```

**Cost:** 
- ConvertKit: Free (up to 1k subscribers) then $29/month
- Mailchimp: Free (up to 500 contacts) then $15/month
- EmailOctopus: Free (up to 2.5k subscribers) then $20/month

---

### 5. **Notion Database** 📝 (Manual but Visual)
**Pros:**
- Free
- Beautiful interface
- Easy to view/manage
- Can add custom properties
- No coding needed for viewing

**Cons:**
- No automatic emails
- Rate limited
- Not ideal for large lists

**Setup:**
Use Notion API or a service like [notionforms.io](https://notionforms.io)

---

### 6. **Airtable** 📊 (Spreadsheet + Database)
**Pros:**
- Visual like Google Sheets but more powerful
- Free tier (1,200 records/base)
- API access
- Can trigger automations

**Setup:**
Use Airtable API with Cloudflare Worker

**Cost:** Free (1,200 records) then $20/month

---

## My Recommendation for Void Count

**Start with:** **Resend** (Option 2)
- Professional appearance
- Automatic welcome emails
- Easy to scale
- Good free tier
- Integrates well with Cloudflare Workers

**Upgrade to:** **ConvertKit** (Option 4) when you need:
- Marketing automation
- Email sequences
- Advanced segmentation
- Launch campaigns

## Implementation Notes

Since you're using static export (`output: 'export'`), you'll need to:

1. **Option A:** Use Cloudflare Pages Functions (recommended)
   - Create functions in `/functions` directory
   - Deploy to Cloudflare Pages
   - Functions run as serverless functions

2. **Option B:** Remove static export
   - Remove `output: 'export'` from `next.config.ts`
   - Use Next.js API routes in `/app/api`
   - Deploy to Vercel/Netlify/Cloudflare Pages with Node.js support

3. **Option C:** Use external service
   - Keep static export
   - Use third-party service API directly from client
   - Less secure but simpler

---

## Quick Setup Guide (Resend + Cloudflare)

1. Sign up at [resend.com](https://resend.com)
2. Get API key
3. Add to Cloudflare environment variables
4. Update `functions/api/waitlist.ts` (already created)
5. Deploy to Cloudflare Pages

The waitlist form is already set up to work with any of these solutions!
