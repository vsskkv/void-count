"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { STRIPE_CHECKOUT_URL } from "@/lib/constants";

export const CallToActionSection = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Use ScrollTrigger if you want it to animate on scroll, 
      // but for now just standard from() is fine as per request
      // Ideally we'd check intersection or use ScrollTrigger, 
      // but user asked for simple "gsap.from" inside useEffect.
      // We'll keep it simple.
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
             gsap.from(".cta-card", {
              y: 40,
              opacity: 0,
              duration: 0.9,
              ease: "power3.out",
              overwrite: true
            });
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.2 });

      if (sectionRef.current) {
        observer.observe(sectionRef.current);
      }

      return () => observer.disconnect();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="px-6 py-16 md:py-20 bg-slate-900/70 border-t border-slate-800/50">
      <div className="max-w-4xl mx-auto cta-card opacity-100 rounded-2xl border border-slate-700 bg-gradient-to-r from-slate-900/80 to-indigo-900/60 p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-[0_0_40px_rgba(79,70,229,0.15)]">
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold mb-2 text-white">
            Be first to enter the Void.
          </h2>
          <p className="text-slate-300 text-sm md:text-base max-w-lg">
            Void Count is launching soon. Join the early access list to get
            launch discounts, playtest invites, and print-and-play files.
          </p>
        </div>
        <div className="flex flex-col gap-3 w-full md:w-auto">
          <button 
            onClick={() => document.getElementById('waitlist-form')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-8 py-3 rounded-lg transition-all"
          >
            Join the Waitlist
          </button>
        </div>
      </div>
    </section>
  );
};
