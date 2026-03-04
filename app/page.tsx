import type { Metadata } from "next";
import HomePageClient from "@/components/pages/HomePageClient";
import { getSiteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Void Count | Strategic Card Game on Kickstarter",
  description:
    "Void Count is a fast strategic card game for 2-8 players. Manage your hand, bluff opponents, and call Count at the right moment. Back the campaign on Kickstarter.",
  alternates: { canonical: `${getSiteUrl()}/` },
  openGraph: {
    title: "Void Count | Strategic Card Game on Kickstarter",
    description:
      "A fast strategic card game for 2-8 players. Bluff, sabotage, and keep the lowest score to win.",
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
    title: "Void Count | Strategic Card Game on Kickstarter",
    description:
      "A fast strategic card game for 2-8 players where the lowest score wins.",
    images: ["/void-count-logo.webp"],
  },
};

export default function HomePage() {
  return <HomePageClient />;
}
