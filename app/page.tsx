import type { Metadata } from "next";
import { WeddingLandingClient } from "@/components/wedding/WeddingLandingClient";
import { getSiteUrl } from "@/lib/site";
import { WEDDING_SITE_TITLE } from "@/lib/weddingData";

export const metadata: Metadata = {
  title: WEDDING_SITE_TITLE,
  description:
    "Private blue and red wedding portals for the Singh and Kaur families, with side-specific event RSVP flows.",
  alternates: { canonical: `${getSiteUrl()}/` },
  openGraph: {
    title: WEDDING_SITE_TITLE,
    description:
      "Choose the Singh side or the Kaur side and enter the private wedding portal.",
    url: "/",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: WEDDING_SITE_TITLE,
    description:
      "Choose the Singh side or the Kaur side and enter the private wedding portal.",
  },
};

export default function HomePage() {
  return <WeddingLandingClient />;
}
