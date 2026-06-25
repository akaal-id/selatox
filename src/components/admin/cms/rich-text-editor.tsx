"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import LinkExtension from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { Bold, Italic, Link2, Pilcrow, Unlink } from "lucide-react";
import { useEffect } from "react";
import styles from "./rich-text-editor.module.css";

type RichTextEditorProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

function ToolbarButton({
  label,
  active,
  disabled,
  onClick,
  children,
}: {
  label: string;
  active?: boolean;
  disabled?: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      className={`${styles.toolbarButton} ${active ? styles.toolbarButtonActive : ""}`.trim()}
      aria-label={label}
      title={label}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: false,
        codeBlock: false,
        code: false,
        blockquote: false,
        horizontalRule: false,
        bulletList: false,
        orderedList: false,
        listItem: false,
      }),
      LinkExtension.configure({
        openOnClick: false,
        HTMLAttributes: {
          rel: "noopener noreferrer",
          target: "_blank",
        },
      }),
      Placeholder.configure({
        placeholder: placeholder ?? "Write content…",
      }),
    ],
    content: value || "",
    editorProps: {
      attributes: {
        class: styles.editorContent,
      },
    },
    onUpdate: ({ editor: current }) => {
      const html = current.getHTML();
      onChange(html === "<p></p>" ? "" : html);
    },
  });

  useEffect(() => {
    if (!editor) return;
    const current = editor.getHTML();
    const normalized = value || "";
    if (current !== normalized && normalized !== (current === "<p></p>" ? "" : current)) {
      editor.commands.setContent(normalized || "<p></p>", { emitUpdate: false });
    }
  }, [editor, value]);

  if (!editor) {
    return <div className={styles.loading}>Loading editor…</div>;
  }

  function setLink() {
    const previous = editor?.getAttributes("link").href as string | undefined;
    const url = window.prompt("Link URL", previous ?? "https://");
    if (url === null) return;
    if (url === "") {
      editor?.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor?.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }

  return (
    <div className={styles.editor}>
      <div className={styles.toolbar}>
        <ToolbarButton
          label="Paragraph"
          active={editor.isActive("paragraph")}
          onClick={() => editor.chain().focus().setParagraph().run()}
        >
          <Pilcrow size={15} strokeWidth={1.75} />
        </ToolbarButton>
        <ToolbarButton
          label="Bold"
          active={editor.isActive("bold")}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <Bold size={15} strokeWidth={1.75} />
        </ToolbarButton>
        <ToolbarButton
          label="Italic"
          active={editor.isActive("italic")}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <Italic size={15} strokeWidth={1.75} />
        </ToolbarButton>
        <span className={styles.toolbarDivider} aria-hidden />
        <ToolbarButton
          label="Add link"
          active={editor.isActive("link")}
          onClick={setLink}
        >
          <Link2 size={15} strokeWidth={1.75} />
        </ToolbarButton>
        <ToolbarButton
          label="Remove link"
          disabled={!editor.isActive("link")}
          onClick={() => editor.chain().focus().unsetLink().run()}
        >
          <Unlink size={15} strokeWidth={1.75} />
        </ToolbarButton>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}

export function CmsRichTextField({
  label,
  hint,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  hint?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <div className={`${styles.field} ${styles.fieldWide}`.trim()}>
      <span className={styles.label}>{label}</span>
      {hint ? <span className={styles.hint}>{hint}</span> : null}
      <RichTextEditor value={value} onChange={onChange} placeholder={placeholder} />
    </div>
  );
}

export function CmsModuleNote({
  menuLabel,
  href,
  body,
}: {
  menuLabel: string;
  href: string;
  body: string;
}) {
  return (
    <div className={styles.moduleNote}>
      <p className={styles.moduleNoteTitle}>Managed elsewhere</p>
      <p className={styles.moduleNoteBody}>
        {body}{" "}
        <Link href={href} className={styles.moduleNoteLink}>
          {menuLabel}
        </Link>{" "}
        in the sidebar.
      </p>
    </div>
  );
}
