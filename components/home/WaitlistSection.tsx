"use client";

import React, { useState } from 'react';
import { PrimaryButton } from '@/components/ui/PrimaryButton';

export const WaitlistSection = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycby9CyMcfd44Vuop8bnM1sDm8omPLZ7yiQeI_Yuh7AvPU8r4gTGmQLRQ_Ze7hd8-f39Odw/exec';
      
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      setStatus('success');
      setEmail('');
    } catch (error) {
      console.error("Waitlist error:", error);
      setStatus('error');
    }
  };

  return (
    <section
      id="waitlist-form"
      className="content-section min-h-[70vh] flex flex-col items-center justify-center text-center py-20 pointer-events-auto px-4"
    >
      <div className="max-w-3xl w-full backdrop-blur-md bg-indigo-950/40 p-8 md:p-12 rounded-[2rem] md:rounded-[3rem] border border-indigo-500/40 shadow-[0_0_80px_rgba(79,70,229,0.3)] relative overflow-hidden hover:border-indigo-500/60 hover:shadow-[0_0_100px_rgba(79,70,229,0.4)] transition-all duration-500">
        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 via-transparent to-purple-500/10" />
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-50" />

        <div className="mb-8 px-2">
          <h2 className="text-4xl md:text-7xl font-black mb-6 text-white tracking-tighter uppercase italic leading-[0.8] scale-y-110">
            JOIN THE <br />
            <span className="text-indigo-400">KICKSTARTER.</span>
          </h2>
          <p className="text-lg md:text-3xl mb-8 text-slate-200 font-bold max-w-2xl mx-auto leading-tight italic">
            Be the first to know when the next print run drops. <br className="hidden md:block" />
            Join the list and be ready for the next round.
          </p>

          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 mb-10 text-left max-w-2xl mx-auto px-4">
            <li className="flex items-center gap-3 text-slate-200 font-bold italic tracking-tight text-sm">
              <span className="text-indigo-500 text-lg">✓</span>
              Early-bird launch day pricing
            </li>
            <li className="flex items-center gap-3 text-slate-200 font-bold italic tracking-tight text-sm">
              <span className="text-indigo-500 text-lg">✓</span>
              Vote on new expansion themes
            </li>
            <li className="flex items-center gap-3 text-slate-200 font-bold italic tracking-tight text-sm">
              <span className="text-indigo-500 text-lg">✓</span>
              Exclusive playtest invites
            </li>
            <li className="flex items-center gap-3 text-slate-200 font-bold italic tracking-tight text-sm">
              <span className="text-indigo-500 text-lg">✓</span>
              Printable mini-rule reference card
            </li>
          </ul>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 max-w-lg mx-auto w-full"
        >
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              required
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-6 py-4 rounded-xl bg-slate-900/80 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 transition-all text-lg"
            />
            <PrimaryButton
              type="submit"
              disabled={status === "loading" || status === "success"}
              className="whitespace-nowrap bg-indigo-600 hover:bg-indigo-500 text-white font-black text-lg px-8 py-4 rounded-xl shadow-[0_10px_30px_rgba(79,70,229,0.3)] uppercase italic"
            >
              {status === "loading"
                ? "Unlocking..."
                : status === "success"
                ? "Success!"
                : "Join the Waiting List"}
            </PrimaryButton>
          </div>
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest text-center mt-2">
            No spam. Unsubscribe anytime.
          </p>
          {status === "success" && (
            <p className="text-emerald-400 text-sm animate-fade-in font-bold">
              Welcome to the waiting list. You're on the list.
            </p>
          )}
          {status === "error" && (
            <p className="text-rose-400 text-sm font-bold">
              Something went wrong. Please try again.
            </p>
          )}
        </form>
      </div>
    </section>
  );
};
