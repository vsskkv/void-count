import React from "react";

export const SocialProofSection = () => {
  return (
    <section className="relative z-20 py-12 bg-slate-900/40 backdrop-blur-sm border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
        {/* Playtest Quote */}
        <div className="flex-1 text-center md:text-left">
          <div className="flex justify-center md:justify-start gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-yellow-400 text-2xl">⭐️</span>
            ))}
          </div>
          <p className="text-xl sm:text-2xl font-bold text-white italic leading-tight mb-2">
            "We shouted at each other. 10/10."
          </p>
          <p className="text-slate-400 font-medium">— Playtest Group, London</p>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-8 sm:gap-12">
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-black text-indigo-400 mb-1">
              🃏 120+
            </div>
            <p className="text-xs sm:text-sm text-slate-400 font-bold uppercase tracking-widest">
              Testers Betrayed
            </p>
          </div>
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-black text-purple-400 mb-1">
              🎮 500+
            </div>
            <p className="text-xs sm:text-sm text-slate-400 font-bold uppercase tracking-widest">
              Rematches Played
            </p>
          </div>
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-black text-blue-400 mb-1">
              😂 100%
            </div>
            <p className="text-xs sm:text-sm text-slate-400 font-bold uppercase tracking-widest">
              Loud Reactions
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

