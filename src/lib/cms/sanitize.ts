import sanitizeHtml from "sanitize-html";
import { HOME_CMS_SECTIONS, type HomePageInput } from "@/lib/cms/home";

const RICH_TEXT_OPTIONS: sanitizeHtml.IOptions = {
  allowedTags: ["p", "br", "em", "i", "strong", "b", "span", "a", "img", "figure", "figcaption"],
  allowedAttributes: {
    a: ["href", "title", "target", "rel"],
    span: ["class"],
    img: ["src", "alt", "title", "width", "height", "class", "loading"],
  },
  allowedSchemes: ["http", "https"],
};

export function sanitizeRichText(html: string): string {
  return sanitizeHtml(html.trim(), RICH_TEXT_OPTIONS);
}

/** Strip block wrappers so rich text can live inside h1–h3. */
export function normalizeHeadingHtml(html: string): string {
  return sanitizeRichText(html)
    .replace(/^<p>/i, "")
    .replace(/<\/p>$/i, "")
    .replace(/<\/p>\s*<p>/gi, "<br />");
}

export function plainTextToHtml(text: string): string {
  const trimmed = text.trim();
  if (!trimmed) return "";
  if (/<[a-z][\s\S]*>/i.test(trimmed)) {
    return sanitizeRichText(trimmed);
  }
  return trimmed
    .split(/\n+/)
    .map((line) => `<p>${sanitizeHtml(line.trim(), { allowedTags: [], allowedAttributes: {} })}</p>`)
    .join("");
}

function collectHomeRichTextFields(): Array<keyof HomePageInput & string> {
  const keys = new Set<keyof HomePageInput>();

  for (const section of HOME_CMS_SECTIONS) {
    if (section.id === "hero") continue;

    for (const field of section.fields ?? []) {
      if (field.type === "richtext") {
        keys.add(field.key);
      }
    }

    for (const pillar of section.pillars ?? []) {
      keys.add(pillar.headlineKey);
      keys.add(pillar.subKey);
    }
  }

  return Array.from(keys) as Array<keyof HomePageInput & string>;
}

export const HOME_RICH_TEXT_FIELDS = collectHomeRichTextFields();

export type HomeRichTextField = keyof HomePageInput;
