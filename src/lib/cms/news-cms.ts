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

/** News editor: General → Image → Body. */
export const NEWS_CMS_SECTIONS: NewsCmsSection[] = [
  {
    id: "general",
    title: "General",
    keys: ["title", "category", "published_at"],
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
  published_at: "Published at",
  image_src: "Image",
  body_html: "Body",
};

export function getNewsFieldLabel(key: string): string {
  return (
    NEWS_FIELD_LABELS[key] ??
    key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
  );
}

/** Prefer explicit publish date, otherwise fall back to created_at. */
export function resolveNewsDateSource(row: Record<string, unknown>): unknown {
  if (row.published_at != null && String(row.published_at).trim() !== "") {
    return row.published_at;
  }
  return row.created_at;
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

/** Convert DB timestamptz → `YYYY-MM-DD` for `<input type="date">`. */
export function publishedAtToDateInput(value: unknown): string {
  if (value == null || value === "") return "";

  const date = value instanceof Date ? value : new Date(String(value));
  if (Number.isNaN(date.getTime())) return "";

  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/** Convert date input → timestamptz, or null when cleared. */
export function dateInputToPublishedAt(value: unknown): string | null {
  if (value == null) return null;
  const trimmed = String(value).trim();
  if (!trimmed) return null;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) return null;
  return `${trimmed}T12:00:00.000Z`;
}

/** Keep display_date / published_year in sync with the effective publish date. */
export function buildNewsDatePayload(
  publishedAtInput: unknown,
  original: Record<string, unknown>
): {
  published_at: string | null;
  display_date: string;
  published_year: number;
} {
  const publishedAt = dateInputToPublishedAt(publishedAtInput);
  const source = publishedAt ?? original.created_at ?? new Date().toISOString();

  return {
    published_at: publishedAt,
    display_date: formatNewsDisplayDate(source),
    published_year: newsPublishedYear(source),
  };
}

export function newsSortTimestamp(row: Record<string, unknown>): number {
  const source = resolveNewsDateSource(row);
  const time = new Date(String(source ?? 0)).getTime();
  return Number.isNaN(time) ? 0 : time;
}

export function sortNewsRowsByPublishDate(
  rows: Record<string, unknown>[]
): Record<string, unknown>[] {
  return [...rows].sort((a, b) => newsSortTimestamp(b) - newsSortTimestamp(a));
}
