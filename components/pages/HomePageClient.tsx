"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { KICKSTARTER_URL } from "@/lib/constants";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { WaitlistSection } from "@/components/home/WaitlistSection";
import { CardCarousel } from "@/components/home/CardCarousel";
import { SEOContentSections } from "@/components/home/SEOContentSections";
import { HeroSection } from "@/components/home/HeroSection";
import { SocialProofSection } from "@/components/home/SocialProofSection";
import { HowItWorksSection } from "@/components/home/HowItWorksSection";
import { GameExperienceSection } from "@/components/home/GameExperienceSection";

gsap.registerPlugin(ScrollTrigger);

gsap.registerPlugin(ScrollTrigger);

// Card sets for rotation
const CARD_SETS = [
  [
    {
      src: "/Blue Glacier v1.png",
      alt: "Void Count strategic card game – Blue Glacier anomaly card",
      label: "Anomalies",
    },
    {
      src: "/Take Two v1.png",
      alt: "Void Count strategic card game – Take Two power card",
      label: "Power Cards",
    },
    {
      src: "/Volcanix Lava v1.png",
      alt: "Void Count strategic card game – Volcanix Lava game changer card",
      label: "Game Changers",
    },
  ],
  [
    {
      src: "/Desert Horizon v1.png",
      alt: "Void Count strategic card game – Desert Horizon anomaly card",
      label: "Anomalies",
    },
    {
      src: "/Sabotage v1.png",
      alt: "Void Count strategic card game – Sabotage power card",
      label: "Power Cards",
    },
    {
      src: "/Toxic Swamp v1.png",
      alt: "Void Count strategic card game – Toxic Swamp game changer card",
      label: "Game Changers",
    },
  ],
  [
    {
      src: "/Toss v1.png",
      alt: "Void Count strategic card game – Toss power card",
      label: "Power Cards",
    },
    {
      src: "/Double Your Hand v1.png",
      alt: "Void Count strategic card game – Double Your Hand power card",
      label: "Power Cards",
    },
  ],
];

export default function HomePageClient() {
  const mainRef = useRef<HTMLDivElement>(null);
  const [currentCardSet, setCurrentCardSet] = useState(0);
  const [outgoingCardSet, setOutgoingCardSet] = useState<number | null>(null);
  const currentCardSetRef = useRef(0);

  useEffect(() => {
    if (!mainRef.current) return;

    const ctx = gsap.context(() => {
      // Animate content sections entering from left and right
      const sections = gsap.utils.toArray<HTMLElement>(".content-section");
      sections.forEach((section, i) => {
        const direction = i % 2 === 0 ? -50 : 50; // Smaller movement for better performance
        gsap.fromTo(
          section,
          {
            opacity: 0,
            x: direction,
          },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            scrollTrigger: {
              trigger: section,
              start: "top 90%",
              end: "top 60%",
              scrub: 1, // Smooth scrub
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    currentCardSetRef.current = currentCardSet;
  }, [currentCardSet]);

  // Auto-rotate card sets with a true crossfade (old fades out while new fades in)
  useEffect(() => {
    const displayMs = 4000;
    const transitionMs = 1000;

    let nextTickId: number | undefined;
    let clearOutgoingId: number | undefined;

    const tick = () => {
      const prev = currentCardSetRef.current;
      const next = (prev + 1) % CARD_SETS.length;

      setOutgoingCardSet(prev);
      setCurrentCardSet(next);
      currentCardSetRef.current = next;

      if (clearOutgoingId) window.clearTimeout(clearOutgoingId);
      clearOutgoingId = window.setTimeout(
        () => setOutgoingCardSet(null),
        transitionMs
      );

      nextTickId = window.setTimeout(tick, displayMs);
    };

    nextTickId = window.setTimeout(tick, displayMs);

    return () => {
      if (nextTickId) window.clearTimeout(nextTickId);
      if (clearOutgoingId) window.clearTimeout(clearOutgoingId);
      setOutgoingCardSet(null);
    };
  }, []);

  return (
    <main ref={mainRef} className="relative bg-slate-950 overflow-x-hidden">
      {/* Header - Fixed */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <SiteHeader />
      </div>

      {/* Hero Section */}
      <HeroSection />

      {/* Social Proof */}
      <SocialProofSection />

      {/* The Experience */}
      <GameExperienceSection />

      {/* How It Works */}
      <HowItWorksSection />

      {/* Card Carousel Section */}
      <CardCarousel />

      {/* Visually Hidden H1 for SEO */}
      <h1 className="sr-only">
        Void Count: A Strategic Card Game Built for Sabotage, Bluffing and Big Laughs
      </h1>

      {/* Scrollable Content Sections */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 flex flex-col overflow-x-hidden">
        {/* Section 1: Social Proof - The "Friends" Hook */}
        <section className="content-section min-h-[100svh] flex flex-col justify-center items-center py-12 md:py-20 will-change-transform relative">
          {/* Subtle background effects */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/20 via-transparent to-purple-950/20 pointer-events-none" />
          
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10">
            {/* Left: Card Images Grid - Static */}
            <div className="relative h-[300px] sm:h-[500px] lg:h-[650px] order-1 lg:order-1 flex items-center justify-center mb-4 lg:mb-0">
              {/* Enhanced background glow */}
              <div className="absolute inset-0 bg-indigo-600/15 blur-[60px] sm:blur-[120px] rounded-full animate-pulse" />
              <div className="absolute inset-0 bg-purple-600/10 blur-[80px] sm:blur-[140px] rounded-full" style={{ animationDelay: '0.5s' }} />

              {/* Overlapping Card Pile with hover effects */}
              <div className="relative w-full max-w-[220px] sm:max-w-[400px] aspect-[2.5/3.5] group">
                <div className="absolute inset-0 transform -rotate-12 -translate-x-6 sm:-translate-x-16 translate-y-2 sm:translate-y-4 will-change-transform transition-all duration-500 group-hover:-rotate-10 group-hover:scale-105">
                  <img
                    src="/Sabotage v1.png"
                    alt="Void Count strategic card game – Sabotage card"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-contain rounded-xl opacity-40 shadow-2xl transition-opacity duration-500 group-hover:opacity-50"
                  />
                </div>
                <div className="absolute inset-0 transform rotate-12 translate-x-6 sm:translate-x-16 -translate-y-2 sm:-translate-y-4 will-change-transform transition-all duration-500 group-hover:rotate-10 group-hover:scale-105">
                  <img
                    src="/Toss v1.png"
                    alt="Void Count strategic card game – Toss card"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-contain rounded-xl opacity-60 shadow-2xl transition-opacity duration-500 group-hover:opacity-70"
                  />
                </div>
                <div className="absolute inset-0 transform -rotate-6 -translate-y-4 sm:-translate-y-8 scale-105 z-10 will-change-transform transition-all duration-500 group-hover:-rotate-4 group-hover:scale-110 group-hover:-translate-y-6">
                  <img
                    src="/Double Your Hand v1.png"
                    alt="Void Count strategic card game – Double Your Hand card"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-contain rounded-xl shadow-[0_20px_40px_rgba(0,0,0,0.4)] sm:shadow-[0_40px_80px_rgba(0,0,0,0.6)] transition-shadow duration-500"
                  />
                </div>
                <div className="absolute inset-0 transform rotate-3 translate-y-6 sm:translate-y-12 translate-x-2 sm:translate-x-4 scale-95 will-change-transform transition-all duration-500 group-hover:rotate-2 group-hover:scale-100">
                  <img
                    src="/Take Two v1.png"
                    alt="Void Count strategic card game – Take Two card"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-contain rounded-xl opacity-80 shadow-2xl transition-opacity duration-500 group-hover:opacity-90"
                  />
                </div>
              </div>
            </div>

            {/* Right: Content */}
            <div className="text-center lg:text-right order-2 lg:order-2 px-2 sm:px-0">
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-6 text-white tracking-tighter leading-[0.9] uppercase italic">
                LOWEST SCORE <br />
                WINS THE <br />
                <span className="text-purple-500 bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">ROUND.</span>
              </h2>
              <p className="text-lg sm:text-xl md:text-2xl text-slate-200 leading-relaxed font-bold italic mb-8 max-w-2xl mx-auto lg:ml-auto lg:mr-0">
                Every move matters. Every card counts. <br className="hidden md:block" />
                Strategy meets surprise, and calling "Count" at the right moment wins the round.
              </p>
              <div className="flex flex-wrap justify-center lg:justify-end gap-2 sm:gap-3 md:gap-4">
                <div className="px-3 sm:px-4 py-2 bg-indigo-500/10 border border-indigo-500/30 rounded-xl text-indigo-300 font-bold text-xs sm:text-sm uppercase backdrop-blur-sm hover:bg-indigo-500/20 hover:border-indigo-500/50 transition-all">
                  Pure Strategy
                </div>
                <div className="px-3 sm:px-4 py-2 bg-purple-500/10 border border-purple-500/30 rounded-xl text-purple-300 font-bold text-xs sm:text-sm uppercase backdrop-blur-sm hover:bg-purple-500/20 hover:border-purple-500/50 transition-all">
                  Learn while playing
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="content-section min-h-[100svh] flex flex-col justify-center py-12 md:py-20 will-change-transform relative">
          {/* Subtle background effects */}
          <div className="absolute inset-0 bg-gradient-to-bl from-purple-950/20 via-transparent to-indigo-950/20 pointer-events-none" />
          
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10">
            {/* Left: Content */}
            <div className="flex flex-col gap-6 md:gap-8 order-2 lg:order-1 px-2 sm:px-0">
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white tracking-tighter uppercase leading-[0.85] text-center lg:text-left">
                CLEVERNESS
                <br />
                <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">REQUIRED.</span>
              </h2>

              <div className="grid grid-cols-1 gap-4 md:gap-6">
                <div className="group bg-slate-900/70 backdrop-blur-sm p-6 sm:p-8 rounded-2xl md:rounded-3xl border border-white/5 hover:border-indigo-500/50 hover:bg-slate-900/80 transition-all duration-300 hover:shadow-[0_0_30px_rgba(99,102,241,0.2)]">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center shrink-0 group-hover:bg-indigo-500/20 group-hover:border-indigo-500/50 transition-all">
                      <div className="w-2 h-2 rounded-full bg-indigo-500 group-hover:scale-125 transition-transform" />
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-black text-indigo-400 mb-2 uppercase italic group-hover:text-indigo-300 transition-colors">
                        Clever Strategy
                      </h3>
                      <p className="text-slate-300 font-bold text-sm sm:text-base italic">
                        Swap hands. Double their cards. Turn the tables with strategic plays that shift the game in your favor.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="group bg-slate-900/70 backdrop-blur-sm p-6 sm:p-8 rounded-2xl md:rounded-3xl border border-white/5 hover:border-violet-500/50 hover:bg-slate-900/80 transition-all duration-300 hover:shadow-[0_0_30px_rgba(168,85,247,0.2)]">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/30 flex items-center justify-center shrink-0 group-hover:bg-violet-500/20 group-hover:border-violet-500/50 transition-all">
                      <div className="w-2 h-2 rounded-full bg-violet-500 group-hover:scale-125 transition-transform" />
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-black text-violet-400 mb-2 uppercase italic group-hover:text-violet-300 transition-colors">
                        The "Count" Risk
                      </h3>
                      <p className="text-slate-300 font-bold text-sm sm:text-base italic">
                        Think you're safe? Call "Count" and reveal the truth. Timing is everything—call it right and you win the round.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="group bg-gradient-to-r from-indigo-900/50 to-purple-900/50 backdrop-blur-sm p-6 sm:p-8 rounded-2xl md:rounded-3xl border border-indigo-500/40 hover:border-indigo-500/60 transition-all duration-300 hover:shadow-[0_0_40px_rgba(99,102,241,0.3)]">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/30 flex items-center justify-center shrink-0 group-hover:bg-white/20 group-hover:border-white/50 transition-all">
                      <div className="w-2 h-2 rounded-full bg-white group-hover:scale-125 transition-transform" />
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white uppercase italic tracking-tighter mb-2">
                        Game Night Essential
                      </h3>
                      <p className="text-slate-200 text-base sm:text-lg font-bold italic">
                        Fast, addictive, and perfect for game nights. One round and you'll be hooked for the rest of the night.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Card Images Grid - Auto-rotating */}
            <div className="relative h-[300px] sm:h-[500px] lg:h-[650px] order-1 lg:order-2 flex items-center justify-center mb-4 lg:mb-0">
              {/* Enhanced background glow */}
              <div className="absolute inset-0 bg-indigo-600/15 blur-[60px] sm:blur-[120px] rounded-full animate-pulse" />
              <div className="absolute inset-0 bg-violet-600/10 blur-[80px] sm:blur-[140px] rounded-full" style={{ animationDelay: '0.7s' }} />

              {/* Card Grid */}
              <div className="relative w-full h-full max-w-[220px] sm:max-w-[400px] aspect-[2.5/3.5]">
                {outgoingCardSet !== null && (
                  <div
                    key={`out-${outgoingCardSet}`}
                    className="absolute inset-0 grid grid-cols-2 gap-2 sm:gap-4 p-2 sm:p-4"
                    style={{
                      animation:
                        "smoothFadeOut 1s cubic-bezier(0.4, 0, 0.2, 1) forwards",
                      willChange: "opacity, transform",
                      pointerEvents: "none",
                    }}
                  >
                    {CARD_SETS[outgoingCardSet].map((card, index) => (
                      <div
                        key={`out-${outgoingCardSet}-${index}`}
                        className={`relative ${
                          index === 1 ? "mt-4 sm:mt-8" : index === 2 ? "-mt-4 sm:-mt-8" : ""
                        }`}
                      >
                        <img
                          src={card.src}
                          alt={card.alt}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-contain rounded-xl will-change-transform"
                          style={{
                            filter:
                              "drop-shadow(0 0 10px rgba(255, 255, 255, 0.3)) drop-shadow(0 10px 20px rgba(99, 102, 241, 0.4))",
                          }}
                        />
                      </div>
                    ))}
                  </div>
                )}

                <div
                  key={`in-${currentCardSet}`}
                  className="absolute inset-0 grid grid-cols-2 gap-2 sm:gap-4 p-2 sm:p-4"
                  style={{
                    animation:
                      "smoothFadeIn 1s cubic-bezier(0.4, 0, 0.2, 1) forwards",
                    willChange: "opacity, transform",
                  }}
                >
                  {CARD_SETS[currentCardSet].map((card, index) => (
                    <div
                      key={`in-${currentCardSet}-${index}`}
                      className={`relative ${
                        index === 1 ? "mt-4 sm:mt-8" : index === 2 ? "-mt-4 sm:-mt-8" : ""
                      }`}
                    >
                      <img
                        src={card.src}
                        alt={card.alt}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-contain rounded-xl will-change-transform"
                        style={{
                          filter:
                            "drop-shadow(0 0 10px rgba(255, 255, 255, 0.3)) drop-shadow(0 10px 20px rgba(99, 102, 241, 0.4))",
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: SEO Content */}
        <div className="py-16 md:py-24">
          <SEOContentSections />
        </div>

        {/* Section 5: Waitlist - Centered / Bottom */}
        <div className="py-16 md:py-20">
          <WaitlistSection />
        </div>

        {/* Footer */}
        <div className="mt-auto">
          <SiteFooter />
        </div>
      </div>
    </main>
  );
}


