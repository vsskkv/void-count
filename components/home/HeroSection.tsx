"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { PrimaryButton } from "@/components/ui/PrimaryButton";

export const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".hero-primary-headline", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power4.out",
      });

      gsap.from(".hero-explainer", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.3,
        ease: "power4.out",
      });

      gsap.from(".hero-cta", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.45,
        ease: "power4.out",
      });

      gsap.from(".hero-trust", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        delay: 0.6,
        ease: "power4.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden px-4 sm:px-6 pt-24 sm:pt-32 pb-16 md:pt-48 md:pb-32 flex items-center justify-center"
    >
      {/* Enhanced background gradients */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0,#1d4ed8_0,transparent_55%),radial-gradient(circle_at_50%_100%,#020617_0,transparent_55%)] opacity-50" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(99,102,241,0.15),transparent_50%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,rgba(168,85,247,0.1),transparent_50%)]" />
      <div className="pointer-events-none absolute inset-0 bg-slate-950/20" />
      
      {/* Animated gradient orbs */}
      <div className="pointer-events-none absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-[120px] animate-pulse" />
      <div className="pointer-events-none absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />

      <div className="relative max-w-4xl mx-auto text-center flex flex-col items-center">
        {/* Primary Headline */}
        <h1 className="hero-primary-headline text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-8 md:mb-10 text-white tracking-tighter uppercase italic leading-[0.9] scale-y-110">
          GO LOW. <br />
          PLAY SMART. <br />
          <span className="text-cyan-300 drop-shadow-[0_0_30px_rgba(103,232,249,0.5)]">
            CALL COUNT.
          </span>
        </h1>

        {/* One-line Explainer */}
        <p className="hero-explainer text-lg sm:text-xl md:text-2xl text-slate-300 max-w-2xl mb-10 md:mb-12 leading-relaxed">
          A fast, strategic card game of sabotage and bluffing for 2–6 players.
          <span className="block sm:inline"> Games last 10–15 minutes.</span>
        </p>

        {/* CTAs */}
        <div className="hero-cta flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 w-full sm:w-auto mb-10 md:mb-12">
          <PrimaryButton
            href="/how-to-play"
            className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-500 text-white text-xl md:text-2xl font-black px-10 md:px-14 py-5 md:py-6 rounded-2xl shadow-[0_20px_50px_rgba(79,70,229,0.5)] hover:shadow-[0_25px_60px_rgba(79,70,229,0.6)] transform hover:scale-105 transition-all"
          >
            🎴 Play in 2 Minutes
          </PrimaryButton>
          <PrimaryButton
            variant="secondary"
            className="w-full sm:w-auto text-lg md:text-xl px-8 md:px-10 py-5 md:py-6 rounded-2xl border-2 border-indigo-400/50 hover:border-indigo-300 hover:bg-indigo-900/30 font-black transition-all"
            onClick={() =>
              document
                .getElementById("waitlist-form")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Join the Inner Circle
          </PrimaryButton>
        </div>

        {/* Trust Signals */}
        <div className="hero-trust flex flex-wrap justify-center items-center gap-x-6 gap-y-4 text-sm sm:text-base md:text-lg text-slate-400">
          <div className="flex items-center gap-2 whitespace-nowrap">
            <span className="text-yellow-400 text-lg">⭐</span>
            <span><strong className="text-slate-200">120+</strong> players tested</span>
          </div>
          <div className="flex items-center gap-2 whitespace-nowrap">
            <span className="text-purple-400 text-lg">🔁</span>
            <span><strong className="text-slate-200">500+</strong> rematches</span>
          </div>
          <div className="flex items-center gap-2 whitespace-nowrap">
            <span className="text-cyan-400 text-lg">😂</span>
            <span><strong className="text-slate-200">100%</strong> epic moments</span>
          </div>
        </div>
      </div>
    </section>
  );
};
