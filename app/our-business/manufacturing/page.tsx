import type { Metadata } from "next";
import { PageHeader } from "@/components/pageheader/PageHeader";
import { getManufacturingPageContent } from "@/lib/cms/public-content";
import { ManufacturingScale } from "./scale/scale";
import { ManufacturingProcess } from "./process/process";
import { ManufacturingQuality } from "./quality/quality";
import { ManufacturingWorkplace } from "./workplace/workplace";

export const metadata: Metadata = {
  title: "Manufacturing | Selatox",
  description:
    "Explore PT. Selatox Bio Pharma's globally aligned manufacturing ecosystem, advanced aseptic processing, and GMP-first quality architecture.",
};

export const revalidate = 30;

export default async function ManufacturingPage() {
  const content = await getManufacturingPageContent();

  return (
    <main>
      <PageHeader
        eyebrow="Manufacturing"
        title={content.header.headline}
        subtitle={content.header.sub}
        lead={content.header.lead}
      />
      <ManufacturingScale content={content.scale} />
      <ManufacturingProcess content={content.process} />
      <ManufacturingQuality content={content.quality} />
      <ManufacturingWorkplace content={content.workplace} />
    </main>
  );
}
