"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { GameCard } from "@/components/3d/GameCard";

const CARD_DATA = [
  { id: "one", front: "/One v1.png", back: "/card-back.png", name: "One" },
  { id: "two", front: "/Two v1.png", back: "/card-back.png", name: "Two" },
  { id: "three", front: "/Three v1.png", back: "/card-back.png", name: "Three" },
  { id: "four", front: "/Four v1.png", back: "/card-back.png", name: "Four" },
  { id: "five", front: "/Five v1.png", back: "/card-back.png", name: "Five" },
  { id: "six", front: "/Six v1.png", back: "/card-back.png", name: "Six" },
  { id: "seven", front: "/Seven v1.png", back: "/card-back.png", name: "Seven" },
  { id: "eight", front: "/Eight v1.png", back: "/card-back.png", name: "Eight" },
  { id: "nine", front: "/Nine v1.png", back: "/card-back.png", name: "Nine" },
  { id: "toss", front: "/Toss v1.png", back: "/card-back.png", name: "Toss" },
  { id: "sabotage", front: "/Sabotage v1.png", back: "/card-back.png", name: "Sabotage" },
  { id: "take-two", front: "/Take Two v1.png", back: "/card-back.png", name: "Take Two" },
  { id: "double", front: "/Double Your Hand v1.png", back: "/card-back.png", name: "Double Your Hand" },
  { id: "blue-glacier", front: "/Blue Glacier v1.png", back: "/card-back.png", name: "Blue Glacier" },
  { id: "desert", front: "/Desert Horizon v1.png", back: "/card-back.png", name: "Desert Horizon" },
  { id: "toxic", front: "/Toxic Swamp v1.png", back: "/card-back.png", name: "Toxic Swamp" },
  { id: "volcanix", front: "/Volcanix Lava v1.png", back: "/card-back.png", name: "Volcanix Lava" },
];

export const CardCarousel = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const cardContainerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardInnerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const totalCards = CARD_DATA.length;
  const radius = 650; // Distance from center to each card
  const angleStep = (2 * Math.PI) / totalCards; // Angle between cards

  useEffect(() => {
    if (!carouselRef.current) return;

    const ctx = gsap.context(() => {
      // ═══════════════════════════════════════════════════════════
      // STEP 1: Position each card in a 3D circle
      // ═══════════════════════════════════════════════════════════
      cardContainerRefs.current.forEach((container, i) => {
        if (!container) return;

        const angle = angleStep * i;
        const x = Math.sin(angle) * radius;
        const z = Math.cos(angle) * radius;
        
        // Rotate card to face OUTWARD from center
        const faceOutwardRotation = (angle * 180) / Math.PI;

        // Position and orient the card in the circle
        gsap.set(container, {
          x,
          z,
          rotateY: faceOutwardRotation,
        });
      });

      // ═══════════════════════════════════════════════════════════
      // STEP 2: Each card continuously flips (shows front → back → front)
      // ═══════════════════════════════════════════════════════════
      cardInnerRefs.current.forEach((inner, i) => {
        if (!inner) return;

        // Stagger the start of each card's flip for a wave effect
        gsap.to(inner, {
          rotateY: 360,
          duration: 8, // Each card takes 8 seconds for a full flip
          repeat: -1,
          ease: "none",
          delay: i * 0.3, // Stagger by 0.3s per card
        });
      });

      // ═══════════════════════════════════════════════════════════
      // STEP 3: Carousel wheel rotates continuously
      // ═══════════════════════════════════════════════════════════
      gsap.to(carouselRef.current, {
        rotationY: -360, // Full rotation
        duration: 50, // Slow, majestic rotation (50 seconds per full spin)
        repeat: -1,
        ease: "none",
      });
    }, carouselRef);

    return () => ctx.revert();
  }, []);

  // Manual rotation with arrow buttons
  const rotate = (direction: 1 | -1) => {
    if (isAnimating || !carouselRef.current) return;
    setIsAnimating(true);

    // Get current rotation and add one card step
    const currentRotation = gsap.getProperty(carouselRef.current, "rotationY") as number;
    const targetRotation = currentRotation + (direction * -(360 / totalCards));

    gsap.to(carouselRef.current, {
      rotationY: targetRotation,
      duration: 1,
      ease: "power2.inOut",
      overwrite: true,
      onComplete: () => {
        setCurrentIndex((prev) => (prev + direction + totalCards) % totalCards);
        setIsAnimating(false);
      },
    });
  };

  // Keyboard controls
  useEffect(() => {
    const handleKeyboard = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") rotate(-1);
      if (e.key === "ArrowRight") rotate(1);
    };

    window.addEventListener("keydown", handleKeyboard);
    return () => window.removeEventListener("keydown", handleKeyboard);
  }, [isAnimating]);

  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden bg-slate-950 py-20">
      {/* Ambient Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.15),transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(168,85,247,0.08),transparent_50%)] pointer-events-none" />
      
      {/* Title Overlay */}
      <div className="absolute top-16 md:top-24 left-1/2 -translate-x-1/2 text-center z-20 pointer-events-none px-4">
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter mb-3 uppercase">
          Explore the <span className="text-indigo-400 italic">Deck</span>
        </h2>
        <p className="text-slate-300 text-base md:text-lg font-medium">
          Use arrows or keyboard to navigate • Watch each card flip
        </p>
      </div>

      {/* 3D Carousel Stage */}
      <div 
        className="perspective-[2000px] w-full flex items-center justify-center"
        style={{ height: "clamp(400px, 60vh, 700px)" }}
      >
        <div
          ref={carouselRef}
          className="relative preserve-3d"
          style={{
            transformStyle: "preserve-3d",
            width: "100%",
            height: "100%",
          }}
        >
          {CARD_DATA.map((card, i) => (
            <div
              key={card.id}
              ref={(el) => { cardContainerRefs.current[i] = el; }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 preserve-3d"
              style={{
                transformStyle: "preserve-3d",
                width: "clamp(180px, 22vw, 280px)",
                height: "clamp(252px, 30.8vw, 392px)",
              }}
            >
              <GameCard
                variant="standard"
                frontSrc={card.front}
                backSrc={card.back}
                manualRef={(el: HTMLDivElement | null) => {
                  cardInnerRefs.current[i] = el;
                }}
                className="w-full h-full pointer-events-none"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={() => rotate(-1)}
        disabled={isAnimating}
        className="fixed left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 md:w-16 md:h-16 rounded-full bg-indigo-600/20 backdrop-blur-md border-2 border-indigo-500/40 text-white hover:bg-indigo-600/40 hover:border-indigo-400 hover:scale-110 transition-all disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center shadow-[0_0_30px_rgba(99,102,241,0.3)] hover:shadow-[0_0_50px_rgba(99,102,241,0.6)] group"
        aria-label="Previous card"
      >
        <svg 
          className="w-6 h-6 md:w-8 md:h-8 group-hover:scale-110 transition-transform" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={() => rotate(1)}
        disabled={isAnimating}
        className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 md:w-16 md:h-16 rounded-full bg-indigo-600/20 backdrop-blur-md border-2 border-indigo-500/40 text-white hover:bg-indigo-600/40 hover:border-indigo-400 hover:scale-110 transition-all disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center shadow-[0_0_30px_rgba(99,102,241,0.3)] hover:shadow-[0_0_50px_rgba(99,102,241,0.6)] group"
        aria-label="Next card"
      >
        <svg 
          className="w-6 h-6 md:w-8 md:h-8 group-hover:scale-110 transition-transform" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Card Position Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {CARD_DATA.map((card, i) => (
          <button
            key={card.id}
            onClick={() => {
              const diff = i - currentIndex;
              if (diff !== 0 && !isAnimating) {
                const direction = diff > 0 ? 1 : -1;
                rotate(direction);
              }
            }}
            className={`transition-all ${
              i === currentIndex
                ? "bg-indigo-400 w-8 h-2"
                : "bg-slate-600 hover:bg-slate-500 w-2 h-2"
            } rounded-full`}
            aria-label={`Go to ${card.name}`}
          />
        ))}
      </div>

      {/* Floating Card Name Label */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
        <div className="px-6 py-2 bg-slate-900/80 backdrop-blur-md border border-indigo-500/30 rounded-full">
          <p className="text-indigo-300 font-bold text-sm md:text-base uppercase tracking-widest">
            {CARD_DATA[currentIndex]?.name}
          </p>
        </div>
      </div>
    </section>
  );
};
