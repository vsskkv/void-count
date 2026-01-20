// @ts-nocheck - This is a Cloudflare Pages Function, not Next.js code
/**
 * Cloudflare Pages Function for handling waitlist submissions with Supabase
 * 
 * Environment variables needed in Cloudflare Pages:
 * - SUPABASE_URL
 * - SUPABASE_ANON_KEY
 */

export const onRequestPost = async (context) => {
  // Enable CORS
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  // Handle preflight
  if (context.request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await context.request.json();
    const { email, fullName, source } = body;

    // Validate email
    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return new Response(
        JSON.stringify({ success: false, message: 'Invalid email address' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Get Supabase credentials from Cloudflare environment variables
    const supabaseUrl = context.env.SUPABASE_URL;
    const supabaseKey = context.env.SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.error('Missing Supabase env vars:', {
        url: !!supabaseUrl,
        key: !!supabaseKey,
        allEnvKeys: Object.keys(context.env || {}),
      });
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: 'Server configuration error. Please set SUPABASE_URL and SUPABASE_ANON_KEY in Cloudflare Pages environment variables.' 
        }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Import and use Supabase
    const { createClient } = await import('@supabase/supabase-js');
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Insert into waitlist_signups table
    // Table schema: id (uuid), email (text), full_name (text), source (text), created_at (timestamptz)
    const { data, error } = await supabase
      .from('waitlist_signups')
      .insert({
        email: normalizedEmail,
        full_name: fullName && fullName.trim().length > 0 ? fullName.trim().slice(0, 120) : null,
        source: source || 'website',
      })
      .select();

    if (error) {
      console.error('Supabase error:', {
        code: error.code,
        message: error.message,
        details: error.details,
        hint: error.hint,
      });

      // Duplicate email (unique constraint violation - code 23505)
      if (error.code === '23505' || error.message?.includes('duplicate') || error.message?.includes('unique')) {
        return new Response(
          JSON.stringify({ success: true, message: "You're already on the list!" }),
          {
            status: 200,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }

      // RLS/permission error (code 42501)
      if (error.code === '42501' || error.message?.includes('permission') || error.message?.includes('RLS') || error.message?.includes('row-level security')) {
        return new Response(
          JSON.stringify({ 
            success: false, 
            message: 'Permission denied. Please check Supabase RLS policies allow anonymous inserts on waitlist_signups table.' 
          }),
          {
            status: 403,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }

      // Other errors
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: `Error: ${error.message || 'Could not add you right now. Please try again.'}` 
        }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Success
    return new Response(
      JSON.stringify({ success: true, message: "You're on the list!" }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
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
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
};
