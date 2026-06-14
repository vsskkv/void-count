import type { Metadata } from "next";
import HomePageClient from "@/components/pages/HomePageClient";
import { getSiteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: {
    absolute: "Void Count | Strategic Card Game Launching Soon",
  },
  description:
    "Void Count is the strategy card game where the lowest score wins. The Kickstarter campaign is now over, and Void Count will be launching soon.",
  keywords: [
    "Void Count",
    "strategic card game",
    "launching soon card game",
    "2-8 player card game",
    "party strategy game",
    "social card game",
    "game night card game",
  ],
  alternates: { canonical: `${getSiteUrl()}/` },
  openGraph: {
    title: "Void Count | Strategic Card Game Launching Soon",
    description:
      "The Void Count Kickstarter is now over. The strategic card game where the lowest score wins will be launching soon.",
    url: "/",
    type: "website",
    images: [
      {
        url: "/void-count-logo.webp",
        width: 1024,
        height: 1024,
        alt: "Void Count logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Void Count | Strategic Card Game Launching Soon",
    description:
      "The Void Count Kickstarter is now over, and the game will be launching soon.",
    images: ["/void-count-logo.webp"],
  },
};

export default function HomePage() {
  return <HomePageClient />;
}
