"use client";

import Image from 'next/image';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { usePrefersReducedMotion } from '@/lib/usePrefersReducedMotion';

export const DemoCard = ({ 
  value, 
  type = "point", 
  label,
  color = "indigo",
  src
}: { 
  value?: string | number, 
  type?: "point" | "power" | "void",
  label?: string,
  color?: "indigo" | "violet" | "sky" | "rose",
  src?: string
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  if (src) {
    return (
      <div 
        ref={cardRef}
        className="relative w-32 h-48 rounded-xl overflow-hidden transform transition-transform hover:scale-105 bg-slate-950"
      >
        <Image 
          src={src} 
          alt={label ? `Void Count strategic card game – ${label}` : "Void Count card"} 
          fill
          className="block w-full h-full object-cover rounded-[inherit] bg-slate-950"
          sizes="128px"
          loading="lazy"
        />
      </div>
    );
  }

  const getColorClasses = () => {
    switch (color) {
      case "violet": return "from-violet-500/20 to-violet-900/40 border-violet-500/50 shadow-violet-500/20";
      case "sky": return "from-sky-500/20 to-sky-900/40 border-sky-500/50 shadow-sky-500/20";
      case "rose": return "from-rose-500/20 to-rose-900/40 border-rose-500/50 shadow-rose-500/20";
      default: return "from-indigo-500/20 to-indigo-900/40 border-indigo-500/50 shadow-indigo-500/20";
    }
  };

  return (
    <div 
      ref={cardRef}
      className={`relative w-32 h-48 rounded-xl border bg-gradient-to-br backdrop-blur-md flex flex-col items-center justify-center shadow-lg transform transition-transform hover:scale-105 ${getColorClasses()}`}
    >
      <div className="absolute inset-1 rounded-lg border border-white/10" />
      
      {type === "void" ? (
        <div className="text-center">
          <span className="block text-4xl font-bold text-white mb-1">0</span>
          <span className="text-xs uppercase tracking-widest text-slate-300">VOID</span>
        </div>
      ) : (
        <div className="text-center">
          <span className="block text-4xl font-bold text-white mb-1">{value}</span>
          <span className="text-[10px] uppercase tracking-widest text-slate-300 max-w-[80px] leading-tight">{label || "Point Card"}</span>
        </div>
      )}
    </div>
  );
};

export const DrawPileVisual = () => {
  const deckRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  
  useEffect(() => {
    if(!deckRef.current || prefersReducedMotion) return;
    
    // Detect mobile to optimize animations
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    
    const topCard = deckRef.current.querySelector('.top-card');
    if (!topCard) return;
    
    let tl: gsap.core.Timeline;
    
    // Simpler, limited animation on mobile
    if (isMobile) {
      // Just animate once on mobile
      tl = gsap.timeline({ repeat: 0 });
      tl.to(topCard, { x: 80, y: -15, rotation: 3, duration: 0.5, ease: "power2.out" })
        .to(topCard, { x: 0, y: 0, rotation: 0, duration: 0.3, ease: "power2.in" });
    } else {
      // Desktop: repeat animation
      tl = gsap.timeline({ repeat: 2, repeatDelay: 2 });
      tl.to(topCard, { x: 120, y: -20, rotation: 5, duration: 0.6, ease: "power2.out" })
        .to(topCard, { x: 0, y: 0, rotation: 0, duration: 0.4, delay: 0.5, ease: "power2.in" });
    }
    
    return () => {
      tl.kill();
    };
  }, [prefersReducedMotion]);

  return (
    <div ref={deckRef} className="relative w-64 h-48 flex items-center justify-center">
      {/* Deck */}
      <div className="absolute left-8 top-1/2 -translate-y-1/2 w-32 h-48 rounded-xl overflow-hidden shadow-xl border border-white/10 bg-slate-900">
        <Image 
          src="/optimized/back-v2.jpg" 
          alt="Void Count strategic card game deck - Draw Pile" 
          fill
          className="w-full h-full object-cover"
          sizes="128px"
          loading="lazy"
        />
      </div>
      {/* Top Card (Animated) */}
      <div className="top-card absolute left-8 top-1/2 -translate-y-1/2 w-32 h-48 rounded-xl overflow-hidden shadow-xl border border-white/10 z-10 bg-slate-900">
        <Image 
          src="/optimized/back-v2.jpg" 
          alt="Void Count card being drawn - Strategic gameplay" 
          fill
          className="w-full h-full object-cover"
          sizes="128px"
          loading="lazy"
        />
      </div>
    </div>
  );
};

export const PowerCardVisual = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const prefersReducedMotion = usePrefersReducedMotion();

    useEffect(() => {
        if(!containerRef.current || prefersReducedMotion) return;
        
        // Detect mobile to optimize animations
        const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
        
        const cards = containerRef.current.children;
        
        // Only animate on desktop to prevent mobile performance issues
        if (!isMobile && cards.length > 0) {
            const animation = gsap.fromTo(cards, 
                { y: 20, opacity: 0 },
                { 
                    y: 0, 
                    opacity: 1, 
                    duration: 0.5, 
                    stagger: 0.2, 
                    ease: "back.out(1.7)", 
                    repeat: 2, // Limited repeats instead of infinite
                    repeatDelay: 2,
                    yoyo: true 
                }
            );
            
            return () => {
                animation.kill();
            };
        } else {
            // Just set initial state on mobile
            gsap.set(cards, { y: 0, opacity: 1 });
        }
    }, [prefersReducedMotion]);

    return (
        <div ref={containerRef} className="flex flex-wrap gap-3 sm:gap-4 justify-center">
            <DemoCard src="/optimized/take-two-v1.jpg" label="Take Two" />
            <DemoCard src="/optimized/toss-v1.jpg" label="Toss" />
            <DemoCard src="/optimized/sabotage-v1.jpg" label="Sabotage" />
            <DemoCard src="/optimized/double-your-hand-v1.jpg" label="Double Your Hand" />
        </div>
    );
};

export const CountCallVisual = () => {
  return (
    <div className="flex gap-2 items-end">
       <div className="animate-bounce">
          <DemoCard src="/One v1.png" label="1 Point" />
       </div>
       <div className="animate-bounce" style={{ animationDelay: '0.1s' }}>
          <DemoCard src="/Two v1.png" label="2 Points" />
       </div>
       <div className="animate-bounce" style={{ animationDelay: '0.2s' }}>
          <DemoCard src="/Four v1.png" label="4 Points" />
       </div>
       <div className="ml-4 flex flex-col justify-center h-48">
          <span className="text-4xl font-bold text-white">= 7</span>
          <span className="text-green-400 font-bold uppercase tracking-wider">Safe to Call!</span>
       </div>
    </div>
  )
}
