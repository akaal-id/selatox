"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import {
  editableRowInput,
  fieldLabel,
  groupCollectionFields,
  groupSingletonFields,
  inferFieldType,
  layoutFieldKeys,
  parseRowPayload,
} from "@/lib/cms/field-inference";
import { CmsInlinePair, CmsPublishToggle } from "@/components/admin/cms/form-fields";
import { CmsMediaField } from "@/components/admin/cms/media-field";
import { CmsRichTextField } from "@/components/admin/cms/rich-text-editor";
import { CmsTextareaField, CmsTextField } from "@/components/admin/cms/form-fields";
import { CmsConfirmModal } from "@/components/admin/cms/confirm-modal";
import { EditorHeader } from "@/components/admin/cms/editor-header";
import styles from "./cms-form.module.css";

type SaveState = "idle" | "saving" | "saved" | "error";
type ConfirmModal = "save" | "cancel" | null;

function CmsField({
  fieldKey,
  value,
  onChange,
  uploadFolder,
}: {
  fieldKey: string;
  value: string;
  onChange: (next: string) => void;
  uploadFolder: string;
}) {
  const type = inferFieldType(fieldKey);
  const label = fieldLabel(fieldKey);
  const wide =
    type === "textarea" ||
    type === "richtext" ||
    type === "image" ||
    type === "video" ||
    fieldKey.includes("headline") ||
    fieldKey === "description" ||
    fieldKey === "body_html";

  if (type === "image" || type === "video") {
    return (
      <CmsMediaField
        label={label}
        value={value}
        onChange={onChange}
        mediaType={type}
        uploadFolder={uploadFolder}
      />
    );
  }

  if (type === "richtext") {
    return <CmsRichTextField label={label} value={value} onChange={onChange} />;
  }

  if (type === "textarea") {
    return (
      <CmsTextareaField label={label} value={value} onChange={onChange} wide={wide} />
    );
  }

  return <CmsTextField label={label} value={value} onChange={onChange} wide={wide} />;
}

export function CmsFieldGrid({
  keys,
  form,
  setField,
  uploadFolder,
}: {
  keys: string[];
  form: Record<string, unknown>;
  setField: (key: string, value: unknown) => void;
  uploadFolder: string;
}) {
  const layout = layoutFieldKeys(keys);

  return (
    <div className={styles.fieldGrid}>
      {layout.map((item) => {
        if (item.type === "pair") {
          const rightType = inferFieldType(item.rightKey);
          return (
            <CmsInlinePair
              key={item.leftKey}
              title={item.title}
              leftLabel={item.leftKey.endsWith("_name") ? "Name" : "Label"}
              rightLabel={item.rightLabel}
              leftValue={String(form[item.leftKey] ?? "")}
              rightValue={String(form[item.rightKey] ?? "")}
              onLeftChange={(next) => setField(item.leftKey, next)}
              onRightChange={(next) => setField(item.rightKey, next)}
              rightInputType={rightType === "text" && item.rightKey.endsWith("_link") ? "url" : "text"}
            />
          );
        }

        return (
          <CmsField
            key={item.key}
            fieldKey={item.key}
            value={String(form[item.key] ?? "")}
            onChange={(next) => setField(item.key, next)}
            uploadFolder={uploadFolder}
          />
        );
      })}
    </div>
  );
}

export function SingletonPageEditor({
  table,
  label,
  description,
  initialData,
}: {
  table: string;
  label: string;
  description?: string;
  initialData: Record<string, unknown>;
}) {
  const baseline = useMemo(() => editableRowInput(initialData), [initialData]);
  const sections = useMemo(() => groupSingletonFields(initialData), [initialData]);
  const [form, setForm] = useState<Record<string, unknown>>(() => ({
    ...baseline,
    is_published: initialData.is_published ?? true,
  }));
  const [savedBaseline, setSavedBaseline] = useState(baseline);
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [confirmModal, setConfirmModal] = useState<ConfirmModal>(null);

  const isDirty =
    JSON.stringify({ ...form, is_published: form.is_published }) !==
    JSON.stringify({ ...savedBaseline, is_published: initialData.is_published ?? true });

  function setField(key: string, value: unknown) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setSaveState("idle");
    setErrorMessage(null);
  }

  async function handleSave() {
    setSaveState("saving");
    setErrorMessage(null);

    try {
      const payload = parseRowPayload(
        { ...form, is_published: form.is_published },
        initialData
      );
      const response = await fetch(`/api/admin/${table}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const body = (await response.json()) as { data?: Record<string, unknown>; error?: string };

      if (!response.ok) {
        throw new Error(body.error ?? "Failed to save.");
      }

      if (body.data) {
        const next = editableRowInput(body.data);
        setForm({ ...next, is_published: body.data.is_published ?? true });
        setSavedBaseline(next);
      }

      setSaveState("saved");
      setConfirmModal(null);
    } catch (error) {
      setSaveState("error");
      setErrorMessage(error instanceof Error ? error.message : "Failed to save.");
      setConfirmModal(null);
    }
  }

  function handleCancelEdit() {
    setForm({ ...savedBaseline, is_published: initialData.is_published ?? true });
    setSaveState("idle");
    setErrorMessage(null);
    setConfirmModal(null);
  }

  const message =
    saveState === "saving"
      ? "Saving changes…"
      : saveState === "saved"
        ? "Changes saved."
        : saveState === "error"
          ? errorMessage
          : isDirty
            ? "You have unsaved changes."
            : null;

  return (
    <div className={styles.editor}>
      <EditorHeader title={label} description={description} />

      {sections.map((section) => (
        <section key={section.id} className={styles.sectionCard}>
          <div className={styles.sectionHead}>
            <h2 className={styles.sectionTitle}>{section.title}</h2>
          </div>
          <CmsFieldGrid
            keys={section.keys}
            form={form}
            setField={setField}
            uploadFolder={`${table}/${section.id}`}
          />
        </section>
      ))}

      {"is_published" in initialData ? (
        <CmsPublishToggle
          checked={Boolean(form.is_published)}
          onChange={(checked) => setField("is_published", checked)}
        />
      ) : null}

      <div className={styles.saveBar}>
        {message ? (
          <p
            className={`${styles.status} ${
              saveState === "error"
                ? styles.statusError
                : saveState === "saved"
                  ? styles.statusSuccess
                  : ""
            }`.trim()}
          >
            {message}
          </p>
        ) : (
          <span />
        )}

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.secondaryButton}
            disabled={!isDirty || saveState === "saving"}
            onClick={() => setConfirmModal("cancel")}
          >
            Cancel edit
          </button>
          <Button
            variant="primary"
            showIcon
            color="var(--neutral-0)"
            backgroundColor="var(--blue-100)"
            disabled={!isDirty || saveState === "saving"}
            onClick={() => setConfirmModal("save")}
          >
            Save changes
          </Button>
        </div>
      </div>

      <CmsConfirmModal
        open={confirmModal === "save"}
        title="Save changes?"
        description={`This will update the ${label} page content.`}
        confirmLabel="Save changes"
        cancelLabel="Keep editing"
        loading={saveState === "saving"}
        onConfirm={() => void handleSave()}
        onCancel={() => setConfirmModal(null)}
      />

      <CmsConfirmModal
        open={confirmModal === "cancel"}
        title="Discard unsaved changes?"
        description="Your edits will be reverted to the last saved version."
        confirmLabel="Discard changes"
        cancelLabel="Keep editing"
        confirmTone="danger"
        onConfirm={handleCancelEdit}
        onCancel={() => setConfirmModal(null)}
      />
    </div>
  );
}

export function CollectionRowEditor({
  table,
  label,
  rowId,
  initialData,
  backHref,
  backLabel,
}: {
  table: string;
  label: string;
  rowId: string;
  initialData: Record<string, unknown>;
  backHref?: string;
  backLabel?: string;
}) {
  const baseline = useMemo(() => editableRowInput(initialData), [initialData]);
  const sections = useMemo(() => {
    const groups = groupCollectionFields(initialData);

    if (table === "products") {
      const general = groups.find((group) => group.id === "general");
      if (general) {
        if (!general.keys.includes("slug")) {
          general.keys = ["slug", ...general.keys];
        }
      } else {
        groups.unshift({ id: "general", title: "General", keys: ["slug"] });
      }
    }

    return groups;
  }, [initialData, table]);

  const initialForm = useMemo(
    () => ({
      ...baseline,
      is_published: initialData.is_published,
      status: initialData.status,
    }),
    [baseline, initialData.is_published, initialData.status]
  );

  const [form, setForm] = useState<Record<string, unknown>>(initialForm);
  const [savedForm, setSavedForm] = useState(initialForm);
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [confirmModal, setConfirmModal] = useState<ConfirmModal>(null);

  const isDirty = JSON.stringify(form) !== JSON.stringify(savedForm);

  function setField(key: string, value: unknown) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setSaveState("idle");
    setErrorMessage(null);
  }

  async function handleSave() {
    setSaveState("saving");
    setErrorMessage(null);

    try {
      const payload = parseRowPayload(form, initialData);
      const response = await fetch(`/api/admin/${table}/${encodeURIComponent(rowId)}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const body = (await response.json()) as { data?: Record<string, unknown>; error?: string };

      if (!response.ok) {
        throw new Error(body.error ?? "Failed to save.");
      }

      if (body.data) {
        const next = editableRowInput(body.data);
        const nextForm = {
          ...next,
          is_published: body.data.is_published,
          status: body.data.status,
        };
        setForm(nextForm);
        setSavedForm(nextForm);
      }

      setSaveState("saved");
      setConfirmModal(null);
    } catch (error) {
      setSaveState("error");
      setErrorMessage(error instanceof Error ? error.message : "Failed to save.");
      setConfirmModal(null);
    }
  }

  function handleCancelEdit() {
    setForm(savedForm);
    setSaveState("idle");
    setErrorMessage(null);
    setConfirmModal(null);
  }

  const displayTitle = String(initialData.title ?? initialData.slug ?? rowId);
  const message =
    saveState === "saving"
      ? "Saving changes…"
      : saveState === "saved"
        ? "Changes saved."
        : saveState === "error"
          ? errorMessage
          : isDirty
            ? "You have unsaved changes."
            : null;

  return (
    <div className={styles.editor}>
      <EditorHeader
        title={displayTitle}
        backHref={backHref ?? `/admin/${table}`}
        backLabel={backLabel ?? label}
      />

      {sections.map((section) => (
        <section key={section.id} className={styles.sectionCard}>
          <div className={styles.sectionHead}>
            <h2 className={styles.sectionTitle}>{section.title}</h2>
          </div>
          <CmsFieldGrid
            keys={section.keys}
            form={form}
            setField={setField}
            uploadFolder={`${table}/${rowId}/${section.id}`}
          />
        </section>
      ))}

      <div className={styles.saveBar}>
        {message ? (
          <p
            className={`${styles.status} ${
              saveState === "error"
                ? styles.statusError
                : saveState === "saved"
                  ? styles.statusSuccess
                  : ""
            }`.trim()}
          >
            {message}
          </p>
        ) : (
          <span />
        )}

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.secondaryButton}
            disabled={!isDirty || saveState === "saving"}
            onClick={() => setConfirmModal("cancel")}
          >
            Cancel edit
          </button>
          <Button
            variant="primary"
            showIcon
            color="var(--neutral-0)"
            backgroundColor="var(--blue-100)"
            disabled={!isDirty || saveState === "saving"}
            onClick={() => setConfirmModal("save")}
          >
            Save changes
          </Button>
        </div>
      </div>

      <CmsConfirmModal
        open={confirmModal === "save"}
        title="Save changes?"
        description={`Update this ${label.toLowerCase()} entry?`}
        confirmLabel="Save changes"
        cancelLabel="Keep editing"
        loading={saveState === "saving"}
        onConfirm={() => void handleSave()}
        onCancel={() => setConfirmModal(null)}
      />

      <CmsConfirmModal
        open={confirmModal === "cancel"}
        title="Discard unsaved changes?"
        description="Your edits will be reverted to the last saved version."
        confirmLabel="Discard changes"
        cancelLabel="Keep editing"
        confirmTone="danger"
        onConfirm={handleCancelEdit}
        onCancel={() => setConfirmModal(null)}
      />
    </div>
  );
}
