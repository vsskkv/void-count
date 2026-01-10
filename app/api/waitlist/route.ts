import { NextRequest, NextResponse } from 'next/server';
import { GOOGLE_SCRIPT_URL } from '@/lib/constants';

/**
 * Waitlist API Route
 * 
 * This route handles email submissions for the waitlist.
 * It can be configured to use:
 * 1. Google Apps Script (current implementation)
 * 2. Email service providers (Mailchimp, ConvertKit, etc.)
 * 3. Database solutions (Supabase, Firebase, etc.)
 */

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    // Validate email with proper regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== 'string' || !emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Option 1: Google Apps Script (Current implementation)
    // Since this is server-side, we can use CORS mode for better error handling
    try {
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email, 
          timestamp: new Date().toISOString(),
          source: 'website'
        }),
      });

      // Check if response is ok (Google Apps Script may return HTML or text)
      if (response.ok) {
        return NextResponse.json({ 
          success: true, 
          message: 'Email added to waitlist successfully' 
        });
      } else {
        // Try to parse error response
        const errorText = await response.text();
        throw new Error(`Google Script returned: ${response.status} - ${errorText}`);
      }
    } catch (error) {
      console.error('Google Script error:', error);
      return NextResponse.json(
        { 
          success: false, 
          error: 'Failed to submit email. Please try again later.' 
        },
        { status: 500 }
      );
    }

    // Option 2: Add other storage methods here
    // See EMAIL_STORAGE_RECOMMENDATIONS.md for alternatives:
    // - Resend (recommended for professional emails)
    // - Supabase (database + email verification)
    // - ConvertKit/Mailchimp (email marketing)
    // - Cloudflare D1 (built-in database)
  } catch (error) {
    console.error('Waitlist API error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Handle preflight requests
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
