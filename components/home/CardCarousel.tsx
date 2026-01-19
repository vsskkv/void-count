"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { GameCard } from "@/components/3d/GameCard";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

type CardCategory = "Power" | "10 point";

const CARD_DATA = [
  { id: "toss", front: "/toss-v1.webp", name: "Toss", category: "Power" as CardCategory },
  { id: "sabotage", front: "/sabotage-v1.webp", name: "Sabotage", category: "Power" as CardCategory },
  { id: "take-two", front: "/take-two-v1.webp", name: "Take Two", category: "Power" as CardCategory },
  { id: "double", front: "/double-your-hand-v1.webp", name: "Double Up", category: "Power" as CardCategory },
  { id: "blue-glacier", front: "/blue-glacier-v1.webp", name: "Blue Glacier", category: "10 point" as CardCategory },
  { id: "desert", front: "/desert-horizon-v1.webp", name: "Desert Horizon", category: "10 point" as CardCategory },
  { id: "toxic", front: "/toxic-swamp-v1.webp", name: "Toxic Swamp", category: "10 point" as CardCategory },
  { id: "volcanix", front: "/volcanix-lava-v1.webp", name: "Volcanix Lava", category: "10 point" as CardCategory },
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
  const prefersReducedMotion = usePrefersReducedMotion();
  const allowMotion = !prefersReducedMotion;

  const filteredCards = activeCategory === "All" 
    ? CARD_DATA 
    : CARD_DATA.filter(c => c.category === activeCategory);

  const totalCards = filteredCards.length;
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Increased radius on mobile to show more of adjacent cards
  const radius = isMobile ? 220 : 700; 
  const angleStep = (2 * Math.PI) / totalCards;

  // Update card flips and scaling based on wheel rotation
  useEffect(() => {
    if (!allowMotion) return;
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
          // Disable force3D on mobile for better performance
          force3D: !isMobile,
        });
      });

      // Update card scaling - all cards fully opaque, only scale changes
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
        // More generous scaling on mobile to keep adjacent cards visible
        const normalizedDistance = distanceFromFront / 180; // 0 to 1
        const maxScale = isMobile ? 1.2 : 1.5;
        const minScale = isMobile ? 0.65 : 0.8;
        const scale = minScale + ((maxScale - minScale) * Math.cos(normalizedDistance * Math.PI / 2));
        
        // All cards fully opaque - no transparency
        gsap.set(container, {
          scale,
          opacity: 1,
          // Disable force3D on mobile for better performance
          force3D: !isMobile,
        });
      });
    }, carouselRef);

    return () => ctx.revert();
  }, [wheelRotation, angleStep, totalCards, allowMotion]);

  useEffect(() => {
    if (!allowMotion) return;
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
          // Disable force3D on mobile for better performance
          force3D: !isMobile,
        });
      });

      // Align wheel so current index is at the front
      const initialWheelRotation = currentIndex * -(360 / totalCards);
      gsap.set(carouselRef.current, { 
        rotationY: initialWheelRotation,
        // Disable force3D on mobile
        force3D: !isMobile,
      });
      setWheelRotation(initialWheelRotation);
    }, carouselRef);

    return () => ctx.revert();
  }, [radius, angleStep, filteredCards, currentIndex, totalCards, isMobile, allowMotion]);

  const rotate = (direction: 1 | -1) => {
    if (!allowMotion) return;
    if (isAnimating || !carouselRef.current) return;
    setIsAnimating(true);

    const nextIndex = (currentIndex + direction + totalCards) % totalCards;
    const currentWheelRotation = gsap.getProperty(carouselRef.current, "rotationY") as number;
    const targetRotation = currentWheelRotation + (direction * -(360 / totalCards));

    gsap.to(carouselRef.current, {
      rotationY: targetRotation,
      duration: isMobile ? 0.8 : 1.2, // Faster on mobile
      ease: isMobile ? "power2.inOut" : "power3.inOut", // Simpler easing on mobile
      force3D: !isMobile, // Disable force3D on mobile
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

  const reducedMotionLayout = (
    <section className="relative bg-transparent py-12 sm:py-16 md:py-20 px-4 sm:px-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.08),transparent_70%)] pointer-events-none" />
      <div className="w-full text-center z-20 mb-6 sm:mb-8 md:mb-10 relative">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tighter uppercase italic mb-4 sm:mb-6 md:mb-8 md:scale-y-110 text-center flex flex-wrap justify-center gap-2 sm:gap-4">
          <span>EXPLORE THE</span>
          <span className="text-indigo-500 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent italic">CARD GAME</span>
          <span>DECK</span>
        </h2>
        <p className="text-slate-200 text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-4 mb-4">
          Discover the cards from Void Count, one of the best new card games launching in 2026
        </p>

        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 mb-6 sm:mb-8 md:mb-10 relative z-30" role="tablist" aria-label="Card categories">
          {["All", ...CATEGORIES].map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat as CardCategory | "All");
                setCurrentIndex(0);
              }}
              role="tab"
              aria-selected={activeCategory === cat}
              className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all border-2 ${
                activeCategory === cat 
                  ? "bg-indigo-600 border-indigo-500 text-white shadow-[0_0_12px_rgba(79,70,229,0.3)]" 
                  : "bg-white/5 border-white/10 text-slate-300 hover:border-white/20"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6 relative z-20">
        {filteredCards.map((card) => (
          <div
            key={`${activeCategory}-${card.id}`}
            className="rounded-2xl border border-slate-800 bg-white/5 p-3 sm:p-4 flex flex-col items-center gap-3 shadow-[0_10px_30px_rgba(0,0,0,0.35)]"
          >
            <div className="w-full aspect-[2.5/3.5] overflow-hidden rounded-xl bg-slate-900/70">
              <img
                src={card.front}
                alt={`${card.name} card from Void Count new card game`}
                className="w-full h-full object-cover"
                width={320}
                height={448}
                loading={currentIndex === CARD_DATA.indexOf(card) ? "eager" : "lazy"}
                decoding="async"
                sizes="(min-width: 1024px) 200px, (min-width: 768px) 160px, 45vw"
              />
            </div>
            <div className="text-center space-y-1">
              <p className="text-white font-black uppercase tracking-tight text-xs sm:text-sm">{card.name}</p>
              <p className="text-[10px] uppercase tracking-widest text-slate-300 font-bold">{card.category}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );

  if (prefersReducedMotion) {
    return reducedMotionLayout;
  }

  return (
    <section className="relative min-h-[80svh] sm:min-h-[90svh] md:min-h-[100svh] flex flex-col items-center justify-center overflow-hidden bg-transparent py-12 sm:py-16 md:py-24 px-4 sm:px-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.1),transparent_70%)] pointer-events-none" />
      
      <div className="w-full text-center z-20 mb-6 sm:mb-8 md:mb-12">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-7xl font-black text-white tracking-tighter uppercase italic mb-4 sm:mb-6 md:mb-8 md:scale-y-110 text-center flex flex-wrap justify-center gap-2 sm:gap-4">
          <span>EXPLORE THE</span>
          <span className="text-indigo-500 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent italic">CARD GAME</span>
          <span>DECK</span>
        </h2>
        <p className="text-slate-200 text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-4 mb-4">
          Discover the cards from Void Count, one of the best new card games launching in 2026
        </p>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 mb-6 sm:mb-8 md:mb-12 relative z-30" role="tablist" aria-label="Card categories">
          {["All", ...CATEGORIES].map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat as CardCategory | "All");
                setCurrentIndex(0);
                if (carouselRef.current) gsap.set(carouselRef.current, { rotationY: 0 });
              }}
              role="tab"
              aria-selected={activeCategory === cat}
              className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all border-2 ${
                activeCategory === cat 
                  ? "bg-indigo-600 border-indigo-500 text-white shadow-[0_0_20px_rgba(79,70,229,0.4)]" 
                  : "bg-white/5 border-slate-800 text-slate-300 hover:border-slate-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="w-full max-w-7xl relative flex items-center justify-center h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] overflow-visible">
        <div className={`w-full h-full flex items-center justify-center relative ${isMobile ? 'perspective-[1500px]' : 'perspective-[3000px]'}`}>
          <div
            ref={carouselRef}
            className={`relative preserve-3d w-full h-full flex items-center justify-center ${isMobile ? '' : 'will-change-transform'}`}
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
                  width: isMobile ? "140px" : "280px",
                  aspectRatio: "2.5/3.5"
                }}
              >
                <GameCard
                  variant="standard"
                  frontSrc={card.front}
                  backSrc="/back-v2.webp"
                  frontAlt={`${card.name} card from Void Count new card game`}
                  className="w-full h-full pointer-events-none select-none"
                  manualRef={(el) => { cardInnerRefs.current[i] = el; }}
                  loading={i === currentIndex ? "eager" : "lazy"}
                />
              </div>
            ))}
          </div>

          {/* Navigation Controls */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-2 sm:px-8 z-40 pointer-events-none">
            <button 
              onClick={() => rotate(-1)} 
              disabled={isAnimating}
              aria-label="Previous card"
              className="pointer-events-auto w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-slate-900/90 border border-white/20 text-white flex items-center justify-center hover:bg-indigo-600 transition-all hover:scale-110 active:scale-95 shadow-xl backdrop-blur-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button 
              onClick={() => rotate(1)} 
              disabled={isAnimating}
              aria-label="Next card"
              className="pointer-events-auto w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-slate-900/90 border border-white/20 text-white flex items-center justify-center hover:bg-indigo-600 transition-all hover:scale-110 active:scale-95 shadow-xl backdrop-blur-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>

          {/* Card Indicator Dots (Mobile) */}
          {isMobile && totalCards > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-30 pointer-events-none">
              {filteredCards.map((_, i) => (
                <div
                  key={i}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === currentIndex
                      ? 'w-6 bg-indigo-500'
                      : 'w-2 bg-white/30'
                  }`}
                  aria-hidden="true"
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
