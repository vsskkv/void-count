"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { GameCard } from "@/components/3d/GameCard";

type CardCategory = "Power" | "10 point";

const CARD_DATA = [
  { id: "toss", front: "/Toss v1.png", name: "Toss", category: "Power" as CardCategory },
  { id: "sabotage", front: "/Sabotage v1.png", name: "Sabotage", category: "Power" as CardCategory },
  { id: "take-two", front: "/Take Two v1.png", name: "Take Two", category: "Power" as CardCategory },
  { id: "double", front: "/Double Your Hand v1.png", name: "Double Up", category: "Power" as CardCategory },
  { id: "blue-glacier", front: "/Blue Glacier v1.png", name: "Blue Glacier", category: "10 point" as CardCategory },
  { id: "desert", front: "/Desert Horizon v1.png", name: "Desert Horizon", category: "10 point" as CardCategory },
  { id: "toxic", front: "/Toxic Swamp v1.png", name: "Toxic Swamp", category: "10 point" as CardCategory },
  { id: "volcanix", front: "/Volcanix Lava v1.png", name: "Volcanix Lava", category: "10 point" as CardCategory },
];

const CATEGORIES: CardCategory[] = ["Power", "10 point"];

export const CardCarousel = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const cardContainerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardInnerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState<CardCategory | "All">("All");
  const [wheelRotation, setWheelRotation] = useState(0);

  const filteredCards = activeCategory === "All" 
    ? CARD_DATA 
    : CARD_DATA.filter(c => c.category === activeCategory);

  const totalCards = filteredCards.length;
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const radius = isMobile ? 350 : 700; 
  const angleStep = (2 * Math.PI) / totalCards;

  // Update card flips and scaling based on wheel rotation
  useEffect(() => {
    if (!carouselRef.current) return;

    const ctx = gsap.context(() => {
      cardInnerRefs.current.forEach((inner, i) => {
        if (!inner) return;
        
        // Calculate each card's absolute rotation
        const cardBaseAngle = angleStep * i;
        const cardBaseRotation = (cardBaseAngle * 180) / Math.PI;
        let absoluteRotation = wheelRotation + cardBaseRotation;
        
        // Normalize to 0-360 range
        absoluteRotation = ((absoluteRotation % 360) + 360) % 360;
        
        // If card is facing away (between 90-270 degrees), flip it to show back
        const shouldFlip = absoluteRotation > 90 && absoluteRotation < 270;
        const flipRotation = shouldFlip ? 180 : 0;

        gsap.set(inner, {
          rotateY: flipRotation,
          force3D: true,
        });
      });

      // Update card scaling - front-facing card should be bigger
      cardContainerRefs.current.forEach((container, i) => {
        if (!container) return;
        
        const cardBaseAngle = angleStep * i;
        const cardBaseRotation = (cardBaseAngle * 180) / Math.PI;
        let absoluteRotation = wheelRotation + cardBaseRotation;
        
        // Normalize to 0-360 range
        absoluteRotation = ((absoluteRotation % 360) + 360) % 360;
        
        // Calculate distance from front (0 degrees)
        // Distance is the minimum angle to get to 0 or 360
        let distanceFromFront = absoluteRotation;
        if (distanceFromFront > 180) {
          distanceFromFront = 360 - distanceFromFront;
        }
        
        // Scale based on distance from front
        // 1.5x at front (0°), 0.8x at back (180°)
        // Use cosine for smooth scaling curve - more dramatic difference
        const normalizedDistance = distanceFromFront / 180; // 0 to 1
        const scale = 0.8 + (0.7 * Math.cos(normalizedDistance * Math.PI / 2));

        gsap.set(container, {
          scale,
          force3D: true,
        });
      });
    }, carouselRef);

    return () => ctx.revert();
  }, [wheelRotation, angleStep, totalCards]);

  useEffect(() => {
    if (!carouselRef.current) return;

    const ctx = gsap.context(() => {
      // POSITION CARDS IN A 3D CIRCLE
      cardContainerRefs.current.forEach((container, i) => {
        if (!container) return;
        
        const angle = angleStep * i;
        const x = Math.sin(angle) * radius;
        const z = Math.cos(angle) * radius;
        
        // Face the cards OUTWARD
        const rotationY = (angle * 180) / Math.PI;

        gsap.set(container, {
          x,
          z,
          rotateY: rotationY,
          force3D: true,
        });
      });

      // Align wheel so current index is at the front
      const initialWheelRotation = currentIndex * -(360 / totalCards);
      gsap.set(carouselRef.current, { rotationY: initialWheelRotation });
      setWheelRotation(initialWheelRotation);
    }, carouselRef);

    return () => ctx.revert();
  }, [radius, angleStep, filteredCards, currentIndex, totalCards]);

  const rotate = (direction: 1 | -1) => {
    if (isAnimating || !carouselRef.current) return;
    setIsAnimating(true);

    const nextIndex = (currentIndex + direction + totalCards) % totalCards;
    const currentWheelRotation = gsap.getProperty(carouselRef.current, "rotationY") as number;
    const targetRotation = currentWheelRotation + (direction * -(360 / totalCards));

    gsap.to(carouselRef.current, {
      rotationY: targetRotation,
      duration: 1.2,
      ease: "power3.inOut",
      force3D: true,
      onUpdate: () => {
        const currentRot = gsap.getProperty(carouselRef.current, "rotationY") as number;
        setWheelRotation(currentRot);
      },
      onComplete: () => {
        setCurrentIndex(nextIndex);
        setWheelRotation(targetRotation);
        setIsAnimating(false);
      },
    });
  };

  return (
    <section className="relative min-h-[100svh] flex flex-col items-center justify-center overflow-hidden bg-slate-950 py-24 px-4">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.1),transparent_70%)] pointer-events-none" />
      
      <div className="w-full text-center z-20 mb-12">
        <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter uppercase italic mb-8 scale-y-110 text-center flex justify-center">
          EXPLORE THE <span className="ml-4 text-indigo-500 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent italic">DECK</span>
        </h2>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-12 relative z-30">
          {["All", ...CATEGORIES].map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat as any);
                setCurrentIndex(0);
                if (carouselRef.current) gsap.set(carouselRef.current, { rotationY: 0 });
              }}
              className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all border-2 ${
                activeCategory === cat 
                ? "bg-indigo-600 border-indigo-500 text-white shadow-[0_0_20px_rgba(79,70,229,0.4)]" 
                : "bg-white/5 border-white/10 text-slate-400 hover:border-white/20"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="w-full max-w-7xl relative flex items-center justify-center h-[500px] sm:h-[700px]">
        <div className="perspective-[3000px] w-full h-full flex items-center justify-center relative">
          <div
            ref={carouselRef}
            className="relative preserve-3d will-change-transform w-full h-full flex items-center justify-center"
            style={{ 
              transformStyle: "preserve-3d",
              transform: `translateZ(-${radius}px)` 
            }}
          >
            {filteredCards.map((card, i) => (
              <div
                key={`${activeCategory}-${card.id}`}
                ref={(el) => { cardContainerRefs.current[i] = el; }}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{
                  transformStyle: "preserve-3d",
                  width: isMobile ? "160px" : "280px",
                  aspectRatio: "2.5/3.5"
                }}
              >
                <GameCard
                  variant="standard"
                  frontSrc={card.front}
                  backSrc="/Back V1.png"
                  className="w-full h-full pointer-events-none"
                  manualRef={(el) => { cardInnerRefs.current[i] = el; }}
                />
              </div>
            ))}
          </div>

          {/* Navigation Controls */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-2 sm:px-8 z-40 pointer-events-none">
            <button 
              onClick={() => rotate(-1)} 
              disabled={isAnimating}
              className="pointer-events-auto w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-slate-900/80 border border-white/10 text-white flex items-center justify-center hover:bg-indigo-600 transition-all hover:scale-110 active:scale-95 shadow-xl backdrop-blur-md disabled:opacity-50"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button 
              onClick={() => rotate(1)} 
              disabled={isAnimating}
              className="pointer-events-auto w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-slate-900/80 border border-white/10 text-white flex items-center justify-center hover:bg-indigo-600 transition-all hover:scale-110 active:scale-95 shadow-xl backdrop-blur-md disabled:opacity-50"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
