"use client";

import type { ProductValueChipFormItem } from "@/lib/cms/product-cms";
import { PRODUCT_VALUE_CHIP_DEFINITIONS } from "@/constants/products";
import { CmsFixedSlotsField } from "@/components/admin/cms/cms-fixed-slots-field";

type CmsProductValueChipsFieldProps = {
  value: ProductValueChipFormItem[];
  onChange: (next: ProductValueChipFormItem[]) => void;
};

export function CmsProductValueChipsField({ value, onChange }: CmsProductValueChipsFieldProps) {
  return (
    <CmsFixedSlotsField
      slots={value.map((item, index) => ({
        title: PRODUCT_VALUE_CHIP_DEFINITIONS[index]?.fieldLabel ?? `Value ${index + 1}`,
        value: item.label,
      }))}
      onValueChange={(index, nextValue) => {
        onChange(value.map((item, i) => (i === index ? { ...item, label: nextValue } : item)));
      }}
    />
  );
}
