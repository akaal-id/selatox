"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import styles from "./navbar.module.css";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/products", label: "Products" },
  { href: "/careers", label: "Careers" },
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
  const [open, setOpen] = useState(false);
  const [scrollVariant, setScrollVariant] = useState<NavbarVariant | null>(null);

  useEffect(() => {
    const update = () => setScrollVariant(getVariantFromScroll());
    // Defer initial read until after hydration to avoid removeChild(null) during commit
    const id = requestAnimationFrame(() => {
      update();
    });
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [pathname]);

  const effectiveVariant =
    variantProp ?? scrollVariant ?? (homePaths.includes(pathname) ? "negative" : "default");
  const isNegative = effectiveVariant === "negative";

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
        <div className={styles.right}>
          <button
            type="button"
            className={styles.navButton}
            onClick={() => {
              setOpen(false);
              router.push("/contact");
            }}
          >
            <span>Contact Us</span>
            <ArrowRight size={16} aria-hidden />
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
