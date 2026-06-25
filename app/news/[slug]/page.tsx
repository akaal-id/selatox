import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getNewsDescription } from "@/constants/news";
import { getNewsBySlug, getNewsSlugs } from "@/lib/cms/public-content";
import { NewsDetail } from "./news-detail";

export const revalidate = 30;

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getNewsSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getNewsBySlug(slug);
  if (!article) return { title: "News | Selatox" };
  return {
    title: `${article.title} | Selatox Newsroom`,
    description: getNewsDescription(article),
  };
}

export default async function NewsArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = await getNewsBySlug(slug);
  if (!article) notFound();

  return <NewsDetail article={article} />;
}
