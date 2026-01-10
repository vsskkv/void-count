"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { WaitlistSection } from "@/components/home/WaitlistSection";
import { CardCarousel } from "@/components/home/CardCarousel";
import { HeroSection } from "@/components/home/HeroSection";
import { KickstarterSection } from "@/components/home/KickstarterSection";
import { StickyCTA } from "@/components/ui/StickyCTA";

gsap.registerPlugin(ScrollTrigger);

export default function HomePageClient() {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mainRef.current) return;

    const ctx = gsap.context(() => {
      // Animate content sections entering
      const sections = gsap.utils.toArray<HTMLElement>(".content-section");
      sections.forEach((section) => {
        gsap.fromTo(
          section,
          {
            opacity: 0,
            y: 30,
          },
          {
            opacity: 1,
            y: 0,
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

      {/* 2. Card Carousel Section (Manual wheel deck gallery) */}
      <CardCarousel />

      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 flex flex-col">
        {/* 3. Kickstarter Coming Soon */}
        <div className="content-section">
          <KickstarterSection />
        </div>

        {/* 4. Waitlist - Now Joining Kickstarter */}
        <div className="content-section py-16 md:py-20">
          <WaitlistSection />
        </div>

        {/* Footer */}
        <div className="mt-auto">
          <SiteFooter />
        </div>
      </div>

      {/* Sticky CTA */}
      <StickyCTA />

      {/* Visually Hidden H1 for SEO */}
      <h1 className="sr-only">
        Void Count: A Strategic Card Game Built for Sabotage and Big Laughs
      </h1>
    </main>
  );
}
