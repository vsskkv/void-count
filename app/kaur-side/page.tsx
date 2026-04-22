import type { Metadata } from "next";
import { WeddingPortalPage } from "@/components/wedding/WeddingPortalPage";
import { getSiteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "The Kaur Side",
  description:
    "A private red portal for the women's side, with itinerary details, placeholders, and RSVP for two events.",
  alternates: { canonical: `${getSiteUrl()}/kaur-side` },
};

export default function KaurSidePage() {
  return <WeddingPortalPage side="kaur" />;
}
