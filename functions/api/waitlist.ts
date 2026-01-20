// @ts-nocheck - This is a Cloudflare Pages Function, not Next.js code
/**
 * Cloudflare Pages Function for handling waitlist submissions with Supabase
 * This will work with your static export when deployed to Cloudflare Pages
 * 
 * NOTE: This file is excluded from Next.js TypeScript compilation.
 * It's only used when deployed to Cloudflare Pages.
 */

export const onRequestPost = async (context) => {
  try {
    const { email, fullName, source } = await context.request.json();

    // Validate email
    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return new Response(
        JSON.stringify({ success: false, message: 'Invalid email address' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Get Supabase credentials from Cloudflare environment variables
    // Cloudflare Pages Functions can access env vars set in Cloudflare Dashboard
    // Use SUPABASE_URL and SUPABASE_ANON_KEY (or NEXT_PUBLIC_* variants)
    const supabaseUrl = context.env?.SUPABASE_URL || context.env?.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = context.env?.SUPABASE_ANON_KEY || context.env?.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY || context.env?.SUPABASE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: 'Supabase configuration missing. Please connect Supabase integration in Cloudflare Dashboard (Workers & Pages → Your Project → Settings → Integrations → Supabase) or set SUPABASE_URL and SUPABASE_KEY environment variables.' 
        }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Import and use Supabase
    const { createClient } = await import('@supabase/supabase-js');
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data, error } = await supabase.from('waitlist_signups').insert({
      email: normalizedEmail,
      full_name: fullName && fullName.trim().length > 0 ? fullName.trim().slice(0, 120) : null,
      source: source || 'website',
    });

    if (error) {
      // Duplicate email (unique constraint) -> treat as success
      if (error.code === '23505' || error.message?.includes('duplicate') || error.message?.includes('unique')) {
        return new Response(
          JSON.stringify({ success: true, message: "You're already on the list!" }),
          {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
          }
        );
      }

      // Permission/RLS error
      if (error.message?.includes('permission') || error.message?.includes('RLS') || error.message?.includes('row-level security')) {
        return new Response(
          JSON.stringify({ 
            success: false, 
            message: 'Database permission error. Please check Supabase RLS policies allow anonymous inserts.' 
          }),
          {
            status: 403,
            headers: { 'Content-Type': 'application/json' },
          }
        );
      }

      // Other Supabase errors
      console.error('Supabase insert error:', error);
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: `Database error: ${error.message || 'Could not add you right now. Please try again.'}` 
        }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Success
    return new Response(
      JSON.stringify({ success: true, message: "You're on the list!" }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Waitlist submission error:', error);
    return new Response(
      JSON.stringify({
        success: false,
        message: `Error: ${error.message || 'Failed to process submission. Please try again.'}`,
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};
