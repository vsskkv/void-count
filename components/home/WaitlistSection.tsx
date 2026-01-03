"use client";

import React, { useState } from 'react';
import { PrimaryButton } from '@/components/ui/PrimaryButton';

export const WaitlistSection = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    // Placeholder for future Google Drive / Sheets integration
    // For now, simulate a network request
    setTimeout(() => {
      console.log("Waitlist email submitted:", email);
      setStatus('success');
      setEmail('');
    }, 1000);
  };

  return (
    <section className="content-section min-h-[60vh] flex flex-col items-center justify-center text-center py-20 pointer-events-auto">
      <div className="max-w-2xl w-full backdrop-blur-md bg-indigo-950/30 p-10 rounded-[3rem] border border-indigo-500/30 shadow-[0_0_50px_rgba(79,70,229,0.15)] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-50" />
        
        <h2 className="text-4xl md:text-5xl font-black mb-4 text-white tracking-tighter uppercase italic">
          Enter the <span className="text-indigo-400">Inner Circle.</span>
        </h2>
        <p className="text-xl mb-10 text-slate-200 font-medium">
          Get exclusive card drops, secret expansions, and early playtest invites before the Void claims them.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md mx-auto w-full">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              required
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-3 rounded-lg bg-slate-900/80 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
            />
            <PrimaryButton type="submit" disabled={status === 'loading' || status === 'success'} className="whitespace-nowrap">
              {status === 'loading' ? 'Joining...' : status === 'success' ? 'Joined!' : 'Join Now'}
            </PrimaryButton>
          </div>
          {status === 'success' && (
            <p className="text-emerald-400 text-sm animate-fade-in">
              Thanks for joining! You're on the list.
            </p>
          )}
          {status === 'error' && (
            <p className="text-rose-400 text-sm">
              Something went wrong. Please try again.
            </p>
          )}
        </form>
      </div>
    </section>
  );
};




