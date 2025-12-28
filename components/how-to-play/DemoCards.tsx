"use client";

import { useRef, useEffect } from 'react';
import gsap from 'gsap';

export const DemoCard = ({ 
  value, 
  type = "point", 
  label,
  color = "indigo" 
}: { 
  value?: string | number, 
  type?: "point" | "power" | "void",
  label?: string,
  color?: "indigo" | "violet" | "sky" | "rose"
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

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
  
  useEffect(() => {
    if(!deckRef.current) return;
    
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 2 });
    const topCard = deckRef.current.querySelector('.top-card');
    
    tl.to(topCard, { x: 120, y: -20, rotation: 5, duration: 0.6, ease: "power2.out" })
      .to(topCard, { x: 0, y: 0, rotation: 0, duration: 0.4, delay: 0.5, ease: "power2.in" });
      
  }, []);

  return (
    <div ref={deckRef} className="relative w-64 h-48 flex items-center justify-center">
      {/* Deck */}
      <div className="absolute left-8 top-1/2 -translate-y-1/2 w-32 h-48 bg-slate-800 rounded-xl border border-slate-600 shadow-xl">
        <div className="absolute inset-0 flex items-center justify-center">
           <div className="w-12 h-12 rounded-full border-2 border-slate-600 flex items-center justify-center opacity-30">
             <span className="text-xs font-bold">VC</span>
           </div>
        </div>
      </div>
      {/* Top Card (Animated) */}
      <div className="top-card absolute left-8 top-1/2 -translate-y-1/2 w-32 h-48 bg-indigo-900 rounded-xl border border-indigo-500 shadow-xl flex items-center justify-center z-10">
         <div className="w-12 h-12 rounded-full border-2 border-indigo-400 flex items-center justify-center opacity-50">
             <span className="text-xs font-bold text-indigo-200">VC</span>
         </div>
      </div>
    </div>
  );
};

export const PowerCardVisual = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if(!containerRef.current) return;
        const cards = containerRef.current.children;
        
        gsap.fromTo(cards, 
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, stagger: 0.2, ease: "back.out(1.7)", repeat: -1, repeatDelay: 3, yoyo: true }
        );
    }, []);

    return (
        <div ref={containerRef} className="flex gap-4">
            <DemoCard value="T2" label="Take Two" type="power" color="rose" />
            <DemoCard value="X" label="Toss" type="power" color="sky" />
        </div>
    );
};

export const CountCallVisual = () => {
  return (
    <div className="flex gap-2 items-end">
       <div className="animate-bounce">
          <DemoCard value="0" type="void" color="violet" />
       </div>
       <div className="animate-bounce" style={{ animationDelay: '0.1s' }}>
          <DemoCard value="3" label="Points" color="indigo" />
       </div>
       <div className="animate-bounce" style={{ animationDelay: '0.2s' }}>
          <DemoCard value="4" label="Points" color="indigo" />
       </div>
       <div className="ml-4 flex flex-col justify-center h-48">
          <span className="text-4xl font-bold text-white">= 7</span>
          <span className="text-green-400 font-bold uppercase tracking-wider">Safe to Call!</span>
       </div>
    </div>
  )
}

