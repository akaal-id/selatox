import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Navbar } from "@/components/navbar/navbar";
import { ScrollFloater } from "@/components/scrollfloater/ScrollFloater";
import "@/styles/globals.css";

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://selatox.com";

export const metadata: Metadata = {
  title: "PT. Selatox Bio Pharma | Global Website",
  description:
    "PT. Selatox Bio Pharma — Innovation in biotech and pharmaceutical excellence. Trusted globally for quality and safety.",
  icons: {
    icon: "/assets/icon.svg",
    apple: "/assets/icon.svg",
  },
  openGraph: {
    title: "PT. Selatox Bio Pharma Global Website",
    description:
      "Innovation in biotech and pharmaceutical excellence. Trusted globally for quality and safety.",
    images: [{ url: "/assets/icon.svg", alt: "Selatox" }],
  },
  twitter: {
    card: "summary",
    images: [{ url: "/assets/icon.svg", alt: "Selatox" }],
  },
  metadataBase: new URL(baseUrl),
};

/**
 * Root layout — Required html/body. Locale-specific shell in [locale]/layout.tsx.
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen antialiased font-sans">
        <Navbar />
        {children}
        <ScrollFloater />
      </body>
    </html>
  );
}
