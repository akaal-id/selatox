import type { ProductValueChipIcon } from "@/constants/products";
import { PRODUCT_VALUE_CHIP_DEFINITIONS } from "@/constants/products";

export type ProductValueChipFormItem = {
  label: string;
  icon: ProductValueChipIcon;
};

function readStoredValueChips(value: unknown): Array<Record<string, unknown>> {
  if (Array.isArray(value)) {
    return value as Array<Record<string, unknown>>;
  }

  if (typeof value === "string" && value.trim()) {
    try {
      const parsed = JSON.parse(value) as unknown;
      if (Array.isArray(parsed)) return parsed as Array<Record<string, unknown>>;
    } catch {
      return [];
    }
  }

  return [];
}

export function parseProductValueChipsForForm(value: unknown): ProductValueChipFormItem[] {
  const stored = readStoredValueChips(value);

  return PRODUCT_VALUE_CHIP_DEFINITIONS.map((definition, index) => ({
    label: String(stored[index]?.label ?? ""),
    icon: definition.icon,
  }));
}

export function serializeProductValueChips(
  items: ProductValueChipFormItem[]
): Array<{ icon: ProductValueChipIcon; label: string }> {
  return PRODUCT_VALUE_CHIP_DEFINITIONS.map((definition, index) => ({
    icon: definition.icon,
    label: (items[index]?.label ?? "").trim(),
  }));
}

const PRODUCT_FIELD_LABELS: Record<string, string> = {
  slug: "Slug",
  eyebrow: "Tagline eyebrow",
  title: "Brand name",
  tagline: "Brand subname",
  short_description: "Short description",
  category: "Category",
  image_src: "Image",
  image_alt: "Image alt text",
  spec_eyebrow: "Details eyebrow",
  spec_headline: "Details title",
  description: "Details description",
  regulatory_tags: "Values",
  specs: "Specs",
  sort_order: "Sort order",
  is_published: "Published",
};

export function getProductFieldLabel(key: string): string {
  return PRODUCT_FIELD_LABELS[key] ?? key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export type ProductCmsSection = {
  id: string;
  title: string;
  keys: string[];
};

export const PRODUCT_CMS_SECTIONS: ProductCmsSection[] = [
  {
    id: "general",
    title: "General",
    keys: [
      "slug",
      "eyebrow",
      "title",
      "tagline",
      "category",
      "short_description",
      "value_chips",
      "image_src",
      "image_alt",
      "sort_order",
      "is_published",
    ],
  },
  {
    id: "details",
    title: "Details",
    keys: ["spec_eyebrow", "spec_headline", "description", "regulatory_tags"],
  },
  {
    id: "spec-list",
    title: "Specs",
    keys: ["specs"],
  },
];

export function getProductCmsSections(): ProductCmsSection[] {
  return PRODUCT_CMS_SECTIONS;
}
