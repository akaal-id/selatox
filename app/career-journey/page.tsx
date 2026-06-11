import type { Metadata } from "next";
import { PageHeader } from "@/components/pageheader/PageHeader";
import { careerJourneyHero } from "@/constants/career-journey";
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

export default function CareerJourneyPage() {
  return (
    <main>
      <PageHeader
        title={careerJourneyHero.title}
        subtitle={careerJourneyHero.subtitle}
        backgroundImage={careerJourneyHero.backgroundImage}
        backgroundAlt={careerJourneyHero.backgroundAlt}
      />
      <CareerJourneyIntro />
      <WhySelatox />
      <ValueChain />
      <CareerPaths />
      <OpenPositions />
      <TalentNetwork />
    </main>
  );
}
