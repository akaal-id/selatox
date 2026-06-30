"use client";

import type { ProductSpecFormItem } from "@/lib/cms/product-specs";
import { CmsFixedSlotsField } from "@/components/admin/cms/cms-fixed-slots-field";

type CmsProductSpecsFieldProps = {
  value: ProductSpecFormItem[];
  onChange: (next: ProductSpecFormItem[]) => void;
};

export function CmsProductSpecsField({ value, onChange }: CmsProductSpecsFieldProps) {
  return (
    <CmsFixedSlotsField
      slots={value.map((item) => ({
        title: item.label,
        value: item.value,
        note: item.note,
      }))}
      showNote
      onValueChange={(index, nextValue) => {
        onChange(value.map((item, i) => (i === index ? { ...item, value: nextValue } : item)));
      }}
      onNoteChange={(index, nextNote) => {
        onChange(value.map((item, i) => (i === index ? { ...item, note: nextNote } : item)));
      }}
    />
  );
}
