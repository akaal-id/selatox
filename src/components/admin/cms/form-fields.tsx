"use client";

import styles from "./cms-form.module.css";
import { CmsRichTextField } from "@/components/admin/cms/rich-text-editor";

type FieldProps = {
  label: string;
  hint?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  wide?: boolean;
};

export function CmsTextField({
  label,
  hint,
  value,
  onChange,
  placeholder,
  wide,
}: FieldProps) {
  return (
    <label className={`${styles.field} ${wide ? styles.fieldGridWide : ""}`.trim()}>
      <span className={styles.label}>{label}</span>
      {hint ? <span className={styles.hint}>{hint}</span> : null}
      <input
        className={styles.input}
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}

export function CmsInlinePair({
  title,
  leftLabel = "Label",
  rightLabel,
  leftValue,
  rightValue,
  onLeftChange,
  onRightChange,
  rightInputType = "text",
}: {
  title: string;
  leftLabel?: string;
  rightLabel: string;
  leftValue: string;
  rightValue: string;
  onLeftChange: (value: string) => void;
  onRightChange: (value: string) => void;
  rightInputType?: "text" | "url";
}) {
  return (
    <div className={styles.fieldPair}>
      <p className={styles.fieldPairTitle}>{title}</p>
      <div className={styles.fieldPairRow}>
        <label className={styles.field}>
          <span className={styles.label}>{leftLabel}</span>
          <input
            className={styles.input}
            type="text"
            value={leftValue}
            onChange={(event) => onLeftChange(event.target.value)}
          />
        </label>
        <label className={styles.field}>
          <span className={styles.label}>{rightLabel}</span>
          <input
            className={styles.input}
            type={rightInputType}
            value={rightValue}
            onChange={(event) => onRightChange(event.target.value)}
          />
        </label>
      </div>
    </div>
  );
}

export function CmsTextareaField({
  label,
  hint,
  value,
  onChange,
  placeholder,
  wide = true,
}: FieldProps) {
  return (
    <label className={`${styles.field} ${wide ? styles.fieldGridWide : ""}`.trim()}>
      <span className={styles.label}>{label}</span>
      {hint ? <span className={styles.hint}>{hint}</span> : null}
      <textarea
        className={styles.textarea}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}

type StatPairProps = {
  label: string;
  statValue: string;
  copyValue: string;
  onStatChange: (value: string) => void;
  onCopyChange: (value: string) => void;
};

export function CmsStatPair({
  label,
  statValue,
  copyValue,
  onStatChange,
  onCopyChange,
}: StatPairProps) {
  return (
    <CmsInlinePair
      title={label}
      leftLabel="Figure"
      rightLabel="Copy"
      leftValue={statValue}
      rightValue={copyValue}
      onLeftChange={onStatChange}
      onRightChange={onCopyChange}
    />
  );
}

type PillarPairProps = {
  label: string;
  headlineValue: string;
  subValue: string;
  onHeadlineChange: (value: string) => void;
  onSubChange: (value: string) => void;
  richText?: boolean;
};

export function CmsPillarPair({
  label,
  headlineValue,
  subValue,
  onHeadlineChange,
  onSubChange,
  richText = true,
}: PillarPairProps) {
  return (
    <div className={`${styles.pillarCard} ${styles.fieldGridWide}`.trim()}>
      <p className={styles.pillarCardTitle}>{label}</p>
      <div className={styles.fieldGrid}>
        {richText ? (
          <>
            <CmsRichTextField
              label="Headline"
              value={headlineValue}
              onChange={onHeadlineChange}
              hint="Use italic for accent phrases."
            />
            <CmsRichTextField
              label="Description"
              value={subValue}
              onChange={onSubChange}
            />
          </>
        ) : (
          <>
            <label className={styles.field}>
              <span className={styles.label}>Headline</span>
              <input
                className={styles.input}
                type="text"
                value={headlineValue}
                onChange={(event) => onHeadlineChange(event.target.value)}
              />
            </label>
            <label className={`${styles.field} ${styles.fieldGridWide}`.trim()}>
              <span className={styles.label}>Description</span>
              <textarea
                className={styles.textarea}
                value={subValue}
                onChange={(event) => onSubChange(event.target.value)}
              />
            </label>
          </>
        )}
      </div>
    </div>
  );
}

export function CmsPublishToggle({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <div className={styles.publishCard}>
      <div>
        <p className={styles.sectionTitle}>Publish status</p>
        <p className={styles.sectionDescription}>
          When unpublished, the public site will not receive this content once wired to Supabase.
        </p>
      </div>
      <label className={styles.toggle}>
        <input
          type="checkbox"
          checked={checked}
          onChange={(event) => onChange(event.target.checked)}
        />
        <span>{checked ? "Published" : "Draft"}</span>
      </label>
    </div>
  );
}
