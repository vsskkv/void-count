"use client";

import { SiteHeader } from "@/components/layout/SiteHeader";
import { HeroSection } from "@/components/home/HeroSection";
import { CardCarousel } from "@/components/home/CardCarousel";
import { KickstarterSection } from "@/components/home/KickstarterSection";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { StickyCTA } from "@/components/ui/StickyCTA";

export default function HomePageClient() {
  return (
    <main className="relative overflow-x-hidden bg-transparent">
      <div className="fixed top-0 left-0 right-0 z-50">
        <SiteHeader />
      </div>

      <HeroSection />
      <CardCarousel />
      <KickstarterSection />
      <SiteFooter />
      <StickyCTA />

      <h1 className="sr-only">
        Void Count is a strategic card game launching soon after Kickstarter.
      </h1>
    </main>
  );
}
