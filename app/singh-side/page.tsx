import type { Metadata } from "next";
import { WeddingPortalPage } from "@/components/wedding/WeddingPortalPage";
import { getSiteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "The Singh Side",
  description:
    "A private blue portal for the men's side, with itinerary details, placeholders, and RSVP for two events.",
  alternates: { canonical: `${getSiteUrl()}/singh-side` },
};

export default function SinghSidePage() {
  return <WeddingPortalPage side="singh" />;
}
