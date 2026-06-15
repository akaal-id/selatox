import type { Metadata } from "next";
import { PageHeader } from "@/components/pageheader/PageHeader";
import { ManufacturingScale } from "./scale/scale";
import { ManufacturingProcess } from "./process/process";
import { ManufacturingQuality } from "./quality/quality";
import { ManufacturingWorkplace } from "./workplace/workplace";

export const metadata: Metadata = {
  title: "Manufacturing | Selatox",
  description:
    "Explore PT. Selatox Bio Pharma's globally aligned manufacturing ecosystem, advanced aseptic processing, and GMP-first quality architecture.",
};

export default function ManufacturingPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Manufacturing"
        title="Engineered for Global Scale"
        subtitle="World-class biopharmaceutical manufacturing."
        lead="Located in Cikarang, our expansive facility represents the pinnacle of modern production. As Indonesia’s first specialized botulinum toxin manufacturer, we combine state-of-the-art automation with uncompromising quality controls to deliver premium aesthetic solutions to the world."
      />
      <ManufacturingScale />
      <ManufacturingProcess />
      <ManufacturingQuality />
      <ManufacturingWorkplace />
    </main>
  );
}
