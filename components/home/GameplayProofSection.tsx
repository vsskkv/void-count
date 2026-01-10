"use client";

import React from "react";

export const GameplayProofSection = () => {
  return (
    <section className="relative z-20 py-24 md:py-32 bg-slate-900/30">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Video Placeholder */}
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 blur-2xl opacity-50 group-hover:opacity-100 transition-opacity" />
            <div className="relative aspect-[9/16] max-w-[320px] mx-auto rounded-[2.5rem] border-8 border-slate-800 bg-slate-950 overflow-hidden shadow-2xl shadow-indigo-500/20">
              {/* Video Element Placeholder */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                <div className="w-20 h-20 bg-indigo-600 rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(79,70,229,0.6)] group-hover:scale-110 transition-transform cursor-pointer">
                  <svg className="w-8 h-8 text-white translate-x-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <p className="text-white font-black uppercase italic tracking-tighter text-2xl leading-none mb-2">
                  Watch<br />Gameplay
                </p>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">
                  20s Rapid Reveal
                </p>
              </div>
              
              {/* Overlay for "Addictive" vibe */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-slate-950 to-transparent">
                <div className="flex gap-2 mb-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <span key={i} className="text-yellow-400 text-xs">⭐</span>
                  ))}
                </div>
                <p className="text-white text-sm font-bold italic">"We couldn't stop playing!"</p>
              </div>
            </div>
          </div>

          {/* Right: Content */}
          <div className="text-center lg:text-left">
            <h2 className="text-4xl md:text-7xl font-black mb-8 text-white tracking-tighter uppercase italic leading-[0.8] scale-y-110">
              STRATEGY <br />
              <span className="text-indigo-500 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent italic">YOU CAN FEEL</span>
            </h2>
            
            <div className="space-y-8">
              <div className="flex items-start gap-4 justify-center lg:justify-start group">
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center shrink-0 group-hover:bg-indigo-500/20 transition-all">
                  <span className="text-2xl">⚡</span>
                </div>
                <div>
                  <h3 className="text-xl font-black text-white uppercase italic mb-1">Fast Turns</h3>
                  <p className="text-slate-400 font-bold text-sm uppercase tracking-widest">No downtime. Keep moving or get left behind.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 justify-center lg:justify-start group">
                <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center shrink-0 group-hover:bg-purple-500/20 transition-all">
                  <span className="text-2xl">🔄</span>
                </div>
                <div>
                  <h3 className="text-xl font-black text-white uppercase italic mb-1">Big Reversals</h3>
                  <p className="text-slate-400 font-bold text-sm uppercase tracking-widest">Swap hands, dump points, and sabotage in one move.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 justify-center lg:justify-start group">
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0 group-hover:bg-cyan-500/20 transition-all">
                  <span className="text-2xl">🔁</span>
                </div>
                <div>
                  <h3 className="text-xl font-black text-white uppercase italic mb-1">Instant Rematch</h3>
                  <p className="text-slate-400 font-bold text-sm uppercase tracking-widest">Games end in 10 mins. You'll always want one more.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
