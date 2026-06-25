import type { Metadata } from "next";
import { getCareers, getOpeningsPageTitle } from "@/lib/cms/public-content";
import { OpportunitiesBrowser } from "./opportunities-browser";

export const revalidate = 30;

export const metadata: Metadata = {
  title: "Opportunities | Selatox Careers",
  description:
    "Explore open roles at Selatox across research, manufacturing, quality, and commercial teams in Indonesia.",
};

export default async function OpportunitiesPage() {
  const [pageTitle, jobs] = await Promise.all([
    getOpeningsPageTitle(),
    getCareers(),
  ]);

  return (
    <main>
      <OpportunitiesBrowser pageTitle={pageTitle} jobs={jobs} />
    </main>
  );
}
