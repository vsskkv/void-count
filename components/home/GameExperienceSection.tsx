import React from "react";

export const GameExperienceSection = () => {
  const steps = [
    {
      emoji: "😏",
      text: "Someone thinks they’re winning",
      color: "from-blue-500/20 to-blue-600/10",
    },
    {
      emoji: "😈",
      text: "Someone sabotages them",
      color: "from-purple-500/20 to-purple-600/10",
    },
    {
      emoji: "🗣️",
      text: "Everyone shouts",
      color: "from-indigo-500/20 to-indigo-600/10",
    },
    {
      emoji: "✋",
      text: "Someone calls COUNT",
      color: "from-rose-500/20 to-rose-600/10",
    },
    {
      emoji: "😬",
      text: "Everyone checks scores in silence",
      color: "from-slate-500/20 to-slate-600/10",
    },
    {
      emoji: "😂",
      text: "Laughter. Blame. Rematch.",
      color: "from-emerald-500/20 to-emerald-600/10",
    },
  ];

  return (
    <section className="relative z-20 py-24 md:py-32">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-4xl md:text-6xl font-black mb-4 text-white tracking-tighter uppercase italic leading-tight">
          WHAT <span className="text-indigo-500">ACTUALLY HAPPENS</span>
        </h2>
        <p className="text-xl md:text-2xl text-slate-400 font-bold mb-16 uppercase tracking-widest">
          One round and you'll get it.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`relative p-8 rounded-3xl bg-gradient-to-br ${step.color} border border-white/5 backdrop-blur-sm flex flex-col items-center justify-center transform hover:scale-105 transition-all duration-300 group`}
            >
              <div className="text-5xl mb-4 group-hover:animate-bounce">
                {step.emoji}
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

