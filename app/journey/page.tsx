import type { Metadata } from "next";
import { PageHeader } from "@/components/pageheader/PageHeader";
import { getJourneyPageContent } from "@/lib/cms/public-content";
import { CareerJourneyIntro } from "./intro/intro";
import { WhySelatox } from "./why-selatox/why-selatox";
import { ValueChain } from "./value-chain/value-chain";
import { CareerPaths } from "./career-paths/career-paths";
import { OpenPositions } from "./open-positions/open-positions";
import { TalentNetwork } from "./talent-network/talent-network";

export const metadata: Metadata = {
  title: "Career Journey | Selatox Careers",
  description:
    "Discover how Selatox turns scientific innovation into global impact — and where your career fits in the journey.",
};

export const revalidate = 30;

export default async function CareerJourneyPage() {
  const content = await getJourneyPageContent();

  return (
    <main>
      <PageHeader
        eyebrow="Journey"
        title={content.header.headline}
        subtitle={content.header.sub}
      />
      <CareerJourneyIntro content={content.intro} />
      <WhySelatox content={content.whySelatox} />
      <ValueChain content={content.valueChain} />
      <CareerPaths content={content.careerPaths} />
      <OpenPositions content={content.openPositions} />
      <TalentNetwork content={content.talentNetwork} />
    </main>
  );
}
