import React from "react";

export const SocialProofSection = () => {
  return (
    <section className="relative z-20 py-16 bg-slate-900/50 backdrop-blur-sm border-y border-white/10">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-950/20 via-transparent to-purple-950/20 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter uppercase italic leading-[0.8] mb-6 scale-y-110">
            PLAYTESTER <span className="text-indigo-500 italic">VERDICTS</span>
          </h2>
        </div>

        {/* Quotes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
          <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10 flex flex-col gap-4 group hover:bg-white/10 transition-all">
            <div className="flex gap-1 text-yellow-400">
              {[1, 2, 3, 4, 5].map((i) => <span key={i}>⭐</span>)}
            </div>
            <p className="text-xl font-bold text-white italic leading-tight">
              "The most addictive card game we've played in years. Sabotaging your friends never felt so good!"
            </p>
            <p className="text-slate-500 font-black uppercase tracking-widest text-xs">— Alex, London Playtest</p>
          </div>

          <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10 flex flex-col gap-4 group hover:bg-white/10 transition-all">
            <div className="flex gap-1 text-yellow-400">
              {[1, 2, 3, 4, 5].map((i) => <span key={i}>⭐</span>)}
            </div>
            <p className="text-xl font-bold text-white italic leading-tight">
              "Easy to learn but the strategy is deep. Every round ends in laughter and an immediate rematch."
            </p>
            <p className="text-slate-500 font-black uppercase tracking-widest text-xs">— Sarah, BoardGameMeetup</p>
          </div>

          <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10 flex flex-col gap-4 group hover:bg-white/10 transition-all">
            <div className="flex gap-1 text-yellow-400">
              {[1, 2, 3, 4, 5].map((i) => <span key={i}>⭐</span>)}
            </div>
            <p className="text-xl font-bold text-white italic leading-tight">
              "The perfect game night essential. We love how fast the rounds are. Truly 10/10 fun!"
            </p>
            <p className="text-slate-500 font-black uppercase tracking-widest text-xs">— James, Game Night London</p>
          </div>
        </div>

        {/* Stats Row */}
        <div className="mt-16 pt-16 border-t border-white/5 flex flex-wrap justify-center gap-x-12 gap-y-8">
          <div className="text-center group">
            <div className="text-4xl sm:text-6xl font-black text-indigo-400 mb-2 uppercase tracking-tighter transition-all group-hover:scale-110">
              120+
            </div>
            <p className="text-[10px] sm:text-xs text-slate-500 font-black uppercase tracking-[0.3em]">
              Playtesters
            </p>
          </div>
          <div className="text-center group">
            <div className="text-4xl sm:text-6xl font-black text-purple-400 mb-2 uppercase tracking-tighter transition-all group-hover:scale-110">
              500+
            </div>
            <p className="text-[10px] sm:text-xs text-slate-500 font-black uppercase tracking-[0.3em]">
              Rematches
            </p>
          </div>
          <div className="text-center group">
            <div className="text-4xl sm:text-6xl font-black text-cyan-400 mb-2 uppercase tracking-tighter transition-all group-hover:scale-110">
              100%
            </div>
            <p className="text-[10px] sm:text-xs text-slate-500 font-black uppercase tracking-[0.3em]">
              Epic Moments
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

