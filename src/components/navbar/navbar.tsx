"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, ArrowRight, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { useLenis } from "@/components/lenis/LenisProvider";
import styles from "./navbar.module.css";

const navLinks = [
  { href: "/products", label: "Products" },
  { href: "/careers", label: "Careers" },
  { href: "/news", label: "News" },
];

const aboutDropdownLinks = [
  { href: "/about", label: "About Selatox" },
  { href: "/our-business", label: "Our Business" },
];

export type NavbarVariant = "default" | "negative";

const homePaths = ["/", "/home"];

function getVariantFromScroll(): NavbarVariant | null {
  if (typeof document === "undefined") return null;
  const sections = document.querySelectorAll<HTMLElement>("[data-navbar]");
  const viewportTop = 0;
  for (const section of sections) {
    const rect = section.getBoundingClientRect();
    // Section that contains the top of the viewport
    if (rect.top <= viewportTop && rect.bottom > viewportTop) {
      const value = section.getAttribute("data-navbar");
      if (value === "negative" || value === "default") return value as NavbarVariant;
      return null;
    }
  }
  // If no section contains viewport top (e.g. at bottom), prefer default when value section is in view
  const valuesection = document.getElementById("valuesection");
  if (valuesection) {
    const rect = valuesection.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) return "default";
  }
  return null;
}

export function Navbar({ variant: variantProp }: { variant?: NavbarVariant }) {
  const pathname = usePathname();
  const router = useRouter();
  const lenis = useLenis();
  const [open, setOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [scrollVariant, setScrollVariant] = useState<NavbarVariant | null>(null);

  useEffect(() => {
    const update = () => setScrollVariant(getVariantFromScroll());
    // Defer initial read until after hydration to avoid removeChild(null) during commit
    const id = requestAnimationFrame(() => {
      update();
    });
    window.addEventListener("resize", update);

    if (lenis) {
      const unsubscribe = lenis.on("scroll", update);
      return () => {
        cancelAnimationFrame(id);
        unsubscribe();
        window.removeEventListener("resize", update);
      };
    }

    window.addEventListener("scroll", update, { passive: true });
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [pathname, lenis]);

  const effectiveVariant =
    variantProp ?? scrollVariant ?? "default";
  const isNegative = effectiveVariant === "negative";
  const isAboutActive = aboutOpen;

  return (
    <header
      className={`${styles.navbar} ${isNegative ? styles.navbarNegative : ""}`}
    >
      <div className={styles.container}>
        <Link href="/" className={styles.logo} aria-label="Selatox Home">
          <Image
            src="/assets/icon.svg"
            alt="Selatox"
            width={20}
            height={20}
            className={styles.logoIcon}
          />

        </Link>
        <div
          className={`${styles.navWrap} ${open ? styles.navOpen : ""} ${isAboutActive ? styles.aboutActive : ""}`}
        >
          <nav className={styles.nav}>
            <Link
              href="/"
              className={styles.link}
              onClick={() => setOpen(false)}
            >
              Home
            </Link>
            <div className={styles.dropdown}>
              <button
                type="button"
                className={`${styles.link} ${styles.dropdownTrigger} ${styles.aboutTrigger}`}
                aria-expanded={isAboutActive}
                aria-haspopup="menu"
                onClick={() => setAboutOpen((prev) => !prev)}
              >
                <span>About</span>
                <ChevronDown
                  size={14}
                  className={`${styles.chevron} ${aboutOpen ? styles.chevronOpen : ""}`}
                  aria-hidden
                />
              </button>
            </div>
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={styles.link}
                onClick={() => setOpen(false)}
              >
                {label}
              </Link>
            ))}
          </nav>
          <div
            className={`${styles.dropdownMenu} ${isAboutActive ? styles.dropdownMenuOpen : ""}`}
            role="menu"
          >
            {aboutDropdownLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`${styles.link} ${styles.dropdownLink}`}
                role="menuitem"
                onClick={() => {
                  setOpen(false);
                  setAboutOpen(false);
                }}
              >
                {label}
              </Link>
            ))}
            {/* <Link
              href="/our-business/manufacturing"
              className={`${styles.link} ${styles.dropdownLink}`}
              role="menuitem"
              onClick={() => {
                setOpen(false);
                setAboutOpen(false);
              }}
            >
              Manufacturing
            </Link> */}
          </div>
        </div>
        <div className={styles.right}>
          <button
            type="button"
            className={styles.navButton}
            onClick={() => {
              setOpen(false);
              router.push("/contact");
            }}
          >
            <span className={styles.textWrapper}>
              <span className={styles.textPrimary}>Contact Us</span>
              <span className={styles.textSecondary} aria-hidden>Contact Us</span>
            </span>
            <span className={styles.iconWrapper}>
              <ArrowRight size={16} className={styles.iconPrimary} aria-hidden />
              <ArrowRight size={16} className={styles.iconSecondary} aria-hidden />
            </span>
          </button>
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
      </div>
    </header>
  );
}
