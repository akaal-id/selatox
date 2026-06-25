import { CMS_MEDIA_BUCKET, getPublicMediaUrl } from "@/lib/cms/storage";

/** Turn CMS values (full URL, /public path, or bucket-relative path) into a valid image src. */
export function normalizeMediaSrc(src: string | null | undefined): string {
  const trimmed = (src ?? "").trim();
  if (!trimmed) return "";

  if (/^https?:\/\//i.test(trimmed) || trimmed.startsWith("/")) {
    return trimmed;
  }

  // Supabase object path: uploads/foo/bar.jpg or foo/bar.jpg
  const storagePath = trimmed
    .replace(new RegExp(`^${CMS_MEDIA_BUCKET}/`), "")
    .replace(/^\/+/, "");

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (supabaseUrl && storagePath) {
    return getPublicMediaUrl(supabaseUrl, storagePath);
  }

  return `/${trimmed.replace(/^\/+/, "")}`;
}

export function isValidMediaSrc(src: string): boolean {
  const normalized = normalizeMediaSrc(src);
  if (!normalized) return false;

  if (normalized.startsWith("/")) return true;

  try {
    new URL(normalized);
    return true;
  } catch {
    return false;
  }
}
