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

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: SITE_NAME,
  manifest: "/manifest.json",
  title: {
    default: `${SITE_NAME} | Live on Kickstarter | Strategic Card Game`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "void count",
    "void count card game",
    "void count kickstarter",
    "kickstarter card game",
    "strategic card game",
    "family card game",
    "party card game",
    "2-8 player card game",
    "bluffing card game",
    "sabotage card game",
  ],
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
    title: SITE_NAME,
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
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    creator: "@voidcount", // Replace with actual handle if available
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
    image: `${siteUrl}/void-count-logo.webp`,
    category: "Card Game",
    brand: {
      "@type": "Brand",
      name: "Void Count",
    },
    offers: {
      "@type": "Offer",
      url: `${siteUrl}/kickstarter`,
      availability: "https://schema.org/PreOrder",
      price: "0.00",
      priceCurrency: "GBP",
      seller: {
        "@type": "Organization",
        name: SITE_NAME,
      },
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
    offers: {
      "@type": "Offer",
      url: `${siteUrl}/kickstarter`,
      availability: "https://schema.org/PreOrder",
      price: "0.00",
      priceCurrency: "GBP",
    },
    keywords: "void count, strategic card game, kickstarter card game, family card game, party card game, bluffing card game, sabotage card game",
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl,
      },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How many players can play Void Count?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Void Count works best with 2–8 players, making it a perfect card game for both small groups and large parties.",
        },
      },
      {
        "@type": "Question",
        name: "What makes Void Count stand out from other card games?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Void Count combines strategic hand management with active player interaction and sabotage. Its unique 'lowest score wins' mechanic and Power cards create a fresh, unpredictable experience that sets it apart from traditional card games.",
        },
      },
      {
        "@type": "Question",
        name: "Is Void Count a good gift for board game lovers?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Absolutely. Void Count is designed as a premium card game gift with stunning artwork and deep strategic gameplay that appeals to fans of both card and board games.",
        },
      },
      {
        "@type": "Question",
        name: "What type of strategy is involved in Void Count?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Players must manage their hand value, time their Power card usage for maximum impact, and read their opponents to call 'Count' at the perfect moment. It's a game of risk, bluffing, and tactical sabotage.",
        },
      },
      {
        "@type": "Question",
        name: "Is Void Count live on Kickstarter?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Void Count is live on Kickstarter now. Visit the campaign page to back the project and choose your reward tier.",
        },
      },
      {
        "@type": "Question",
        name: "How long does a typical round of Void Count take?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Rounds are fast-paced and intense, typically lasting 5-10 minutes, making it an ideal game for quick sessions or marathon game nights.",
        },
      },
      {
        "@type": "Question",
        name: "What is the next evolution of strategic card games?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Void Count combines the best elements of classic card games with modern mechanics. It offers a unique blend of risk management, psychological bluffing, and tactical sabotage.",
        },
      },
      {
        "@type": "Question",
        name: "Why choose Void Count for your next game night?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Void Count provides endless replayability with its dynamic deck mechanics and player-driven chaos. It's the perfect choice for both intimate 1v1 duels and large party settings (up to 8 players). Plus, it features stunning cosmic artwork and high-quality card stock, making it a premium card game gift.",
        },
      },
    ],
  };

  const allJsonLd = [
    orgJsonLd,
    websiteJsonLd,
    productJsonLd,
    boardGameJsonLd,
    faqJsonLd,
    breadcrumbJsonLd,
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
            // eslint-disable-next-line react/no-danger
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
