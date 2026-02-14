"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import type { Locale } from "@/lib/i18n";
import styles from "./Navbar.module.css";

export function Navbar({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const base = `/${locale}`;

  const navLinks = [
    { href: `${base}/home`, label: locale === "id" ? "Beranda" : "Home" },
    { href: `${base}/about`, label: locale === "id" ? "Tentang" : "About" },
    { href: `${base}/products`, label: locale === "id" ? "Produk" : "Products" },
    { href: `${base}/contact`, label: locale === "id" ? "Kontak" : "Contact" },
  ];

  return (
    <header className={styles.navbar}>
      <div className={styles.container}>
        <Link href={`${base}/home`} className={styles.logo} aria-label="Selatox Home">
          <span className={styles.logoText}>Selatox</span>
          <span className={styles.logoSub}>Bio Pharma</span>
        </Link>
        <nav className={`${styles.nav} ${open ? styles.navOpen : ""}`}>
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={pathname === href ? styles.linkActive : styles.link}
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className={styles.locale}>
          <Link
            href={pathname?.replace(/^\/(en|id)/, "/en") ?? "/en/home"}
            className={locale === "en" ? styles.localeActive : styles.localeLink}
          >
            EN
          </Link>
          <span className={styles.localeDivider}>|</span>
          <Link
            href={pathname?.replace(/^\/(en|id)/, "/id") ?? "/id/home"}
            className={locale === "id" ? styles.localeActive : styles.localeLink}
          >
            ID
          </Link>
        </div>
        <button
          type="button"
          className={styles.toggle}
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </header>
  );
}
