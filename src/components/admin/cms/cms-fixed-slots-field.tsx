"use client";

import styles from "./cms-form.module.css";

export type CmsFixedSlotItem = {
  title: string;
  value: string;
  note?: string;
};

type CmsFixedSlotsFieldProps = {
  title?: string;
  slots: CmsFixedSlotItem[];
  valueLabel?: string;
  noteLabel?: string;
  showNote?: boolean;
  onValueChange: (index: number, value: string) => void;
  onNoteChange?: (index: number, note: string) => void;
};

export function CmsFixedSlotsField({
  title,
  slots,
  valueLabel = "Value",
  noteLabel = "Note",
  showNote = false,
  onValueChange,
  onNoteChange,
}: CmsFixedSlotsFieldProps) {
  return (
    <div className={styles.specsField}>
      {title ? (
        <div className={styles.specsFieldHead}>
          <span className={styles.label}>{title}</span>
        </div>
      ) : null}

      <div className={styles.specsList}>
        {slots.map((slot, index) => (
          <div key={slot.title} className={styles.specCard}>
            <p className={styles.specCardTitle}>{slot.title}</p>

            <label className={styles.field}>
              <span className={styles.label}>{valueLabel}</span>
              <input
                className={styles.input}
                type="text"
                value={slot.value}
                onChange={(event) => onValueChange(index, event.target.value)}
              />
            </label>

            {showNote ? (
              <label className={styles.field}>
                <span className={styles.label}>{noteLabel}</span>
                <input
                  className={styles.input}
                  type="text"
                  value={slot.note ?? ""}
                  placeholder=""
                  onChange={(event) => onNoteChange?.(index, event.target.value)}
                />
              </label>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
