"use client";

import { CmsStringListField } from "@/components/admin/cms/cms-string-list-field";

type CmsProductRegulatoryTagsFieldProps = {
  value: string[];
  onChange: (next: string[]) => void;
};

export function CmsProductRegulatoryTagsField({
  value,
  onChange,
}: CmsProductRegulatoryTagsFieldProps) {
  return (
    <CmsStringListField
      title="Values"
      value={value}
      onChange={onChange}
      placeholder="Type a value and press Enter"
      emptyMessage="No values yet. Press Enter to add one."
    />
  );
}
