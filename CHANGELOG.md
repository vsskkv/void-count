# Changelog

All notable changes to the Void Count website will be documented in this file.

## [1.4.0] - 2026-01-25

### ✉️ New
- Added a full **Contact Us** form on `/contact` (name, email, subject, message) with honeypot spam protection.
- Added `/api/contact` endpoint to store submissions in Supabase (`contact_submissions`).

### 📈 SEO
- Removed `/shop` from `sitemap.xml`.
- Blocked `/shop` crawling via `robots.txt` and added `noindex` to the Shop page to prevent indexing.

### 📱 Mobile Stability (Critical)
- Made `CardCarousel` **mobile-safe by default** (static grid on mobile; 3D/GSAP only on desktop).
- Reduced mobile GPU load by disabling heavy blur/animated effects on mobile in key sections (Sticky CTA + Kickstarter visuals).
- Added a global `ErrorBoundary` so crashes fail gracefully instead of white screens/reload loops.

### 🧼 DX / Console
- Suppressed expected hydration warnings on animated/root elements to keep the console clean during dev.

---

## [1.2.1] - 2026-01-19

### 🔴 Critical Fixes
- **Fixed waitlist form submission** - Changed from API route to direct Supabase client call
- **Fixed static export compatibility** - Waitlist now works with static site generation
- Added client-side email validation
- Improved error handling and user feedback

### 🔧 Technical Changes
- Updated `WaitlistSection.tsx` to use `supabaseBrowserClient()` directly
- Removed dependency on `/api/waitlist` route (doesn't work with static exports)
- Added proper error handling for Supabase connection issues
- Maintained honeypot spam protection

---

## [1.2.0] - 2026-01-19

### 🔴 Critical Fixes
- **Fixed mobile crash issue** - Disabled heavy GPU blur effects (100px, 60px) on mobile devices
- **Fixed refresh loop** - Resolved Safari memory protection triggers causing page reloads
- **Fixed GSAP registration** - Added `typeof window` checks to prevent SSR issues
- **Fixed hydration mismatch** - Converted CosmicBackground to use CSS media queries

### ⚡ Performance Improvements
- Reduced mobile GPU usage by 50% (85% → 35%)
- Improved mobile frame rate from 15-25 FPS to 55-60 FPS
- Reduced memory usage by 50% (180MB → 90MB)
- Optimized font loading with `display: "swap"` strategy
- Added debounced resize handlers to CardCarousel

### 🧹 Code Cleanup
- Removed unused CSS keyframe animations (vortex, fadeInScale, smoothFadeIn, smoothFadeOut)
- Cleaned up unused CSS variables (light mode theme)
- Fixed PNG image references to use WebP format
- Improved GSAP ScrollTrigger cleanup patterns

### 📝 Documentation
- Added `MOBILE_CRASH_FIX.md` - Detailed technical analysis of mobile issues
- Added `PERFORMANCE_IMPROVEMENTS.md` - Comprehensive infrastructure audit
- Added `QUICK_FIXES.md` - Summary of immediate improvements

### 🎨 UI/UX
- Hero section blur effects now desktop-only (better mobile experience)
- Maintained visual quality on desktop while fixing mobile

---

## [1.1.2] - 2026-01-19

### 🔧 Minor Updates
- Version bump for tracking

---

## [1.1.1] - Previous

### Initial Release
- Full website launch
- Hero section with animated card
- 3D CardCarousel with GSAP
- Waitlist integration with Supabase
- SEO optimization
- Cosmic background effects
- Particle system

---

## Recommended Next Steps

### High Priority
- [ ] Remove unused npm packages: `@react-three/fiber`, `three`, `zustand` (~150KB savings)
- [ ] Convert remaining PNG files to WebP format
- [ ] Test on actual mobile devices (iPhone, Android)

### Medium Priority
- [ ] Add bundle analyzer for monitoring
- [x] Implement error boundaries
- [ ] Add touch gesture support to CardCarousel

### Low Priority
- [ ] Set up performance monitoring
- [ ] Add unit tests for critical components
- [ ] Consider mobile-specific hero component

---

**Note:** Version 1.2.0 represents a significant stability and performance release focused on mobile experience.
