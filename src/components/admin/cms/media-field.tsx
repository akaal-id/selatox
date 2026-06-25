"use client";

import { useRef, useState } from "react";
import { ImageIcon, Upload, Video } from "lucide-react";
import type { CmsMediaKind } from "@/lib/cms/storage";
import { getAcceptForKind } from "@/lib/cms/storage";
import { normalizeMediaSrc } from "@/lib/cms/media-url";
import styles from "./media-field.module.css";

type CmsMediaFieldProps = {
  label: string;
  hint?: string;
  value: string;
  onChange: (value: string) => void;
  mediaType: CmsMediaKind;
  uploadFolder: string;
  placeholder?: string;
};

export function CmsMediaField({
  label,
  hint,
  value,
  onChange,
  mediaType,
  uploadFolder,
  placeholder,
}: CmsMediaFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);

  async function uploadFile(file: File) {
    setUploading(true);
    setUploadError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", uploadFolder);
      formData.append("kind", mediaType);

      const response = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const payload = (await response.json()) as {
        url?: string;
        error?: string;
      };

      if (!response.ok) {
        throw new Error(payload.error ?? "Upload failed.");
      }

      if (!payload.url) {
        throw new Error("Upload succeeded but no URL was returned.");
      }

      onChange(normalizeMediaSrc(payload.url));
    } catch (error) {
      setUploadError(error instanceof Error ? error.message : "Upload failed.");
    } finally {
      setUploading(false);
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      void uploadFile(file);
    }
  }

  function handleDrop(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setDragActive(false);
    const file = event.dataTransfer.files?.[0];
    if (file) {
      void uploadFile(file);
    }
  }

  return (
    <div className={`${styles.field} ${styles.fieldWide}`.trim()}>
      <span className={styles.label}>{label}</span>
      {hint ? <span className={styles.hint}>{hint}</span> : null}

      <label className={styles.urlField}>
        <span className={styles.urlLabel}>URL</span>
        <input
          className={styles.urlInput}
          type="text"
          value={value}
          placeholder={placeholder ?? "Paste a URL or upload a file below"}
          onChange={(event) => onChange(event.target.value)}
        />
      </label>

      <div
        className={`${styles.dropzone} ${dragActive ? styles.dropzoneActive : ""}`.trim()}
        onDragEnter={() => setDragActive(true)}
        onDragLeave={() => setDragActive(false)}
        onDragOver={(event) => {
          event.preventDefault();
          setDragActive(true);
        }}
        onDrop={handleDrop}
      >
        <div className={styles.dropzoneIcon} aria-hidden>
          {mediaType === "image" ? (
            <ImageIcon size={20} strokeWidth={1.75} />
          ) : (
            <Video size={20} strokeWidth={1.75} />
          )}
        </div>
        <div>
          <p className={styles.dropzoneTitle}>
            {uploading ? "Uploading…" : `Upload ${mediaType}`}
          </p>
          <p className={styles.dropzoneHint}>
            Drag and drop, or choose a file. JPG, PNG, WebP, GIF, SVG
            {mediaType === "video" ? ", MP4, WebM, MOV" : ""}.
          </p>
        </div>
        <button
          type="button"
          className={styles.uploadButton}
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
        >
          <Upload size={15} strokeWidth={1.75} />
          {uploading ? "Uploading…" : "Choose file"}
        </button>
        <input
          ref={inputRef}
          className={styles.hiddenInput}
          type="file"
          accept={getAcceptForKind(mediaType)}
          onChange={handleFileChange}
        />
      </div>

      {uploadError ? <p className={styles.error}>{uploadError}</p> : null}
    </div>
  );
}
