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

/**
 * SafeImage wrapper to bypass the React 19 / Next.js 15+ type conflict 
 */
const SafeImage = (props: any) => {
  const ImageComponent = Image as any;
  return <ImageComponent {...props} />;
};

export default function HomePage() {
  const mainRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const cardContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mainRef.current || !cardRef.current || !cardContainerRef.current) return;

    const ctx = gsap.context(() => {
      // Set initial state to show the back of the card (180 degrees)
      gsap.set(cardRef.current, { rotateY: 180 });

      // Initial entrance animation
      gsap.from(cardRef.current, {
        y: 200,
        opacity: 0,
        duration: 2,
        ease: "power3.out",
      });

      // Scroll-driven rotation: Starts at 180 (Back) and ends at 1080 (Front)
      // This performs 2.5 full rotations
      gsap.to(cardRef.current, {
        rotateY: 180 + (360 * 2) + 180, 
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
        
        {/* Section 1: Hero Intro - Punchy & Enthusiastic */}
        <section className="content-section min-h-screen flex flex-col justify-center items-start pt-32 pb-20 pointer-events-auto px-4">
          <div className="max-w-md md:max-w-xl backdrop-blur-md bg-slate-950/60 p-6 md:p-10 rounded-2xl md:rounded-3xl border border-indigo-500/30 overflow-hidden relative shadow-[0_0_50px_rgba(79,70,229,0.2)]">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-500/20 to-transparent pointer-events-none" />
            
            <div className="relative mb-6 md:mb-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
               <img
                  src="/void-count-logo.png"
                  alt="Void Count logo"
                  width={100}
                  height={100}
                  className="relative z-10 mix-blend-screen drop-shadow-[0_0_15px_rgba(168,85,247,0.5)] w-24 md:w-[120px]"
                />
                <div className="bg-indigo-500/20 px-3 py-1 rounded-full border border-indigo-500/40 text-[10px] md:text-xs font-bold text-indigo-300 tracking-widest uppercase">
                  Ages 7+ • 2-8 Players
                </div>
            </div>
            <h1 className="relative z-10 text-4xl md:text-7xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white via-indigo-100 to-purple-200 leading-tight mb-4 md:mb-6">
              SURVIVE THE <br/>COLLAPSE.
            </h1>
            <p className="relative z-10 text-lg md:text-2xl text-slate-200 mb-6 md:mb-8 font-medium leading-relaxed">
              The ultimate cosmic race of <span className="text-indigo-400 font-bold">risk</span>, <span className="text-purple-400 font-bold">strategy</span>, and <span className="text-cyan-400 font-bold">timing</span>.
            </p>
            <div className="relative z-10 flex gap-4">
              <div className="px-6 py-3 bg-white text-slate-950 font-black rounded-xl hover:scale-105 transition-transform cursor-default text-sm md:text-base">
                SCROLL TO PLAY
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: The Core Hook - High Stakes */}
        <section className="content-section min-h-screen flex flex-col justify-center items-end text-right pointer-events-auto px-4">
          <div className="max-w-md md:max-w-lg backdrop-blur-md bg-slate-950/80 p-6 md:p-10 rounded-2xl md:rounded-[2.5rem] border border-purple-500/30 shadow-2xl relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-purple-600/20 blur-[100px] rounded-full" />
            
            <h2 className="text-3xl md:text-6xl font-black mb-4 md:mb-6 text-white tracking-tighter italic">
              0 IS YOUR <br/><span className="text-purple-500 underline decoration-purple-500/50">HERO.</span>
            </h2>
            <p className="text-lg md:text-2xl text-slate-200 leading-relaxed font-light">
              In the Void, the lowest total wins. Collect <span className="text-white font-bold">Void Cards</span> to hit zero, but beware—the Void is always counting down.
            </p>
            <div className="mt-6 md:mt-8 flex justify-end gap-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-10 h-14 md:w-12 md:h-16 rounded-lg border-2 border-purple-500/40 bg-purple-950/20 flex items-center justify-center text-purple-300 font-black text-sm md:text-base">0</div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 3: The Three Pillars of Victory */}
        <section className="content-section min-h-screen flex flex-col justify-center items-start pointer-events-auto px-4">
          <div className="flex flex-col gap-6 md:gap-8 max-w-xl w-full">
            <h2 className="text-3xl md:text-6xl font-black text-white tracking-tighter mb-2 md:mb-4 uppercase italic">
              MASTER THE <br/>MECHANICS.
            </h2>
            
            <div className="group bg-slate-900/60 border-l-4 border-l-indigo-500 p-6 md:p-8 rounded-r-xl md:rounded-r-2xl backdrop-blur-sm hover:bg-indigo-900/20 transition-all cursor-default">
              <h3 className="text-2xl md:text-3xl font-black text-indigo-400 mb-1 md:mb-2 uppercase tracking-tighter italic">1. DRAFT</h3>
              <p className="text-slate-200 text-lg md:text-xl font-medium">Build your hand with precision. Every anomaly you hold is a tool—or a trap.</p>
            </div>
            
            <div className="group bg-slate-900/60 border-l-4 border-l-violet-500 p-6 md:p-8 rounded-r-xl md:rounded-r-2xl backdrop-blur-sm hover:bg-violet-900/20 transition-all cursor-default">
               <h3 className="text-2xl md:text-3xl font-black text-violet-400 mb-1 md:mb-2 uppercase tracking-tighter italic">2. SABOTAGE</h3>
               <p className="text-slate-200 text-lg md:text-xl font-medium">Friendships end here. Force your rivals to draw cards and watch their totals skyrocket.</p>
            </div>
            
            <div className="group bg-slate-900/60 border-l-4 border-l-sky-500 p-6 md:p-8 rounded-r-xl md:rounded-r-2xl backdrop-blur-sm hover:bg-sky-900/20 transition-all cursor-default">
               <h3 className="text-2xl md:text-3xl font-black text-sky-400 mb-1 md:mb-2 uppercase tracking-tighter italic">3. CALL COUNT</h3>
               <p className="text-slate-200 text-lg md:text-xl font-medium">Got 7 points or less? Strike first. If you're the lowest, you win. If you're not... 20 point penalty.</p>
            </div>
          </div>
        </section>

        {/* Section 4: Call to Action - Waitlist focus */}
        <section className="content-section min-h-[80vh] flex flex-col items-center justify-center text-center pointer-events-auto px-4 py-20">
           <div className="max-w-3xl w-full backdrop-blur-xl bg-indigo-950/20 p-8 md:p-12 rounded-[2rem] md:rounded-[3rem] border-2 border-white/10 shadow-[0_0_100px_rgba(99,102,241,0.1)] relative">
            <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/5 to-purple-500/5 rounded-[2rem] md:rounded-[3rem]" />
            <h2 className="text-4xl md:text-8xl font-black mb-6 md:mb-8 text-white tracking-tighter uppercase italic leading-tight">
              Ready to <br/><span className="text-indigo-500">Enter?</span>
            </h2>
            <p className="text-lg md:text-2xl mb-8 md:mb-12 text-slate-200 font-medium max-w-xl mx-auto">
              The first edition is almost here. Join the waitlist to be first in line when the Void opens.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center">
              <button 
                onClick={() => document.getElementById('waitlist-form')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-500 text-white text-xl md:text-2xl font-black px-8 md:px-12 py-4 md:py-6 rounded-2xl shadow-xl transform hover:scale-105 transition-all"
              >
                Join the Waitlist
              </button>
              <PrimaryButton href="/how-to-play" variant="secondary" className="w-full sm:w-auto text-lg md:text-xl px-8 md:px-10 py-4 md:py-5 rounded-2xl border-white/20 hover:bg-white/10">
                How to Play
              </PrimaryButton>
            </div>
          </div>
        </section>

        {/* Section 5: Waitlist - Centered / Bottom */}
        <div className="pb-20">
          <WaitlistSection />
        </div>

        {/* Footer - Inside the scroll container at the very end */}
        <div className="pointer-events-auto mt-auto">
          <SiteFooter />
        </div>

      </div>
    </main>
  );
}
