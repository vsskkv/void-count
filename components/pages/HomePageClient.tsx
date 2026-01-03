"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
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
      src: "/void-count-eight-card.png",
      alt: "Void Count strategic card game – Eight card",
      label: "Point Cards",
    },
    {
      src: "/void-count-blue-glacier-card.png",
      alt: "Void Count strategic card game – Blue Glacier anomaly card",
      label: "Anomalies",
    },
    {
      src: "/void-count-take-two-card.png",
      alt: "Void Count strategic card game – Take Two power card",
      label: "Power Cards",
    },
    {
      src: "/void-count-volcanix-lava-card.png",
      alt: "Void Count strategic card game – Volcanix Lava game changer card",
      label: "Game Changers",
    },
  ],
  [
    {
      src: "/void-count-three-card.png",
      alt: "Void Count strategic card game – Three card",
      label: "Point Cards",
    },
    {
      src: "/void-count-desert-horizon-card.png",
      alt: "Void Count strategic card game – Desert Horizon anomaly card",
      label: "Anomalies",
    },
    {
      src: "/void-count-sabotage-card.png",
      alt: "Void Count strategic card game – Sabotage power card",
      label: "Power Cards",
    },
    {
      src: "/void-count-toxic-swamp-card.png",
      alt: "Void Count strategic card game – Toxic Swamp game changer card",
      label: "Game Changers",
    },
  ],
  [
    {
      src: "/void-count-seven-card.png",
      alt: "Void Count strategic card game – Seven card",
      label: "Point Cards",
    },
    {
      src: "/void-count-toss-card.png",
      alt: "Void Count strategic card game – Toss power card",
      label: "Power Cards",
    },
    {
      src: "/void-count-nine-card.png",
      alt: "Void Count strategic card game – Nine card",
      label: "Point Cards",
    },
    {
      src: "/void-count-double-your-hand-card.png",
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
        <section className="content-section min-h-[100svh] flex flex-col justify-center items-center py-12 md:py-20 will-change-transform">
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Card Images Grid - Static */}
            <div className="relative h-[300px] sm:h-[500px] lg:h-[650px] order-1 lg:order-1 flex items-center justify-center mb-4 lg:mb-0">
              {/* Background glow */}
              <div className="absolute inset-0 bg-indigo-600/10 blur-[60px] sm:blur-[120px] rounded-full" />

              {/* Overlapping Card Pile */}
              <div className="relative w-full max-w-[220px] sm:max-w-[400px] aspect-[2.5/3.5]">
                <div className="absolute inset-0 transform -rotate-12 -translate-x-6 sm:-translate-x-16 translate-y-2 sm:translate-y-4 will-change-transform">
                  <img
                    src="/void-count-sabotage-card.png"
                    alt="Void Count strategic card game – Sabotage card"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-contain rounded-xl opacity-40 shadow-2xl"
                  />
                </div>
                <div className="absolute inset-0 transform rotate-12 translate-x-6 sm:translate-x-16 -translate-y-2 sm:-translate-y-4 will-change-transform">
                  <img
                    src="/void-count-toss-card.png"
                    alt="Void Count strategic card game – Toss card"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-contain rounded-xl opacity-60 shadow-2xl"
                  />
                </div>
                <div className="absolute inset-0 transform -rotate-6 -translate-y-4 sm:-translate-y-8 scale-105 z-10 will-change-transform">
                  <img
                    src="/void-count-double-your-hand-card.png"
                    alt="Void Count strategic card game – Double Your Hand card"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-contain rounded-xl shadow-[0_20px_40px_rgba(0,0,0,0.4)] sm:shadow-[0_40px_80px_rgba(0,0,0,0.6)]"
                  />
                </div>
                <div className="absolute inset-0 transform rotate-3 translate-y-6 sm:translate-y-12 translate-x-2 sm:translate-x-4 scale-95 will-change-transform">
                  <img
                    src="/void-count-take-two-card.png"
                    alt="Void Count strategic card game – Take Two card"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-contain rounded-xl opacity-80 shadow-2xl"
                  />
                </div>
              </div>
            </div>

            {/* Right: Content */}
            <div className="text-center lg:text-right order-2 lg:order-2 px-2 sm:px-0">
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-6 text-white tracking-tighter leading-[0.9] uppercase italic">
                LOWEST SCORE <br />
                WINS THE <br />
                <span className="text-purple-500">ROUND.</span>
              </h2>
              <p className="text-lg sm:text-xl md:text-2xl text-slate-200 leading-relaxed font-bold italic mb-8 max-w-2xl mx-auto lg:ml-auto lg:mr-0">
                You will be betrayed. Trust no one. <br className="hidden md:block" />
                Someone always gets cocky, and calling "Count" too early hurts.
              </p>
              <div className="flex flex-wrap justify-center lg:justify-end gap-2 sm:gap-3 md:gap-4">
                <div className="px-3 sm:px-4 py-2 bg-indigo-500/10 border border-indigo-500/30 rounded-xl text-indigo-300 font-bold text-xs sm:text-sm uppercase backdrop-blur-sm">
                  ⚡ 100% Chaos
                </div>
                <div className="px-3 sm:px-4 py-2 bg-purple-500/10 border border-purple-500/30 rounded-xl text-purple-300 font-bold text-xs sm:text-sm uppercase backdrop-blur-sm">
                  🎮 Learn while playing
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="content-section min-h-[100svh] flex flex-col justify-center py-12 md:py-20 will-change-transform">
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Content */}
            <div className="flex flex-col gap-6 md:gap-8 order-2 lg:order-1 px-2 sm:px-0">
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white tracking-tighter uppercase leading-[0.85] text-center lg:text-left">
                CLEVERNESS
                <br />
                REQUIRED.
              </h2>

              <div className="grid grid-cols-1 gap-4 md:gap-6">
                <div className="group bg-slate-900/60 backdrop-blur-sm p-6 sm:p-8 rounded-2xl md:rounded-3xl border border-white/5 hover:border-indigo-500/50 transition-all">
                  <div className="flex items-start gap-4">
                    <div className="text-3xl sm:text-4xl flex-shrink-0">😈</div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-black text-indigo-400 mb-2 uppercase italic">
                        Sneaky Sabotage
                      </h3>
                      <p className="text-slate-300 font-bold text-sm sm:text-base italic">
                        Swap hands. Double their cards. Watch them crumble as you glide to victory.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="group bg-slate-900/60 backdrop-blur-sm p-6 sm:p-8 rounded-2xl md:rounded-3xl border border-white/5 hover:border-violet-500/50 transition-all">
                  <div className="flex items-start gap-4">
                    <div className="text-3xl sm:text-4xl flex-shrink-0">😬</div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-black text-violet-400 mb-2 uppercase italic">
                        The "Count" Risk
                      </h3>
                      <p className="text-slate-300 font-bold text-sm sm:text-base italic">
                        Think you're safe? Call "Count" and reveal the truth. If you're wrong, it's a long way back.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="group bg-gradient-to-r from-indigo-900/40 to-purple-900/40 backdrop-blur-sm p-6 sm:p-8 rounded-2xl md:rounded-3xl border border-indigo-500/30">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="text-3xl sm:text-4xl flex-shrink-0">🎮</div>
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
              {/* Background glow */}
              <div className="absolute inset-0 bg-indigo-600/10 blur-[60px] sm:blur-[120px] rounded-full" />

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

        {/* Section 3: High-Energy CTA */}
        <section className="content-section min-h-[90svh] flex flex-col items-center justify-center text-center py-16 md:py-20">
          <div className="max-w-4xl w-full backdrop-blur-2xl bg-indigo-950/10 p-8 sm:p-12 md:p-16 lg:p-20 rounded-3xl md:rounded-[3rem] lg:rounded-[5rem] border-2 border-white/10 shadow-[0_0_120px_rgba(99,102,241,0.2)] relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 via-transparent to-purple-500/10" />

            <h2 className="relative z-10 text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-9xl font-black mb-6 sm:mb-8 text-white tracking-tighter uppercase italic leading-[0.8] scale-y-110">
              UPGRADE
              <br />
              <span className="text-indigo-500">GAME NIGHT.</span>
            </h2>

            <p className="relative z-10 text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl mb-8 sm:mb-10 md:mb-12 text-slate-200 font-medium max-w-2xl mx-auto leading-tight">
              Ready to redefine your table? Join the waitlist for the next 
              print run and be the first to start the count.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center relative z-10">
              <Link
                href="#waitlist-form"
                className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-500 text-white text-xl sm:text-2xl md:text-3xl font-black px-8 sm:px-12 md:px-16 py-4 sm:py-6 md:py-8 rounded-2xl sm:rounded-[2rem] shadow-[0_20px_50px_rgba(79,70,229,0.4)] transform hover:scale-105 md:hover:scale-110 transition-all active:scale-95 flex items-center justify-center"
              >
                JOIN THE WAITLIST
              </Link>
              <PrimaryButton
                href="/how-to-play"
                variant="secondary"
                className="w-full sm:w-auto text-lg sm:text-xl md:text-2xl px-8 sm:px-10 md:px-12 py-4 sm:py-5 md:py-7 rounded-2xl sm:rounded-[2rem] border-white/20 hover:bg-white/10"
              >
                SEE THE RULES
              </PrimaryButton>
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


