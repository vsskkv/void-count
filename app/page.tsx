import type { Metadata } from "next";
import HomePageClient from "@/components/pages/HomePageClient";
import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Void Count™ | New Card Game 2024 | Card Games | Strategic Card Game for Family & Friends | Kickstarter",
  description:
    "Void Count is a new card game that combines strategy, sabotage, and laughs. Discover the newest strategic card game built for competitive play. Perfect for game nights, family gatherings, and board game fans. Join the fun on Kickstarter soon! This innovative card game offers fast-paced gameplay, strategic depth, and endless replayability. Whether you're looking for a new card game for your collection or the perfect gift for board game enthusiasts, Void Count delivers an unforgettable gaming experience.",
  keywords: [
    "card game",
    "new card game",
    "card games",
    "new card games",
    "strategic card game",
    "strategy card game",
    "family card game",
    "party card game",
    "board game",
    "tabletop game",
    "Kickstarter card game",
    "sabotage card game",
    "bluffing card game",
    "best new card game",
    "card game 2024",
    "new card games 2024",
    "strategic card games",
    "card game for adults",
    "card game for families",
    "competitive card game",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Void Count™ | New Card Game 2024 | Card Games | Strategic Card Game for Family & Friends",
    description:
      "Void Count is a new card game that combines strategy, sabotage, and laughs. Discover the newest strategic card game built for competitive play. Perfect for game nights and family gatherings. A must-have addition to any card game collection.",
    url: "/",
    type: "website",
    images: [
      {
        url: "/void-count-logo.png",
        width: 1200,
        height: 630,
        alt: "Void Count - New Strategic Card Game",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Void Count™ | New Card Game 2024 | Card Games | Strategic Card Game",
    description:
      "Void Count is a new card game that combines strategy, sabotage, and laughs. Discover the newest strategic card game built for competitive play.",
    images: ["/void-count-logo.png"],
  },
};

export default function HomePage() {
  return <HomePageClient />;
}
