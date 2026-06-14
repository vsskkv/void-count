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
    if (typeof window === "undefined") return;

    let animationFrameId: number | null = null;

    if (prefersReducedMotion) {
      animationFrameId = window.requestAnimationFrame(() => setParticles([]));
      return () => {
        if (animationFrameId !== null) {
          window.cancelAnimationFrame(animationFrameId);
        }
      };
    }

    const isMobile = window.innerWidth < 768;

    if (isMobile) {
      animationFrameId = window.requestAnimationFrame(() => setParticles([]));
      return () => {
        if (animationFrameId !== null) {
          window.cancelAnimationFrame(animationFrameId);
        }
      };
    }

    animationFrameId = window.requestAnimationFrame(() => {
      const particleCount = 32;
      const colors = ["#818cf8", "#a855f7", "#ffffff", "#6366f1"];

      const newParticles = [...Array(particleCount)].map((_, i) => ({
        id: i,
        size: Math.random() * 3 + 1.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        duration: 16 + Math.random() * 24,
        delay: Math.random() * -30,
        drift: (Math.random() - 0.5) * 140,
      }));

      setParticles(newParticles);
    });

    return () => {
      if (animationFrameId !== null) {
        window.cancelAnimationFrame(animationFrameId);
      }
    };
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (particles.length === 0 || prefersReducedMotion) {
      return;
    }

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
