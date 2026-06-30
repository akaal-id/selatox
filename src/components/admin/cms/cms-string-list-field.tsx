"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import styles from "./cms-form.module.css";

type CmsStringListFieldProps = {
  title?: string;
  value: string[];
  onChange: (next: string[]) => void;
  placeholder?: string;
  emptyMessage?: string;
};

export function CmsStringListField({
  title,
  value,
  onChange,
  placeholder = "Type and press Enter",
  emptyMessage = "No items yet. Press Enter to add one.",
}: CmsStringListFieldProps) {
  const [draft, setDraft] = useState("");

  function addItem() {
    const next = draft.trim();
    if (!next) return;
    onChange([...value, next]);
    setDraft("");
  }

  function removeItem(index: number) {
    onChange(value.filter((_, i) => i !== index));
  }

  return (
    <div className={styles.specsField}>
      {title ? (
        <div className={styles.specsFieldHead}>
          <span className={styles.label}>{title}</span>
        </div>
      ) : null}

      <div className={styles.tagInputRow}>
        <input
          className={styles.input}
          type="text"
          value={draft}
          placeholder={placeholder}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              addItem();
            }
          }}
        />
        <button type="button" className={styles.tagAddButton} onClick={addItem}>
          <Plus size={15} strokeWidth={1.75} aria-hidden />
          Add
        </button>
      </div>

      {value.length > 0 ? (
        <ul className={styles.tagList}>
          {value.map((item, index) => (
            <li key={`${item}-${index}`} className={styles.tagItem}>
              <span>{item}</span>
              <button
                type="button"
                className={styles.tagRemoveButton}
                aria-label={`Remove ${item}`}
                onClick={() => removeItem(index)}
              >
                <X size={14} strokeWidth={1.75} aria-hidden />
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.tagEmpty}>{emptyMessage}</p>
      )}
    </div>
  );
}
