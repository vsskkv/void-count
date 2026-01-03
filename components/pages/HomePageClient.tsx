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

gsap.registerPlugin(ScrollTrigger);

// Card sets for rotation
const CARD_SETS = [
  [
    { src: "/Eight v1.png", alt: "Eight Card", label: "Point Cards" },
    { src: "/Blue Glacier v1.png", alt: "Blue Glacier", label: "Anomalies" },
    { src: "/Take Two v1.png", alt: "Take Two", label: "Power Cards" },
    {
      src: "/Volcanix Lava v1.png",
      alt: "Volcanix Lava",
      label: "Game Changers",
    },
  ],
  [
    { src: "/Three v1.png", alt: "Three Card", label: "Point Cards" },
    { src: "/Desert Horizon v1.png", alt: "Desert Horizon", label: "Anomalies" },
    { src: "/Sabotage v1.png", alt: "Sabotage", label: "Power Cards" },
    { src: "/Toxic Swamp v1.png", alt: "Toxic Swamp", label: "Game Changers" },
  ],
  [
    { src: "/Seven v1.png", alt: "Seven Card", label: "Point Cards" },
    { src: "/Toss v1.png", alt: "Toss", label: "Power Cards" },
    { src: "/Nine v1.png", alt: "Nine Card", label: "Point Cards" },
    {
      src: "/Double Your Hand v1.png",
      alt: "Double Your Hand",
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
        const direction = i % 2 === 0 ? -100 : 100;
        gsap.fromTo(
          section,
          {
            opacity: 0,
            x: direction,
          },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            scrollTrigger: {
              trigger: section,
              start: "top 85%",
              end: "top 50%",
              scrub: true,
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

      {/* Card Carousel Hero Section */}
      <CardCarousel />

      {/* Scrollable Content Sections */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 flex flex-col overflow-x-hidden">
        {/* Section 1: Social Proof - The "Friends" Hook */}
        <section className="content-section min-h-[100svh] flex flex-col justify-center items-center py-16 md:py-20">
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left: Card Images Grid - Static */}
            <div className="relative h-[400px] sm:h-[500px] lg:h-[600px] order-1 lg:order-1">
              {/* Background glow */}
              <div className="absolute inset-0 bg-indigo-600/10 blur-[120px] rounded-full" />

              {/* Card Grid */}
              <div className="relative w-full h-full grid grid-cols-2 gap-4 p-4">
                <div className="relative">
                  <img
                    src="/Sabotage v1.png"
                    alt="Sabotage Card"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-contain transition-all duration-1000 ease-in-out rounded-xl"
                    style={{
                      filter:
                        "drop-shadow(0 0 20px rgba(255, 255, 255, 0.3)) drop-shadow(0 15px 40px rgba(99, 102, 241, 0.4))",
                    }}
                  />
                </div>
                <div className="relative mt-8">
                  <img
                    src="/Toss v1.png"
                    alt="Toss Card"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-contain transition-all duration-1000 ease-in-out rounded-xl"
                    style={{
                      filter:
                        "drop-shadow(0 0 20px rgba(255, 255, 255, 0.3)) drop-shadow(0 15px 40px rgba(99, 102, 241, 0.4))",
                    }}
                  />
                </div>
                <div className="relative -mt-8">
                  <img
                    src="/Double Your Hand v1.png"
                    alt="Double Your Hand Card"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-contain transition-all duration-1000 ease-in-out rounded-xl"
                    style={{
                      filter:
                        "drop-shadow(0 0 20px rgba(255, 255, 255, 0.3)) drop-shadow(0 15px 40px rgba(99, 102, 241, 0.4))",
                    }}
                  />
                </div>
                <div className="relative">
                  <img
                    src="/Take Two v1.png"
                    alt="Take Two Card"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-contain transition-all duration-1000 ease-in-out rounded-xl"
                    style={{
                      filter:
                        "drop-shadow(0 0 20px rgba(255, 255, 255, 0.3)) drop-shadow(0 15px 40px rgba(99, 102, 241, 0.4))",
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Right: Content */}
            <div className="text-left lg:text-right order-2 lg:order-2">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-6 text-white tracking-tighter leading-[0.9] uppercase italic">
                RUIN YOUR <br />
                FRIENDS' <br />
                <span className="text-purple-500">TOTALS.</span>
              </h2>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-200 leading-relaxed font-light mb-8 max-w-2xl">
                Perfect for partners, parties, or family feuds. It's easy to learn,
                but <span className="text-white font-bold italic">impossible</span>{" "}
                to put down once the sabotage starts.
              </p>
              <div className="flex flex-wrap lg:justify-end gap-2 sm:gap-3 md:gap-4">
                <div className="px-3 sm:px-4 py-2 bg-indigo-500/10 border border-indigo-500/30 rounded-xl text-indigo-300 font-bold text-xs sm:text-sm uppercase backdrop-blur-sm">
                  Quick Rounds
                </div>
                <div className="px-3 sm:px-4 py-2 bg-purple-500/10 border border-purple-500/30 rounded-xl text-purple-300 font-bold text-xs sm:text-sm uppercase backdrop-blur-sm">
                  Deep Strategy
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: The Einstein Mechanics - Strategic Appeal */}
        <section className="content-section min-h-[100svh] flex flex-col justify-center py-16 md:py-20">
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left: Content */}
            <div className="flex flex-col gap-6 md:gap-8 order-2 lg:order-1">
              <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white tracking-tighter uppercase leading-[0.85]">
                CLEVERNESS
                <br />
                REQUIRED.
              </h2>

              <div className="grid grid-cols-1 gap-4 md:gap-6">
                <div className="group bg-slate-900/60 backdrop-blur-sm p-6 sm:p-8 rounded-2xl md:rounded-3xl border border-white/5 hover:border-indigo-500/50 transition-all">
                  <div className="flex items-start gap-4">
                    <div className="text-3xl sm:text-4xl flex-shrink-0">🧠</div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-black text-indigo-400 mb-2 uppercase italic">
                        Risk Analysis
                      </h3>
                      <p className="text-slate-300 font-medium text-sm sm:text-base">
                        Is that 10-point card a ladder to victory or a trap waiting to
                        collapse your score?
                      </p>
                    </div>
                  </div>
                </div>

                <div className="group bg-slate-900/60 backdrop-blur-sm p-6 sm:p-8 rounded-2xl md:rounded-3xl border border-white/5 hover:border-violet-500/50 transition-all">
                  <div className="flex items-start gap-4">
                    <div className="text-3xl sm:text-4xl flex-shrink-0">🎭</div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-black text-violet-400 mb-2 uppercase italic">
                        Tactical Bluffs
                      </h3>
                      <p className="text-slate-300 font-medium text-sm sm:text-base">
                        Call "Count" when they least expect it. Watch them scramble as
                        the Void claims their points.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="group bg-gradient-to-r from-indigo-900/40 to-purple-900/40 backdrop-blur-sm p-6 sm:p-8 rounded-2xl md:rounded-3xl border border-indigo-500/30">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="text-3xl sm:text-4xl flex-shrink-0">⚔️</div>
                    <div>
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white uppercase italic tracking-tighter mb-2">
                        Strategic Sabotage
                      </h3>
                      <p className="text-slate-200 text-base sm:text-lg font-medium">
                        Force rivals to double their hand. Swap anomalies. Manipulate
                        the count.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Card Images Grid - Auto-rotating */}
            <div className="relative h-[400px] sm:h-[500px] lg:h-[600px] order-1 lg:order-2">
              {/* Background glow */}
              <div className="absolute inset-0 bg-indigo-600/10 blur-[120px] rounded-full" />

              {/* Card Grid */}
              <div className="relative w-full h-full">
                {outgoingCardSet !== null && (
                  <div
                    key={`out-${outgoingCardSet}`}
                    className="absolute inset-0 grid grid-cols-2 gap-4 p-4"
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
                          index === 1 ? "mt-8" : index === 2 ? "-mt-8" : ""
                        }`}
                      >
                        <img
                          src={card.src}
                          alt={card.alt}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-contain rounded-xl"
                          style={{
                            filter:
                              "drop-shadow(0 0 20px rgba(255, 255, 255, 0.3)) drop-shadow(0 15px 40px rgba(99, 102, 241, 0.4))",
                          }}
                        />
                      </div>
                    ))}
                  </div>
                )}

                <div
                  key={`in-${currentCardSet}`}
                  className="absolute inset-0 grid grid-cols-2 gap-4 p-4"
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
                        index === 1 ? "mt-8" : index === 2 ? "-mt-8" : ""
                      }`}
                    >
                      <img
                        src={card.src}
                        alt={card.alt}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-contain rounded-xl"
                        style={{
                          filter:
                            "drop-shadow(0 0 20px rgba(255, 255, 255, 0.3)) drop-shadow(0 15px 40px rgba(99, 102, 241, 0.4))",
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
              The first edition is almost gone. Join the waitlist to secure the game
              that will redefine your table.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center relative z-10">
              <Link
                href="#waitlist-form"
                className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-500 text-white text-xl sm:text-2xl md:text-3xl font-black px-8 sm:px-12 md:px-16 py-4 sm:py-6 md:py-8 rounded-2xl sm:rounded-[2rem] shadow-[0_20px_50px_rgba(79,70,229,0.4)] transform hover:scale-105 md:hover:scale-110 transition-all active:scale-95 flex items-center justify-center"
              >
                I WANT IN
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

        {/* Section 4: Waitlist - Centered / Bottom */}
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


