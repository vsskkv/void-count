import React from "react";

export const GameExperienceSection = () => {
  const steps = [
    {
      text: "Someone thinks they’re winning",
      color: "from-blue-500/20 to-blue-600/10",
    },
    {
      text: "Someone sabotages them",
      color: "from-purple-500/20 to-purple-600/10",
    },
    {
      text: "The excitement builds",
      color: "from-indigo-500/20 to-indigo-600/10",
    },
    {
      text: "Someone calls COUNT",
      color: "from-rose-500/20 to-rose-600/10",
    },
    {
      text: "Everyone checks scores in silence",
      color: "from-slate-500/20 to-slate-600/10",
    },
    {
      text: "Laughter. Blame. Rematch.",
      color: "from-emerald-500/20 to-emerald-600/10",
    },
  ];

  return (
    <section className="relative z-20 py-24 md:py-32">
      {/* Background effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-950/10 to-transparent pointer-events-none" />
      
      <div className="max-w-5xl mx-auto px-6 sm:px-6 text-center relative z-10">
        <h2 className="text-4xl md:text-7xl font-black mb-4 text-white tracking-tighter uppercase italic leading-[0.8] scale-y-110">
          WHAT <span className="text-indigo-500 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">ACTUALLY HAPPENS</span>
        </h2>
        <p className="text-lg md:text-3xl text-slate-400 font-black mb-16 uppercase tracking-tighter italic">
          One round and you'll get it.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`relative p-8 rounded-[2rem] bg-gradient-to-br ${step.color} border border-white/10 backdrop-blur-sm flex flex-col items-center justify-center transform hover:scale-105 hover:border-white/20 transition-all duration-300 group will-change-transform hover:shadow-[0_0_30px_rgba(99,102,241,0.2)]`}
            >
              <div className="text-sm font-black text-indigo-500/60 group-hover:text-indigo-400 uppercase tracking-[0.2em] mb-4 transition-colors">
                Step 0{index + 1}
              </div>
              <p className="text-xl font-black text-white uppercase italic tracking-tight leading-tight">
                {step.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

