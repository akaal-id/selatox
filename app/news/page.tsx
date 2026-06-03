import type { Metadata } from "next";
import { NewsBrowser } from "./news-browser";
import { newsPage } from "@/constants/news";

export const metadata: Metadata = {
  title: "Newsroom | Selatox",
  description: newsPage.subtitle,
};

export default function NewsPage() {
  return (
    <main>
      <NewsBrowser />
    </main>
  );
}
