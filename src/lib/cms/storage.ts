export const CMS_MEDIA_BUCKET = "uploads";

export const IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
] as const;

export const VIDEO_MIME_TYPES = [
  "video/mp4",
  "video/webm",
  "video/quicktime",
] as const;

export const IMAGE_MAX_BYTES = 10 * 1024 * 1024;
export const VIDEO_MAX_BYTES = 100 * 1024 * 1024;

export type CmsMediaKind = "image" | "video";

const IMAGE_EXTENSIONS = new Set(["jpg", "jpeg", "png", "webp", "gif", "svg"]);
const VIDEO_EXTENSIONS = new Set(["mp4", "webm", "mov"]);

export function getMediaKind(mimeType: string): CmsMediaKind | null {
  if (IMAGE_MIME_TYPES.includes(mimeType as (typeof IMAGE_MIME_TYPES)[number])) {
    return "image";
  }
  if (VIDEO_MIME_TYPES.includes(mimeType as (typeof VIDEO_MIME_TYPES)[number])) {
    return "video";
  }
  return null;
}

export function getMediaKindFromFilename(filename: string): CmsMediaKind | null {
  const extension = filename.split(".").pop()?.toLowerCase();
  if (!extension) return null;
  if (IMAGE_EXTENSIONS.has(extension)) return "image";
  if (VIDEO_EXTENSIONS.has(extension)) return "video";
  return null;
}

export function getMaxBytesForKind(kind: CmsMediaKind): number {
  return kind === "image" ? IMAGE_MAX_BYTES : VIDEO_MAX_BYTES;
}

export function getAcceptForKind(kind: CmsMediaKind): string {
  return kind === "image"
    ? "image/jpeg,image/png,image/webp,image/gif,image/svg+xml"
    : "video/mp4,video/webm,video/quicktime,.mp4,.webm,.mov";
}

export function sanitizeStorageFolder(folder: string): string {
  return folder
    .split("/")
    .map((part) => part.trim().toLowerCase().replace(/[^a-z0-9_-]+/g, "-"))
    .filter(Boolean)
    .join("/");
}

export function buildStoragePath(folder: string, originalName: string): string {
  const safeFolder = sanitizeStorageFolder(folder);
  const extension = originalName.split(".").pop()?.toLowerCase().replace(/[^a-z0-9]+/g, "") ?? "bin";
  const baseName = originalName
    .replace(/\.[^.]+$/, "")
    .toLowerCase()
    .replace(/[^a-z0-9_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48);

  const stamp = Date.now();
  const random = Math.random().toString(36).slice(2, 8);
  const filename = `${baseName || "file"}-${stamp}-${random}.${extension}`;

  return safeFolder ? `${safeFolder}/${filename}` : filename;
}

export function validateMediaFile(
  file: File,
  expectedKind?: CmsMediaKind
): { ok: true; kind: CmsMediaKind } | { ok: false; error: string } {
  const kind =
    getMediaKind(file.type) ??
    getMediaKindFromFilename(file.name);

  if (!kind) {
    return {
      ok: false,
      error: "Unsupported file type. Use JPG, PNG, WebP, GIF, SVG, MP4, WebM, or MOV.",
    };
  }

  if (expectedKind && kind !== expectedKind) {
    return {
      ok: false,
      error: `Please upload a ${expectedKind} file for this field.`,
    };
  }

  const maxBytes = getMaxBytesForKind(kind);
  if (file.size > maxBytes) {
    const limitMb = Math.round(maxBytes / (1024 * 1024));
    return {
      ok: false,
      error: `File is too large. Maximum size is ${limitMb} MB.`,
    };
  }

  return { ok: true, kind };
}

export function getPublicMediaUrl(supabaseUrl: string, path: string): string {
  const base = supabaseUrl.replace(/\/$/, "");
  const encodedPath = path
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/");

  return `${base}/storage/v1/object/public/${CMS_MEDIA_BUCKET}/${encodedPath}`;
}
