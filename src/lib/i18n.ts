/**
 * PT. Selatox Bio Pharma — i18n constants for EN/ID routing.
 */

export const locales = ["en", "id"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export function isValidLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}
