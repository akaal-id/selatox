export type CmsTableKind = "singleton" | "collection";

export type CmsTableConfig = {
  slug: string;
  table: string;
  label: string;
  description: string;
  kind: CmsTableKind;
  orderBy?: { column: string; ascending?: boolean };
};

export const CMS_TABLES: CmsTableConfig[] = [
  {
    slug: "home",
    table: "home",
    label: "Home",
    description: "Landing page sections",
    kind: "singleton",
  },
  {
    slug: "about",
    table: "about",
    label: "About",
    description: "About page copy",
    kind: "singleton",
  },
  {
    slug: "contact",
    table: "contact",
    label: "Contact",
    description: "Contact page & locations",
    kind: "singleton",
  },
  {
    slug: "our_business",
    table: "our_business",
    label: "Our Business",
    description: "Our business page",
    kind: "singleton",
  },
  {
    slug: "manufacturing",
    table: "manufacturing",
    label: "Manufacturing",
    description: "Manufacturing subpage",
    kind: "singleton",
  },
  {
    slug: "journey",
    table: "journey",
    label: "Career Journey",
    description: "Career journey page",
    kind: "singleton",
  },
  {
    slug: "ethics",
    table: "ethics",
    label: "Ethics",
    description: "Ethics page",
    kind: "singleton",
  },
  {
    slug: "newsroom",
    table: "newsroom",
    label: "Newsroom Page",
    description: "News list page header",
    kind: "singleton",
  },
  {
    slug: "openings",
    table: "openings",
    label: "Openings Page",
    description: "Careers list page header",
    kind: "singleton",
  },
  {
    slug: "products",
    table: "products",
    label: "Products",
    description: "Product catalog",
    kind: "collection",
    orderBy: { column: "sort_order", ascending: true },
  },
  {
    slug: "news",
    table: "news",
    label: "News",
    description: "Articles & press releases",
    kind: "collection",
    orderBy: { column: "created_at", ascending: false },
  },
  {
    slug: "careers",
    table: "careers",
    label: "Careers",
    description: "Job listings",
    kind: "collection",
    orderBy: { column: "sort_order", ascending: true },
  },
  {
    slug: "rnd",
    table: "rnd",
    label: "R&D Pipeline",
    description: "Research programs",
    kind: "collection",
    orderBy: { column: "sort_order", ascending: true },
  },
  {
    slug: "roadmap",
    table: "roadmap",
    label: "Roadmap",
    description: "Company milestones",
    kind: "collection",
    orderBy: { column: "sort_order", ascending: true },
  },
];

const tableBySlug = new Map(CMS_TABLES.map((t) => [t.slug, t]));

export function getCmsTable(slug: string): CmsTableConfig | undefined {
  return tableBySlug.get(slug);
}

export function groupSingletonFields(
  row: Record<string, unknown>
): { group: string; fields: { key: string; label: string; value: unknown }[] }[] {
  const skip = new Set(["id", "created_at", "updated_at", "is_published"]);
  const groups = new Map<string, { key: string; label: string; value: unknown }[]>();

  for (const [key, value] of Object.entries(row)) {
    if (skip.has(key)) continue;
    const group = key.includes("_") ? key.split("_")[0] : "general";
    const label = key
      .replace(/_/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());
    const items = groups.get(group) ?? [];
    items.push({ key, label, value });
    groups.set(group, items);
  }

  return Array.from(groups.entries()).map(([group, fields]) => ({
    group,
    fields,
  }));
}
