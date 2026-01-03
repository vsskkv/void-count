import React from "react";

export const HowItWorksSection = () => {
  return (
    <section className="relative z-20 py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2 className="text-4xl md:text-6xl font-black mb-16 text-white tracking-tighter uppercase italic text-center leading-tight">
          HOW <span className="text-indigo-500">VOID COUNT</span> WORKS
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Step 1 */}
          <div className="relative p-8 rounded-3xl bg-slate-900/60 border border-white/5 hover:border-indigo-500/30 transition-all group">
            <div className="absolute -top-6 left-8 w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-2xl font-black text-white shadow-[0_10px_30px_rgba(79,70,229,0.4)] group-hover:scale-110 transition-transform">
              1
            </div>
            <h3 className="text-2xl font-black text-white mb-4 uppercase italic tracking-tight pt-2">
              Go Low
            </h3>
            <p className="text-slate-300 text-lg font-bold italic leading-tight">
              Keep your total as close to zero as possible. Every point you hold is a liability.
            </p>
          </div>

          {/* Step 2 */}
          <div className="relative p-8 rounded-3xl bg-slate-900/60 border border-white/5 hover:border-purple-500/30 transition-all group">
            <div className="absolute -top-6 left-8 w-12 h-12 bg-purple-600 rounded-2xl flex items-center justify-center text-2xl font-black text-white shadow-[0_10px_30px_rgba(147,51,234,0.4)] group-hover:scale-110 transition-transform">
              2
            </div>
            <h3 className="text-2xl font-black text-white mb-4 uppercase italic tracking-tight pt-2">
              Lie High
            </h3>
            <p className="text-slate-300 text-lg font-bold italic leading-tight">
              Use Power Cards to shift high points to your friends. Make them think they're safe.
            </p>
          </div>

          {/* Step 3 */}
          <div className="relative p-8 rounded-3xl bg-slate-900/60 border border-white/5 hover:border-blue-500/30 transition-all group">
            <div className="absolute -top-6 left-8 w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-2xl font-black text-white shadow-[0_10px_30px_rgba(37,99,235,0.4)] group-hover:scale-110 transition-transform">
              3
            </div>
            <h3 className="text-2xl font-black text-white mb-4 uppercase italic tracking-tight pt-2">
              Call Count
            </h3>
            <p className="text-slate-300 text-lg font-bold italic leading-tight">
              If you think you're the lowest, call "Count". If you're right, they take the points. If you're wrong... good luck.
            </p>
          </div>
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-indigo-500/10 border border-indigo-500/30 rounded-full text-indigo-300 font-bold uppercase tracking-widest text-sm">
            <span className="text-xl">⏱️</span> Games last 10–15 minutes
          </div>
        </div>
      </div>
    </section>
  );
};

