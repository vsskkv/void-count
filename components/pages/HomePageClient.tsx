"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { HeroSection } from "@/components/home/HeroSection";
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

// Lazy load StickyCTA - only appears after scroll
const StickyCTA = dynamic(() => import("@/components/ui/StickyCTA").then(mod => mod.StickyCTA), {
  ssr: false, // No need to SSR - it's scroll-dependent
});

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

    // Detect mobile FIRST to avoid loading heavy animations
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    
    // On mobile, skip animations entirely to prevent crashes
    if (isMobile) {
      // Ensure content is visible on mobile (in case CSS fails)
      const sections = mainRef.current.querySelectorAll<HTMLElement>(".content-section");
      sections.forEach((section) => {
        section.style.opacity = "1";
        section.style.transform = "none";
      });
      return;
    }

    // Desktop only: Lazy load GSAP for scroll animations
    // Initial styles are set via CSS (.content-section class) to prevent hydration mismatch
    Promise.all([
      import("gsap"),
      import("gsap/ScrollTrigger")
    ]).then(([gsapModule, scrollTriggerModule]) => {
      const gsap = gsapModule.default;
      const ScrollTrigger = scrollTriggerModule.ScrollTrigger;
      
      if (typeof window !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
      }

      const ctx = gsap.context(() => {
        const sections = gsap.utils.toArray<HTMLElement>(".content-section");
        
        sections.forEach((section) => {
          gsap.to(
            section,
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              scrollTrigger: {
                trigger: section,
                start: "top 95%",
                end: "top 70%",
                scrub: 1,
                toggleActions: "play none none reverse",
                invalidateOnRefresh: true,
              },
            }
          );
        });
      }, mainRef);

      return () => {
        ctx.revert();
      };
    }).catch((error) => {
      // If GSAP fails to load, show content anyway
      console.error("GSAP failed to load:", error);
      const sections = mainRef.current?.querySelectorAll<HTMLElement>(".content-section");
      sections?.forEach((section) => {
        section.style.opacity = "1";
        section.style.transform = "none";
      });
    });
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
      <div className="content-section overflow-x-hidden" suppressHydrationWarning>
        <KickstarterSection />
      </div>

      {/* 4. Waitlist - Now Joining Kickstarter */}
      <div className="content-section py-8 sm:py-12 md:py-16 lg:py-20 overflow-x-hidden" suppressHydrationWarning>
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
