import type { Metadata } from "next";
import { PageHeader } from "@/components/pageheader/PageHeader";
import { Vision } from "./vision/vision";
import { Research } from "./research/research";
import { OurBusinessFacilities } from "./facilities/facilities";
import { Partners } from "./partners/partners";

export const metadata: Metadata = {
  title: "Our Business | Selatox",
  description:
    "Discover PT. Selatox Bio Pharma's world-class biopharmaceutical pipeline, global GMP manufacturing facilities, and localized R&D innovations.",
};

export default function OurBusinessPage() {
  return (
    <main>
      <PageHeader
        title="Our Business"
        subtitle="Pioneering Botulinum Toxin Specialization & Research."
        backgroundImage="/images/hero-2.webp"
        backgroundAlt="Selatox Manufacturing Facility"
      />
      <Vision />
      <Research />
      {/* <OurBusinessFacilities /> */}
      <Partners />
    </main>
  );
}
