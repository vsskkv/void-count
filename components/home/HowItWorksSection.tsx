"use client";

import React from "react";

export const HowItWorksSection = () => {
  return (
    <section className="relative z-20 py-24 md:py-32">
      {/* Background effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-950/10 to-transparent pointer-events-none" />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <h2 className="text-4xl md:text-6xl font-black mb-16 text-white tracking-tighter uppercase italic text-center leading-tight">
          HOW <span className="text-indigo-500 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent italic">VOID COUNT</span> WORKS
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-12">
          {/* Step 1 */}
          <div className="relative p-8 rounded-3xl bg-slate-900/70 border border-white/10 hover:border-indigo-500/40 hover:bg-slate-900/80 transition-all duration-300 group will-change-transform hover:shadow-[0_0_30px_rgba(79,70,229,0.2)]">
            <div className="absolute -top-6 left-8 w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-2xl font-black text-white shadow-[0_10px_30px_rgba(79,70,229,0.4)] group-hover:scale-110 group-hover:shadow-[0_15px_40px_rgba(79,70,229,0.6)] transition-all">
              1
            </div>
            <h3 className="text-2xl font-black text-white mb-4 uppercase italic tracking-tight pt-2 group-hover:text-indigo-300 transition-colors">
              Go Low
            </h3>
            <p className="text-slate-300 text-lg font-bold italic leading-tight">
              Keep your total as close to zero as possible. Every point you hold is a liability.
            </p>
          </div>

          {/* Step 2 */}
          <div className="relative p-8 rounded-3xl bg-slate-900/70 border border-white/10 hover:border-purple-500/40 hover:bg-slate-900/80 transition-all duration-300 group will-change-transform hover:shadow-[0_0_30px_rgba(168,85,247,0.2)]">
            <div className="absolute -top-6 left-8 w-12 h-12 bg-purple-600 rounded-2xl flex items-center justify-center text-2xl font-black text-white shadow-[0_10px_30px_rgba(147,51,234,0.4)] group-hover:scale-110 group-hover:shadow-[0_15px_40px_rgba(147,51,234,0.6)] transition-all">
              2
            </div>
            <h3 className="text-2xl font-black text-white mb-4 uppercase italic tracking-tight pt-2 group-hover:text-purple-300 transition-colors">
              Play Smart
            </h3>
            <p className="text-slate-300 text-lg font-bold italic leading-tight">
              Strategic play of power cards helps you win games.
            </p>
          </div>

          {/* Step 3 */}
          <div className="relative p-8 rounded-3xl bg-slate-900/70 border border-white/10 hover:border-blue-500/40 hover:bg-slate-900/80 transition-all duration-300 group will-change-transform hover:shadow-[0_0_30px_rgba(37,99,235,0.2)]">
            <div className="absolute -top-6 left-8 w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-2xl font-black text-white shadow-[0_10px_30px_rgba(37,99,235,0.4)] group-hover:scale-110 group-hover:shadow-[0_15px_40px_rgba(37,99,235,0.6)] transition-all">
              3
            </div>
            <h3 className="text-2xl font-black text-white mb-4 uppercase italic tracking-tight pt-2 group-hover:text-blue-300 transition-colors">
              Call Count
            </h3>
            <p className="text-slate-300 text-lg font-bold italic leading-tight">
              If you think you have the lowest hand, call Count. But beware: you'll take a 20-point penalty if you're wrong.
            </p>
          </div>
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-indigo-500/10 border border-indigo-500/30 rounded-full text-indigo-300 font-bold uppercase tracking-[0.2em] text-[10px]">
            The Ultimate Strategy
          </div>
        </div>
      </div>
    </section>
  );
};
