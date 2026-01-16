"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { scrollToElement } from "@/lib/utils";
import { WAITLIST_FORM_ID } from "@/lib/constants";

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

  // Enhanced floating and glow animations for logo
  useEffect(() => {
    if (!logoRef.current) return;

    const logo = logoRef.current;
    const img = logo.querySelector('img');
    
    if (!img) return;

    // Floating animation
    const floatAnimation = gsap.to(logo, {
      y: -15,
      duration: 4,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    });

    // Pulsing glow animation
    const glowAnimation = gsap.to(img, {
      filter: 'drop-shadow(0 0 60px rgba(139, 92, 246, 0.8)) drop-shadow(0 0 100px rgba(79, 70, 229, 0.6)) drop-shadow(0 0 140px rgba(168, 85, 247, 0.4))',
      duration: 3,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    });

    // Subtle scale pulse
    const scaleAnimation = gsap.to(img, {
      scale: 1.02,
      duration: 2.5,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    });

    return () => {
      floatAnimation.kill();
      glowAnimation.kill();
      scaleAnimation.kill();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden px-4 sm:px-6 pt-20 sm:pt-24 md:pt-32 pb-12 sm:pb-16 md:pt-48 md:pb-32 flex flex-col items-center justify-center min-h-[70svh] sm:min-h-[75vh] md:min-h-[80vh]"
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
        <div ref={logoRef} className="hero-logo-img select-none group relative w-full flex justify-center py-6 sm:py-8 md:py-12">
          {/* Multiple animated glow layers */}
          <div className="absolute inset-0 bg-indigo-600/20 blur-[140px] rounded-full animate-pulse" style={{ animationDuration: '3s' }} />
          <div className="absolute inset-0 bg-purple-600/15 blur-[160px] rounded-full animate-pulse" style={{ animationDuration: '4s', animationDelay: '1s' }} />
          <div className="absolute inset-0 bg-violet-500/10 blur-[180px] rounded-full animate-pulse" style={{ animationDuration: '5s', animationDelay: '2s' }} />
          
          {/* Animated light rays effect */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="absolute w-full h-full bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0deg,rgba(139,92,246,0.1)_60deg,transparent_120deg,rgba(79,70,229,0.1)_180deg,transparent_240deg,rgba(168,85,247,0.1)_300deg,transparent_360deg)] animate-[spin_20s_linear_infinite] opacity-60" />
          </div>
          
          {/* Outer glow ring */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[110%] h-[110%] rounded-full border-2 border-indigo-500/30 blur-xl animate-pulse" style={{ animationDuration: '2s' }} />
          </div>
          
          {/* Logo image with enhanced effects */}
          <div className="relative z-10">
            <img 
              src="/New Logo.png" 
              alt="Void Count - New Strategic Card Game Logo | Card Game 2024" 
              className="relative w-[85%] sm:w-[90%] max-w-[280px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[650px] h-auto object-contain transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
              style={{ 
                filter: 'drop-shadow(0 0 50px rgba(139, 92, 246, 0.7)) drop-shadow(0 0 90px rgba(79, 70, 229, 0.5)) drop-shadow(0 0 130px rgba(168, 85, 247, 0.3)) drop-shadow(0 0 20px rgba(0, 0, 0, 0.9))',
                transform: 'translateZ(0)',
              }}
              width={650}
              height={650}
              loading="eager"
              decoding="async"
            />
            
            {/* Additional shine effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/0 to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none rounded-full blur-2xl" 
                 style={{ 
                   background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.3) 0%, transparent 50%)',
                   transform: 'translateZ(0)',
                 }} 
            />
          </div>
          
          {/* Particle-like sparkles */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-indigo-400 rounded-full blur-sm opacity-60 animate-pulse"
                style={{
                  top: `${20 + (i * 15)}%`,
                  left: `${15 + (i * 12)}%`,
                  animationDuration: `${2 + (i * 0.5)}s`,
                  animationDelay: `${i * 0.3}s`,
                }}
              />
            ))}
          </div>
        </div>

        {/* CTAs */}
        <div className="hero-cta flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 md:gap-6 w-full sm:w-auto px-2 sm:px-4">
          <PrimaryButton
            className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-500 text-white text-base sm:text-lg md:text-xl lg:text-2xl font-black px-6 sm:px-8 md:px-10 lg:px-14 py-3 sm:py-4 md:py-5 lg:py-6 rounded-xl sm:rounded-2xl shadow-[0_20px_50px_rgba(79,70,229,0.5)] hover:shadow-[0_25px_60px_rgba(79,70,229,0.6)] transform hover:scale-105 transition-all uppercase italic"
            onClick={() => scrollToElement(WAITLIST_FORM_ID)}
          >
            Join Waiting List
          </PrimaryButton>
          <PrimaryButton
            variant="secondary"
            href="/how-to-play"
            className="w-full sm:w-auto text-sm sm:text-base md:text-lg lg:text-xl px-5 sm:px-6 md:px-8 lg:px-10 py-3 sm:py-4 md:py-5 lg:py-6 rounded-xl sm:rounded-2xl border-2 border-indigo-400/50 hover:border-indigo-300 hover:bg-indigo-900/30 font-black transition-all uppercase italic"
          >
            How to Play
          </PrimaryButton>
        </div>
      </div>
    </section>
  );
};
