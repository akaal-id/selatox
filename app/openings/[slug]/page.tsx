import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { jobDescriptionToPlainText } from "@/constants/opportunities";
import { getCareerBySlug, getCareerSlugs } from "@/lib/cms/public-content";
import { JobDetail } from "./job-detail";

export const revalidate = 30;

type JobDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getCareerSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: JobDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const job = await getCareerBySlug(slug);

  if (!job) {
    return { title: "Role Not Found | Selatox Careers" };
  }

  const summary = jobDescriptionToPlainText(job.description);

  return {
    title: `${job.title} | Selatox Careers`,
    description: summary.slice(0, 160) || job.title,
  };
}

export default async function JobDetailPage({ params }: JobDetailPageProps) {
  const { slug } = await params;
  const job = await getCareerBySlug(slug);

  if (!job) {
    notFound();
  }

  return <JobDetail job={job} />;
}
