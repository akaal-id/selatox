"use client";

import { useEffect } from "react";
import styles from "./confirm-modal.module.css";

type CmsConfirmModalProps = {
  open: boolean;
  title: string;
  description: string;
  confirmLabel: string;
  cancelLabel?: string;
  confirmTone?: "primary" | "danger";
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export function CmsConfirmModal({
  open,
  title,
  description,
  confirmLabel,
  cancelLabel = "Keep editing",
  confirmTone = "primary",
  loading = false,
  onConfirm,
  onCancel,
}: CmsConfirmModalProps) {
  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && !loading) {
        onCancel();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, loading, onCancel]);

  if (!open) return null;

  return (
    <div className={styles.overlay} role="presentation" onClick={loading ? undefined : onCancel}>
      <div
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cms-confirm-title"
        aria-describedby="cms-confirm-description"
        onClick={(event) => event.stopPropagation()}
      >
        <h2 id="cms-confirm-title" className={styles.title}>
          {title}
        </h2>
        <p id="cms-confirm-description" className={styles.description}>
          {description}
        </p>
        <div className={styles.actions}>
          <button
            type="button"
            className={styles.cancelButton}
            disabled={loading}
            onClick={onCancel}
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            className={
              confirmTone === "danger" ? styles.confirmDanger : styles.confirmPrimary
            }
            disabled={loading}
            onClick={onConfirm}
          >
            {loading ? "Saving…" : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
