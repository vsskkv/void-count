import { createClient } from "@supabase/supabase-js";

/**
 * Creates a Supabase client for browser use
 * Uses NEXT_PUBLIC_* environment variables (baked into the build)
 * 
 * For Next.js static exports, these must be set at BUILD TIME
 * For Cloudflare Pages, set them in Environment Variables (they'll be baked in)
 */
export const supabaseBrowserClient = () => {
  // Next.js requires NEXT_PUBLIC_ prefix for browser-accessible env vars
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 
                          process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Missing Supabase environment variables:', {
      url: supabaseUrl ? 'Set' : 'Missing',
      key: supabaseAnonKey ? 'Set' : 'Missing',
    });
    throw new Error(
      'Missing Supabase configuration. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your environment variables.'
    );
  }

  return createClient(supabaseUrl, supabaseAnonKey);
};
