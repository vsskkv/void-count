import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { getSiteUrl, SITE_DESCRIPTION, SITE_NAME } from "@/lib/site";
import { CosmicBackground } from "@/components/ui/CosmicBackground";
import { VoidParticles } from "@/components/ui/VoidParticles";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { AnalyticsTracker } from "@/components/analytics/AnalyticsTracker";
import { Suspense } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap", // Prevent invisible text flash (FOIT)
  preload: true, // Preload primary font
  fallback: ["system-ui", "-apple-system", "sans-serif"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false, // Don't preload secondary font
  fallback: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
});

const siteUrl = getSiteUrl();
const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-6H4Z6M4QBK";
const TIKTOK_PIXEL_ID =
  process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID || "D6K98M3C77U9T6VFJUKG";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: SITE_NAME,
  manifest: "/manifest.json",
  title: {
    default: `${SITE_NAME} | Strategic Card Game on Kickstarter`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: siteUrl,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: SITE_NAME,
    title: `${SITE_NAME} | Strategic Card Game on Kickstarter`,
    description: SITE_DESCRIPTION,
    locale: "en_US",
    images: [
      {
        url: "/void-count-logo.webp",
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} - Strategic Card Game Live on Kickstarter`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | Strategic Card Game on Kickstarter`,
    description: SITE_DESCRIPTION,
    images: ["/void-count-logo.webp"],
  },
  other: {
    "content-security-policy": "upgrade-insecure-requests; block-all-mixed-content;",
    "x-content-type-options": "nosniff",
    "x-frame-options": "DENY",
    "x-xss-protection": "1; mode=block",
    "referrer-policy": "strict-origin-when-cross-origin",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/void-count-logo.webp", sizes: "32x32", type: "image/webp" },
      { url: "/void-count-logo.webp", sizes: "16x16", type: "image/webp" },
    ],
    apple: [
      { url: "/void-count-logo.webp", sizes: "180x180", type: "image/webp" },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/void-count-logo.webp",
        color: "#6366f1",
      },
    ],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#020617",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: siteUrl,
    logo: `${siteUrl}/void-count-logo.webp`,
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: siteUrl,
  };

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Void Count",
    description: "Void Count is a strategic card game of risk, bluffing, and sabotage. The campaign is live on Kickstarter.",
    url: `${siteUrl}/kickstarter`,
    image: `${siteUrl}/void-count-logo.webp`,
    category: "Card Game",
    brand: {
      "@type": "Brand",
      name: "Void Count",
    },
  };

  const boardGameJsonLd = {
    "@context": "https://schema.org",
    "@type": "BoardGame",
    name: "Void Count",
    description: "Void Count is a strategic card game of risk, bluffing, and sabotage. A fast-paced card game perfect for family game nights, parties, and competitive play. Now live on Kickstarter.",
    image: `${siteUrl}/void-count-logo.webp`,
    brand: {
      "@type": "Brand",
      name: "Void Count",
    },
    numberOfPlayers: {
      minValue: 2,
      maxValue: 8,
    },
    gameLocation: {
      "@type": "Place",
      name: "Tabletop",
    },
    gameItem: {
      "@type": "Thing",
      name: "Card Game",
    },
    category: ["Card Game", "Strategy Game", "Party Game", "Family Game", "Strategic Card Game"],
    url: `${siteUrl}/kickstarter`,
  };

  const allJsonLd = [
    orgJsonLd,
    websiteJsonLd,
    productJsonLd,
    boardGameJsonLd,
  ];

  const GTM_ID = "GTM-P7H5NRLN";

  return (
    <html lang="en-US">
      <head>
        {/* Google Tag Manager - as high in head as possible */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`,
          }}
        />
        {process.env.NODE_ENV === "production" && TIKTOK_PIXEL_ID ? (
          <script
            dangerouslySetInnerHTML={{
              __html: `!function (w, d, t) {
  w.TiktokAnalyticsObject = t;
  var ttq = w[t] = w[t] || [];
  ttq.methods = ["page", "track", "identify", "instances", "debug", "on", "off", "once", "ready", "alias", "group", "enableCookie", "disableCookie", "holdConsent", "revokeConsent", "grantConsent"];
  ttq.setAndDefer = function (target, method) {
    target[method] = function () {
      target.push([method].concat(Array.prototype.slice.call(arguments, 0)));
    };
  };
  for (var i = 0; i < ttq.methods.length; i++) ttq.setAndDefer(ttq, ttq.methods[i]);
  ttq.instance = function (id) {
    var e = ttq._i[id] || [];
    for (var n = 0; n < ttq.methods.length; n++) ttq.setAndDefer(e, ttq.methods[n]);
    return e;
  };
  ttq.load = function (id, opts) {
    var src = "https://analytics.tiktok.com/i18n/pixel/events.js";
    ttq._i = ttq._i || {};
    ttq._i[id] = [];
    ttq._i[id]._u = src;
    ttq._t = ttq._t || {};
    ttq._t[id] = +new Date();
    ttq._o = ttq._o || {};
    ttq._o[id] = opts || {};
    var script = d.createElement("script");
    script.type = "text/javascript";
    script.async = true;
    script.src = src + "?sdkid=" + id + "&lib=" + t;
    var firstScript = d.getElementsByTagName("script")[0];
    firstScript.parentNode.insertBefore(script, firstScript);
  };

  ttq.load("${TIKTOK_PIXEL_ID}");
  ttq.page();
}(window, document, "ttq");`,
            }}
          />
        ) : null}
        {/* Preconnect to external resources for faster loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Preload critical hero image for faster LCP */}
        <link rel="preload" href="/optimized/back-v2.jpg" as="image" type="image/jpeg" />
        {/* Preload logo for header */}
        <link rel="preload" href="/void-count-logo.webp" as="image" type="image/webp" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-slate-950 text-slate-50`}
        suppressHydrationWarning
      >
        {/* Google Tag Manager (noscript) - immediately after opening body */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>
        {/* Google tag (gtag.js) - loads on every page */}
        {process.env.NODE_ENV === "production" && GA_MEASUREMENT_ID ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-gtag" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}');
              `}
            </Script>
          </>
        ) : null}

        {allJsonLd.map((jsonLd, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
        ))}
        <ErrorBoundary>
          <div className="min-h-screen flex flex-col relative">
            <CosmicBackground />
            <VoidParticles />
            <div className="relative z-10 flex flex-col min-h-screen">
              <Suspense fallback={null}>
                <AnalyticsTracker />
              </Suspense>
              {children}
            </div>
          </div>
        </ErrorBoundary>
      </body>
    </html>
  );
}
