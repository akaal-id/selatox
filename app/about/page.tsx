import type { Metadata } from "next";
import { PageHeader } from "@/components/pageheader/PageHeader";
import { getAboutPageContent } from "@/lib/cms/public-content";
import { ExecutiveSection } from "./executive/executive";
import { AboutValues } from "./values/values";
import { Roadmap } from "./roadmap/roadmap";
import { AboutContact } from "./contact/contact";

export const metadata: Metadata = {
  title: "About Us | Selatox",
  description:
    "PT. Selatox Bio Pharma — Indonesia's pioneer in biopharmaceutical specialization, GMP manufacturing, and bio-aesthetic research.",
};

export const revalidate = 30;

export default async function AboutPage() {
  const content = await getAboutPageContent();

  return (
    <main>
      <PageHeader
        eyebrow="About"
        title={content.header.headline}
        subtitle={content.header.sub}
      />
      <AboutValues content={content.values} />
      <ExecutiveSection content={content.executive} />
      <Roadmap content={content.roadmap} />
      <AboutContact content={content.contact} />
    </main>
  );
}
