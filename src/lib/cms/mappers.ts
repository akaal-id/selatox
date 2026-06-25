import type { JobListing } from "@/constants/opportunities";
import type { NewsArticle } from "@/constants/news";
import type { Product } from "@/constants/products";
import type { RoadmapMilestone } from "@/constants/about";
import { normalizeMediaSrc } from "@/lib/cms/media-url";

export function mapProductRow(row: Record<string, unknown>): Product {
  return {
    slug: String(row.slug),
    title: String(row.title),
    brand: String(row.brand),
    eyebrow: String(row.eyebrow ?? ""),
    tagline: String(row.tagline ?? ""),
    shortDescription: String(row.short_description ?? ""),
    description: String(row.description ?? ""),
    specHeadline: String(row.spec_headline ?? ""),
    specEyebrow: String(row.spec_eyebrow ?? ""),
    imageSrc: normalizeMediaSrc(String(row.image_src ?? "")) || String(row.image_src ?? ""),
    imageAlt: String(row.image_alt ?? ""),
    category: row.category as Product["category"],
    valueChips: (row.value_chips as Product["valueChips"]) ?? [],
    regulatoryTags: (row.regulatory_tags as string[]) ?? [],
    specs: (row.specs as Product["specs"]) ?? [],
  };
}

export function mapCareerRow(row: Record<string, unknown>): JobListing {
  return {
    id: String(row.id),
    slug: String(row.slug),
    status: row.status as JobListing["status"],
    title: String(row.title),
    location: String(row.location ?? ""),
    category: row.category as JobListing["category"],
    experienceLevel: String(row.experience_level ?? ""),
    applyDeadline: String(row.apply_deadline ?? ""),
    description: String(row.description ?? ""),
  };
}

export function mapNewsRow(row: Record<string, unknown>): NewsArticle {
  return {
    id: typeof row.legacy_id === "number" ? row.legacy_id : 0,
    slug: String(row.slug),
    category: row.category as NewsArticle["category"],
    date: String(row.display_date ?? ""),
    publishedYear: Number(row.published_year ?? 0),
    title: String(row.title),
    imageSrc: normalizeMediaSrc(String(row.image_src ?? "")) || String(row.image_src ?? ""),
    imageAlt: String(row.image_alt ?? ""),
    bodyHtml: String(row.body_html ?? ""),
  };
}

export function mapRndRow(row: Record<string, unknown>) {
  return {
    id: String(row.id),
    title: String(row.title),
    regimen: String(row.regimen ?? ""),
    description: String(row.description ?? ""),
    phase: String(row.phase ?? ""),
    targetLaunch: String(row.target_launch ?? ""),
    tags: (row.tags as string[]) ?? [],
    featured: Boolean(row.featured),
  };
}

export function mapRoadmapRow(row: Record<string, unknown>): RoadmapMilestone {
  return {
    year: String(row.year),
    title: String(row.title),
    section: row.section as RoadmapMilestone["section"],
    status: row.status as RoadmapMilestone["status"],
    image: normalizeMediaSrc(String(row.image ?? "")) || String(row.image ?? ""),
    imageBg: row.image_bg
      ? normalizeMediaSrc(String(row.image_bg)) || String(row.image_bg)
      : undefined,
    items: (row.items as RoadmapMilestone["items"]) ?? [],
  };
}

export function str(row: Record<string, unknown>, key: string, fallback = ""): string {
  const value = row[key];
  return value == null || value === "" ? fallback : String(value);
}
