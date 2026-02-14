"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import styles from "./navbar.module.css";

const navLinks = [
  { href: "/home", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/products", label: "Products" },
];

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  return (
    <header className={styles.navbar}>
      <div className={styles.container}>
        <Link href="/home" className={styles.logo} aria-label="Selatox Home">
          <span className={styles.logoText}>Selatox</span>
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
            className={styles.langToggle}
            aria-label="Language"
            title="Language"
          >
            EN
          </button>
          <Button
            variant="primary"
            size="sm"
            showIcon={true}
            backgroundColor="var(--neutral-160)"
            color="white"
            iconColor="var(--neutral-160)"
            onClick={() => {
              setOpen(false);
              router.push("/contact");
            }}
          >
            Contact Us
          </Button>
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
