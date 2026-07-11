import { notFound } from "next/navigation";
import { HomeSectionPage } from "@/components/admin/cms/home-editor";
import { getHomeCmsSection } from "@/lib/cms/home";

type AdminHomeSectionPageProps = {
  params: Promise<{ section: string }>;
};

export default async function AdminHomeSectionPage({ params }: AdminHomeSectionPageProps) {
  const { section: sectionId } = await params;

  if (!getHomeCmsSection(sectionId)) {
    notFound();
  }

  return <HomeSectionPage sectionId={sectionId} />;
}
