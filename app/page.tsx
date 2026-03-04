import type { Metadata } from "next";
import HomePageClient from "@/components/pages/HomePageClient";
import { getSiteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Void Count™ | Now Live on Kickstarter | Strategic Card Game for Family & Friends",
  description:
    "Void Count is a strategic card game of sabotage, bluffing, and laughs. The campaign is now live on Kickstarter. Back the project to support production and bring this fast-paced game to your table.",
  keywords: [
    "void count",
    "void count card game",
    "void count kickstarter",
    "kickstarter card game",
    "strategic card game",
    "strategy card game",
    "family card game",
    "party card game",
    "board game",
    "tabletop game",
    "sabotage card game",
    "bluffing card game",
    "card game for adults",
    "competitive card game",
  ],
  alternates: { canonical: `${getSiteUrl()}/` },
  openGraph: {
    title: "Void Count™ | Now Live on Kickstarter | Strategic Card Game",
    description:
      "Void Count is now live on Kickstarter. Back this strategic card game built for competitive play, family game nights, and social chaos.",
    url: "/",
    type: "website",
    images: [
      {
        url: "/void-count-logo.webp",
        width: 1200,
        height: 630,
        alt: "Void Count - Strategic Card Game Live on Kickstarter",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Void Count™ | Now Live on Kickstarter | Strategic Card Game",
    description:
      "Void Count is now live on Kickstarter. Back this strategic card game built for sabotage, bluffing, and replayable game nights.",
    images: ["/void-count-logo.webp"],
  },
};

export default function HomePage() {
  return <HomePageClient />;
}
