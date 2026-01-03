import type { Metadata } from "next";
import HomePageClient from "@/components/pages/HomePageClient";
import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Void Count™ – Strategic Card Game | Perfect Gift for Board & Card Game Fans",
  description:
    "Void Count is a fast-paced strategic card game full of sabotage, bluffing and clever play. A perfect gift for board game and card game lovers.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Void Count™ – Strategic Card Game | Perfect Gift for Board & Card Game Fans",
    description:
      "Void Count is a fast-paced strategic card game full of sabotage, bluffing and clever play. A perfect gift for board game and card game lovers.",
    url: "/",
  },
  twitter: {
    title: "Void Count™ – Strategic Card Game | Perfect Gift for Board & Card Game Fans",
    description:
      "Void Count is a fast-paced strategic card game full of sabotage, bluffing and clever play. A perfect gift for board game and card game lovers.",
  },
};

export default function HomePage() {
  return <HomePageClient />;
}
