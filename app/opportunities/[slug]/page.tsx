import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getJobBySlug, jobListings } from "@/constants/opportunities";
import { JobDetail } from "./job-detail";

type JobDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return jobListings.map((job) => ({ slug: job.slug }));
}

export async function generateMetadata({
  params,
}: JobDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const job = getJobBySlug(slug);

  if (!job) {
    return { title: "Role Not Found | Selatox Careers" };
  }

  const summary = job.description.find((block) => block.type === "paragraph");

  return {
    title: `${job.title} | Selatox Careers`,
    description: summary?.content.slice(0, 160) ?? job.title,
  };
}

export default async function JobDetailPage({ params }: JobDetailPageProps) {
  const { slug } = await params;
  const job = getJobBySlug(slug);

  if (!job) {
    notFound();
  }

  return <JobDetail job={job} />;
}
