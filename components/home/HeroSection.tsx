"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { STRIPE_CHECKOUT_URL } from "@/lib/constants";

export const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".hero-logo", {
        opacity: 0,
        scale: 0.9,
        duration: 0.9,
        ease: "power3.out",
      });

      gsap.from(".hero-heading", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.15,
        ease: "power3.out",
      });

      gsap.from(".hero-subtitle", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        delay: 0.3,
        ease: "power3.out",
      });

      gsap.from(".hero-cta", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        delay: 0.45,
        ease: "power3.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden px-6 pt-16 pb-20 md:pt-24 md:pb-28"
    >
      {/* Spacey background gradient */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_0,#1d4ed8_0,transparent_55%),radial-gradient(circle_at_90%_100%,#06b6d4_0,transparent_55%)] opacity-60" />
      <div className="pointer-events-none absolute inset-0 bg-slate-950/90" />
      {/* Stars background texture overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-[url('/stars-bg.svg')] opacity-20 -z-10" />

      <div className="relative max-w-5xl mx-auto text-center flex flex-col items-center">
        <div className="hero-logo mb-8 flex justify-center">
          <Image
            src="/void-count-logo.png"
            alt="Void Count logo"
            width={260}
            height={260}
            priority
          />
        </div>

        <h1 className="hero-heading text-3xl md:text-4xl lg:text-5xl font-semibold mb-4 text-slate-50">
          A cosmic card game of risk, timing, and the creeping Void.
        </h1>

        <p className="hero-subtitle text-base md:text-lg text-slate-200 max-w-2xl mx-auto mb-8">
          Draft powerful anomalies, push the Void Count higher, and decide when
          to trigger it. Do you burn your opponents or go down with them?
        </p>

        <div className="hero-cta flex justify-center flex-wrap gap-4">
          <PrimaryButton href={STRIPE_CHECKOUT_URL}>Pre-order the deck</PrimaryButton>
          <PrimaryButton href="/how-to-play" variant="secondary">
            Learn how to play
          </PrimaryButton>
        </div>
      </div>
    </section>
  );
};
