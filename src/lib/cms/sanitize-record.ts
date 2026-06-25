import { sanitizeRichText } from "@/lib/cms/sanitize";
import { isRichTextField } from "@/components/admin/admin-ui";

export function getRichTextKeys(keys: string[]): string[] {
  return keys.filter((key) => isRichTextField(key) || key === "body_html" || key === "description");
}

export function sanitizeRecord(
  input: Record<string, unknown>,
  richTextKeys: string[]
): Record<string, unknown> {
  const next = { ...input };

  for (const key of richTextKeys) {
    const value = next[key];
    if (typeof value === "string") {
      next[key] = sanitizeRichText(value);
    }
  }

  return next;
}
