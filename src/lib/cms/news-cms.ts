import type { NewsCategory } from "@/constants/news";

export const NEWS_CATEGORIES: NewsCategory[] = [
  "Press Release",
  "Notice",
  "Event",
];

export type NewsCmsSection = {
  id: string;
  title: string;
  keys: string[];
};

/** News editor: General → Image → Body. Dates/status/alt are managed automatically. */
export const NEWS_CMS_SECTIONS: NewsCmsSection[] = [
  {
    id: "general",
    title: "General",
    keys: ["title", "category"],
  },
  {
    id: "image",
    title: "Image",
    keys: ["image_src"],
  },
  {
    id: "body",
    title: "Body",
    keys: ["body_html"],
  },
];

export function getNewsCmsSections(): NewsCmsSection[] {
  return NEWS_CMS_SECTIONS;
}

const NEWS_FIELD_LABELS: Record<string, string> = {
  title: "Title",
  category: "Category",
  image_src: "Image",
  body_html: "Body",
};

export function getNewsFieldLabel(key: string): string {
  return (
    NEWS_FIELD_LABELS[key] ??
    key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
  );
}

/** Matches seed format, e.g. "Mar 12, 2026". */
export function formatNewsDisplayDate(value: unknown): string {
  if (value == null || value === "") return "";

  const date = value instanceof Date ? value : new Date(String(value));
  if (Number.isNaN(date.getTime())) return "";

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function newsPublishedYear(value: unknown): number {
  if (typeof value === "number" && Number.isFinite(value)) return value;

  const date = value instanceof Date ? value : new Date(String(value ?? ""));
  if (Number.isNaN(date.getTime())) return new Date().getFullYear();
  return date.getFullYear();
}
