"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { Button } from "@/components/ui/Button";
import { editableRowInput, parseRowPayload } from "@/lib/cms/field-inference";
import { CmsPublishToggle } from "@/components/admin/cms/form-fields";
import { CmsConfirmModal } from "@/components/admin/cms/confirm-modal";
import { EditorHeader } from "@/components/admin/cms/editor-header";
import styles from "./cms-form.module.css";

type SaveState = "idle" | "saving" | "saved" | "error";
type ConfirmModal = "save" | "cancel" | null;

type CmsPageContextValue = {
  form: Record<string, unknown>;
  setField: (key: string, value: unknown) => void;
  isDirty: boolean;
  saveState: SaveState;
};

const CmsPageContext = createContext<CmsPageContextValue | null>(null);

export function useCmsPage() {
  const context = useContext(CmsPageContext);
  if (!context) {
    throw new Error("useCmsPage must be used within CmsPageProvider");
  }
  return context;
}

type CmsPageProviderProps = {
  apiPath: string;
  initialData: Record<string, unknown>;
  children: ReactNode;
};

export function CmsPageProvider({ apiPath, initialData, children }: CmsPageProviderProps) {
  const input = useMemo(() => editableRowInput(initialData), [initialData]);
  const [form, setFormState] = useState<Record<string, unknown>>(() => ({ ...input }));
  const [baseline, setBaseline] = useState<Record<string, unknown>>(() => ({ ...input }));
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [confirmModal, setConfirmModal] = useState<ConfirmModal>(null);

  const isDirty = useMemo(
    () => JSON.stringify(form) !== JSON.stringify(baseline),
    [form, baseline]
  );

  function setField(key: string, value: unknown) {
    setFormState((current) => ({ ...current, [key]: value }));
    setSaveState("idle");
    setErrorMessage(null);
  }

  async function handleSave() {
    setSaveState("saving");
    setErrorMessage(null);

    try {
      const response = await fetch(apiPath, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parseRowPayload(form, initialData)),
      });

      const payload = (await response.json()) as {
        data?: Record<string, unknown>;
        error?: string;
      };

      if (!response.ok) {
        throw new Error(payload.error ?? "Failed to save.");
      }

      if (payload.data) {
        const next = editableRowInput(payload.data);
        const nextForm = {
          ...next,
          is_published: payload.data.is_published ?? form.is_published,
        };
        setFormState(nextForm);
        setBaseline(nextForm);
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
    setFormState(baseline);
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
    <CmsPageContext.Provider value={{ form, setField, isDirty, saveState }}>
      {children}
      <CmsConfirmModal
        open={confirmModal === "save"}
        title="Save changes?"
        description="Your changes will be written to the database."
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
      <CmsEditorActions
        message={message}
        saveState={saveState}
        isDirty={isDirty}
        onCancel={() => setConfirmModal("cancel")}
        onSave={() => setConfirmModal("save")}
      />
    </CmsPageContext.Provider>
  );
}

function CmsEditorActions({
  message,
  saveState,
  isDirty,
  onCancel,
  onSave,
}: {
  message: string | null;
  saveState: SaveState;
  isDirty: boolean;
  onCancel: () => void;
  onSave: () => void;
}) {
  return (
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
          onClick={onCancel}
        >
          Cancel edit
        </button>
        <Button
          variant="primary"
          showIcon
          color="var(--neutral-0)"
          backgroundColor="var(--blue-100)"
          disabled={!isDirty || saveState === "saving"}
          onClick={onSave}
        >
          Save changes
        </Button>
      </div>
    </div>
  );
}

type CmsEditorShellProps = {
  description?: string;
  showPublish?: boolean;
  children: ReactNode;
};

export function CmsEditorShell({
  description,
  showPublish = false,
  children,
}: CmsEditorShellProps) {
  const { form, setField } = useCmsPage();

  return (
    <div className={styles.editor}>
      <EditorHeader description={description} compact />
      <div className={styles.sectionCard}>{children}</div>
      {showPublish && "is_published" in form ? (
        <CmsPublishToggle
          checked={Boolean(form.is_published)}
          onChange={(checked) => setField("is_published", checked)}
        />
      ) : null}
    </div>
  );
}
