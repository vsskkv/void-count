"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

gsap.registerPlugin(ScrollTrigger);

interface RuleSectionProps {
  title: string;
  description: React.ReactNode; // Allow rich text/components
  icon?: React.ReactNode;
  alignment?: "left" | "right";
  cardVisual?: React.ReactNode;
}

export const RuleSection: React.FC<RuleSectionProps> = ({
  title,
  description,
  icon,
  alignment = "left",
  cardVisual,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (!sectionRef.current) return;

    if (prefersReducedMotion) {
      if (contentRef.current) {
        gsap.set(contentRef.current, { opacity: 1, x: 0 });
      }
      if (visualRef.current) {
        gsap.set(visualRef.current, { opacity: 1, scale: 1 });
      }
      return;
    }

    // Detect mobile to optimize animations
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

    const ctx = gsap.context(() => {
      // Slide in content
      gsap.from(contentRef.current, {
        x: alignment === "left" ? -30 : 30,
        opacity: 0,
        duration: isMobile ? 0.3 : 0.5,
        ease: isMobile ? "power2.out" : "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 90%",
          toggleActions: "play none none reverse",
          once: isMobile, // Only animate once on mobile for better performance
          invalidateOnRefresh: true,
        },
      });

      // Scale up visual
      if (visualRef.current) {
        gsap.from(visualRef.current, {
          scale: 0.9,
          opacity: 0,
          duration: isMobile ? 0.3 : 0.5,
          delay: isMobile ? 0 : 0.1,
          ease: isMobile ? "power2.out" : "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
            once: isMobile,
            invalidateOnRefresh: true,
          },
        });
      }
    }, sectionRef);

    return () => {
      ctx.revert();
      // Context revert already cleans up ScrollTriggers created in this context
    };
  }, [alignment, prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      className={`min-h-[40vh] sm:min-h-[50vh] md:min-h-[60vh] flex flex-col md:flex-row items-center justify-center gap-6 sm:gap-8 md:gap-12 lg:gap-16 py-8 sm:py-10 md:py-12 lg:py-16 px-4 sm:px-6 ${
        alignment === "right" ? "md:flex-row-reverse" : ""
      }`}
    >
      <div ref={contentRef} className="flex-1 max-w-xl w-full">
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4 mb-3 sm:mb-4">
          {icon && <div className="text-indigo-400 text-xl sm:text-2xl md:text-3xl shrink-0">{icon}</div>}
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight">{title}</h2>
        </div>
        <div className="text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed space-y-3 sm:space-y-4">
          {description}
        </div>
      </div>

      {cardVisual && (
        <div
          ref={visualRef}
          className="flex-1 flex justify-center items-center min-h-[200px] sm:min-h-[250px] md:min-h-[300px] w-full max-w-md"
        >
          {cardVisual}
        </div>
      )}
    </section>
  );
};

