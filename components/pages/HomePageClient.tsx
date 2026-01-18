"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { HeroSection } from "@/components/home/HeroSection";
import { StickyCTA } from "@/components/ui/StickyCTA";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

// Dynamically import components below the fold to reduce unused JS and initial payload
const CardCarousel = dynamic(() => import("@/components/home/CardCarousel").then(mod => mod.CardCarousel), {
  loading: () => <div className="min-h-[400px]" />,
  ssr: true
});

const KickstarterSection = dynamic(() => import("@/components/home/KickstarterSection").then(mod => mod.KickstarterSection), {
  loading: () => <div className="min-h-[300px]" />,
  ssr: true
});

const WaitlistSection = dynamic(() => import("@/components/home/WaitlistSection").then(mod => mod.WaitlistSection), {
  loading: () => <div className="min-h-[400px]" />,
  ssr: true
});

const SiteFooter = dynamic(() => import("@/components/layout/SiteFooter").then(mod => mod.SiteFooter), {
  ssr: true
});

gsap.registerPlugin(ScrollTrigger);

export default function HomePageClient() {
  const mainRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (!mainRef.current || !prefersReducedMotion) return;
    const sections = mainRef.current.querySelectorAll<HTMLElement>(".content-section");
    sections.forEach((section) => {
      section.style.opacity = "1";
      section.style.transform = "none";
    });
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (!mainRef.current || prefersReducedMotion) return;

    // Detect mobile to optimize animations
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

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
              // Disable scrub on mobile for better performance
              scrub: isMobile ? false : 1,
              toggleActions: "play none none reverse",
              // Optimize for mobile
              invalidateOnRefresh: true,
              once: isMobile, // Only animate once on mobile
            },
          }
        );
      });
    }, mainRef);

    return () => {
      ctx.revert();
      // Clean up ScrollTriggers created in this context only
      // Don't kill all triggers as other components may be using them
    };
  }, [prefersReducedMotion]);

  return (
    <main ref={mainRef} className="relative bg-transparent overflow-x-hidden">
      {/* Header - Fixed */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <SiteHeader />
      </div>

      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Card Carousel Section (Manual wheel deck gallery) */}
      <CardCarousel />

      {/* 3. Kickstarter Coming Soon */}
      <div className="content-section overflow-x-hidden">
        <KickstarterSection />
      </div>

      {/* 4. Waitlist - Now Joining Kickstarter */}
      <div className="content-section py-8 sm:py-12 md:py-16 lg:py-20 overflow-x-hidden">
        <WaitlistSection />
      </div>

      {/* Footer */}
      <SiteFooter />

      {/* Sticky CTA */}
      <StickyCTA />

      {/* SEO-Optimized H1 - Visible but subtle */}
      <h1 className="sr-only">
        Void Count: New Card Game 2026 | Strategic Card Game for Family & Friends | Best New Card Games | Card Games
      </h1>
    </main>
  );
}
