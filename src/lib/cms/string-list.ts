export function parseStringListForForm(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.map((item) => String(item));
  }

  if (typeof value === "string" && value.trim()) {
    try {
      const parsed = JSON.parse(value) as unknown;
      if (Array.isArray(parsed)) return parsed.map((item) => String(item));
    } catch {
      return [];
    }
  }

  return [];
}

export function serializeStringList(values: string[]): string[] {
  return values.map((value) => value.trim()).filter(Boolean);
}
