"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { GameCard } from "@/components/3d/GameCard";

export const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".hero-heading", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power4.out",
      });

      gsap.from(".hero-subtitle", {
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 0.2,
        ease: "power4.out",
      });

      gsap.from(".hero-cta", {
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 0.4,
        ease: "power4.out",
      });

      gsap.from(".hero-logo", {
        scale: 0.8,
        opacity: 0,
        duration: 1.2,
        delay: 0.3,
        ease: "power4.out",
        force3D: true,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden px-6 pt-32 pb-12 md:pt-48 md:pb-24"
    >
      {/* Spacey background gradient */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0,#1d4ed8_0,transparent_55%),radial-gradient(circle_at_50%_100%,#020617_0,transparent_55%)] opacity-40" />
      <div className="pointer-events-none absolute inset-0 bg-slate-950/20" />

      <div className="relative max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 md:gap-16">
        <div className="flex-1 text-center lg:text-left flex flex-col items-center lg:items-start">
          <h1 className="hero-heading text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-black mb-6 text-white tracking-tighter uppercase italic leading-[0.8] scale-y-110">
            GO LOW. <br />
            LIE HIGH. <br />
            <span className="text-indigo-500">
              CALL COUNT.
            </span>
          </h1>

          <p className="hero-subtitle text-xl md:text-3xl text-slate-200 max-w-3xl mb-10 font-bold leading-tight italic">
            Fast rounds. Sneaky plays. Loud reactions. <br className="hidden md:block" />
            The card game that ruins friendships (temporarily).
          </p>

          <div className="hero-cta flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-4 sm:gap-6 w-full max-w-2xl">
            <PrimaryButton
              className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-500 text-white text-2xl md:text-3xl font-black px-10 md:px-14 py-6 md:py-8 rounded-2xl shadow-[0_20px_50px_rgba(79,70,229,0.5)] transform hover:scale-105 transition-all uppercase italic"
              onClick={() =>
                document
                  .getElementById("waitlist-form")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              😈 Join the Chaos
            </PrimaryButton>
            <PrimaryButton
              href="/how-to-play"
              variant="secondary"
              className="w-full sm:w-auto text-lg md:text-xl px-8 md:px-10 py-5 md:py-6 rounded-2xl border-white/20 hover:bg-white/10 uppercase font-black"
            >
              Learn in 2 Mins
            </PrimaryButton>
          </div>
        </div>

        {/* Hero Card Visual */}
        <div className="hero-logo flex-1 relative w-full max-w-[280px] sm:max-w-[450px] aspect-[2.5/3.5] lg:max-w-none lg:h-[600px] flex justify-center items-center">
          <div className="absolute inset-0 bg-indigo-500/20 blur-[80px] sm:blur-[120px] rounded-full animate-pulse" />
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Background Card */}
            <div className="absolute w-[180px] sm:w-[300px] md:w-[350px] transform -rotate-12 -translate-x-8 sm:-translate-x-12 opacity-40 will-change-transform">
              <GameCard
                variant="standard"
                frontSrc="/void-count-double-your-hand-card.png"
                frontAlt="Void Count strategic card game – Double Your Hand card"
                className="w-full h-full"
              />
            </div>
            {/* Middle Card */}
            <div className="absolute w-[180px] sm:w-[300px] md:w-[350px] transform rotate-6 translate-x-4 sm:translate-x-8 opacity-60 will-change-transform">
              <GameCard
                variant="standard"
                frontSrc="/void-count-toss-card.png"
                frontAlt="Void Count strategic card game – Toss card"
                className="w-full h-full"
              />
            </div>
            {/* Front Card */}
            <div className="relative w-[180px] sm:w-[300px] md:w-[350px] transform -rotate-3 z-10 will-change-transform">
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
