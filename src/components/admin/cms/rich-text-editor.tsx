"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import LinkExtension from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import ImageExtension from "@tiptap/extension-image";
import {
  AlertCircle,
  Bold,
  FileImage,
  Globe,
  HardDrive,
  ImageIcon,
  Info,
  Italic,
  Layers,
  Link2,
  Loader2,
  Pilcrow,
  Unlink,
  Upload,
  X,
  Zap,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import styles from "./rich-text-editor.module.css";

// Vercel Serverless Function has a hard request body limit of 4.5 MB (4,718,592 bytes)
const MAX_IMAGE_BYTES = Math.floor(4.5 * 1024 * 1024);

type RichTextEditorProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  uploadFolder?: string;
  allowImages?: boolean;
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

export function RichTextEditor({
  value,
  onChange,
  placeholder,
  uploadFolder = "news",
  allowImages = true,
}: RichTextEditorProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"upload" | "url">("upload");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [urlInput, setUrlInput] = useState("");
  const [altInput, setAltInput] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

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
      ImageExtension.configure({
        inline: false,
        HTMLAttributes: {
          class: styles.articleInlineImage || "article-inline-image",
        },
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

  // Clean up object URL on unmount or file change
  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

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

  function openImageModal() {
    setSelectedFile(null);
    setPreviewUrl(null);
    setUrlInput("");
    setAltInput("");
    setErrorMessage(null);
    setActiveTab("upload");
    setModalOpen(true);
  }

  function closeImageModal() {
    if (previewUrl && previewUrl.startsWith("blob:")) {
      URL.revokeObjectURL(previewUrl);
    }
    setSelectedFile(null);
    setPreviewUrl(null);
    setModalOpen(false);
    setErrorMessage(null);
  }

  function formatBytes(bytes: number) {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  function handleFileSelect(file: File) {
    if (!file.type.startsWith("image/")) {
      setErrorMessage("Pilih format gambar yang valid (JPG, PNG, WebP, GIF, SVG).");
      return;
    }
    if (file.size > MAX_IMAGE_BYTES) {
      setErrorMessage(
        `File "${file.name}" (${formatBytes(file.size)}) melebihi batas 4.5 MB (limit payload Vercel Serverless). Silakan kompres gambar atau gunakan tab "Dari URL".`
      );
      setSelectedFile(null);
      if (previewUrl && previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
      setPreviewUrl(null);
      return;
    }
    setErrorMessage(null);
    setSelectedFile(file);
    if (previewUrl && previewUrl.startsWith("blob:")) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(URL.createObjectURL(file));
  }

  async function handleInsertImage() {
    if (!editor) return;

    if (activeTab === "upload") {
      if (!selectedFile) {
        setErrorMessage("Silakan pilih gambar terlebih dahulu.");
        return;
      }

      setIsUploading(true);
      setErrorMessage(null);

      try {
        const formData = new FormData();
        formData.append("file", selectedFile);
        formData.append("folder", uploadFolder);
        formData.append("kind", "image");

        const res = await fetch("/api/admin/upload", {
          method: "POST",
          body: formData,
        });

        const data = (await res.json()) as { url?: string; error?: string };

        if (!res.ok || !data.url) {
          throw new Error(data.error || "Gagal mengunggah gambar.");
        }

        editor
          .chain()
          .focus()
          .setImage({
            src: data.url,
            alt: altInput.trim() || selectedFile.name,
          })
          .run();

        closeImageModal();
      } catch (err) {
        setErrorMessage(err instanceof Error ? err.message : "Upload gagal.");
      } finally {
        setIsUploading(false);
      }
    } else {
      const trimmedUrl = urlInput.trim();
      if (!trimmedUrl) {
        setErrorMessage("Silakan masukkan URL gambar.");
        return;
      }

      editor
        .chain()
        .focus()
        .setImage({
          src: trimmedUrl,
          alt: altInput.trim() || "Article image",
        })
        .run();

      closeImageModal();
    }
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

        {allowImages ? (
          <>
            <span className={styles.toolbarDivider} aria-hidden />
            <ToolbarButton
              label="Insert image"
              active={modalOpen}
              onClick={openImageModal}
            >
              <ImageIcon size={15} strokeWidth={1.75} />
            </ToolbarButton>
          </>
        ) : null}
      </div>

      <EditorContent editor={editor} />

      {allowImages ? (
        <div className={styles.editorTip}>
          <Info size={13} strokeWidth={1.75} />
          <span>
            Klik icon gambar <strong>(🖼️)</strong> di toolbar untuk menyisipkan gambar di posisi kursor. Tekan Enter untuk membuat baris baru.
          </span>
        </div>
      ) : null}

      {/* Modal Dialog for Image Insertion */}
      {modalOpen ? (
        <div
          className={styles.modalOverlay}
          onClick={(e) => {
            if (e.target === e.currentTarget) closeImageModal();
          }}
        >
          <div className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="modal-image-title">
            <div className={styles.modalHeader}>
              <div className={styles.modalTitleGroup}>
                <h3 id="modal-image-title" className={styles.modalTitle}>
                  Sisipkan Gambar ke Artikel
                </h3>
                <p className={styles.modalSubtitle}>
                  Gambar akan ditempatkan di posisi kursor yang sedang aktif
                </p>
              </div>
              <button
                type="button"
                className={styles.modalCloseButton}
                onClick={closeImageModal}
                aria-label="Tutup dialog"
              >
                <X size={16} strokeWidth={2} />
              </button>
            </div>

            <div className={styles.tabList} role="tablist">
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === "upload"}
                className={`${styles.tabButton} ${activeTab === "upload" ? styles.tabButtonActive : ""}`.trim()}
                onClick={() => {
                  setActiveTab("upload");
                  setErrorMessage(null);
                }}
              >
                <Upload size={14} />
                Upload File
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === "url"}
                className={`${styles.tabButton} ${activeTab === "url" ? styles.tabButtonActive : ""}`.trim()}
                onClick={() => {
                  setActiveTab("url");
                  setErrorMessage(null);
                }}
              >
                <Globe size={14} />
                Dari URL
              </button>
            </div>

            <div className={styles.modalBody}>
              {/* Technical Limits Information Cards */}
              <div className={styles.limitBox}>
                <div className={styles.limitItem}>
                  <Zap size={14} className={styles.limitItemIcon} />
                  <div className={styles.limitItemText}>
                    <strong>Maks. 4.5 MB</strong>
                    <div>Limit Vercel Serverless</div>
                  </div>
                </div>
                <div className={styles.limitItem}>
                  <HardDrive size={14} className={styles.limitItemIcon} />
                  <div className={styles.limitItemText}>
                    <strong>Supabase Storage</strong>
                    <div>Bucket: &quot;uploads&quot; (1 GB)</div>
                  </div>
                </div>
                <div className={styles.limitItem}>
                  <FileImage size={14} className={styles.limitItemIcon} />
                  <div className={styles.limitItemText}>
                    <strong>Format File</strong>
                    <div>JPG, PNG, WebP, GIF, SVG</div>
                  </div>
                </div>
                <div className={styles.limitItem}>
                  <Layers size={14} className={styles.limitItemIcon} />
                  <div className={styles.limitItemText}>
                    <strong>Jumlah Gambar</strong>
                    <div>Tidak dibatasi</div>
                  </div>
                </div>
              </div>

              {errorMessage ? (
                <div className={styles.errorAlert} role="alert">
                  <AlertCircle size={14} style={{ display: "inline", marginRight: 6, verticalAlign: "middle" }} />
                  {errorMessage}
                </div>
              ) : null}

              {activeTab === "upload" ? (
                <>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml"
                    style={{ display: "none" }}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileSelect(file);
                    }}
                  />

                  {!selectedFile ? (
                    <div
                      className={`${styles.dropzone} ${dragActive ? styles.dropzoneActive : ""}`.trim()}
                      onClick={() => fileInputRef.current?.click()}
                      onDragOver={(e) => {
                        e.preventDefault();
                        setDragActive(true);
                      }}
                      onDragLeave={() => setDragActive(false)}
                      onDrop={(e) => {
                        e.preventDefault();
                        setDragActive(false);
                        const file = e.dataTransfer.files?.[0];
                        if (file) handleFileSelect(file);
                      }}
                    >
                      <Upload size={26} className={styles.dropzoneIcon} strokeWidth={1.5} />
                      <p className={styles.dropzoneText}>Klik untuk memilih file atau seret ke sini</p>
                      <p className={styles.dropzoneHint}>Maksimal 4.5 MB per file</p>
                    </div>
                  ) : (
                    <div className={styles.filePreview}>
                      {previewUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={previewUrl} alt="Preview" className={styles.previewThumb} />
                      ) : null}
                      <div className={styles.fileInfo}>
                        <span className={styles.fileName}>{selectedFile.name}</span>
                        <span className={styles.fileSize}>{formatBytes(selectedFile.size)}</span>
                      </div>
                      <button
                        type="button"
                        className={styles.fileChangeBtn}
                        onClick={() => fileInputRef.current?.click()}
                      >
                        Ganti
                      </button>
                    </div>
                  )}

                  <div className={styles.inputGroup}>
                    <label htmlFor="image-alt-input" className={styles.inputLabel}>
                      Keterangan / Alt Text (Opsional)
                    </label>
                    <input
                      id="image-alt-input"
                      type="text"
                      className={styles.inputField}
                      placeholder="Misal: Penjelasan foto atau infografis"
                      value={altInput}
                      onChange={(e) => setAltInput(e.target.value)}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className={styles.urlTip}>
                    <Info size={14} className={styles.urlTipIcon} />
                    <span>
                      <strong>Tips:</strong> Jika file gambar Anda berukuran di atas <strong>4.5 MB</strong> atau sudah tersimpan di cloud/CDN lain, masukkan tautan langsung di sini tanpa batas upload Vercel.
                    </span>
                  </div>

                  <div className={styles.inputGroup}>
                    <label htmlFor="image-url-input" className={styles.inputLabel}>
                      URL Gambar (Link Langsung)
                    </label>
                    <input
                      id="image-url-input"
                      type="url"
                      className={styles.inputField}
                      placeholder="https://domain.com/path-gambar.jpg"
                      value={urlInput}
                      onChange={(e) => setUrlInput(e.target.value)}
                      autoFocus
                    />
                  </div>

                  <div className={styles.inputGroup}>
                    <label htmlFor="image-url-alt-input" className={styles.inputLabel}>
                      Keterangan / Alt Text (Opsional)
                    </label>
                    <input
                      id="image-url-alt-input"
                      type="text"
                      className={styles.inputField}
                      placeholder="Misal: Foto lab riset Selatox"
                      value={altInput}
                      onChange={(e) => setAltInput(e.target.value)}
                    />
                  </div>
                </>
              )}
            </div>

            <div className={styles.modalFooter}>
              <button
                type="button"
                className={styles.btnCancel}
                onClick={closeImageModal}
                disabled={isUploading}
              >
                Batal
              </button>
              <button
                type="button"
                className={styles.btnSubmit}
                onClick={handleInsertImage}
                disabled={isUploading || (activeTab === "upload" && !selectedFile) || (activeTab === "url" && !urlInput.trim())}
              >
                {isUploading ? (
                  <>
                    <Loader2 size={14} className="animate-spin" />
                    Mengunggah…
                  </>
                ) : (
                  "Sisipkan Gambar"
                )}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export function CmsRichTextField({
  label,
  hint,
  value,
  onChange,
  placeholder,
  uploadFolder,
  allowImages,
}: {
  label: string;
  hint?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  uploadFolder?: string;
  allowImages?: boolean;
}) {
  return (
    <div className={`${styles.field} ${styles.fieldWide}`.trim()}>
      <span className={styles.label}>{label}</span>
      {hint ? <span className={styles.hint}>{hint}</span> : null}
      <RichTextEditor
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        uploadFolder={uploadFolder}
        allowImages={allowImages}
      />
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
