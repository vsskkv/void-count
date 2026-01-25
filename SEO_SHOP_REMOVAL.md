# Shop Page Removal from SEO

## Changes Made

To prevent the shop page from appearing in Google search results, the following changes were implemented:

### 1. Removed from Sitemap (`app/sitemap.ts`)
- ✅ Removed `/shop` entry from the sitemap
- The sitemap now only includes:
  - `/` (Homepage)
  - `/about`
  - `/how-to-play`
  - `/faq`
  - `/contact`

### 2. Blocked in robots.txt (`app/robots.ts`)
- ✅ Added `/shop` to the disallow list
- Search engine crawlers will now skip the shop page

```
User-agent: *
Allow: /
Disallow: /shop
```

### 3. Added noindex Meta Tag (`app/shop/page.tsx`)
- ✅ Added `robots: { index: false, follow: false }` to page metadata
- This tells search engines not to index the page even if they find it
- Double layer of protection

## Result

The shop page is now:
- ❌ **Not in sitemap** - Won't be suggested to search engines
- ❌ **Blocked in robots.txt** - Crawlers are told not to visit it
- ❌ **Has noindex meta tag** - Won't be indexed even if crawled

## When Will Changes Take Effect?

1. **Immediate**: New crawls will respect robots.txt and meta tags
2. **1-2 weeks**: Search engines will notice the updated sitemap
3. **2-4 weeks**: Existing indexed pages will be removed from search results

## How to Verify

### Check Sitemap
Visit: `https://voidcount.com/sitemap.xml`
- Shop page should NOT appear in the list

### Check robots.txt
Visit: `https://voidcount.com/robots.txt`
- Should see `Disallow: /shop`

### Google Search Console
1. Go to Google Search Console
2. Submit the updated sitemap
3. Request removal of `/shop` URL (optional, for faster removal)

### Force Google to Re-crawl
1. Go to Google Search Console
2. URL Inspection tool
3. Enter your homepage URL
4. Click "Request Indexing"

## Future: When Shop is Ready

When you're ready to launch the shop, simply reverse these changes:

1. Add `/shop` back to `app/sitemap.ts`
2. Remove `/shop` from disallow in `app/robots.ts`
3. Remove the `robots: { index: false }` from `app/shop/page.tsx`

## Current Sitemap Pages

Your sitemap now includes only live pages:
- **Homepage** (`/`) - Priority 1.0
- **About** (`/about`) - Priority 0.8
- **How to Play** (`/how-to-play`) - Priority 0.8
- **FAQ** (`/faq`) - Priority 0.7
- **Contact** (`/contact`) - Priority 0.5

These are the only pages Google will see in search results.
