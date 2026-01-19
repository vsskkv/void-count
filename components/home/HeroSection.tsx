"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { scrollToElement } from "@/lib/utils";
import { WAITLIST_FORM_ID } from "@/lib/constants";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

export const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const logoRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const allowMotion = !prefersReducedMotion;

  useEffect(() => {
    if (!containerRef.current || !logoRef.current || prefersReducedMotion) return;

    const logo = logoRef.current;

    const ctx = gsap.context(() => {
      // 1. Initial Entry Animations
      gsap.from(".hero-logo-img", {
        scale: 0.85,
        duration: 1.2,
        ease: "power3.out",
      });

      gsap.from(".hero-cta", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        delay: 0.6,
        ease: "power3.out",
      });

      // 2. Continuous Atmospheric Animations
      // Gentle floating
      gsap.to(logo, {
        y: -15,
        duration: 4,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden px-4 sm:px-6 pt-12 sm:pt-16 md:pt-20 pb-12 flex flex-col items-center justify-center min-h-[750px] md:min-h-[90vh] bg-transparent"
    >
      {/* --- CONTENT --- */}
      <div className="relative w-full max-w-5xl mx-auto text-center flex flex-col items-center justify-center gap-6 sm:gap-8 md:gap-12">
        {/* Card Asset Section */}
        <div ref={logoRef} className="hero-logo-img select-none group relative w-full flex justify-center items-center py-4 opacity-100">
          {/* Intense Core Glow - Disabled heavy blur on mobile to prevent crashes */}
          <div className="hidden md:block absolute w-72 h-72 bg-indigo-600/40 blur-[100px] rounded-full animate-pulse" />
          <div className="hidden md:block absolute w-48 h-48 bg-purple-500/30 blur-[60px] rounded-full" />
          
          {/* The Card */}
          <div className="relative z-10">
            <img 
              src="/back-v2.webp" 
              alt="Void Count Card Back - New Strategic Card Game | Card Game 2026" 
              className="block mx-auto w-[180px] sm:w-[220px] md:w-[280px] lg:w-[320px] h-auto object-contain drop-shadow-[0_30px_70px_rgba(0,0,0,1)]"
              style={{ 
                filter: 'drop-shadow(0 0 50px rgba(99, 102, 241, 0.5))',
              }}
              width={320}
              height={320}
              loading="eager"
              decoding="sync"
              fetchPriority="high"
              sizes="(min-width: 1024px) 320px, (min-width: 768px) 280px, 220px"
            />
            
            {/* Dynamic Card Highlight (Sheen) */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-2xl" />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="hero-cta flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 w-full sm:w-auto">
          <PrimaryButton
            className="group w-full sm:w-auto bg-indigo-600 hover:bg-indigo-500 text-white text-base sm:text-lg md:text-xl font-bold px-10 sm:px-12 py-4 sm:py-5 rounded-xl shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_40px_rgba(79,70,229,0.5)] transform hover:scale-105 transition-all duration-300 relative overflow-hidden"
            onClick={() => scrollToElement(WAITLIST_FORM_ID)}
          >
            <span className="relative z-10">Join Waiting List</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
          </PrimaryButton>
          <PrimaryButton
            variant="secondary"
            className="w-full sm:w-auto text-sm sm:text-base md:text-lg px-8 sm:px-10 py-4 sm:py-5 rounded-xl border-2 border-indigo-400/30 hover:border-indigo-400/50 hover:bg-indigo-900/20 font-semibold transition-all duration-300 opacity-80 cursor-not-allowed"
            disabled
          >
            How to Play (Coming Soon)
          </PrimaryButton>
        </div>
      </div>
    </section>
  );
};
