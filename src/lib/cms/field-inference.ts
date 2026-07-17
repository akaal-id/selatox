import type { CmsFieldType } from "@/lib/cms/home";
import { isRichTextField } from "@/components/admin/admin-ui";
import { parseStringListForForm, serializeStringList } from "@/lib/cms/string-list";
import {
  parseRoadmapItemsForForm,
  serializeRoadmapItems,
  type RoadmapItemFormItem,
} from "@/lib/cms/roadmap-items";
import {
  parseProductValueChipsForForm,
  serializeProductValueChips,
  type ProductValueChipFormItem,
} from "@/lib/cms/product-cms";
import {
  parseProductSpecsForForm,
  serializeProductSpecs,
  type ProductSpecFormItem,
} from "@/lib/cms/product-specs";
import { formatNewsDisplayDate } from "@/lib/cms/news-cms";

const SKIP_KEYS = new Set(["id", "created_at", "updated_at", "is_published", "legacy_id"]);

export function inferFieldType(key: string): CmsFieldType {
  if (key === "sort_order" || key.endsWith("_order")) return "number";
  if (key.endsWith("_video")) return "video";
  if (
    key.endsWith("_image") ||
    key.endsWith("_portrait") ||
    key.endsWith("_src") ||
    key === "image"
  ) {
    return "image";
  }
  if (isRichTextField(key) || key === "body_html" || key === "description") {
    return "richtext";
  }
  if (
    key.endsWith("_headline") ||
    key.endsWith("_sub") ||
    key.endsWith("_lead") ||
    key.endsWith("_text") ||
    key.endsWith("_message") ||
    key.endsWith("_intro") ||
    key.endsWith("_note") ||
    key.endsWith("_catchphrase") ||
    key.endsWith("_address") ||
    key.endsWith("_detail") ||
    key === "title" ||
    key === "subtitle" ||
    key === "page_lead" ||
    key === "tagline" ||
    key === "short_description"
  ) {
    return key.length > 80 || isRichTextField(key) ? "richtext" : "textarea";
  }
  return "text";
}

export function fieldLabel(key: string): string {
  if (key === "values_title") return "Values section title";
  return key
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

/**
 * Keys that map a row to its public URL or seeded identity. Editing them breaks
 * existing links and references, so the CMS shows them read-only.
 */
const LOCKED_KEYS = new Set(["slug"]);

export function isLockedField(key: string): boolean {
  return LOCKED_KEYS.has(key);
}

/** Plain-language guidance shown under a field so non-technical editors know what good input looks like. */
export function fieldHint(key: string): string | undefined {
  if (key === "slug") {
    return "Part of the public web address. Locked to keep existing links working — ask a developer to change it.";
  }
  if (key === "sort_order" || key.endsWith("_order")) {
    return "Controls ordering. Lower numbers appear first.";
  }
  if (key === "image_alt" || key.endsWith("_alt")) {
    return "Describes the image for screen readers and search engines. Leave blank for decorative images.";
  }
  if (key.endsWith("_map_query")) {
    return "Used to build the embedded Google Map — e.g. an address or place name.";
  }
  if (key.endsWith("_bg_image")) {
    return "Displayed full-width behind the hero. Use a wide, high-resolution image.";
  }
  if (key.endsWith("_video")) {
    return "Paste a hosted video URL (MP4 or WebM) or upload a file below.";
  }
  return undefined;
}

export function groupSingletonFields(
  row: Record<string, unknown>
): { id: string; title: string; keys: string[] }[] {
  const groups = new Map<string, string[]>();

  for (const key of Object.keys(row).sort()) {
    if (SKIP_KEYS.has(key)) continue;
    const prefix = key.includes("_") ? key.split("_")[0] : "general";
    const items = groups.get(prefix) ?? [];
    items.push(key);
    groups.set(prefix, items);
  }

  return Array.from(groups.entries()).map(([prefix, keys]) => ({
    id: prefix,
    title: prefix === "general" ? "General" : fieldLabel(prefix),
    keys,
  }));
}

export function groupCollectionFields(
  row: Record<string, unknown>
): { id: string; title: string; keys: string[] }[] {
  const skip = new Set(["id", "created_at", "updated_at", "legacy_id", "slug"]);
  const groups = new Map<string, string[]>();

  for (const key of Object.keys(row).sort()) {
    if (skip.has(key)) continue;
    const prefix = key.includes("_") ? key.split("_")[0] : "general";
    const items = groups.get(prefix) ?? [];
    items.push(key);
    groups.set(prefix, items);
  }

  return Array.from(groups.entries()).map(([prefix, keys]) => ({
    id: prefix,
    title: prefix === "general" ? "General" : fieldLabel(prefix),
    keys,
  }));
}

const PAIR_RIGHT_SUFFIXES = ["_link", "_email", "_href", "_url"] as const;

export type FieldLayoutItem =
  | { type: "single"; key: string }
  | {
      type: "pair";
      title: string;
      leftKey: string;
      rightKey: string;
      rightLabel: string;
    };

function findNamePair(
  key: string,
  keySet: Set<string>
): { left: string; right: string } | null {
  if (key.endsWith("_name")) {
    const base = key.slice(0, -"_name".length);
    const right = `${base}_sub`;
    if (keySet.has(right)) return { left: key, right };
  }

  if (key.endsWith("_sub")) {
    const base = key.slice(0, -"_sub".length);
    const left = `${base}_name`;
    if (keySet.has(left)) return { left, right: key };
  }

  return null;
}

function findLabelPair(
  key: string,
  keySet: Set<string>
): { left: string; right: string } | null {
  if (key.endsWith("_label")) {
    const base = key.slice(0, -"_label".length);
    for (const suffix of PAIR_RIGHT_SUFFIXES) {
      const right = `${base}${suffix}`;
      if (keySet.has(right)) return { left: key, right };
    }
  }

  for (const suffix of PAIR_RIGHT_SUFFIXES) {
    if (!key.endsWith(suffix)) continue;
    const base = key.slice(0, -suffix.length);
    const left = `${base}_label`;
    if (keySet.has(left)) return { left, right: key };
  }

  return null;
}

export function pairGroupTitle(leftKey: string): string {
  const base = leftKey.replace(/_label$/, "").replace(/_name$/, "");
  const buttonMatch = base.match(/button_(\d+)$/i);
  if (buttonMatch) return `Button ${buttonMatch[1]}`;
  const channelMatch = base.match(/channel_(\d+)$/i);
  if (channelMatch) return `Channel ${channelMatch[1]}`;
  const coreValueMatch = base.match(/core_value_(\d+)$/i);
  if (coreValueMatch) return `Value ${coreValueMatch[1]}`;
  if (base.endsWith("_cta")) {
    return `${fieldLabel(base.replace(/_cta$/, ""))} CTA`;
  }
  return fieldLabel(base);
}

function rightPairLabel(rightKey: string): string {
  if (rightKey.endsWith("_email")) return "Email";
  if (
    rightKey.endsWith("_link") ||
    rightKey.endsWith("_href") ||
    rightKey.endsWith("_url")
  ) {
    return "Link";
  }
  if (rightKey.endsWith("_sub")) return "Description";
  return fieldLabel(rightKey);
}

export function layoutFieldKeys(keys: string[]): FieldLayoutItem[] {
  const keySet = new Set(keys);
  const used = new Set<string>();
  const items: FieldLayoutItem[] = [];

  for (const key of keys) {
    if (used.has(key)) continue;

    const pair = findLabelPair(key, keySet) ?? findNamePair(key, keySet);
    if (pair) {
      used.add(pair.left);
      used.add(pair.right);
      items.push({
        type: "pair",
        title: pairGroupTitle(pair.left),
        leftKey: pair.left,
        rightKey: pair.right,
        rightLabel: rightPairLabel(pair.right),
      });
      continue;
    }

    items.push({ type: "single", key });
  }

  return items;
}

export function editableRowInput(row: Record<string, unknown>): Record<string, unknown> {
  const input: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(row)) {
    if (SKIP_KEYS.has(key)) continue;
    if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      input[key] = JSON.stringify(value, null, 2);
    } else if (Array.isArray(value)) {
      input[key] = JSON.stringify(value, null, 2);
    } else {
      input[key] = value ?? "";
    }
  }
  return input;
}

export function collectionFormFromRow(
  row: Record<string, unknown>,
  table: string
): Record<string, unknown> {
  const input = editableRowInput(row);

  if (table === "products") {
    input.specs = parseProductSpecsForForm(row.specs);
    input.value_chips = parseProductValueChipsForForm(row.value_chips);
    input.regulatory_tags = parseStringListForForm(row.regulatory_tags);
  }

  if (table === "roadmap") {
    input.items = parseRoadmapItemsForForm(row.items);
  }

  if (table === "rnd") {
    input.tags = parseStringListForForm(row.tags);
  }

  if (table === "news") {
    return {
      title: input.title ?? "",
      category: input.category ?? "Press Release",
      image_src: input.image_src ?? "",
      body_html: input.body_html ?? "",
    };
  }

  return input;
}

export function getCollectionRowId(row: Record<string, unknown>): string {
  return String(row.id ?? row.slug ?? "");
}

export function getCollectionRowTitle(row: Record<string, unknown>): string {
  return String(row.title ?? row.slug ?? getCollectionRowId(row));
}

export function getCollectionRowMeta(row: Record<string, unknown>): string {
  const displayDate =
    "display_date" in row
      ? formatNewsDisplayDate(row.created_at) ||
        (row.display_date != null && row.display_date !== ""
          ? String(row.display_date)
          : null)
      : null;

  const parts = [
    row.category,
    row.brand,
    row.location,
    row.year,
    row.phase,
    displayDate,
    row.regimen,
    row.section,
    row.experience_level,
  ]
    .filter((value) => value != null && value !== "")
    .map(String);

  return parts.slice(0, 3).join(" · ");
}

export type CollectionRowStatus = {
  label: string;
  tone: "success" | "warning" | "default" | "error";
};

export function getCollectionRowStatus(row: Record<string, unknown>): CollectionRowStatus | null {
  if (typeof row.status === "string") {
    const status = row.status;
    if (status === "published" || status === "Open") {
      return { label: status, tone: "success" };
    }
    if (status === "draft" || status === "Closing Soon") {
      return { label: status, tone: "warning" };
    }
    if (status === "Closed") {
      return { label: status, tone: "default" };
    }
    return { label: status, tone: "default" };
  }

  if (typeof row.is_published === "boolean") {
    return row.is_published
      ? { label: "Published", tone: "success" }
      : { label: "Draft", tone: "warning" };
  }

  return null;
}

export function parseRowPayload(
  input: Record<string, unknown>,
  original: Record<string, unknown>
): Record<string, unknown> {
  const next: Record<string, unknown> = { ...input };

  for (const key of Object.keys(next)) {
    const originalValue = original[key];

    if (key === "specs" && Array.isArray(next[key])) {
      next[key] = serializeProductSpecs(next[key] as ProductSpecFormItem[]);
      continue;
    }

    if (key === "value_chips" && Array.isArray(next[key])) {
      next[key] = serializeProductValueChips(next[key] as ProductValueChipFormItem[]);
      continue;
    }

    if (key === "regulatory_tags" && Array.isArray(next[key])) {
      next[key] = serializeStringList(next[key] as string[]);
      continue;
    }

    if (key === "tags" && Array.isArray(next[key])) {
      next[key] = serializeStringList(next[key] as string[]);
      continue;
    }

    if (key === "items" && Array.isArray(next[key])) {
      next[key] = serializeRoadmapItems(next[key] as RoadmapItemFormItem[]);
      continue;
    }

    if (
      typeof originalValue === "object" &&
      originalValue !== null &&
      typeof next[key] === "string"
    ) {
      try {
        next[key] = JSON.parse(next[key] as string);
      } catch {
        // keep string
      }
    }
  }

  if ("is_published" in original) {
    next.is_published = input.is_published ?? original.is_published;
  }

  return next;
}
