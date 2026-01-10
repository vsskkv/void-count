"use client";

import React from "react";
import { PrimaryButton } from "@/components/ui/PrimaryButton";

export const RulesPreviewSection = () => {
  return (
    <section className="relative z-20 py-24 md:py-32 bg-slate-900/20 border-y border-white/5">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter uppercase italic leading-[0.8] mb-6 scale-y-110">
            LEARN IN <span className="text-indigo-500 italic">2 MINUTES</span>
          </h2>
          <p className="text-slate-400 font-bold uppercase tracking-widest text-sm sm:text-base">
            Simple rules. Complex strategy. Infinite fun.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Step 1 */}
          <div className="flex flex-col items-center text-center p-8 rounded-[2.5rem] bg-white/5 border border-white/10 group hover:bg-white/10 transition-all">
            <div className="w-16 h-16 rounded-2xl bg-indigo-600 flex items-center justify-center text-3xl mb-6 shadow-[0_0_30px_rgba(79,70,229,0.4)] group-hover:scale-110 transition-transform">
              📉
            </div>
            <h3 className="text-2xl font-black text-white uppercase italic mb-4 tracking-tight">1. Go Low</h3>
            <p className="text-slate-300 font-medium italic leading-relaxed">
              Discard high points and hold onto low values. Your goal is to reach zero.
            </p>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center text-center p-8 rounded-[2.5rem] bg-white/5 border border-white/10 group hover:bg-white/10 transition-all">
            <div className="w-16 h-16 rounded-2xl bg-purple-600 flex items-center justify-center text-3xl mb-6 shadow-[0_0_30px_rgba(147,51,234,0.4)] group-hover:scale-110 transition-transform">
              💥
            </div>
            <h3 className="text-2xl font-black text-white uppercase italic mb-4 tracking-tight">2. Play Smart</h3>
            <p className="text-slate-300 font-medium italic leading-relaxed">
              Strategic play of power cards helps you win games.
            </p>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center text-center p-8 rounded-[2.5rem] bg-white/5 border border-white/10 group hover:bg-white/10 transition-all">
            <div className="w-16 h-16 rounded-2xl bg-cyan-600 flex items-center justify-center text-3xl mb-6 shadow-[0_0_30px_rgba(8,145,178,0.4)] group-hover:scale-110 transition-transform">
              📢
            </div>
            <h3 className="text-2xl font-black text-white uppercase italic mb-4 tracking-tight">3. Call Count</h3>
            <p className="text-slate-300 font-medium italic leading-relaxed">
              If you think you have the lowest hand, call Count. But be careful: you'll take a 20-point penalty if you're wrong.
            </p>
          </div>
        </div>

        <div className="flex justify-center">
          <PrimaryButton 
            href="/how-to-play" 
            variant="secondary"
            className="text-lg font-black px-10 py-5 rounded-2xl border-2 border-indigo-400/50 hover:bg-indigo-900/20"
          >
            📖 Full Rulebook
          </PrimaryButton>
        </div>
      </div>
    </section>
  );
};
