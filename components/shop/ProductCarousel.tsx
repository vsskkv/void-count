"use client";

import React, { useCallback, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import NextImage from 'next/image';
import { GameCard } from '@/components/3d/GameCard';

export const ProductCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    align: 'center',
    containScroll: 'trimSnaps',
    skipSnaps: false,
    dragFree: false,
  });

  // Preload images for smoother transitions
  useEffect(() => {
    const frontImg = new Image();
    frontImg.src = '/optimized/void-v1.jpg';
    const backImg = new Image();
    backImg.src = '/optimized/back-v2.jpg';
    const boxImg = new Image();
    boxImg.src = '/Card%20Box.jpg';
  }, []);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className="relative w-full max-w-xs mx-auto">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {/* Slide 1: Main Card */}
          <div className="flex-[0_0_100%] min-w-0 pl-4 flex justify-center">
             <div className="w-64 h-96 relative">
                <GameCard variant="standard" />
             </div>
          </div>
          
          {/* Slide 2: Card Back Placeholder */}
          <div className="flex-[0_0_100%] min-w-0 pl-4 flex justify-center">
             <div className="w-64 h-96 rounded-2xl border border-slate-700 bg-slate-900 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(79,70,229,0.2),transparent_70%)]" />
                <span className="text-slate-500 font-bold uppercase tracking-widest">Card Back</span>
             </div>
          </div>

          {/* Slide 3: Box Placeholder */}
          <div className="flex-[0_0_100%] min-w-0 pl-4 flex justify-center">
             <div className="w-64 h-96 rounded-2xl border border-slate-700 bg-slate-900 flex items-center justify-center relative overflow-hidden">
                <NextImage
                  src="/Card%20Box.jpg"
                  alt="Void Count box art"
                  fill
                  className="object-cover object-center scale-110"
                  sizes="256px"
                />
             </div>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <button 
        className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-4 w-8 h-8 rounded-full bg-slate-800/50 border border-slate-600 flex items-center justify-center text-slate-300 hover:bg-slate-700 transition-colors z-10"
        onClick={scrollPrev}
        aria-label="Previous slide"
      >
        ←
      </button>
      <button 
        className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-4 w-8 h-8 rounded-full bg-slate-800/50 border border-slate-600 flex items-center justify-center text-slate-300 hover:bg-slate-700 transition-colors z-10"
        onClick={scrollNext}
        aria-label="Next slide"
      >
        →
      </button>
    </div>
  );
};

