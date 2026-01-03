import React from "react";

export const SEOContentSections = () => {
  return (
    <div className="flex flex-col gap-24 md:gap-32 pb-24">
      {/* What is Void Count? */}
      <section className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-8 text-white tracking-tighter uppercase italic">
          What Is <span className="text-indigo-500">Void Count?</span>
        </h2>
        <p className="text-lg sm:text-xl md:text-2xl text-slate-300 leading-relaxed font-light">
          Void Count is a strategic card game designed for players who love
          clever plays, unexpected twists, and a bit of friendly sabotage.
          Whether you're looking for a fast-paced game night with friends or a
          tactical challenge for family gatherings, Void Count delivers an
          unforgettable experience where every move counts and the "Void" is
          always waiting to claim your points.
        </p>
      </section>

      {/* Why It's the Perfect Gift */}
      <section className="max-w-5xl mx-auto px-4">
        <div className="bg-slate-900/40 backdrop-blur-md border border-white/10 rounded-[2rem] md:rounded-[3rem] p-8 md:p-12 lg:p-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-10 text-white tracking-tighter uppercase italic text-center">
            The Perfect Gift for <br className="hidden sm:block" />
            <span className="text-purple-500">Board & Card Game Lovers</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div className="flex items-start gap-4 p-6 bg-white/5 rounded-2xl border border-white/5">
              <span className="text-2xl">✔</span>
              <div>
                <h3 className="text-xl font-bold text-white mb-2 uppercase italic tracking-tight">Easy to learn, hard to master</h3>
                <p className="text-slate-400">Most players learn the basics in under 5 minutes, but the strategic depth keeps you coming back for more.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-6 bg-white/5 rounded-2xl border border-white/5">
              <span className="text-2xl">✔</span>
              <div>
                <h3 className="text-xl font-bold text-white mb-2 uppercase italic tracking-tight">Versatile Play</h3>
                <p className="text-slate-400">Works perfectly for families, couples, and parties. Designed for 2–6 players.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-6 bg-white/5 rounded-2xl border border-white/5">
              <span className="text-2xl">✔</span>
              <div>
                <h3 className="text-xl font-bold text-white mb-2 uppercase italic tracking-tight">High Replay Value</h3>
                <p className="text-slate-400">With multiple card types and shifting anomalies, no two games of Void Count are ever the same.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-6 bg-white/5 rounded-2xl border border-white/5">
              <span className="text-2xl">✔</span>
              <div>
                <h3 className="text-xl font-bold text-white mb-2 uppercase italic tracking-tight">Compact & Gift-Ready</h3>
                <p className="text-slate-400">A premium, portable card game that makes for a unique and thoughtful gift for any occasion.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-12 text-white tracking-tighter uppercase italic text-center">
          Frequently Asked <span className="text-indigo-500">Questions</span>
        </h2>
        <div className="space-y-6">
          <div className="bg-slate-900/60 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-white/5">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 uppercase italic tracking-tight">How many players can play Void Count?</h3>
            <p className="text-slate-300 text-lg">Void Count is designed for 2–6 players, making it ideal for both intimate duels and larger group game nights.</p>
          </div>
          <div className="bg-slate-900/60 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-white/5">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 uppercase italic tracking-tight">Is Void Count easy to learn?</h3>
            <p className="text-slate-300 text-lg">Yes! Most players pick up the rules in under 5 minutes. The game's mechanics are intuitive but offer deep strategic possibilities as you learn the cards.</p>
          </div>
          <div className="bg-slate-900/60 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-white/5">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 uppercase italic tracking-tight">Is this suitable as a gift?</h3>
            <p className="text-slate-300 text-lg">Absolutely. Void Count is designed as a premium, compact card game that appeals to strategy enthusiasts and casual gamers alike.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

