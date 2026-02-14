import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import styles from "./Footer.module.css";

export function Footer({ locale }: { locale: Locale }) {
  const base = `/${locale}`;
  const t = {
    en: {
      company: "PT. Selatox Bio Pharma",
      home: "Home",
      about: "About",
      products: "Products",
      contact: "Contact",
      rights: "All rights reserved.",
    },
    id: {
      company: "PT. Selatox Bio Pharma",
      home: "Beranda",
      about: "Tentang",
      products: "Produk",
      contact: "Kontak",
      rights: "Hak cipta dilindungi.",
    },
  }[locale];

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.brand}>
          <span className={styles.logo}>{t.company}</span>
          <p className={styles.tagline}>
            {locale === "en"
              ? "Innovation in biotech and pharmaceutical excellence."
              : "Inovasi dalam bioteknologi dan keunggulan farmasi."}
          </p>
        </div>
        <nav className={styles.links} aria-label="Footer navigation">
          <Link href={`${base}/home`}>{t.home}</Link>
          <Link href={`${base}/about`}>{t.about}</Link>
          <Link href={`${base}/products`}>{t.products}</Link>
          <Link href={`${base}/contact`}>{t.contact}</Link>
        </nav>
      </div>
      <div className={styles.bottom}>
        <span className={styles.copyright}>
          © {new Date().getFullYear()} PT. Selatox Bio Pharma. {t.rights}
        </span>
      </div>
    </footer>
  );
}
