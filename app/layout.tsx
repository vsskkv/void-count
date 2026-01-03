import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { getSiteUrl, SITE_DESCRIPTION, SITE_NAME } from "@/lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: SITE_NAME,
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/void-count-logo.png",
        alt: `${SITE_NAME} logo`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: ["/void-count-logo.png"],
  },
  icons: {
    icon: [
      { url: "/void-count-logo.png" },
      { url: "/void-count-logo.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/void-count-logo.png" }],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#020617",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: siteUrl,
    logo: `${siteUrl}/void-count-logo.png`,
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: siteUrl,
  };

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Void Count",
    description: SITE_DESCRIPTION,
    image: `${siteUrl}/void-count-logo.png`,
    brand: {
      "@type": "Brand",
      name: "Void Count",
    },
    offers: {
      "@type": "Offer",
      url: siteUrl,
      availability: "https://schema.org/PreOrder",
      price: "0.00",
      priceCurrency: "GBP",
    },
  };

  return (
    <html lang="en-GB">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-slate-950 text-slate-50`}
      >
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
        />
        <div className="min-h-screen flex flex-col bg-[radial-gradient(circle_at_top,#1d2540_0,transparent_55%),radial-gradient(circle_at_bottom,#020617_0,transparent_55%)]">
          {children}
        </div>
      </body>
    </html>
  );
}
