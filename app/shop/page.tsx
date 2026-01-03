import type { Metadata } from "next";
import ShopPageClient from "@/components/pages/ShopPageClient";
import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Shop",
  description: `Shop ${SITE_NAME}. ${SITE_DESCRIPTION}`,
  alternates: { canonical: "/shop" },
  openGraph: {
    title: `Shop | ${SITE_NAME}`,
    description: SITE_DESCRIPTION,
    url: "/shop",
  },
  twitter: {
    title: `Shop | ${SITE_NAME}`,
    description: SITE_DESCRIPTION,
  },
};

export default function ShopPage() {
  return <ShopPageClient />;
}
