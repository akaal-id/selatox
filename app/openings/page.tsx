import type { Metadata } from "next";
import { OpportunitiesBrowser } from "./opportunities-browser";

export const metadata: Metadata = {
  title: "Opportunities | Selatox Careers",
  description:
    "Explore open roles at Selatox across research, manufacturing, quality, and commercial teams in Indonesia.",
};

export default function OpportunitiesPage() {
  return (
    <main>
      <OpportunitiesBrowser />
    </main>
  );
}
