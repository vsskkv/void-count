import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { getSiteUrl, SITE_DESCRIPTION, SITE_NAME } from "@/lib/site";
import { VoidParticles } from "@/components/ui/VoidParticles";
import { CosmicBackground } from "@/components/ui/CosmicBackground";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: SITE_NAME,
  manifest: "/manifest.json",
  title: {
    default: `${SITE_NAME} | New Card Game 2026 | Strategic Card Game for Family & Friends`,
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
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    locale: "en_GB",
    images: [
      {
        url: "/void-count-logo.webp",
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} - New Strategic Card Game 2026`,
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
    description: "Void Count is a new strategic card game of risk, bluffing, and sabotage. The perfect gift for family and friends who love board games and strategy. Launching soon on Kickstarter.",
    image: `${siteUrl}/void-count-logo.webp`,
    category: "Card Game",
    brand: {
      "@type": "Brand",
      name: "Void Count",
    },
    offers: {
      "@type": "Offer",
      url: siteUrl,
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
    description: "Void Count is a new strategic card game of risk, bluffing, and sabotage. A fast-paced card game perfect for family game nights, parties, and competitive play. The perfect gift for board game lovers. One of the best new card games launching in 2026.",
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
    category: ["Card Game", "Strategy Game", "Party Game", "Family Game", "New Card Game", "Card Games", "Strategic Card Game"],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "120",
    },
    offers: {
      "@type": "Offer",
      url: siteUrl,
      availability: "https://schema.org/PreOrder",
      price: "0.00",
      priceCurrency: "GBP",
    },
    keywords: "card game, new card game, strategic card game, card games, new card games, strategy card game, family card game, party card game, best new card game, card game 2026, new card games 2026",
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
        name: "What makes Void Count the best new card game of 2026?",
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
        name: "When is Void Count launching on Kickstarter?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Void Count is launching on Kickstarter in 2026. Join our waitlist to be notified of the exact launch date and get access to exclusive early-bird pricing.",
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
          text: "Void Count represents a meticulous strategic experience that combines the best elements of classic card games with innovative mechanics. As one of the most anticipated new card games of 2026, it offers a unique blend of risk management, psychological bluffing, and tactical sabotage.",
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

  return (
    <html lang="en-GB">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-slate-950 text-slate-50`}
        suppressHydrationWarning
      >
        {allJsonLd.map((jsonLd, i) => (
          <script
            key={i}
            type="application/ld+json"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
        ))}
        <div className="min-h-screen flex flex-col relative">
          <CosmicBackground />
          <VoidParticles />
          <div className="relative z-10 flex flex-col min-h-screen">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
