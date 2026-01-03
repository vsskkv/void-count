"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { GameCard } from "@/components/3d/GameCard";

export const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cardContainerRef = useRef<HTMLDivElement | null>(null);

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

      gsap.from(".hero-logo", {
        scale: 0.9,
        opacity: 0,
        duration: 1,
        delay: 0.3,
        ease: "power4.out",
        force3D: true,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Subtle floating animation for cards
  useEffect(() => {
    if (!cardContainerRef.current) return;

    const mainCard = gsap.to(".hero-card-main", {
      y: -8,
      rotate: -2,
      duration: 3,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    });

    const backCard1 = gsap.to(".hero-card-back-1", {
      y: -6,
      rotate: -10,
      duration: 3.2,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    });

    const backCard2 = gsap.to(".hero-card-back-2", {
      y: -4,
      rotate: 8,
      duration: 2.8,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    });

    return () => {
      mainCard.kill();
      backCard1.kill();
      backCard2.kill();
    };
  }, []);

  // Parallax effect on mouse move (subtle, won't interfere with floating)
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!cardContainerRef.current) return;
      
      const rect = cardContainerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const x = ((e.clientX - centerX) / rect.width) * 8;
      const y = ((e.clientY - centerY) / rect.height) * 8;
      
      gsap.to(".hero-card-main", {
        x: x * 0.4,
        y: y * 0.4,
        duration: 0.4,
        ease: "power1.out",
      });
      gsap.to(".hero-card-back-1", {
        x: x * 0.25,
        y: y * 0.25,
        duration: 0.4,
        ease: "power1.out",
      });
      gsap.to(".hero-card-back-2", {
        x: x * 0.15,
        y: y * 0.15,
        duration: 0.4,
        ease: "power1.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to([".hero-card-main", ".hero-card-back-1", ".hero-card-back-2"], {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
      });
    };

    const container = cardContainerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("mouseleave", handleMouseLeave);
      return () => {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden px-4 sm:px-6 pt-24 sm:pt-32 pb-12 md:pt-48 md:pb-24"
    >
      {/* Enhanced background gradients */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0,#1d4ed8_0,transparent_55%),radial-gradient(circle_at_50%_100%,#020617_0,transparent_55%)] opacity-50" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(99,102,241,0.15),transparent_50%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,rgba(168,85,247,0.1),transparent_50%)]" />
      <div className="pointer-events-none absolute inset-0 bg-slate-950/20" />
      
      {/* Animated gradient orbs */}
      <div className="pointer-events-none absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-[120px] animate-pulse" />
      <div className="pointer-events-none absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />

      <div className="relative max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-12 lg:gap-16">
        <div className="flex-1 text-center lg:text-left flex flex-col items-center lg:items-start w-full">
          {/* Primary Headline */}
          <h1 className="hero-primary-headline text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black mb-6 md:mb-8 text-white tracking-tighter uppercase italic leading-[0.9] scale-y-110">
            GO LOW. <br />
            PLAY SMART. <br />
            <span className="text-cyan-300 drop-shadow-[0_0_20px_rgba(103,232,249,0.5)]">
              CALL COUNT.
            </span>
          </h1>

          {/* One-line Explainer */}
          <p className="hero-explainer text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl mb-8 md:mb-10 leading-relaxed">
            A fast, strategic card game of sabotage and bluffing for 2–6 players.
            <span className="block sm:inline"> Games last 10–15 minutes.</span>
          </p>

          {/* CTAs */}
          <div className="hero-cta flex flex-col sm:flex-row justify-center lg:justify-start items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto mb-6 md:mb-8">
            <PrimaryButton
              href="/how-to-play"
              className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-500 text-white text-lg sm:text-xl md:text-2xl font-black px-8 sm:px-10 md:px-12 py-4 sm:py-5 md:py-6 rounded-xl shadow-[0_20px_50px_rgba(79,70,229,0.5)] hover:shadow-[0_25px_60px_rgba(79,70,229,0.6)] transform hover:scale-105 transition-all"
            >
              🎴 Play in 2 Minutes
            </PrimaryButton>
            <PrimaryButton
              variant="secondary"
              className="w-full sm:w-auto text-base sm:text-lg md:text-xl px-6 sm:px-8 md:px-10 py-4 sm:py-5 md:py-6 rounded-xl border-2 border-indigo-400/50 hover:border-indigo-300 hover:bg-indigo-900/30 font-black transition-all"
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
          <div className="hero-trust flex flex-wrap justify-center lg:justify-start items-center gap-x-6 gap-y-3 text-sm sm:text-base text-slate-400">
            <div className="flex items-center gap-2">
              <span className="text-yellow-400">⭐</span>
              <span><strong className="text-slate-300">120+</strong> players tested</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-purple-400">🔁</span>
              <span><strong className="text-slate-300">500+</strong> rematches</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-cyan-400">😂</span>
              <span><strong className="text-slate-300">100%</strong> epic moments</span>
            </div>
          </div>
        </div>

        {/* Hero Card Visual */}
        <div 
          ref={cardContainerRef}
          className="hero-logo flex-1 relative w-full max-w-[240px] sm:max-w-[320px] md:max-w-[400px] aspect-[2.5/3.5] lg:max-w-none lg:h-[600px] flex justify-center items-center"
        >
          {/* Pulsing glow */}
          <div className="absolute inset-0 bg-indigo-500/30 blur-[100px] sm:blur-[120px] rounded-full animate-pulse" />
          
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Background Card 1 */}
            <div className="hero-card-back-1 absolute w-[140px] sm:w-[200px] md:w-[260px] -rotate-12 -translate-x-6 sm:-translate-x-10 opacity-30 will-change-transform">
              <GameCard
                variant="standard"
                frontSrc="/void-count-double-your-hand-card.png"
                frontAlt="Void Count strategic card game – Double Your Hand card"
                className="w-full h-full"
              />
            </div>
            {/* Background Card 2 */}
            <div className="hero-card-back-2 absolute w-[140px] sm:w-[200px] md:w-[260px] rotate-6 translate-x-4 sm:translate-x-6 opacity-40 will-change-transform">
              <GameCard
                variant="standard"
                frontSrc="/void-count-toss-card.png"
                frontAlt="Void Count strategic card game – Toss card"
                className="w-full h-full"
              />
            </div>
            {/* Front Card */}
            <div className="hero-card-main relative w-[140px] sm:w-[200px] md:w-[260px] lg:w-[320px] -rotate-3 z-10 will-change-transform">
              <GameCard
                variant="hero"
                frontSrc="/void-count-card-back.png"
                frontAlt="Void Count strategic card game – Card Back"
                className="w-full h-full shadow-[0_20px_50px_rgba(0,0,0,0.6)] sm:shadow-[0_40px_100px_rgba(0,0,0,0.8)]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
