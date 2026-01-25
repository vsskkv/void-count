import type { Metadata } from "next";
import ShopPageClient from "@/components/pages/ShopPageClient";
import { SITE_DESCRIPTION, SITE_NAME, getSiteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: `Shop | ${SITE_NAME} | Buy New Card Game | Card Games | Kickstarter`,
  description: `Shop ${SITE_NAME}, the new card game launching on Kickstarter in 2026. Pre-order this strategic card game perfect for game nights and family gatherings. Join the waitlist for early bird pricing on one of the best new card games.`,
  keywords: [
    "buy card game",
    "new card game shop",
    "card game for sale",
    "buy Void Count",
    "card game purchase",
    "card games shop",
    "new card games for sale",
    "strategic card game purchase",
    "Kickstarter card game",
    "card game 2026",
    "new card games 2026",
  ],
  robots: {
    index: false,
    follow: false,
  },
  alternates: { canonical: `${getSiteUrl()}/shop` },
  openGraph: {
    title: `Shop | ${SITE_NAME} | Buy New Card Game | Card Games`,
    description: `Shop ${SITE_NAME}, the new card game launching on Kickstarter in 2026. Pre-order this strategic card game perfect for game nights and family gatherings.`,
    url: "/shop",
  },
  twitter: {
    title: `Shop | ${SITE_NAME} | Buy New Card Game | Card Games`,
    description: `Shop ${SITE_NAME}, the new card game launching on Kickstarter in 2026. Pre-order this strategic card game.`,
  },
};

export default function ShopPage() {
  return <ShopPageClient />;
}
