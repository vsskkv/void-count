export type WeddingSideKey = "singh" | "kaur";
export type EventResponse = "attending" | "maybe" | "not_attending";

export interface WeddingImageSlot {
  assetBase: string;
  label: string;
  caption: string;
}

export interface WeddingEvent {
  id: string;
  title: string;
  time: string;
  venue: string;
  description: string;
  tag: string;
}

export interface WeddingHighlight {
  eyebrow: string;
  title: string;
  body: string;
}

export interface WeddingSideConfig {
  key: WeddingSideKey;
  route: string;
  password: string;
  portalLabel: string;
  familyLabel: string;
  roleLabel: string;
  heroEyebrow: string;
  heroTitle: string;
  heroCopy: string;
  heroCta: string;
  secondaryCta: string;
  traditionHeading: string;
  traditionCopy: string;
  galleryHeading: string;
  galleryCopy: string;
  uploadNote: string;
  alternateSide: WeddingSideKey;
  alternateLabel: string;
  palette: {
    background: string;
    glow: string;
    surface: string;
    surfaceStrong: string;
    border: string;
    primary: string;
    secondary: string;
    soft: string;
    muted: string;
    highlight: string;
    shadow: string;
  };
  heroImage: WeddingImageSlot;
  gallery: WeddingImageSlot[];
  events: WeddingEvent[];
  highlights: WeddingHighlight[];
}

export const WEDDING_SITE_TITLE = "Vikram & Chinese Wedding";
export const WEDDING_LANDING_LEFT = "Singh";
export const WEDDING_LANDING_RIGHT = "Kaur";

export const weddingSides: Record<WeddingSideKey, WeddingSideConfig> = {
  singh: {
    key: "singh",
    route: "/singh-side",
    password: "1234",
    portalLabel: "Men's Side",
    familyLabel: "The Singh Side",
    roleLabel: "Groom's family portal",
    heroEyebrow: "Blue house / private entry",
    heroTitle: "The Singh Side",
    heroCopy:
      "A midnight-blue portal for the groom's side, built around heritage, logistics, and a clean RSVP flow for each event.",
    heroCta: "View itinerary",
    secondaryCta: "Jump to RSVP",
    traditionHeading: "Built for the groom's side",
    traditionCopy:
      "Use this side to keep the men's schedule clear, hold space for arrival notes, and later drop in portraits without breaking the layout.",
    galleryHeading: "Moments To Replace Later",
    galleryCopy:
      "Every image slot is already framed. When you are ready, drop real photos into the matching filenames and the placeholders will disappear.",
    uploadNote:
      "Recommended filenames: singh-hero, singh-gallery-1, singh-gallery-2, singh-gallery-3.",
    alternateSide: "kaur",
    alternateLabel: "Switch to the women's portal",
    palette: {
      background:
        "linear-gradient(145deg, #050c18 0%, #081326 42%, #07101f 100%)",
      glow: "radial-gradient(circle at 20% 20%, rgba(61, 154, 255, 0.22), transparent 38%), radial-gradient(circle at 85% 15%, rgba(120, 195, 255, 0.14), transparent 30%)",
      surface: "rgba(8, 18, 41, 0.7)",
      surfaceStrong: "rgba(7, 16, 34, 0.88)",
      border: "rgba(129, 188, 255, 0.2)",
      primary: "#6cc7ff",
      secondary: "#2b7fff",
      soft: "#e8f6ff",
      muted: "#9fb9d8",
      highlight: "#f8d688",
      shadow: "rgba(42, 114, 255, 0.2)",
    },
    heroImage: {
      assetBase: "singh-hero",
      label: "Hero portrait",
      caption: "Best with a vertical groom portrait or ceremonial detail shot.",
    },
    gallery: [
      {
        assetBase: "singh-gallery-1",
        label: "Preparation",
        caption: "Turban tying, details, or candid getting-ready imagery.",
      },
      {
        assetBase: "singh-gallery-2",
        label: "Brotherhood",
        caption: "A wide image for friends, family, or a baraat-led frame.",
      },
      {
        assetBase: "singh-gallery-3",
        label: "Detail frame",
        caption: "A close crop for accessories, florals, or venue styling.",
      },
    ],
    events: [
      {
        id: "singh-jaggo",
        title: "Jaggo & Welcome Night",
        time: "Evening schedule to be confirmed",
        venue: "Venue details to follow",
        description:
          "A high-energy start for the groom's side with room for music, family arrivals, and pre-wedding photos.",
        tag: "Event one",
      },
      {
        id: "singh-anand-karaj",
        title: "Baraat, Anand Karaj & Reception",
        time: "Main wedding day schedule to be confirmed",
        venue: "Venue details to follow",
        description:
          "The main day timeline for procession, ceremony, and the celebration that follows.",
        tag: "Event two",
      },
    ],
    highlights: [
      {
        eyebrow: "Arrival",
        title: "Keep the groom's side coordinated",
        body: "Use the first cards for parking notes, arrival windows, or any transport details once they are final.",
      },
      {
        eyebrow: "Style",
        title: "Blue with a hyper-clean finish",
        body: "This side leans into electric blue, polished glass panels, and soft gold so the portal feels dressed-up without losing clarity.",
      },
      {
        eyebrow: "Photos",
        title: "Every slot is already sized",
        body: "No stretched images later. Each module keeps a fixed ratio so the site still feels intentional while you swap placeholders for real photos.",
      },
    ],
  },
  kaur: {
    key: "kaur",
    route: "/kaur-side",
    password: "5678",
    portalLabel: "Women's Side",
    familyLabel: "The Kaur Side",
    roleLabel: "Bride's family portal",
    heroEyebrow: "Red house / private entry",
    heroTitle: "The Kaur Side",
    heroCopy:
      "A deep-red bridal portal with space for traditions, gallery moments, and a separate RSVP flow for each event on the women's side.",
    heroCta: "See the events",
    secondaryCta: "Jump to RSVP",
    traditionHeading: "Built for the bride's side",
    traditionCopy:
      "The layout keeps the tone warm and ceremonial, with rich crimson depth, elegant spacing, and framed image placeholders ready for later.",
    galleryHeading: "Captured Moments, Ready Later",
    galleryCopy:
      "Upload bridal portraits, mehndi shots, or family imagery using the listed filenames and the portal will pick them up automatically.",
    uploadNote:
      "Recommended filenames: kaur-hero, kaur-gallery-1, kaur-gallery-2, kaur-gallery-3.",
    alternateSide: "singh",
    alternateLabel: "Switch to the men's portal",
    palette: {
      background:
        "linear-gradient(145deg, #1b0509 0%, #2a0810 45%, #160407 100%)",
      glow: "radial-gradient(circle at 18% 18%, rgba(255, 92, 121, 0.23), transparent 36%), radial-gradient(circle at 84% 16%, rgba(255, 176, 126, 0.14), transparent 30%)",
      surface: "rgba(46, 9, 17, 0.72)",
      surfaceStrong: "rgba(34, 7, 12, 0.9)",
      border: "rgba(255, 171, 150, 0.18)",
      primary: "#ff6f88",
      secondary: "#ff3d57",
      soft: "#fff1eb",
      muted: "#d8a7ae",
      highlight: "#ffd38d",
      shadow: "rgba(186, 24, 63, 0.2)",
    },
    heroImage: {
      assetBase: "kaur-hero",
      label: "Hero portrait",
      caption: "Best with a vertical bridal portrait or jewellery detail shot.",
    },
    gallery: [
      {
        assetBase: "kaur-gallery-1",
        label: "Bridal detail",
        caption: "A portrait or texture-led image for henna, fabric, or jewellery.",
      },
      {
        assetBase: "kaur-gallery-2",
        label: "Family frame",
        caption: "A wider image for sisters, cousins, or a warm family group shot.",
      },
      {
        assetBase: "kaur-gallery-3",
        label: "Ceremony detail",
        caption: "Perfect for decor, florals, candles, or venue atmosphere.",
      },
    ],
    events: [
      {
        id: "kaur-maiyan",
        title: "Maiyan & Bridal Gathering",
        time: "Evening schedule to be confirmed",
        venue: "Venue details to follow",
        description:
          "A warm pre-wedding gathering for colour, music, rituals, and close family time on the bride's side.",
        tag: "Event one",
      },
      {
        id: "kaur-anand-karaj",
        title: "Anand Karaj & Reception",
        time: "Main wedding day schedule to be confirmed",
        venue: "Venue details to follow",
        description:
          "The ceremony day flow, kept separate here so the bride's side can RSVP and plan around the key moments.",
        tag: "Event two",
      },
    ],
    highlights: [
      {
        eyebrow: "Tradition",
        title: "A richer bridal visual language",
        body: "This side leans into crimson, rose gold, and patterned textures so the portal feels ceremonial without becoming heavy.",
      },
      {
        eyebrow: "Clarity",
        title: "Each event RSVP stays separate",
        body: "Guests can answer individually for both events, so the form already matches the structure you will want once Supabase is connected.",
      },
      {
        eyebrow: "Gallery",
        title: "Placeholders that still feel finished",
        body: "Even before real photos go in, the image frames hold the composition and keep the site feeling premium.",
      },
    ],
  },
};

export const weddingSideList = [weddingSides.singh, weddingSides.kaur];

export function getWeddingSide(side: WeddingSideKey): WeddingSideConfig {
  return weddingSides[side];
}

export function getUnlockStorageKey(side: WeddingSideKey): string {
  return `wedding-portal-unlocked-${side}`;
}

export function getRsvpDraftStorageKey(side: WeddingSideKey): string {
  return `wedding-rsvp-draft-${side}`;
}

export function getRsvpSubmissionsStorageKey(side: WeddingSideKey): string {
  return `wedding-rsvp-submissions-${side}`;
}
