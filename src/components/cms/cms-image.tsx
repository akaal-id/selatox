import Image, { type ImageProps } from "next/image";
import { isValidMediaSrc, normalizeMediaSrc } from "@/lib/cms/media-url";

type CmsImageProps = Omit<ImageProps, "src"> & {
  src: string | null | undefined;
};

/** next/image wrapper that normalizes Supabase / CMS paths and skips invalid src. */
export function CmsImage({ src, alt, ...props }: CmsImageProps) {
  const normalized = normalizeMediaSrc(src);

  if (!isValidMediaSrc(normalized)) {
    return null;
  }

  return <Image src={normalized} alt={alt ?? ""} {...props} />;
}
