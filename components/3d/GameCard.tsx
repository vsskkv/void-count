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
    ? "text-[min(8vh,10vw)]"
    : "text-6xl"; // Standard variant uses fixed sizing (parent should control scale via transform if needed, or just fit)

  return (
    <div className={`perspective-[1000px] ${className}`}>
      <div
        ref={ref}
        className={`${containerClasses} rounded-2xl md:rounded-3xl bg-black shadow-[0_30px_80px_rgba(0,0,0,0.7)]`}
        style={{ 
          transformStyle: "preserve-3d",
          border: "2px solid rgba(168, 85, 247, 0.8)",
          boxShadow: "0 0 20px rgba(168, 85, 247, 0.6), 0 30px 80px rgba(0,0,0,0.7)",
        }}
      >
        {/* Swirling Purple Vortex Background */}
        <div 
          className="absolute inset-0 rounded-2xl md:rounded-3xl overflow-hidden"
          style={{
            background: `
              radial-gradient(ellipse at 50% 50%, rgba(139, 92, 246, 0.6) 0%, transparent 50%),
              radial-gradient(ellipse at 30% 40%, rgba(167, 139, 250, 0.5) 0%, transparent 40%),
              radial-gradient(ellipse at 70% 60%, rgba(196, 181, 253, 0.4) 0%, transparent 40%),
              conic-gradient(from 0deg at 50% 50%, transparent 0deg, rgba(139, 92, 246, 0.3) 60deg, transparent 120deg, rgba(167, 139, 250, 0.3) 180deg, transparent 240deg, rgba(196, 181, 253, 0.3) 300deg, transparent 360deg)
            `,
            animation: "vortex 20s linear infinite",
          }}
        />
        
        {/* Additional swirling layers for depth */}
        <div 
          className="absolute inset-0 rounded-2xl md:rounded-3xl overflow-hidden"
          style={{
            background: `
              conic-gradient(from 180deg at 50% 50%, transparent 0deg, rgba(167, 139, 250, 0.4) 90deg, transparent 180deg, rgba(139, 92, 246, 0.3) 270deg, transparent 360deg)
            `,
            animation: "vortex-reverse 25s linear infinite",
            opacity: 0.7,
          }}
        />

        {/* Centered VOID COUNT Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
          <div className="relative flex flex-col items-center justify-center">
            {/* VOID Text */}
            <div 
              className="font-extrabold leading-[0.9] mb-1 relative"
              style={{
                fontSize: textClasses.includes('min') ? textClasses : 'inherit',
                background: "linear-gradient(to bottom right, #ffffff 0%, #e9d5ff 60%, #c084fc 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                textShadow: "3px 3px 0px rgba(79, 70, 229, 0.8), 6px 6px 8px rgba(0, 0, 0, 0.9)",
                letterSpacing: "0.05em",
                filter: "drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.9))",
              }}
            >
              {/* Empty Set Symbol above O */}
              <span 
                className="absolute -top-[0.8em] text-white pointer-events-none"
                style={{
                  left: "calc(25% + 0.05em)", // Position above the "O" in VOID (accounting for letter spacing)
                  fontSize: isHero ? "min(2vh, 2.5vw)" : "0.4em",
                  fontWeight: "bold",
                  textShadow: "0 0 10px rgba(168, 85, 247, 0.8), 2px 2px 4px rgba(0, 0, 0, 0.8)",
                  transform: "translateX(-50%)",
                }}
              >
                ∅
              </span>
              VOID
            </div>
            
            {/* COUNT Text */}
            <div 
              className="font-extrabold leading-[0.9]"
              style={{
                fontSize: textClasses.includes('min') ? textClasses : 'inherit',
                background: "linear-gradient(to bottom right, #ffffff 0%, #e9d5ff 60%, #c084fc 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                textShadow: "3px 3px 0px rgba(79, 70, 229, 0.8), 6px 6px 8px rgba(0, 0, 0, 0.9)",
                letterSpacing: "0.05em",
                filter: "drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.9))",
              }}
            >
              COUNT
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

GameCard.displayName = "GameCard";
