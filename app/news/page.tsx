import type { Metadata } from "next";
import { getNewsArticles, getNewsPageMeta } from "@/lib/cms/public-content";
import { NewsBrowser } from "./news-browser";

export const revalidate = 30;

export async function generateMetadata(): Promise<Metadata> {
  const pageMeta = await getNewsPageMeta();

  return {
    title: "Newsroom | Selatox",
    description: pageMeta.subtitle,
  };
}

export default async function NewsPage() {
  const [pageMeta, articles] = await Promise.all([
    getNewsPageMeta(),
    getNewsArticles(),
  ]);

  return (
    <main>
      <NewsBrowser articles={articles} pageMeta={pageMeta} />
    </main>
  );
}
