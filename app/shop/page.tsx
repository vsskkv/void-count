import type { Metadata } from "next";
import ShopPageClient from "@/components/pages/ShopPageClient";
import { SITE_NAME, getSiteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: `Back Void Count | ${SITE_NAME} Kickstarter Campaign`,
  description: `${SITE_NAME} is live on Kickstarter. Back the campaign to get the first edition and support production of this strategic card game for game nights and parties.`,
  keywords: [
    "void count kickstarter",
    "kickstarter card game",
    "strategic card game",
    "tabletop card game",
    "2-8 player card game",
    "party strategy card game",
  ],
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
  alternates: { canonical: `${getSiteUrl()}/shop` },
  openGraph: {
    title: `Back Void Count | ${SITE_NAME} Kickstarter Campaign`,
    description: `${SITE_NAME} is live on Kickstarter. Back the campaign and help bring the first edition to tables worldwide.`,
    url: "/shop",
  },
  twitter: {
    title: `Back Void Count | ${SITE_NAME} Kickstarter Campaign`,
    description: `${SITE_NAME} is live on Kickstarter. Back the campaign today.`,
  },
};

export default function ShopPage() {
  return <ShopPageClient />;
}
