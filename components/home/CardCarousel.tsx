"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { GameCard } from "@/components/3d/GameCard";

type CardCategory = "Power" | "Environment" | "Points";

const CARD_DATA = [
  {
    id: "one",
    front: "/One v1.png",
    back: "/Back V1.png",
    name: "The One",
    category: "Points" as CardCategory,
    effect: "Low value, high stakes. Every point counts.",
    fun: "The best card to hold when calling Count."
  },
  {
    id: "toss",
    front: "/Toss v1.png",
    back: "/Back V1.png",
    name: "Toss",
    category: "Power" as CardCategory,
    effect: "Discard point cards without drawing back.",
    fun: "The fastest way to reach zero."
  },
  {
    id: "sabotage",
    front: "/Sabotage v1.png",
    back: "/Back V1.png",
    name: "Sabotage",
    category: "Power" as CardCategory,
    effect: "Give your worst cards to someone else.",
    fun: "Watch their face when you hand over a 9."
  },
  {
    id: "take-two",
    front: "/Take Two v1.png",
    back: "/Back V1.png",
    name: "Take Two",
    category: "Power" as CardCategory,
    effect: "Force a player to draw 2 cards.",
    fun: "Perfect for stopping someone about to call Count."
  },
  {
    id: "double",
    front: "/Double Your Hand v1.png",
    back: "/Back V1.png",
    name: "Double Up",
    category: "Power" as CardCategory,
    effect: "Force a rival to double their entire hand.",
    fun: "The ultimate nuclear option."
  },
  {
    id: "blue-glacier",
    front: "/Blue Glacier v1.png",
    back: "/Back V1.png",
    name: "Blue Glacier",
    category: "Environment" as CardCategory,
    effect: "Freezes all power cards for one round.",
    fun: "Forces everyone to play pure strategy."
  },
  {
    id: "desert",
    front: "/Desert Horizon v1.png",
    back: "/Back V1.png",
    name: "Desert Horizon",
    category: "Environment" as CardCategory,
    effect: "Everyone must discard down to 4 cards.",
    fun: "Levels the playing field instantly."
  },
  {
    id: "toxic",
    front: "/Toxic Swamp v1.png",
    back: "/Back V1.png",
    name: "Toxic Swamp",
    category: "Environment" as CardCategory,
    effect: "Drawing cards adds double points.",
    fun: "Makes every draw a massive risk."
  },
  {
    id: "volcanix",
    front: "/Volcanix Lava v1.png",
    back: "/Back V1.png",
    name: "Volcanix Lava",
    category: "Environment" as CardCategory,
    effect: "Highest hand value takes double damage.",
    fun: "Creates instant panic for the leader."
  },
];

const CATEGORIES: CardCategory[] = ["Power", "Environment", "Points"];

export const CardCarousel = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const cardContainerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardInnerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState<CardCategory | "All">("Power");

  const filteredCards = activeCategory === "All" 
    ? CARD_DATA 
    : CARD_DATA.filter(c => c.category === activeCategory);

  const totalCards = filteredCards.length;
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const radius = isMobile ? 300 : 500; 
  const angleStep = (2 * Math.PI) / totalCards;

  useEffect(() => {
    if (!carouselRef.current) return;

    const ctx = gsap.context(() => {
      // Position each card
      cardContainerRefs.current.forEach((container, i) => {
        if (!container) return;
        const angle = angleStep * i;
        const x = Math.sin(angle) * radius;
        const z = Math.cos(angle) * radius;
        const faceOutwardRotation = (angle * 180) / Math.PI;

        gsap.set(container, {
          x, z,
          rotateY: faceOutwardRotation,
          force3D: true,
        });
      });

      // Flip animation
      cardInnerRefs.current.forEach((inner, i) => {
        if (!inner) return;
        gsap.to(inner, {
          rotateY: 360,
          duration: 12,
          repeat: -1,
          ease: "none",
          delay: i * 0.5,
          force3D: true,
        });
      });

      // Wheel rotation
      gsap.to(carouselRef.current, {
        rotationY: -360,
        duration: 50,
        repeat: -1,
        ease: "none",
        force3D: true,
      });
    }, carouselRef);

    return () => ctx.revert();
  }, [radius, angleStep, filteredCards]);

  const rotate = (direction: 1 | -1) => {
    if (isAnimating || !carouselRef.current) return;
    setIsAnimating(true);
    const currentRotation = gsap.getProperty(carouselRef.current, "rotationY") as number;
    const targetRotation = currentRotation + (direction * -(360 / totalCards));

    gsap.to(carouselRef.current, {
      rotationY: targetRotation,
      duration: 0.8,
      ease: "power2.inOut",
      onComplete: () => {
        setCurrentIndex((prev) => (prev + direction + totalCards) % totalCards);
        setIsAnimating(false);
      },
    });
  };

  const activeCard = filteredCards[currentIndex];

  return (
    <section className="relative min-h-[110vh] flex flex-col items-center justify-center overflow-hidden bg-slate-950 py-24 px-4">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.1),transparent_70%)] pointer-events-none" />
      
      <div className="w-full text-center z-20 mb-12">
        <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter uppercase italic mb-8 scale-y-110">
          EXPLORE THE <span className="text-indigo-500 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">DECK</span>
        </h2>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-12">
          {["All", ...CATEGORIES].map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat as any);
                setCurrentIndex(0);
              }}
              className={`px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all border-2 ${
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

      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center flex-1">
        {/* Left: 3D Stage */}
        <div className="perspective-[2000px] h-[400px] sm:h-[500px] flex items-center justify-center relative">
          <div
            ref={carouselRef}
            className="relative preserve-3d will-change-transform w-full h-full"
            style={{ transformStyle: "preserve-3d" }}
          >
            {filteredCards.map((card, i) => (
              <div
                key={`${activeCategory}-${card.id}`}
                ref={(el) => { cardContainerRefs.current[i] = el; }}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 preserve-3d"
                style={{
                  transformStyle: "preserve-3d",
                  width: isMobile ? "140px" : "220px",
                  aspectRatio: "2.5/3.5"
                }}
              >
                <GameCard
                  variant="standard"
                  frontSrc={card.front}
                  backSrc={card.back}
                  manualRef={(el: HTMLDivElement | null) => { cardInnerRefs.current[i] = el; }}
                  className="w-full h-full pointer-events-none shadow-2xl"
                />
              </div>
            ))}
          </div>

          {/* Navigation */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4 sm:px-0 pointer-events-none">
            <button onClick={() => rotate(-1)} className="pointer-events-auto w-12 h-12 rounded-full bg-slate-900/80 border border-white/10 text-white flex items-center justify-center hover:bg-indigo-600 transition-all">
              ←
            </button>
            <button onClick={() => rotate(1)} className="pointer-events-auto w-12 h-12 rounded-full bg-slate-900/80 border border-white/10 text-white flex items-center justify-center hover:bg-indigo-600 transition-all">
              →
            </button>
          </div>
        </div>

        {/* Right: Card Info */}
        <div className="text-center lg:text-left bg-white/5 backdrop-blur-md rounded-[2.5rem] border border-white/10 p-8 sm:p-12 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <span className="text-8xl italic font-black text-white">∅</span>
          </div>
          
          <div className="relative z-10" key={activeCard?.id}>
            <div className="inline-block px-4 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-400 text-[10px] font-black uppercase tracking-[0.2em] mb-6">
              {activeCard?.category} Card
            </div>
            <h3 className="text-4xl sm:text-6xl font-black text-white uppercase italic tracking-tighter mb-4">
              {activeCard?.name}
            </h3>
            <p className="text-xl sm:text-2xl text-slate-300 font-bold italic mb-8 leading-tight">
              {activeCard?.effect}
            </p>
            <div className="p-6 rounded-2xl bg-indigo-600/10 border border-indigo-500/20">
              <p className="text-indigo-300 text-sm font-black uppercase tracking-widest mb-2">Why it's fun:</p>
              <p className="text-slate-200 font-bold italic">"{activeCard?.fun}"</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
