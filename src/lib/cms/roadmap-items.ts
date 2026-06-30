export type RoadmapItemFormItem = {
  month: string;
  text: string;
};

function readStoredRoadmapItems(value: unknown): Array<Record<string, unknown>> {
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

export function parseRoadmapItemsForForm(value: unknown): RoadmapItemFormItem[] {
  return readStoredRoadmapItems(value).map((row) => ({
    month: String(row.month ?? ""),
    text: String(row.text ?? ""),
  }));
}

export function serializeRoadmapItems(
  items: RoadmapItemFormItem[]
): Array<{ month?: string; text: string }> {
  return items
    .filter((item) => item.text.trim())
    .map((item) => {
      const text = item.text.trim();
      const month = item.month.trim();
      return month ? { month, text } : { text };
    });
}

export function emptyRoadmapItem(): RoadmapItemFormItem {
  return { month: "", text: "" };
}
