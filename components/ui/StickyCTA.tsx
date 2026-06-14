"use client";

import React, { useState, useEffect } from "react";
import { PrimaryButton } from "./PrimaryButton";

export const StickyCTA = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    let animationFrameId: number | null = null;

    // Check if user has already dismissed the CTA (with error handling for SSR/localStorage)
    try {
      if (typeof window !== 'undefined') {
        const dismissed = localStorage.getItem("void-count-cta-dismissed");
        if (dismissed) {
          animationFrameId = window.requestAnimationFrame(() => {
            setIsDismissed(true);
          });
          return () => {
            if (animationFrameId !== null) {
              window.cancelAnimationFrame(animationFrameId);
            }
          };
        }
      }
    } catch (error) {
      // localStorage might not be available or accessible
      console.warn('Could not access localStorage:', error);
    }

    let ticking = false;
    const handleScroll = () => {
      if (!ticking && typeof window !== 'undefined') {
        window.requestAnimationFrame(() => {
          if (window.scrollY > 600) {
            setIsVisible(true);
          } else {
            setIsVisible(false);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    // Only add listener on client side
    if (typeof window !== 'undefined') {
      // Use passive listener for better performance
      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => {
        if (animationFrameId !== null) {
          window.cancelAnimationFrame(animationFrameId);
        }
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  const handleDismiss = () => {
    setIsDismissed(true);
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem("void-count-cta-dismissed", "true");
      }
    } catch (error) {
      // localStorage might not be available
      console.warn('Could not save to localStorage:', error);
    }
  };

  if (isDismissed) return null;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-[100] p-4 transition-all duration-500 transform ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
      }`}
    >
      <div className="max-w-4xl mx-auto bg-slate-900/95 md:bg-slate-900/90 md:backdrop-blur-xl border border-indigo-500/30 rounded-2xl p-4 sm:p-6 shadow-[0_-20px_50px_rgba(0,0,0,0.5)] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
          <p className="text-white font-black uppercase italic tracking-tight leading-none mb-1">
            <span className="text-[#05ce78]">Kickstarter</span> is now over
          </p>
          <p className="text-slate-300 text-[10px] font-bold uppercase tracking-widest">
            Void Count will be launching soon
          </p>
        </div>

        <div className="flex items-center gap-4 w-full sm:w-auto">
          <PrimaryButton
            href="/contact"
            className="flex-1 sm:flex-none py-3 px-6 text-sm font-black whitespace-nowrap shadow-none uppercase italic"
          >
            Launch Updates
          </PrimaryButton>
          <button
            onClick={handleDismiss}
            className="p-2 text-slate-500 hover:text-white transition-colors"
            aria-label="Dismiss"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
