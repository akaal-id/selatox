import type { Metadata } from "next";
import { PageHeader } from "@/components/pageheader/PageHeader";
import { Research } from "./research/research";
import { Manufacturing } from "./manufacturing/manufacturing";
import { GlobalPartnerships } from "./global-partnerships/global-partnerships";

export const metadata: Metadata = {
  title: "Our Business | Selatox",
  description:
    "From research and innovation to global-standard manufacturing and international partnerships — discover how Selatox brings science-backed aesthetic solutions to the world.",
};

export default function OurBusinessPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Our Business"
        title="From Discovery to Delivery"
        subtitle="Selatox integrates research, innovation, manufacturing, and global business development to create sustainable value across the aesthetic biotechnology industry."
      />
      <Research />
      <Manufacturing />
      <GlobalPartnerships />
    </main>
  );
}
