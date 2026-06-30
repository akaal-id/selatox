import {
  PRODUCT_SPEC_DEFINITIONS,
  type ProductSpecIcon,
} from "@/constants/products";

export type ProductSpecFormItem = {
  label: string;
  value: string;
  note: string;
  icon: ProductSpecIcon;
};

function readStoredSpecs(value: unknown): Array<Record<string, unknown>> {
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

export function parseProductSpecsForForm(value: unknown): ProductSpecFormItem[] {
  const byLabel = new Map(
    readStoredSpecs(value).map((row) => [String(row.label ?? ""), row])
  );

  return PRODUCT_SPEC_DEFINITIONS.map((definition) => {
    const stored = byLabel.get(definition.label);

    return {
      label: definition.label,
      value: String(stored?.value ?? ""),
      note: String(stored?.note ?? ""),
      icon: definition.icon,
    };
  });
}

export function serializeProductSpecs(
  items: ProductSpecFormItem[]
): Array<{ label: string; value: string; note?: string; icon: ProductSpecIcon }> {
  return PRODUCT_SPEC_DEFINITIONS.map((definition, index) => {
    const item = items[index];
    const spec = {
      label: definition.label,
      value: (item?.value ?? "").trim(),
      icon: definition.icon,
    };

    const note = (item?.note ?? "").trim();
    return note ? { ...spec, note } : spec;
  });
}
