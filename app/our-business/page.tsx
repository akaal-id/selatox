import type { Metadata } from "next";
import { PageHeader } from "@/components/pageheader/PageHeader";
import { getOurBusinessPageContent } from "@/lib/cms/public-content";
import { Research } from "./research/research";
import { Manufacturing } from "./manufacturing/manufacturing";
import { GlobalPartnerships } from "./global-partnerships/global-partnerships";

export const metadata: Metadata = {
  title: "Our Business | Selatox",
  description:
    "From research and innovation to global-standard manufacturing and international partnerships — discover how Selatox brings science-backed aesthetic solutions to the world.",
};

export const revalidate = 30;

export default async function OurBusinessPage() {
  const content = await getOurBusinessPageContent();

  return (
    <main>
      <PageHeader
        eyebrow="Our Business"
        title={content.header.headline}
        subtitle={content.header.sub}
      />
      <Research content={content.research} />
      <Manufacturing content={content.manufacturing} />
      <GlobalPartnerships content={content.partnerships} />
    </main>
  );
}
