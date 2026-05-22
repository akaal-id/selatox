import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Navbar } from "@/components/navbar/navbar";
import { LenisProvider } from "@/components/lenis/LenisProvider";
import { ScrollFloater } from "@/components/scrollfloater/ScrollFloater";
import { Footer } from "@/components/footer/Footer";
import "@/styles/globals.css";

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://selatox.com";

export const metadata: Metadata = {
  title: "Selatox | Global Website",
  description:
    "Selatox — Innovation in biotech and pharmaceutical excellence. Trusted globally for quality and safety.",
  icons: {
    icon: "/assets/icon.svg",
    apple: "/assets/icon.svg",
  },
  openGraph: {
    title: "Selatox Global Website",
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
        <LenisProvider>
          <Navbar />
          {children}
          <Footer />
          <ScrollFloater />
        </LenisProvider>
      </body>
    </html>
  );
}
