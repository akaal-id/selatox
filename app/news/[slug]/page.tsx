import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getNewsBySlug,
  getNewsDescription,
  newsArticles,
} from "@/constants/news";
import { NewsDetail } from "./news-detail";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return newsArticles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getNewsBySlug(slug);
  if (!article) return { title: "News | Selatox" };
  return {
    title: `${article.title} | Selatox Newsroom`,
    description: getNewsDescription(article),
  };
}

export default async function NewsArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getNewsBySlug(slug);
  if (!article) notFound();

  return <NewsDetail article={article} />;
}
