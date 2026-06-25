import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { SiteFooter, SiteNavbar } from "@/components/site-chrome";
import { LenisProvider } from "@/components/lenis/LenisProvider";
import { ScrollFloater } from "@/components/scrollfloater/ScrollFloater";
import { PageLoader } from "@/components/loader/PageLoader";
import "@/styles/globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

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
      className={`${manrope.variable} ${GeistSans.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen antialiased font-sans">
        <LenisProvider>
          <PageLoader />
          <SiteNavbar />
          {children}
          <SiteFooter />
          <ScrollFloater />
        </LenisProvider>
      </body>
    </html>
  );
}
