"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { KICKSTARTER_URL } from "@/lib/constants";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

export const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const logoRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const kickstarterUrl = /^https?:\/\//i.test(KICKSTARTER_URL)
    ? KICKSTARTER_URL
    : `https://${KICKSTARTER_URL.replace(/^\/+/, "")}`;

  useEffect(() => {
    if (!containerRef.current || !logoRef.current || prefersReducedMotion) return;

    // Lazy load GSAP for hero animations
    import("gsap").then((gsapModule) => {
      const gsap = gsapModule.default;
      const logo = logoRef.current;
      if (!logo) return;

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
    });
  }, [prefersReducedMotion]);

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden px-4 sm:px-6 pt-12 sm:pt-16 md:pt-20 pb-12 flex flex-col items-center justify-center min-h-[750px] md:min-h-[90vh] bg-transparent"
    >
      {/* --- CONTENT --- */}
      <div className="relative w-full max-w-5xl mx-auto text-center flex flex-col items-center justify-center gap-6 sm:gap-8 md:gap-12">
        {/* Product Box Section */}
        <div ref={logoRef} className="hero-logo-img select-none group relative w-full flex justify-center items-center py-4 opacity-100">
          {/* Intense Core Glow - Disabled heavy blur on mobile to prevent crashes */}
          <div className="hidden md:block absolute w-72 h-72 bg-indigo-600/40 blur-[100px] rounded-full animate-pulse" />
          <div className="hidden md:block absolute w-48 h-48 bg-purple-500/30 blur-[60px] rounded-full" />
          
          {/* The Box */}
          <div
            className="relative z-10 h-[280px] w-[220px] sm:h-[340px] sm:w-[260px] md:h-[420px] md:w-[320px] lg:h-[500px] lg:w-[380px] overflow-hidden rounded-[2rem] border border-slate-800/70 bg-slate-950/40 shadow-[0_30px_70px_rgba(0,0,0,0.95)]"
            style={{
              filter: "drop-shadow(0 0 50px rgba(99, 102, 241, 0.45))",
            }}
          >
            <Image
              src="/Card%20Box.jpg"
              alt="Void Count base deck box"
              fill
              priority
              className="object-cover object-center scale-[1.14]"
              sizes="(min-width: 1024px) 380px, (min-width: 768px) 320px, 260px"
            />

            {/* Dynamic Card Highlight (Sheen) */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-[2rem]" />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="hero-cta flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 w-full sm:w-auto">
          <PrimaryButton
            className="group w-full sm:w-auto bg-indigo-600 hover:bg-indigo-500 text-white text-base sm:text-lg md:text-xl font-bold px-10 sm:px-12 py-4 sm:py-5 rounded-xl shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_40px_rgba(79,70,229,0.5)] transform hover:scale-105 transition-all duration-300 relative overflow-hidden"
            onClick={() => {
              if (typeof window === "undefined" || !kickstarterUrl) return;
              window.open(kickstarterUrl, "_blank", "noopener,noreferrer");
            }}
          >
            <span className="relative z-10">
              Back On <span className="text-[#05ce78]">Kickstarter</span>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
          </PrimaryButton>
          <PrimaryButton
            variant="secondary"
            href="/how-to-play"
            className="w-full sm:w-auto text-sm sm:text-base md:text-lg px-8 sm:px-10 py-4 sm:py-5 rounded-xl border-2 border-indigo-400/45 hover:border-indigo-300 hover:bg-indigo-900/35 text-indigo-100 font-semibold transition-all duration-300 hover:scale-105"
          >
            How to Play
          </PrimaryButton>
        </div>
      </div>
    </section>
  );
};
