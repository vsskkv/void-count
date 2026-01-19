"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

interface Particle {
  id: number;
  size: number;
  color: string;
  left: string;
  top: string;
  duration: number;
  delay: number;
  drift: number;
}

export const VoidParticles = () => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      setParticles([]);
      return;
    }

    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    
    // On mobile, we significantly reduce or disable particles to prevent memory crashes
    if (isMobile) {
      setParticles([]);
      return;
    }

    const particleCount = 32;

    // Colors: Indigo, Purple, and Soft White/Blue
    const colors = ["#818cf8", "#a855f7", "#ffffff", "#6366f1"];
    
    const newParticles = [...Array(particleCount)].map((_, i) => ({
      id: i,
      size: Math.random() * 3 + 1.5, // 1.5px to 4.5px
      color: colors[Math.floor(Math.random() * colors.length)],
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: 16 + Math.random() * 24,
      delay: Math.random() * -30,
      drift: (Math.random() - 0.5) * (isMobile ? 80 : 140),
    }));
    
    setParticles(newParticles);
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (particles.length === 0 || prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      particles.forEach((p) => {
        gsap.to(`#void-particle-${p.id}`, {
          y: -220,
          x: `+=${p.drift}`,
          opacity: 0,
          duration: p.duration,
          repeat: -1,
          ease: "none",
          delay: p.delay,
        });
      });
    });

    return () => ctx.revert();
  }, [particles, prefersReducedMotion]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden" aria-hidden="true">
      {particles.map((p) => (
        <div
          key={p.id}
          id={`void-particle-${p.id}`}
          className="absolute rounded-full blur-[0.8px]"
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
            left: p.left,
            top: p.top,
            opacity: 0.3, // Slightly higher base opacity
            boxShadow: `0 0 10px ${p.color}44`, // Soft glow
          }}
        />
      ))}
    </div>
  );
};
