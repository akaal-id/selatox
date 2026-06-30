"use client";

import { Plus, Trash2 } from "lucide-react";
import {
  emptyRoadmapItem,
  type RoadmapItemFormItem,
} from "@/lib/cms/roadmap-items";
import styles from "./cms-form.module.css";

type CmsRoadmapItemsFieldProps = {
  value: RoadmapItemFormItem[];
  onChange: (next: RoadmapItemFormItem[]) => void;
};

export function CmsRoadmapItemsField({ value, onChange }: CmsRoadmapItemsFieldProps) {
  function updateItem(index: number, patch: Partial<RoadmapItemFormItem>) {
    onChange(value.map((item, i) => (i === index ? { ...item, ...patch } : item)));
  }

  function removeItem(index: number) {
    onChange(value.filter((_, i) => i !== index));
  }

  function addItem() {
    onChange([...value, emptyRoadmapItem()]);
  }

  return (
    <div className={styles.specsField}>
      <div className={styles.specsFieldHead}>
        <span className={styles.label}>Timeline entries</span>
        <button type="button" className={styles.specsAddButton} onClick={addItem}>
          <Plus size={15} strokeWidth={1.75} aria-hidden />
          Add entry
        </button>
      </div>

      {value.length === 0 ? (
        <p className={styles.tagEmpty}>No entries yet. Add one to build this milestone.</p>
      ) : (
        <div className={styles.specsList}>
          {value.map((item, index) => (
            <div key={index} className={styles.specCard}>
              <div className={styles.roadmapItemHead}>
                <p className={styles.specCardTitle}>Entry {index + 1}</p>
                <button
                  type="button"
                  className={styles.specRemoveButton}
                  aria-label={`Remove entry ${index + 1}`}
                  onClick={() => removeItem(index)}
                >
                  <Trash2 size={15} strokeWidth={1.75} aria-hidden />
                </button>
              </div>

              <label className={styles.field}>
                <span className={styles.label}>Month</span>
                <span className={styles.hint}>Optional — shown before the entry text when set.</span>
                <input
                  className={styles.input}
                  type="text"
                  value={item.month}
                  placeholder="e.g. September"
                  onChange={(event) => updateItem(index, { month: event.target.value })}
                />
              </label>

              <label className={styles.field}>
                <span className={styles.label}>Text</span>
                <input
                  className={styles.input}
                  type="text"
                  value={item.text}
                  onChange={(event) => updateItem(index, { text: event.target.value })}
                />
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
