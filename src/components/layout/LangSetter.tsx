"use client";

import { useEffect } from "react";
import type { Locale } from "@/lib/i18n";

/**
 * Sets document.documentElement.lang for accessibility and SEO.
 * Root layout cannot know locale; this runs in [locale] context.
 */
export function LangSetter({ locale }: { locale: Locale }) {
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);
  return null;
}
