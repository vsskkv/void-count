/**
 * Cloudflare Pages Function for handling waitlist submissions
 * This will work with your static export when deployed to Cloudflare Pages
 */

export const onRequestPost: PagesFunction = async (context) => {
  try {
    const { email } = await context.request.json();

    // Validate email
    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return new Response(
        JSON.stringify({ success: false, error: 'Invalid email address' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Option 1: Send to Google Apps Script (recommended for quick setup)
    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycby9CyMcfd44Vuop8bnM1sDm8omPLZ7yiQeI_Yuh7AvPU8r4gTGmQLRQ_Ze7hd8-f39Odw/exec';
    
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, timestamp: new Date().toISOString() }),
    });

    if (!response.ok) {
      throw new Error('Failed to submit to Google Sheets');
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Email added to waitlist' }),
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
        error: 'Failed to process submission. Please try again.',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};
