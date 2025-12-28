"use client";

import { forwardRef } from "react";

interface GameCardProps {
  className?: string;
}

export const GameCard = forwardRef<HTMLDivElement, GameCardProps>(({ className = "" }, ref) => {
  return (
    <div className={`perspective-[1000px] ${className}`}>
      <div
        ref={ref}
        className="relative w-[320px] h-[500px] md:w-[600px] md:h-[900px] rounded-2xl md:rounded-3xl border border-slate-100/20 bg-slate-950 shadow-[0_30px_80px_rgba(0,0,0,0.7)]"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Starry background */}
        <div className="absolute inset-0 rounded-2xl md:rounded-3xl bg-[radial-gradient(circle_at_20%_0,#38bdf8_0,transparent_55%),radial-gradient(circle_at_80%_100%,#6366f1_0,transparent_55%)] opacity-70" />
        <div className="absolute inset-0 rounded-2xl md:rounded-3xl bg-slate-950/70" />

        {/* Moon / comet / wave motifs to echo the logo */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-8 md:gap-16 z-10">
          <div className="w-32 h-32 md:w-64 md:h-64 rounded-full border border-slate-100/70 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm shadow-[0_0_35px_rgba(255,255,255,0.2)]">
            <span className="text-5xl md:text-9xl font-semibold tracking-[0.3em] text-white ml-4 md:ml-6">
              VC
            </span>
          </div>
          <div className="w-48 h-12 md:w-80 md:h-16 rounded-full bg-gradient-to-r from-cyan-400 via-indigo-400 to-sky-500 blur-[10px] md:blur-[16px] opacity-80 animate-pulse" />
        </div>

        <div className="absolute bottom-8 left-0 right-0 px-4 text-sm md:text-2xl uppercase tracking-[0.2em] text-center text-slate-200/80 font-bold">
          Prototype card art
        </div>
      </div>
    </div>
  );
});

GameCard.displayName = "GameCard";
