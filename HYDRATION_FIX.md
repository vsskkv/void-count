# Hydration Mismatch Fix

## Issue
React hydration error: "A tree hydrated but some attributes of the server rendered HTML didn't match the client properties."

This was occurring in the `WaitlistSection` and other components with the `.content-section` class.

## Root Cause
GSAP scroll animations were setting initial styles (`opacity: 0`, `transform: translateY(30px)`) on the client side after hydration, but these styles didn't exist in the server-rendered HTML, causing a mismatch.

## Solution
Moved the initial animation state from JavaScript to CSS:

### 1. Added CSS rules in `app/globals.css`:
```css
/* Initial state for GSAP scroll animations - prevents hydration mismatch */
.content-section {
  opacity: 0;
  transform: translateY(30px);
}
```

This ensures the server and client render with the same initial styles.

### 2. Updated GSAP animation in `components/pages/HomePageClient.tsx`:
Changed from `gsap.fromTo()` to `gsap.to()` since the initial state is now handled by CSS:
```typescript
gsap.to(section, {
  opacity: 1,
  y: 0,
  // ... rest of animation config
})
```

### 3. Respect reduced motion preferences:
```css
@media (prefers-reduced-motion: reduce) {
  .content-section {
    opacity: 1 !important;
    transform: none !important;
  }
}
```

## Benefits
- ✅ No hydration mismatch errors
- ✅ Consistent rendering between server and client
- ✅ Better accessibility (respects reduced motion)
- ✅ Cleaner separation of concerns (CSS for initial state, JS for animations)

## Testing
1. Check browser console - no hydration warnings
2. Verify scroll animations still work
3. Test with reduced motion preference enabled
4. Verify SSR renders correctly

## Related Files
- `app/globals.css` - Initial animation styles
- `components/pages/HomePageClient.tsx` - GSAP scroll animations
- `components/home/WaitlistSection.tsx` - Uses `.content-section` class
