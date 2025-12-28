"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { STRIPE_CHECKOUT_URL } from "@/lib/constants";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { GameCard } from "@/components/3d/GameCard";
import { WaitlistSection } from "@/components/home/WaitlistSection";

gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  const mainRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const cardContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mainRef.current || !cardRef.current || !cardContainerRef.current) return;

    const ctx = gsap.context(() => {
      // Initial entrance animation
      gsap.from(cardRef.current, {
        y: 200,
        opacity: 0,
        duration: 2,
        ease: "power3.out",
      });

      // Scroll-driven rotation
      gsap.to(cardRef.current, {
        rotateY: 360 * 2, // Rotate 2 full circles
        rotateX: 10,
        ease: "none",
        scrollTrigger: {
          trigger: mainRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      });

      // Animate content sections entering from left and right
      const sections = gsap.utils.toArray<HTMLElement>(".content-section");
      sections.forEach((section, i) => {
        // Push content further out: -100 for left, 100 for right
        // Only applies to the first 3 sections which alternate
        // Intro (0), Void (1), Mechanics (2)
        
        // Waitlist section (which might be index 3 now) should fade up
        const isSideSection = i < 3; 
        
        if (isSideSection) {
          const direction = i % 2 === 0 ? -100 : 100; 
          gsap.fromTo(section, 
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
                start: "top 70%",
                end: "top 40%",
                scrub: true,
              },
            }
          );
        } else {
          // Bottom sections fade up
          gsap.fromTo(section,
            {
              opacity: 0,
              y: 100
            },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              scrollTrigger: {
                trigger: section,
                start: "top 80%",
                end: "top 50%",
                scrub: true
              }
            }
          );
        }
      });

    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={mainRef} className="relative bg-slate-950 min-h-[400vh]">
      {/* Header - Fixed */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <SiteHeader />
      </div>

      {/* Fixed 3D Card Container - Centered */}
      <div 
        ref={cardContainerRef}
        className="fixed inset-0 flex items-center justify-center pointer-events-none z-0"
      >
        <GameCard ref={cardRef} variant="hero" className="transform-gpu" />
      </div>

      {/* Scrollable Content Sections */}
      {/* Increased max-width to push content to edges */}
      <div className="relative z-20 w-full max-w-[90%] md:max-w-[95%] mx-auto px-4 md:px-12 pointer-events-none flex flex-col">
        
        {/* Section 1: Intro - Left aligned */}
        <section className="content-section min-h-screen flex flex-col justify-center items-start pt-32 pointer-events-auto">
          <div className="max-w-md md:max-w-lg backdrop-blur-sm bg-slate-950/40 p-8 rounded-2xl border border-slate-800/50 overflow-hidden relative">
            {/* Subtle internal glow for card */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-500/10 to-transparent pointer-events-none" />
            
            <div className="relative mb-8">
               {/* Logo Glow Effect */}
               <div className="absolute -inset-8 bg-indigo-500/30 blur-2xl rounded-full opacity-60 mix-blend-screen pointer-events-none" />
               <Image
                  src="/void-count-logo.png"
                  alt="Void Count logo"
                  width={160}
                  height={160}
                  priority
                  className="relative z-10 mix-blend-screen drop-shadow-[0_0_15px_rgba(99,102,241,0.5)]"
                />
            </div>
            <h1 className="relative z-10 text-4xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-indigo-200 drop-shadow-sm mb-6">
              A Cosmic Card Game of Risk and Timing
            </h1>
            <p className="relative z-10 text-xl text-slate-300 mb-8">
              Scroll to explore the Void.
            </p>
          </div>
        </section>

        {/* Section 2: The Void - Right aligned */}
        <section className="content-section min-h-screen flex flex-col justify-center items-end text-right pointer-events-auto">
          <div className="max-w-md md:max-w-lg backdrop-blur-md bg-slate-950/60 p-8 rounded-3xl border border-slate-800 shadow-2xl">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
              The Void is Counting Down
            </h2>
            <p className="text-lg md:text-xl text-slate-200 leading-relaxed">
              Every game is a race against an invisible threat. Play safe, or feed the Void with high-risk cards that might take everyone out.
              <br/><br/>
              <span className="text-indigo-400 font-semibold">Will you survive the collapse?</span>
            </p>
          </div>
        </section>

        {/* Section 3: Mechanics - Left aligned */}
        <section className="content-section min-h-screen flex flex-col justify-center items-start pointer-events-auto">
          <div className="flex flex-col gap-6 max-w-md md:max-w-lg w-full">
            <div className="bg-slate-900/80 border border-slate-700 p-6 rounded-xl backdrop-blur-sm hover:border-indigo-500 transition-colors">
              <h3 className="text-2xl font-bold text-indigo-400 mb-2">Draft</h3>
              <p className="text-slate-300 text-lg">Select anomalies and build your hand carefully. Every card counts.</p>
            </div>
            <div className="bg-slate-900/80 border border-slate-700 p-6 rounded-xl backdrop-blur-sm hover:border-violet-500 transition-colors">
               <h3 className="text-2xl font-bold text-violet-400 mb-2">Risk</h3>
               <p className="text-slate-300 text-lg">Push the Void Count higher to gain power. Is it worth the danger?</p>
            </div>
            <div className="bg-slate-900/80 border border-slate-700 p-6 rounded-xl backdrop-blur-sm hover:border-sky-500 transition-colors">
               <h3 className="text-2xl font-bold text-sky-400 mb-2">Survive</h3>
               <p className="text-slate-300 text-lg">Be the last one standing when the count hits zero.</p>
            </div>
          </div>
        </section>

        {/* Section 4: CTA - Centered / Bottom */}
        {/* HIDDEN FOR WAITLIST FOCUS */}
        {/* <section className="content-section min-h-[50vh] flex flex-col items-center justify-center text-center pt-32 pb-10 pointer-events-auto">
           <div className="max-w-2xl backdrop-blur-md bg-slate-950/60 p-10 rounded-3xl border border-indigo-500/30 shadow-[0_0_50px_rgba(79,70,229,0.2)]">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Ready to Enter?
            </h2>
            <p className="text-xl mb-8 text-slate-300">
              Join the early access list or pre-order the deck today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <PrimaryButton href={STRIPE_CHECKOUT_URL} className="text-lg px-10 py-4">
                Pre-order Now
              </PrimaryButton>
              <PrimaryButton href="/how-to-play" variant="secondary" className="text-lg px-10 py-4">
                Learn More
              </PrimaryButton>
            </div>
          </div>
        </section> */}

        {/* Section 5: Waitlist - Centered / Bottom */}
        <WaitlistSection />

        {/* Footer - Inside the scroll container at the very end */}
        <div className="pointer-events-auto mt-auto">
          <SiteFooter />
        </div>

      </div>
    </main>
  );
}
