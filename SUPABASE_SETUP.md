# Supabase Setup Guide

## Environment Variables

Create a `.env.local` file in the project root with:

```env
NEXT_PUBLIC_SUPABASE_URL=https://bqzwiiaopsmwcdpzuztv.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

**Note:** The code uses `NEXT_PUBLIC_SUPABASE_ANON_KEY`, but if you have `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY`, you can either:
1. Use the anon key from your Supabase dashboard (recommended)
2. Or update `lib/supabaseClient.ts` and `app/api/waitlist/route.ts` to use `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY`

To find your anon key:
1. Go to your Supabase project dashboard
2. Navigate to Settings → API
3. Copy the "anon" or "public" key

## Database Table Setup

Create the `waitlist_signups` table in your Supabase database:

### Option 1: Using Supabase Dashboard

1. Go to Table Editor in your Supabase dashboard
2. Click "New Table"
3. Name it `waitlist_signups`
4. Add these columns:

| Column Name | Type | Default | Nullable | Unique |
|------------|------|---------|----------|--------|
| id | uuid | `gen_random_uuid()` | No | Primary Key |
| email | text | - | No | Yes |
| full_name | text | - | Yes | No |
| source | text | `'website'` | Yes | No |
| created_at | timestamptz | `now()` | No | No |

### Option 2: Using SQL Editor

Run this SQL in your Supabase SQL Editor:

```sql
-- Create the waitlist_signups table
CREATE TABLE IF NOT EXISTS waitlist_signups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  source TEXT DEFAULT 'website',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE waitlist_signups ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows public inserts (for waitlist signups)
CREATE POLICY "Allow public inserts" ON waitlist_signups
  FOR INSERT
  WITH CHECK (true);

-- Optional: Create an index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_waitlist_signups_email ON waitlist_signups(email);

-- Optional: Create an index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_waitlist_signups_created_at ON waitlist_signups(created_at DESC);
```

## Testing

After setup, test the waitlist form:

### Happy Path
1. Submit a valid email → expect success message "You're on the list."
2. Check Supabase table has a new row

### Duplicate Email
1. Submit the same email again → expect success message (doesn't reveal duplicate)
2. Table still has only one entry for that email

### Validation
1. Submit invalid email (e.g., "abc") → expect error "Please enter a valid email address."

### Bot Trap (Honeypot)
1. The form includes a hidden honeypot field
2. If a bot fills it, the submission is accepted but no row is inserted

## Features

✅ **Email normalization** - Converts emails to lowercase and trims whitespace
✅ **Duplicate handling** - Doesn't reveal if email already exists
✅ **Honeypot protection** - Stops basic bots
✅ **Validation** - Validates email format and length-limits strings
✅ **Server-side validation** - All validation happens on the server
✅ **Row Level Security** - Uses Supabase RLS for security

## API Response Format

The API returns:

```json
{
  "ok": true,
  "message": "You're on the list."
}
```

Or on error:

```json
{
  "ok": false,
  "message": "Please enter a valid email address."
}
```

## Troubleshooting

### "Missing environment variable" error
- Make sure `.env.local` exists in the project root
- Restart your Next.js dev server after creating/modifying `.env.local`
- Check that variable names match exactly (case-sensitive)

### "relation does not exist" error
- Make sure the `waitlist_signups` table exists in your Supabase database
- Check the table name matches exactly (case-sensitive in PostgreSQL)

### Permission errors
- Make sure Row Level Security policy allows INSERT operations
- Check that you're using the anon key (not the service role key)
