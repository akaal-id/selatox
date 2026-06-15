import type { Metadata } from "next";
import { PageHeader } from "@/components/pageheader/PageHeader";
import { cultureHero } from "@/constants/culture";
import { CultureIntro } from "./intro/intro";
import { CulturePillars } from "./pillars/pillars";
import { CultureGtd } from "./gtd/gtd";
import { CultureCta } from "./cta/culture-cta";

export const metadata: Metadata = {
  title: "Selatox Culture | Careers",
  description:
    "Discover how Selatox builds a result-driven, agile culture — empowering world-class talent in Indonesia's first specialized biopharmaceutical center.",
};

export default function CulturePage() {
  return (
    <main>
      <PageHeader
        eyebrow="Culture"
        title={cultureHero.title}
        subtitle={cultureHero.subtitle}
      />
      <CultureIntro />
      <CulturePillars />
      {/* <CultureGtd /> */}
      <CultureCta />
    </main>
  );
}
