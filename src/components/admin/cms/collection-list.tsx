"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { AdminBadge } from "@/components/admin/admin-ui";
import { CmsConfirmModal } from "@/components/admin/cms/confirm-modal";
import { EditorHeader } from "@/components/admin/cms/editor-header";
import {
  getCollectionRowId,
  getCollectionRowMeta,
  getCollectionRowStatus,
  getCollectionRowTitle,
} from "@/lib/cms/field-inference";
import styles from "./cms-form.module.css";

type CollectionListProps = {
  slug: string;
  label: string;
  description: string;
  rows: Record<string, unknown>[];
  adminBasePath?: string;
  embedded?: boolean;
};

export function CollectionList({
  slug,
  label,
  description,
  rows,
  adminBasePath,
  embedded = false,
}: CollectionListProps) {
  const listBasePath = adminBasePath ?? `/admin/${slug}`;
  const router = useRouter();
  const [deleteTarget, setDeleteTarget] = useState<{
    id: string;
    title: string;
  } | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);

  async function handleCreate() {
    setCreating(true);
    setCreateError(null);

    try {
      const response = await fetch(`/api/admin/${slug}`, { method: "POST" });
      const body = (await response.json()) as {
        data?: Record<string, unknown>;
        error?: string;
      };

      if (!response.ok || !body.data) {
        throw new Error(body.error ?? "Failed to create.");
      }

      const rowId = getCollectionRowId(body.data);
      router.push(`${listBasePath}/${encodeURIComponent(rowId)}`);
      router.refresh();
    } catch (error) {
      setCreateError(error instanceof Error ? error.message : "Failed to create.");
      setCreating(false);
    }
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    setDeleteError(null);

    try {
      const response = await fetch(
        `/api/admin/${slug}/${encodeURIComponent(deleteTarget.id)}`,
        { method: "DELETE" }
      );
      const body = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(body.error ?? "Failed to delete.");
      }

      setDeleteTarget(null);
      router.refresh();
    } catch (error) {
      setDeleteError(error instanceof Error ? error.message : "Failed to delete.");
    } finally {
      setDeleting(false);
    }
  }

  const createButton = (
    <button
      type="button"
      className={styles.collectionCreateButton}
      onClick={() => void handleCreate()}
      disabled={creating}
    >
      <Plus size={15} strokeWidth={1.75} aria-hidden />
      {creating ? "Creating…" : "New entry"}
    </button>
  );

  const listContent =
    rows.length === 0 ? (
      <div className={styles.emptyState}>
        <p className={styles.title}>No entries yet</p>
        <p className={styles.lead}>
          Create the first {label.toLowerCase()} entry to start editing.
        </p>
        <div className={styles.collectionEmptyActions}>
          {createButton}
          {createError ? (
            <p className={`${styles.status} ${styles.statusError}`}>{createError}</p>
          ) : null}
        </div>
      </div>
    ) : (
      <>
        <div className={styles.collectionToolbar}>
          {createButton}
          {createError ? (
            <p className={`${styles.status} ${styles.statusError}`}>{createError}</p>
          ) : null}
        </div>
        <ul className={styles.collectionList}>
          {rows.map((row) => {
            const rowId = getCollectionRowId(row);
            const title = getCollectionRowTitle(row);
            const meta = getCollectionRowMeta(row);
            const status = getCollectionRowStatus(row);

            return (
              <li key={rowId} className={styles.collectionItem}>
                <div className={styles.collectionItemMain}>
                  <div className={styles.collectionItemText}>
                    <h2 className={styles.collectionItemTitle}>{title}</h2>
                    {meta ? <p className={styles.collectionItemMeta}>{meta}</p> : null}
                  </div>
                  {status ? (
                    <AdminBadge
                      tone={
                        status.tone === "error"
                          ? "error"
                          : status.tone === "success"
                            ? "success"
                            : status.tone === "warning"
                              ? "warning"
                              : "default"
                      }
                    >
                      {status.label}
                    </AdminBadge>
                  ) : null}
                </div>

                <div className={styles.collectionItemActions}>
                  <Link
                    href={`${listBasePath}/${encodeURIComponent(rowId)}`}
                    className={styles.collectionEditButton}
                  >
                    <Pencil size={15} strokeWidth={1.75} aria-hidden />
                    Edit
                  </Link>
                  <button
                    type="button"
                    className={styles.collectionDeleteButton}
                    onClick={() => setDeleteTarget({ id: rowId, title })}
                  >
                    <Trash2 size={15} strokeWidth={1.75} aria-hidden />
                    Delete
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </>
    );

  const deleteModal = (
    <CmsConfirmModal
      open={deleteTarget !== null}
      title="Delete this entry?"
      description={
        deleteError
          ? deleteError
          : `“${deleteTarget?.title ?? ""}” will be permanently removed from ${label.toLowerCase()}.`
      }
      confirmLabel="Delete"
      cancelLabel="Cancel"
      confirmTone="danger"
      loading={deleting}
      onConfirm={() => void handleDelete()}
      onCancel={() => {
        setDeleteTarget(null);
        setDeleteError(null);
      }}
    />
  );

  if (embedded) {
    return (
      <>
        {listContent}
        {deleteModal}
      </>
    );
  }

  return (
    <div className={styles.editor}>
      <EditorHeader
        title={label}
        description={`${description} · ${rows.length} ${rows.length === 1 ? "entry" : "entries"}`}
      />

      {listContent}

      {deleteModal}
    </div>
  );
}
