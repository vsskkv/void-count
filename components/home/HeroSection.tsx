"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { scrollToElement } from "@/lib/utils";
import { WAITLIST_FORM_ID } from "@/lib/constants";

interface Particle {
  id: number;
  top: string;
  left: string;
  duration: string;
  delay: string;
}

export const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const logoRef = useRef<HTMLDivElement | null>(null);
  const [particles, setParticles] = useState<Particle[]>([]);

  // Initialize particles on client only to avoid hydration mismatch
  useEffect(() => {
    const newParticles = [...Array(20)].map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      duration: `${3 + Math.random() * 4}s`,
      delay: `${Math.random() * 5}s`,
    }));
    setParticles(newParticles);
  }, []);

  useEffect(() => {
    if (!containerRef.current || !logoRef.current) return;

    const logo = logoRef.current;

    const ctx = gsap.context(() => {
      // 1. Initial Entry Animations
      gsap.from(".hero-logo-img", {
        scale: 0.85,
        opacity: 0,
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

      // Subtle light ray pulse
      gsap.to(".light-rays", {
        opacity: 0.7,
        duration: 5,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      // Fade in particles once generated
      gsap.from(".particle-field", {
        opacity: 0,
        duration: 2,
        ease: "power1.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, [particles]); // Re-run when particles are ready to animate them

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden px-4 sm:px-6 pt-12 sm:pt-16 md:pt-20 pb-12 flex flex-col items-center justify-center min-h-[750px] md:min-h-[90vh]"
    >
      {/* --- BACKGROUND LAYERS --- */}
      
      {/* 1. Base Gradient - Deep Black with subtle dark indigo tint */}
      <div className="pointer-events-none absolute inset-0 bg-[#000005]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,#0a0a2e_0%,#000000_100%)] opacity-100" />
      
      {/* 2. Moving Void Nebula/Vortex - Higher Opacity for more color */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] aspect-square bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.2)_0%,transparent_60%)] blur-3xl" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] aspect-square bg-[conic-gradient(from_0deg,transparent_0%,rgba(168,85,247,0.08)_25%,transparent_50%,rgba(79,70,229,0.08)_75%,transparent_100%)] animate-[spin_120s_linear_infinite] opacity-90" />

      {/* 3. God Rays / Light Beams - Stronger visibility */}
      <div className="light-rays pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-60 flex items-center justify-center">
        <div className="absolute w-[800px] h-[800px] bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0deg,rgba(139,92,246,0.2)_20deg,transparent_40deg,rgba(79,70,229,0.2)_180deg,transparent_200deg,rgba(168,85,247,0.2)_320deg,transparent_360deg)] animate-[spin_60s_linear_infinite]" />
      </div>

      {/* 4. Particle Field (Floating Dust/Sparks) - Higher visibility */}
      <div className="particle-field pointer-events-none absolute inset-0 overflow-hidden">
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute w-1.5 h-1.5 bg-indigo-300 rounded-full blur-[1px] opacity-60 animate-pulse"
            style={{
              top: p.top,
              left: p.left,
              animationDuration: p.duration,
              animationDelay: p.delay,
            }}
          />
        ))}
      </div>

      {/* --- CONTENT --- */}
      <div className="relative w-full max-w-5xl mx-auto text-center flex flex-col items-center justify-center gap-6 sm:gap-8 md:gap-12">
        {/* Card Asset Section */}
        <div ref={logoRef} className="hero-logo-img select-none group relative w-full flex justify-center items-center py-4">
          {/* Intense Core Glow - Vibrant and strong contrast */}
          <div className="absolute w-72 h-72 bg-indigo-600/40 blur-[100px] rounded-full animate-pulse" />
          <div className="absolute w-48 h-48 bg-purple-500/30 blur-[60px] rounded-full" />
          
          {/* The Card */}
          <div className="relative z-10">
            <img 
              src="/Back v2.png" 
              alt="Void Count Card Back - New Strategic Card Game | Card Game 2024" 
              className="block mx-auto w-[180px] sm:w-[220px] md:w-[280px] lg:w-[320px] h-auto object-contain drop-shadow-[0_30px_70px_rgba(0,0,0,1)]"
              style={{ 
                filter: 'drop-shadow(0 0 50px rgba(99, 102, 241, 0.5))',
              }}
              width={320}
              height={320}
              loading="eager"
              decoding="async"
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
            className="w-full sm:w-auto text-sm sm:text-base md:text-lg px-8 sm:px-10 py-4 sm:py-5 rounded-xl border-2 border-indigo-400/20 hover:border-indigo-400/40 hover:bg-indigo-900/20 font-semibold transition-all duration-300 opacity-60 cursor-not-allowed"
            disabled
          >
            How to Play (Coming Soon)
          </PrimaryButton>
        </div>
      </div>
    </section>
  );
};
