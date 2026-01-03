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
      <div className="max-w-3xl w-full backdrop-blur-md bg-indigo-950/30 p-8 md:p-12 rounded-[2rem] md:rounded-[3rem] border border-indigo-500/30 shadow-[0_0_80px_rgba(79,70,229,0.2)] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-50" />

        <div className="mb-8 px-2">
          <h2 className="text-4xl md:text-7xl font-black mb-6 text-white tracking-tighter uppercase italic leading-[0.8] scale-y-110">
            JOIN THE <br />
            <span className="text-indigo-400">INNER CIRCLE.</span>
          </h2>
          <p className="text-lg md:text-3xl mb-8 text-slate-200 font-bold max-w-2xl mx-auto leading-tight italic">
            Be the first to know when the next print run drops. <br className="hidden md:block" />
            Join the list... before someone sabotages you.
          </p>

          <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10 text-left max-w-2xl mx-auto px-4">
            <li className="flex items-center gap-2 text-slate-200 font-black uppercase italic tracking-tighter text-xs">
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
              New expansions
            </li>
            <li className="flex items-center gap-2 text-slate-200 font-black uppercase italic tracking-tighter text-xs">
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
              Secret playtests
            </li>
            <li className="flex items-center gap-2 text-slate-200 font-black uppercase italic tracking-tighter text-xs">
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
              Launch surprises
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
              className="whitespace-nowrap bg-indigo-600 hover:bg-indigo-500 text-white font-black text-lg px-8 py-4 rounded-xl shadow-[0_10px_30px_rgba(79,70,229,0.3)]"
            >
              {status === "loading"
                ? "Unlocking..."
                : status === "success"
                ? "Success!"
                : "Unlock Early Access"}
            </PrimaryButton>
          </div>
          {status === "success" && (
            <p className="text-emerald-400 text-sm animate-fade-in font-bold">
              Welcome to the Inner Circle. You're on the list.
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




