"use client";

import { useEffect, useRef } from "react";
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

export default function HomePage() {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mainRef.current) return;

    const ctx = gsap.context(() => {
      // Animate content sections entering from left and right
      const sections = gsap.utils.toArray<HTMLElement>(".content-section");
      sections.forEach((section, i) => {
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

  return (
    <main ref={mainRef} className="relative bg-slate-950 overflow-x-hidden">
      {/* Header - Fixed */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <SiteHeader />
      </div>

      {/* Card Carousel Hero Section */}
      <CardCarousel />

      {/* Scrollable Content Sections */}
      <div className="relative z-20 w-full max-w-[95%] mx-auto px-4 md:px-12 pointer-events-none flex flex-col overflow-x-hidden">

        {/* Section 1: Social Proof - The "Friends" Hook */}
        <section className="content-section min-h-[100svh] flex flex-col justify-center items-end text-right pointer-events-auto px-4">
          <div className="max-w-md md:max-w-xl backdrop-blur-md bg-slate-950/80 p-8 md:p-14 rounded-[3rem] border border-purple-500/30 shadow-2xl relative overflow-hidden text-right">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-purple-600/20 blur-[100px] rounded-full" />
            
            <h2 className="text-4xl md:text-7xl font-black mb-6 text-white tracking-tighter leading-[0.9] uppercase italic">
              RUIN YOUR <br/>FRIENDS' <br/><span className="text-purple-500">TOTALS.</span>
            </h2>
            <p className="text-lg md:text-2xl text-slate-200 leading-relaxed font-light mb-8">
              Perfect for partners, parties, or family feuds. It's easy to learn, but <span className="text-white font-bold italic">impossible</span> to put down once the sabotage starts.
            </p>
            <div className="flex justify-end gap-3 md:gap-4">
              <div className="px-4 py-2 bg-indigo-500/10 border border-indigo-500/30 rounded-xl text-indigo-300 font-bold text-sm uppercase">Quick Rounds</div>
              <div className="px-4 py-2 bg-purple-500/10 border border-purple-500/30 rounded-xl text-purple-300 font-bold text-sm uppercase">Deep Strategy</div>
            </div>
          </div>
        </section>

        {/* Section 2: The Einstein Mechanics - Strategic Appeal */}
        <section className="content-section min-h-[100svh] flex flex-col justify-center items-start pointer-events-auto px-4">
          <div className="flex flex-col gap-6 md:gap-10 max-w-2xl w-full">
            <h2 className="text-4xl md:text-8xl font-black text-white tracking-tighter mb-2 md:mb-4 uppercase leading-[0.85]">
              CLEVERNESS<br/>
              REQUIRED.
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div className="group bg-slate-900/60 p-8 rounded-3xl border border-white/5 hover:border-indigo-500/50 transition-all">
                <div className="text-4xl mb-4">🧠</div>
                <h3 className="text-2xl font-black text-indigo-400 mb-2 uppercase italic">Risk Analysis</h3>
                <p className="text-slate-300 font-medium">Is that 10-point card a ladder to victory or a trap waiting to collapse your score?</p>
              </div>
              
              <div className="group bg-slate-900/60 p-8 rounded-3xl border border-white/5 hover:border-violet-500/50 transition-all">
                <div className="text-4xl mb-4">🎭</div>
                <h3 className="text-2xl font-black text-violet-400 mb-2 uppercase italic">Tactical Bluffs</h3>
                <p className="text-slate-300 font-medium">Call "Count" when they least expect it. Watch them scramble as the Void claims their points.</p>
              </div>

              <div className="md:col-span-2 group bg-gradient-to-r from-indigo-900/40 to-purple-900/40 p-8 rounded-3xl border border-indigo-500/30">
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-4xl">⚔️</div>
                  <h3 className="text-3xl font-black text-white uppercase italic tracking-tighter">Strategic Sabotage</h3>
                </div>
                <p className="text-slate-200 text-lg md:text-xl font-medium">
                  Force rivals to double their hand. Swap anomalies. Manipulate the count. 
                  In Void Count, the most <span className="text-white underline">resourceful</span> player always survives the collapse.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: High-Energy CTA */}
        <section className="content-section min-h-[90svh] flex flex-col items-center justify-center text-center pointer-events-auto px-4 py-20">
           <div className="max-w-4xl w-full backdrop-blur-2xl bg-indigo-950/10 p-10 md:p-20 rounded-[3rem] md:rounded-[5rem] border-2 border-white/10 shadow-[0_0_120px_rgba(99,102,241,0.2)] relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 via-transparent to-purple-500/10" />
            
            <h2 className="text-5xl md:text-9xl font-black mb-8 text-white tracking-tighter uppercase italic leading-[0.8] scale-y-110">
              UPGRADE<br/>
              <span className="text-indigo-500">GAME NIGHT.</span>
            </h2>
            
            <p className="text-xl md:text-3xl mb-12 text-slate-200 font-medium max-w-2xl mx-auto leading-tight">
              The first edition is almost gone. Join the waitlist to secure the game that will redefine your table.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center relative z-10">
              <Link 
                href="#waitlist-form"
                className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-500 text-white text-2xl md:text-3xl font-black px-12 md:px-16 py-6 md:py-8 rounded-[2rem] shadow-[0_20px_50px_rgba(79,70,229,0.4)] transform hover:scale-110 transition-all active:scale-95 flex items-center justify-center"
              >
                I WANT IN
              </Link>
              <PrimaryButton href="/how-to-play" variant="secondary" className="w-full sm:w-auto text-xl md:text-2xl px-10 md:px-12 py-5 md:py-7 rounded-[2rem] border-white/20 hover:bg-white/10">
                SEE THE RULES
              </PrimaryButton>
            </div>
          </div>
        </section>

        {/* Section 4: Waitlist - Centered / Bottom */}
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
