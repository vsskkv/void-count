"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { GameCard } from "@/components/3d/GameCard";

const CARD_DATA = [
  {
    id: "one",
    front: "/void-count-one-card.png",
    back: "/void-count-card-back.png",
    name: "One",
  },
  {
    id: "two",
    front: "/void-count-two-card.png",
    back: "/void-count-card-back.png",
    name: "Two",
  },
  {
    id: "three",
    front: "/void-count-three-card.png",
    back: "/void-count-card-back.png",
    name: "Three",
  },
  {
    id: "four",
    front: "/void-count-four-card.png",
    back: "/void-count-card-back.png",
    name: "Four",
  },
  {
    id: "five",
    front: "/void-count-five-card.png",
    back: "/void-count-card-back.png",
    name: "Five",
  },
  {
    id: "six",
    front: "/void-count-six-card.png",
    back: "/void-count-card-back.png",
    name: "Six",
  },
  {
    id: "seven",
    front: "/void-count-seven-card.png",
    back: "/void-count-card-back.png",
    name: "Seven",
  },
  {
    id: "eight",
    front: "/void-count-eight-card.png",
    back: "/void-count-card-back.png",
    name: "Eight",
  },
  {
    id: "nine",
    front: "/void-count-nine-card.png",
    back: "/void-count-card-back.png",
    name: "Nine",
  },
  {
    id: "toss",
    front: "/void-count-toss-card.png",
    back: "/void-count-card-back.png",
    name: "Toss",
  },
  {
    id: "sabotage",
    front: "/void-count-sabotage-card.png",
    back: "/void-count-card-back.png",
    name: "Sabotage",
  },
  {
    id: "take-two",
    front: "/void-count-take-two-card.png",
    back: "/void-count-card-back.png",
    name: "Take Two",
  },
  {
    id: "double",
    front: "/void-count-double-your-hand-card.png",
    back: "/void-count-card-back.png",
    name: "Double Your Hand",
  },
  {
    id: "blue-glacier",
    front: "/void-count-blue-glacier-card.png",
    back: "/void-count-card-back.png",
    name: "Blue Glacier",
  },
  {
    id: "desert",
    front: "/void-count-desert-horizon-card.png",
    back: "/void-count-card-back.png",
    name: "Desert Horizon",
  },
  {
    id: "toxic",
    front: "/void-count-toxic-swamp-card.png",
    back: "/void-count-card-back.png",
    name: "Toxic Swamp",
  },
  {
    id: "volcanix",
    front: "/void-count-volcanix-lava-card.png",
    back: "/void-count-card-back.png",
    name: "Volcanix Lava",
  },
];

export const CardCarousel = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const cardContainerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardInnerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const totalCards = CARD_DATA.length;
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const radius = isMobile ? 350 : 650; // Distance from centre to each card
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
        
        // Rotate card to face OUTWARD from centre
        const faceOutwardRotation = (angle * 180) / Math.PI;

        // Position and orient the card in the circle
        gsap.set(container, {
          x,
          z,
          rotateY: faceOutwardRotation,
          force3D: true, // Force hardware acceleration
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
          duration: 10, // Slower flip for better performance on mobile
          repeat: -1,
          ease: "none",
          delay: i * 0.4, // Stagger by 0.4s per card
          force3D: true,
        });
      });

      // ═══════════════════════════════════════════════════════════
      // STEP 3: Carousel wheel rotates continuously
      // ═══════════════════════════════════════════════════════════
      gsap.to(carouselRef.current, {
        rotationY: -360, // Full rotation
        duration: 60, // Slow, majestic rotation (60 seconds per full spin)
        repeat: -1,
        ease: "none",
        force3D: true,
      });
    }, carouselRef);

    return () => ctx.revert();
  }, [radius, angleStep]);

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
      force3D: true, // Force 3D for smoother rotation
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
    <section className="relative min-h-[100svh] flex flex-col items-center justify-center overflow-hidden bg-slate-950 py-20 px-4">
      {/* Ambient Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.15),transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(168,85,247,0.08),transparent_50%)] pointer-events-none" />
      
      {/* Title */}
      <div className="w-full text-center z-20 pointer-events-none px-4 pt-8 pb-12 md:pb-16 lg:pb-20">
        <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter uppercase">
          Explore the <span className="text-indigo-400 italic">Deck ↓</span>
        </h2>
      </div>

      {/* 3D Carousel Stage */}
      <div 
        className="perspective-[1500px] sm:perspective-[2000px] w-full max-w-7xl flex items-center justify-center flex-1"
        style={{ 
          height: "clamp(300px, 40vh, 600px)",
          minHeight: "300px"
        }}
      >
        <div
          ref={carouselRef}
          className="relative preserve-3d will-change-transform"
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
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 preserve-3d will-change-transform"
              style={{
                transformStyle: "preserve-3d",
                width: "clamp(100px, 15vw, 280px)",
                height: "clamp(140px, 21vw, 392px)",
              }}
            >
              <GameCard
                variant="standard"
                frontSrc={card.front}
                backSrc={card.back}
                frontAlt={`Void Count strategic card game – ${card.name} card`}
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
        className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-indigo-600/20 backdrop-blur-md border-2 border-indigo-500/40 text-white hover:bg-indigo-600/40 hover:border-indigo-400 hover:scale-110 transition-all disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.2)] hover:shadow-[0_0_40px_rgba(99,102,241,0.4)] group active:scale-95"
        aria-label="Previous card"
      >
        <svg 
          className="w-6 h-6 sm:w-8 sm:h-8 group-hover:scale-110 transition-transform" 
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
        className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-indigo-600/20 backdrop-blur-md border-2 border-indigo-500/40 text-white hover:bg-indigo-600/40 hover:border-indigo-400 hover:scale-110 transition-all disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.2)] hover:shadow-[0_0_40px_rgba(99,102,241,0.4)] group active:scale-95"
        aria-label="Next card"
      >
        <svg 
          className="w-6 h-6 sm:w-8 sm:h-8 group-hover:scale-110 transition-transform" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Card Position Indicators */}
      <div className="w-full flex justify-center z-20 pt-8 pb-4">
        <div className="flex gap-1.5 sm:gap-2">
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
                  ? "bg-indigo-400 w-6 sm:w-8 h-1.5 sm:h-2"
                  : "bg-slate-600 hover:bg-slate-500 w-1.5 sm:w-2 h-1.5 sm:h-2"
              } rounded-full`}
              aria-label={`Go to ${card.name}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
