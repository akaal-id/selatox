import type { Metadata } from "next";
import { PageHeader } from "@/components/pageheader/PageHeader";
import { aboutHero } from "@/constants/about";
import { BrandIntro } from "./brand-intro/brand-intro";
import { ExecutiveSection } from "./executive/executive";
import { AboutValues } from "./values/values";
import { Roadmap } from "./roadmap/roadmap";
import { Facilities } from "./facilities/facilities";
import { AboutContact } from "./contact/contact";

export const metadata: Metadata = {
  title: "About Us | Selatox",
  description:
    "PT. Selatox Bio Pharma — Indonesia's pioneer in biopharmaceutical specialization, GMP manufacturing, and bio-aesthetic research.",
};

export default function AboutPage() {
  return (
    <main>
      <PageHeader
        title={aboutHero.headline}
        subtitle={aboutHero.subheadline}
        backgroundImage={aboutHero.backgroundImage}
      />
      <BrandIntro />
      <AboutValues />
      <ExecutiveSection />
      <Roadmap />
      {/* <Facilities /> */}
      <AboutContact />
    </main>
  );
}
