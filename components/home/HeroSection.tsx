"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { PrimaryButton } from "@/components/ui/PrimaryButton";

export const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const logoRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".hero-logo-img", {
        scale: 0.8,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
      });

      gsap.from(".hero-cta", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.5,
        ease: "power4.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Subtle floating animation for logo
  useEffect(() => {
    if (!logoRef.current) return;

    const logo = gsap.to(logoRef.current, {
      y: -15,
      duration: 4,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    });

    return () => {
      logo.kill();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden px-4 sm:px-6 pt-24 sm:pt-32 pb-16 md:pt-48 md:pb-32 flex flex-col items-center justify-center min-h-[70svh] sm:min-h-[80vh]"
    >
      {/* Enhanced background gradients */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,#1e1b4b_0%,#020617_70%)] opacity-80" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(79,70,229,0.15),transparent_60%)]" />
      
      {/* Slow spinning background vortex layer */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] aspect-square bg-[conic-gradient(from_0deg,transparent_0%,rgba(168,85,247,0.05)_25%,transparent_50%,rgba(79,70,229,0.05)_75%,transparent_100%)] animate-[spin_60s_linear_infinite] blur-3xl opacity-40" />
      
      {/* Animated gradient orbs */}
      <div className="pointer-events-none absolute top-1/4 left-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-indigo-500/20 rounded-full blur-[80px] sm:blur-[120px] animate-pulse" />
      <div className="pointer-events-none absolute bottom-1/4 right-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-purple-500/20 rounded-full blur-[80px] sm:blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />

      <div className="relative max-w-4xl mx-auto text-center flex flex-col items-center gap-8 sm:gap-12">
        {/* Logo Image Only */}
        <div ref={logoRef} className="hero-logo-img select-none group relative w-full flex justify-center py-12">
          {/* Layered glows for deep integration without washing out the logo */}
          <div className="absolute inset-0 bg-indigo-600/10 blur-[120px] rounded-full" />
          
          <img 
            src="/Logo BG Removed.png" 
            alt="Void Count Logo" 
            className="relative w-[90%] max-w-[320px] sm:max-w-[500px] md:max-w-[650px] h-auto object-contain transition-all duration-700 hover:scale-105"
            style={{ 
              filter: 'drop-shadow(0 0 40px rgba(0, 0, 0, 0.8))'
            }}
            loading="eager"
            decoding="async"
          />
        </div>

        {/* CTAs */}
        <div className="hero-cta flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 w-full sm:w-auto px-4">
          <PrimaryButton
            className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-500 text-white text-lg sm:text-xl md:text-2xl font-black px-8 sm:px-10 md:px-14 py-4 sm:py-5 md:py-6 rounded-2xl shadow-[0_20px_50px_rgba(79,70,229,0.5)] hover:shadow-[0_25px_60px_rgba(79,70,229,0.6)] transform hover:scale-105 transition-all uppercase italic"
            onClick={() =>
              document
                .getElementById("waitlist-form")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Join Waiting List
          </PrimaryButton>
          <PrimaryButton
            variant="secondary"
            href="/how-to-play"
            className="w-full sm:w-auto text-base sm:text-lg md:text-xl px-6 sm:px-8 md:px-10 py-4 sm:py-5 md:py-6 rounded-2xl border-2 border-indigo-400/50 hover:border-indigo-300 hover:bg-indigo-900/30 font-black transition-all uppercase italic"
          >
            How to Play
          </PrimaryButton>
        </div>
      </div>
    </section>
  );
};
