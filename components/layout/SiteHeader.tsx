"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';

export const SiteHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(60);
  const headerRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLElement>(null);

  // Calculate header height
  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight);
    }

    const handleResize = () => {
      if (headerRef.current) {
        setHeaderHeight(headerRef.current.offsetHeight);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close menu when clicking outside or pressing Escape
  useEffect(() => {
    if (!isMenuOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        menuRef.current &&
        headerRef.current &&
        !headerRef.current.contains(target) &&
        !menuRef.current.contains(target)
      ) {
        setIsMenuOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };

    // Prevent body scroll when menu is open on mobile
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      document.body.style.overflow = 'hidden';
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  return (
    <>
      <header 
        ref={headerRef}
        className="relative w-full p-3 sm:p-4 md:p-6 flex justify-between items-center border-b border-slate-900 bg-slate-950/80 backdrop-blur-md z-50 pointer-events-auto"
      >
        <div className="flex items-center">
          <Link 
            href="/" 
            className="flex items-center group"
            onClick={() => setIsMenuOpen(false)}
          >
            <div className="relative w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12">
              <Image
                src="/Logo BG Removed.png"
                alt="Void Count - New Strategic Card Game 2026 Logo"
                fill
                className="object-contain group-hover:scale-110 transition-transform duration-300"
                priority
              />
            </div>
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6 lg:gap-8 text-sm font-black text-slate-300">
          <Link href="/about" className="hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] transition-all whitespace-nowrap uppercase tracking-tighter">
            ABOUT
          </Link>
          <span className="text-slate-400 cursor-not-allowed whitespace-nowrap uppercase tracking-tighter opacity-70">
            HOW TO PLAY (COMING SOON)
          </span>
          <Link href="/faq" className="hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] transition-all whitespace-nowrap uppercase tracking-tighter">
            FAQ
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            const newState = !isMenuOpen;
            setIsMenuOpen(newState);
          }}
          className="md:hidden p-2 -mr-2 text-slate-300 hover:text-white active:text-white transition-colors relative z-[51] cursor-pointer"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          type="button"
        >
          <svg
            className="w-6 h-6 pointer-events-none"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </header>

      {/* Mobile Navigation Menu - Fixed positioning to work with fixed header wrapper */}
      {isMenuOpen && (
        <>
          {/* Backdrop overlay */}
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm md:hidden z-[100]"
            onClick={() => setIsMenuOpen(false)}
            onTouchStart={() => setIsMenuOpen(false)}
            aria-hidden="true"
            style={{ top: `${headerHeight}px` }}
          />
          
          {/* Menu */}
          <nav 
            ref={menuRef}
            className="fixed left-0 right-0 bg-slate-950 backdrop-blur-md border-b border-slate-800/50 md:hidden z-[101] shadow-2xl overflow-y-auto"
            style={{ 
              top: `${headerHeight}px`, 
              maxHeight: `calc(100vh - ${headerHeight}px)`,
              animation: 'slideDown 0.2s ease-out'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col">
              <Link
                href="/about"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMenuOpen(false);
                }}
                className="text-sm font-black text-slate-300 hover:text-white hover:bg-slate-800/50 active:bg-slate-800/70 transition-colors uppercase tracking-tighter py-4 px-6 border-b border-slate-800/50 min-h-[48px] flex items-center touch-manipulation cursor-pointer"
              >
                ABOUT
              </Link>
              <span
                className="text-sm font-black text-slate-400 opacity-70 cursor-not-allowed uppercase tracking-tighter py-4 px-6 border-b border-slate-800/50 min-h-[48px] flex items-center"
              >
                HOW TO PLAY (COMING SOON)
              </span>
              <Link
                href="/faq"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMenuOpen(false);
                }}
                className="text-sm font-black text-slate-300 hover:text-white hover:bg-slate-800/50 active:bg-slate-800/70 transition-colors uppercase tracking-tighter py-4 px-6 min-h-[48px] flex items-center touch-manipulation cursor-pointer"
              >
                FAQ
              </Link>
            </div>
          </nav>
        </>
      )}
    </>
  );
};
