import type { Metadata } from "next";
import { PageHeader } from "@/components/pageheader/PageHeader";
import { Vision } from "./vision/vision";
import { Manufacturing } from "./manufacturing/manufacturing";
import { Research } from "./research/research";
import { OurBusinessFacilities } from "./facilities/facilities";

export const metadata: Metadata = {
  title: "Our Business | Selatox",
  description:
    "Discover PT. Selatox Bio Pharma's world-class biopharmaceutical pipeline, global GMP manufacturing facilities, and localized R&D innovations.",
};

export default function OurBusinessPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Our Business"
        title="Where advanced research meets global partnership"
        subtitle="Pioneering Botulinum Toxin Specialization & Research."
      />
      <Vision />
      <Manufacturing />
      <Research />
      {/* <OurBusinessFacilities /> */}
      {/* <Partners /> */}
    </main>
  );
}
