"use client";

import { forwardRef } from "react";

interface GameCardProps {
  className?: string;
  variant?: "hero" | "standard";
}

export const GameCard = forwardRef<HTMLDivElement, GameCardProps>(({ className = "", variant = "standard" }, ref) => {
  
  const isHero = variant === "hero";

  const containerClasses = isHero 
    ? "relative h-[60vh] md:h-[75vh] w-auto aspect-[2/3] max-w-[85vw] max-h-[900px]"
    : "relative w-full h-full"; // Standard variant fills parent

  const textClasses = isHero
    ? "text-[min(6vh,8vw)]"
    : "text-6xl"; // Standard variant uses fixed sizing (parent should control scale via transform if needed, or just fit)

  const bottomTextClasses = isHero
    ? "text-[min(1.5vh,3vw)]"
    : "text-sm";

  return (
    <div className={`perspective-[1000px] ${className}`}>
      <div
        ref={ref}
        className={`${containerClasses} rounded-2xl md:rounded-3xl border border-slate-100/20 bg-slate-950 shadow-[0_30px_80px_rgba(0,0,0,0.7)]`}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Starry background */}
        <div className="absolute inset-0 rounded-2xl md:rounded-3xl bg-[radial-gradient(circle_at_20%_0,#38bdf8_0,transparent_55%),radial-gradient(circle_at_80%_100%,#6366f1_0,transparent_55%)] opacity-70" />
        <div className="absolute inset-0 rounded-2xl md:rounded-3xl bg-slate-950/70" />

        {/* Moon / comet / wave motifs to echo the logo */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-[5%] z-10">
          {/* Logo Circle: 35% of card width */}
          <div className="w-[35%] aspect-square rounded-full border border-slate-100/70 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm shadow-[0_0_35px_rgba(255,255,255,0.2)]">
            <span className={`${textClasses} font-semibold tracking-[0.3em] text-white ml-[10%]`}>
              VC
            </span>
          </div>
          {/* Glow Bar: 50% width, 5% height */}
          <div className="w-[50%] h-[5%] rounded-full bg-gradient-to-r from-cyan-400 via-indigo-400 to-sky-500 blur-[10px] opacity-80 animate-pulse" />
        </div>

        {/* Bottom Text */}
        <div className={`absolute bottom-[8%] left-0 right-0 px-4 ${bottomTextClasses} uppercase tracking-[0.2em] text-center text-slate-200/80 font-bold`}>
          Prototype card art
        </div>
      </div>
    </div>
  );
});

GameCard.displayName = "GameCard";
