import React from "react";

export const SocialProofSection = () => {
  return (
    <section className="relative z-20 py-16 bg-slate-900/40 backdrop-blur-sm border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-12 md:gap-12">
        {/* Playtest Quote */}
        <div className="flex-1 text-center md:text-left">
          <div className="flex justify-center md:justify-start gap-1 mb-4">
            <div className="px-3 py-1 rounded bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 text-xs font-black uppercase tracking-widest">
              Top Rated Game
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-white italic leading-tight mb-2">
            "We shouted at each other. 10/10."
          </p>
          <p className="text-slate-400 font-medium text-lg">— Playtest Group, London</p>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap justify-center md:justify-end gap-x-8 gap-y-8 sm:gap-12 w-full md:w-auto">
          <div className="text-center min-w-[100px]">
            <div className="text-3xl sm:text-5xl font-black text-indigo-400 mb-1 uppercase tracking-tighter">
              120+
            </div>
            <p className="text-[10px] sm:text-xs text-slate-400 font-black uppercase tracking-widest">
              Testers Betrayed
            </p>
          </div>
          <div className="text-center min-w-[100px]">
            <div className="text-3xl sm:text-5xl font-black text-purple-400 mb-1 uppercase tracking-tighter">
              500+
            </div>
            <p className="text-[10px] sm:text-xs text-slate-400 font-black uppercase tracking-widest">
              Rematches Played
            </p>
          </div>
          <div className="text-center min-w-[100px]">
            <div className="text-3xl sm:text-5xl font-black text-blue-400 mb-1 uppercase tracking-tighter">
              100%
            </div>
            <p className="text-[10px] sm:text-xs text-slate-400 font-black uppercase tracking-widest">
              Loud Reactions
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

