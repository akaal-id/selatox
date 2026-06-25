import type { Metadata } from "next";
import { PageHeader } from "@/components/pageheader/PageHeader";
import { getEthicsPageContent } from "@/lib/cms/public-content";
import { EthicsIntro } from "./intro/intro";
import { EthicsCommitment } from "./commitment/commitment";
import { EthicsLeadership } from "./leadership/leadership";
import { EthicsHotline } from "./hotline/hotline";

export const metadata: Metadata = {
  title: "Ethics | Selatox",
  description:
    "Selatox ethical management principles, compliance hotline, and reporting guidelines.",
};

export const revalidate = 30;

export default async function EthicsPage() {
  const content = await getEthicsPageContent();

  return (
    <main>
      <PageHeader
        eyebrow="Ethics"
        title={content.header.headline}
        subtitle={content.header.sub}
      />
      <EthicsIntro content={content.intro} />
      <EthicsCommitment content={content.commitment} />
      <EthicsLeadership content={content.leadership} />
      <EthicsHotline content={content.hotline} />
    </main>
  );
}
