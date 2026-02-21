"use client";

import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

export const CosmicBackground = () => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const allowMotion = !prefersReducedMotion;
  
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* 1. Base Deep Space Layer */}
      <div className="absolute inset-0 bg-[#000005]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,#0a0a2e_0%,#000000_100%)]" />

      {/* 2. Global Nebula Glows - tone down on mobile to avoid GPU spikes */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-full aspect-square bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.15)_0%,transparent_60%)] blur-xl md:blur-3xl opacity-35 md:opacity-50" />
      <div className="hidden md:block absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-full aspect-square bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.1)_0%,transparent_60%)] blur-3xl opacity-50" />

      {/* 3. Moving Atmospheric Vortex - Disabled on mobile via CSS to save GPU memory */}
      <div
        className={`hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] aspect-square bg-[conic-gradient(from_0deg,transparent_0%,rgba(168,85,247,0.05)_25%,transparent_50%,rgba(79,70,229,0.05)_75%,transparent_100%)] opacity-60 ${
          allowMotion ? "animate-[spin_180s_linear_infinite]" : ""
        }`}
        aria-hidden="true"
      />

      {/* 4. Subtle Light Rays - Simplified on mobile via CSS */}
      <div className="absolute inset-0 opacity-30 flex items-center justify-center">
        {/* Desktop Animated Rays */}
        <div
          className={`hidden md:block absolute w-[1200px] h-[1200px] bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0deg,rgba(139,92,246,0.1)_20deg,transparent_40deg,rgba(79,70,229,0.1)_180deg,transparent_200deg,rgba(168,85,247,0.1)_320deg,transparent_360deg)] ${
            allowMotion ? "animate-[spin_120s_linear_infinite]" : ""
          }`}
        />
        {/* Mobile Static Rays */}
        <div
          className="md:hidden absolute w-[800px] h-[800px] bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0deg,rgba(139,92,246,0.05)_20deg,transparent_40deg,rgba(79,70,229,0.05)_180deg,transparent_200deg,rgba(168,85,247,0.05)_320deg,transparent_360deg)]"
        />
      </div>
    </div>
  );
};
