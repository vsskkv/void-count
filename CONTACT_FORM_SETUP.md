# Contact Form Setup

## Overview
A functional contact form has been added to the `/contact` page that allows businesses and individuals to reach out for collaborations, partnerships, or general inquiries.

## Features
- ✅ Beautiful, modern form design matching your existing UI
- ✅ Client-side validation
- ✅ Honeypot spam protection
- ✅ Success/error states with user feedback
- ✅ Mobile responsive
- ✅ Stores submissions in Supabase
- ✅ Rate limiting ready (via Supabase RLS)

## Files Created/Modified

### New Files
1. **`components/contact/ContactForm.tsx`** - Contact form component with validation and submission handling
2. **`app/api/contact/route.ts`** - API endpoint for processing contact form submissions

### Modified Files
1. **`app/contact/page.tsx`** - Updated to include the contact form

## Database Setup Required

You need to create a table in Supabase to store contact form submissions. Run this SQL in your Supabase SQL Editor:

```sql
-- Create contact_submissions table
CREATE TABLE contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(255) NOT NULL,
  subject VARCHAR(200) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  read BOOLEAN DEFAULT false,
  replied BOOLEAN DEFAULT false
);

-- Add index for faster queries
CREATE INDEX idx_contact_submissions_created_at ON contact_submissions(created_at DESC);
CREATE INDEX idx_contact_submissions_read ON contact_submissions(read) WHERE read = false;

-- Enable Row Level Security
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (users can submit the form)
CREATE POLICY "Allow anonymous inserts" ON contact_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Only authenticated admins can read submissions
-- You'll need to set up authentication and modify this policy based on your admin setup
CREATE POLICY "Allow authenticated reads" ON contact_submissions
  FOR SELECT
  TO authenticated
  USING (true);

-- Optional: Add rate limiting with function
CREATE OR REPLACE FUNCTION check_submission_rate_limit(email_address TEXT)
RETURNS BOOLEAN AS $$
DECLARE
  recent_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO recent_count
  FROM contact_submissions
  WHERE email = email_address
    AND created_at > NOW() - INTERVAL '1 hour';
  
  RETURN recent_count < 3; -- Max 3 submissions per hour per email
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Add check constraint for rate limiting
ALTER TABLE contact_submissions
ADD CONSTRAINT check_rate_limit
CHECK (check_submission_rate_limit(email));
```

## Form Fields

The contact form includes:
- **Name** (required, max 120 chars)
- **Email** (required, validated, max 255 chars)
- **Subject** (required, max 200 chars)
- **Message** (required, max 5000 chars)
- **Honeypot** (hidden field for spam protection)

## Spam Protection

1. **Honeypot field** - Hidden field that bots typically fill out
2. **Rate limiting** - SQL function limits submissions to 3 per hour per email
3. **Input validation** - Server-side validation of all fields
4. **Field length limits** - Prevents excessive data storage

## Viewing Submissions

To view contact form submissions, you can:

### Option 1: Supabase Dashboard
1. Go to your Supabase project
2. Navigate to Table Editor
3. Select `contact_submissions` table
4. View all submissions

### Option 2: Create an Admin Panel (Future Enhancement)
You could create an admin dashboard at `/admin/contact` to view and manage submissions.

## Email Notifications (Optional Enhancement)

To get email notifications when someone submits the form, you can:

1. **Use Supabase Edge Functions with Resend/SendGrid:**
```typescript
// Create a database trigger that calls an edge function
// The edge function sends an email notification
```

2. **Use Supabase Webhooks:**
   - Set up a webhook in Supabase that triggers on new inserts
   - Point it to a service like Zapier or Make.com
   - Configure email notifications

3. **Use Supabase Triggers + pg_notify:**
   - Set up a PostgreSQL trigger
   - Use a background service to listen for notifications

## Testing

1. Visit `/contact` on your site
2. Fill out the form with valid information
3. Submit and verify:
   - Success message appears
   - Form resets
   - Submission appears in Supabase `contact_submissions` table

## Error Handling

The form handles:
- Network errors
- Invalid email formats
- Missing required fields
- Server errors
- Spam attempts (via honeypot)

## Next Steps

1. ✅ Run the SQL setup in Supabase
2. ✅ Test the form
3. Optional: Set up email notifications
4. Optional: Create admin panel to manage submissions
5. Optional: Add file upload capability for press/media inquiries

## Support

If you have any issues:
1. Check browser console for errors
2. Verify Supabase environment variables are set
3. Ensure the table exists in Supabase
4. Check Supabase logs for API errors
