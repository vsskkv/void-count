"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Slide in content
      gsap.from(contentRef.current, {
        x: alignment === "left" ? -30 : 30,
        opacity: 0,
        duration: 0.5,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      });

      // Scale up visual
      if (visualRef.current) {
        gsap.from(visualRef.current, {
          scale: 0.9,
          opacity: 0,
          duration: 0.5,
          delay: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [alignment]);

  return (
    <section
      ref={sectionRef}
      className={`min-h-[50vh] md:min-h-[60vh] flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 py-12 md:py-16 px-4 md:px-6 ${
        alignment === "right" ? "md:flex-row-reverse" : ""
      }`}
    >
      <div ref={contentRef} className="flex-1 max-w-xl w-full">
        <div className="flex items-center gap-3 md:gap-4 mb-4">
          {icon && <div className="text-indigo-400 text-2xl md:text-3xl">{icon}</div>}
          <h2 className="text-2xl md:text-4xl font-bold text-white leading-tight">{title}</h2>
        </div>
        <div className="text-slate-300 text-base md:text-lg leading-relaxed space-y-4">
          {description}
        </div>
      </div>

      {cardVisual && (
        <div
          ref={visualRef}
          className="flex-1 flex justify-center items-center min-h-[250px] md:min-h-[300px] w-full max-w-md"
        >
          {cardVisual}
        </div>
      )}
    </section>
  );
};

