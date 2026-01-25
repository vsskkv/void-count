"use client";

import React, { useState } from 'react';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { WAITLIST_FORM_ID } from '@/lib/constants';

export const WaitlistSection = () => {
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [source, setSource] = useState('website');
  const [hp, setHp] = useState(''); // honeypot
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  function normalizeEmail(email: string): string {
    return email.trim().toLowerCase();
  }

  function isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    try {
      // Bot trap: if honeypot is filled, pretend success
      if (hp && hp.trim().length > 0) {
        setMessage("You're on the list!");
        setEmail('');
        setFullName('');
        setIsSubmitting(false);
        return;
      }

      const normalizedEmail = normalizeEmail(email);

      // Validate email
      if (!normalizedEmail || !isValidEmail(normalizedEmail)) {
        setMessage("Please enter a valid email address.");
        setIsSubmitting(false);
        return;
      }

      // Use Supabase directly from browser (works with static exports)
      // Requires NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY set at build time
      try {
        // Check if Supabase environment variables are available
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        // Support both naming conventions
        const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY || 
                                process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

        if (!supabaseUrl || !supabaseAnonKey) {
          console.error('Missing Supabase env vars:', {
            url: !!supabaseUrl,
            key: !!supabaseAnonKey,
            publishableKey: !!process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY,
            anonKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
          });
          setMessage("Configuration error. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY in Cloudflare Pages environment variables and rebuild.");
          setIsSubmitting(false);
          return;
        }

        // Import and use Supabase client
        const { createClient } = await import('@supabase/supabase-js');
        const supabase = createClient(supabaseUrl, supabaseAnonKey);

        // Insert into waitlist_signups table
        const { error } = await supabase
          .from('waitlist_signups')
          .insert({
            email: normalizedEmail,
            full_name: fullName && fullName.trim().length > 0 ? fullName.trim().slice(0, 120) : null,
            source: source || 'website',
          });

        if (error) {
          console.error('Supabase error:', {
            code: error.code,
            message: error.message,
            details: error.details,
          });

          // Duplicate email (unique constraint)
          if (error.code === '23505' || error.message?.includes('duplicate') || error.message?.includes('unique')) {
            setMessage("You're already on the list!");
            setEmail('');
            setFullName('');
          } 
          // RLS/permission error
          else if (error.code === '42501' || error.message?.includes('permission') || error.message?.includes('RLS') || error.message?.includes('row-level security')) {
            setMessage("Permission denied. Please check Supabase RLS policies allow anonymous inserts.");
          } 
          // Other errors
          else {
            setMessage(`Error: ${error.message || 'Could not add you right now. Please try again.'}`);
          }
        } else {
          // Success
          setMessage("You're on the list!");
          setEmail('');
          setFullName('');
        }
      } catch (error: any) {
        console.error('Waitlist submission error:', error);
        if (error.message?.includes('Missing environment variable')) {
          setMessage("Configuration error. Please set environment variables and rebuild.");
        } else {
          setMessage(`Error: ${error.message || "Something went wrong. Please try again."}`);
        }
      }
    } catch (error: any) {
      console.error('Waitlist submission error:', error);
      // Provide more helpful error messages
      if (error?.message?.includes('Missing environment variable')) {
        setMessage("Configuration error. Please contact support.");
      } else if (error?.message?.includes('fetch')) {
        setMessage("Network error. Please check your connection and try again.");
      } else {
        setMessage(`Something went wrong: ${error?.message || "Please try again."}`);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id={WAITLIST_FORM_ID}
      className="content-section min-h-[60vh] sm:min-h-[70vh] flex flex-col items-center justify-center text-center py-12 sm:py-16 md:py-20 pointer-events-auto px-4 sm:px-6 bg-transparent"
      suppressHydrationWarning
    >
      <div className="max-w-3xl w-full backdrop-blur-md bg-indigo-950/40 p-6 sm:p-8 md:p-12 rounded-2xl sm:rounded-[2rem] md:rounded-[3rem] border border-slate-800 shadow-[0_0_80px_rgba(79,70,229,0.3)] relative overflow-hidden hover:border-slate-700 hover:shadow-[0_0_100px_rgba(79,70,229,0.4)] transition-all duration-500">
        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 via-transparent to-purple-500/10 pointer-events-none" />
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-50 pointer-events-none" />

        <div className="mb-6 sm:mb-8 px-2 relative z-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black mb-4 sm:mb-6 text-white tracking-tighter uppercase italic leading-[0.9] sm:leading-[0.85] md:leading-[0.8] md:scale-y-110">
            JOIN THE <br />
            <span className="text-indigo-400">KICKSTARTER.</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl mb-6 sm:mb-8 text-slate-200 font-bold max-w-2xl mx-auto leading-tight italic">
            Be the first to know when this <strong>new card game</strong> launches. <br className="hidden sm:block" />
            Join the waitlist for Void Count and be ready for the next round of this exciting <strong>strategic card game</strong>.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-3 sm:gap-4 max-w-lg mx-auto w-full relative z-10"
          aria-busy={isSubmitting}
        >
          {/* Honeypot - hidden from users */}
          <input
            type="text"
            value={hp}
            onChange={(e) => setHp(e.target.value)}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="absolute left-[-9999px]"
          />
          
          {/* Optional full name field */}
          <input
            type="text"
            placeholder="Name (optional)"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            autoComplete="name"
            maxLength={120}
            name="fullName"
            className="w-full px-4 sm:px-6 py-3 sm:py-4 rounded-lg sm:rounded-xl bg-slate-900/80 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 transition-all text-base sm:text-lg"
          />
          
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <input
              type="email"
              required
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            name="email"
              className="flex-1 px-4 sm:px-6 py-3 sm:py-4 rounded-lg sm:rounded-xl bg-slate-900/80 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 transition-all text-base sm:text-lg"
            />
            <PrimaryButton
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto whitespace-nowrap bg-indigo-600 hover:bg-indigo-500 text-white font-black text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl shadow-[0_10px_30px_rgba(79,70,229,0.3)] uppercase italic disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Joining..." : "Join the Waiting List"}
            </PrimaryButton>
          </div>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest text-center mt-2">
            No spam. Unsubscribe anytime.
          </p>
          <div role="status" aria-live="polite">
            {message && (
              <p className={`text-sm font-bold ${
                message.includes("You're on the list") || message.includes("list")
                  ? "text-emerald-400"
                  : "text-rose-400"
              }`}>
                {message}
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
};
