import type { Metadata } from "next";
import { PageHeader } from "@/components/pageheader/PageHeader";
import { ethicsHero } from "@/constants/ethics";
import { EthicsIntro } from "./intro/intro";
import { EthicsCommitment } from "./commitment/commitment";
import { EthicsValues } from "./values/values";
import { EthicsLeadership } from "./leadership/leadership";
import { EthicsHotline } from "./hotline/hotline";

export const metadata: Metadata = {
  title: "Ethics | Selatox",
  description:
    "Selatox ethical management principles, compliance hotline, and reporting guidelines.",
};

export default function EthicsPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Ethics"
        title={ethicsHero.headline}
        subtitle={ethicsHero.subheadline}
      />
      <EthicsIntro />
      <EthicsCommitment />
      {/* <EthicsValues /> */}
      <EthicsLeadership />
      <EthicsHotline />
    </main>
  );
}
