"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { WaitlistSection } from "@/components/home/WaitlistSection";
import { CardCarousel } from "@/components/home/CardCarousel";
import { SEOContentSections } from "@/components/home/SEOContentSections";
import { HeroSection } from "@/components/home/HeroSection";
import { SocialProofSection } from "@/components/home/SocialProofSection";
import { HowItWorksSection } from "@/components/home/HowItWorksSection";
import { GameplayProofSection } from "@/components/home/GameplayProofSection";
import { KickstarterSection } from "@/components/home/KickstarterSection";
import { RulesPreviewSection } from "@/components/home/RulesPreviewSection";
import { StickyCTA } from "@/components/ui/StickyCTA";
import { FAQSection } from "@/components/home/FAQSection";

gsap.registerPlugin(ScrollTrigger);

export default function HomePageClient() {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mainRef.current) return;

    const ctx = gsap.context(() => {
      // Animate content sections entering from left and right
      const sections = gsap.utils.toArray<HTMLElement>(".content-section");
      sections.forEach((section, i) => {
        const direction = i % 2 === 0 ? -50 : 50; 
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
              scrub: 1,
              toggleActions: "play none none reverse",
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

      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Gameplay Proof (Video + Addictive bullets) */}
      <GameplayProofSection />

      {/* 3. How It Works (The 3 steps) */}
      <HowItWorksSection />

      {/* 4. Rules Preview (Mini learn in 2 mins) */}
      <RulesPreviewSection />

      {/* 5. Card Carousel Section (Filtered deck gallery) */}
      <CardCarousel />

      {/* 6. Social Proof (Verdicts + Stats) */}
      <SocialProofSection />

      {/* 7. Kickstarter Coming Soon (What's in the box) */}
      <KickstarterSection />

      {/* 8. FAQ Section */}
      <FAQSection />

      {/* Visually Hidden H1 for SEO */}
      <h1 className="sr-only">
        Void Count: A Strategic Card Game Built for Sabotage, Bluffing and Big Laughs
      </h1>

      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 flex flex-col overflow-x-hidden">
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

      {/* Sticky CTA */}
      <StickyCTA />
    </main>
  );
}
