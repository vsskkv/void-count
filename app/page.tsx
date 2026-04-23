import type { Metadata } from "next";
import HomePageClient from "@/components/pages/HomePageClient";
import { getSiteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: {
    absolute: "Void Count | Strategic Card Game on Kickstarter",
  },
  description:
    "Void Count is a fast, social strategy card game for 2-8 players where the lowest score wins. Back the live Kickstarter campaign and bring strategic chaos to game night.",
  keywords: [
    "Void Count",
    "strategic card game",
    "Kickstarter card game",
    "2-8 player card game",
    "party strategy game",
    "social card game",
    "game night card game",
  ],
  alternates: { canonical: `${getSiteUrl()}/` },
  openGraph: {
    title: "Void Count | Strategic Card Game on Kickstarter",
    description:
      "Back Void Count on Kickstarter: a fast social strategy card game where the lowest score wins.",
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
    title: "Void Count | Strategic Card Game on Kickstarter",
    description:
      "Back Void Count on Kickstarter: a fast social strategy card game where the lowest score wins.",
    images: ["/void-count-logo.webp"],
  },
};

export default function HomePage() {
  return <HomePageClient />;
}
