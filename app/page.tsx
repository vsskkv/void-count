import type { Metadata } from "next";
import HomePageClient from "@/components/pages/HomePageClient";
import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Void Count™ | New Strategic Card Game for Family & Friends | Kickstarter",
  description:
    "Discover Void Count, the newest strategic card game built for sabotage and big laughs. The perfect gift for board game fans. Join the chaos on Kickstarter soon!",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Void Count™ | New Strategic Card Game for Family & Friends | Kickstarter",
    description:
      "Discover Void Count, the newest strategic card game built for sabotage and big laughs. The perfect gift for board game fans. Join the chaos on Kickstarter soon!",
    url: "/",
  },
  twitter: {
    title: "Void Count™ | New Strategic Card Game for Family & Friends | Kickstarter",
    description:
      "Discover Void Count, the newest strategic card game built for sabotage and big laughs. The perfect gift for board game fans. Join the chaos on Kickstarter soon!",
  },
};

export default function HomePage() {
  return <HomePageClient />;
}
