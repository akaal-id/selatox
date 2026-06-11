"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, PhoneOutgoing, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { useLenis } from "@/components/lenis/LenisProvider";
import styles from "./navbar.module.css";

const navLinks = [{ href: "/news", label: "News" }];

const aboutDropdownLinks = [
  { href: "/about", label: "About Selatox" },
  { href: "/our-business", label: "Our Business" },
  { href: "/ethics", label: "Ethics" },
];

const careersDropdownLinks = [
  { href: "/career-journey", label: "Career Journey" },
  { href: "/opportunities", label: "Opportunities" },
];

export type NavbarVariant = "default" | "negative";

function getVariantFromScroll(): NavbarVariant | null {
  if (typeof document === "undefined") return null;
  const sections = document.querySelectorAll<HTMLElement>("[data-navbar]");
  const viewportTop = 0;
  for (const section of sections) {
    const rect = section.getBoundingClientRect();
    if (rect.top <= viewportTop && rect.bottom > viewportTop) {
      const value = section.getAttribute("data-navbar");
      if (value === "negative" || value === "default") return value as NavbarVariant;
      return null;
    }
  }
  const valuesection = document.getElementById("valuesection");
  if (valuesection) {
    const rect = valuesection.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) return "default";
  }
  return null;
}

type NavMenuProps = {
  linkClassName: string;
  dropdownClassName: string;
  aboutTriggerClassName: string;
  careersTriggerClassName: string;
  dropdownMenuClassName: string;
  dropdownLinkClassName: string;
  aboutOpen: boolean;
  careersOpen: boolean;
  setAboutOpen: (value: boolean | ((prev: boolean) => boolean)) => void;
  setCareersOpen: (value: boolean | ((prev: boolean) => boolean)) => void;
  onNavigate: () => void;
  /** Mobile: menus under each trigger. Desktop: menus rendered on navWrap. */
  menusInline?: boolean;
};

function NavMenu({
  linkClassName,
  dropdownClassName,
  aboutTriggerClassName,
  careersTriggerClassName,
  dropdownMenuClassName,
  dropdownLinkClassName,
  aboutOpen,
  careersOpen,
  setAboutOpen,
  setCareersOpen,
  onNavigate,
  menusInline = true,
}: NavMenuProps) {
  const closeAll = () => {
    onNavigate();
    setAboutOpen(false);
    setCareersOpen(false);
  };

  return (
    <>
      <Link href="/" className={linkClassName} onClick={closeAll}>
        Home
      </Link>
      <div className={dropdownClassName}>
        <button
          type="button"
          className={aboutTriggerClassName}
          aria-expanded={aboutOpen}
          aria-haspopup="menu"
          onClick={() => {
            setAboutOpen((prev) => !prev);
            setCareersOpen(false);
          }}
        >
          <span>About</span>
          <ChevronDown
            size={14}
            className={`${styles.chevron} ${aboutOpen ? styles.chevronOpen : ""}`}
            aria-hidden
          />
        </button>
        {menusInline ? (
          <div
            className={`${dropdownMenuClassName} ${aboutOpen ? styles.dropdownMenuOpen : ""}`}
            role="menu"
          >
            {aboutDropdownLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={dropdownLinkClassName}
                role="menuitem"
                onClick={closeAll}
              >
                {label}
              </Link>
            ))}
          </div>
        ) : null}
      </div>
      <Link href="/products" className={linkClassName} onClick={closeAll}>
        Products
      </Link>
      <div className={dropdownClassName}>
        <button
          type="button"
          className={careersTriggerClassName}
          aria-expanded={careersOpen}
          aria-haspopup="menu"
          onClick={() => {
            setCareersOpen((prev) => !prev);
            setAboutOpen(false);
          }}
        >
          <span>Careers</span>
          <ChevronDown
            size={14}
            className={`${styles.chevron} ${careersOpen ? styles.chevronOpen : ""}`}
            aria-hidden
          />
        </button>
        {menusInline ? (
          <div
            className={`${dropdownMenuClassName} ${careersOpen ? styles.dropdownMenuOpen : ""}`}
            role="menu"
          >
            {careersDropdownLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={dropdownLinkClassName}
                role="menuitem"
                onClick={closeAll}
              >
                {label}
              </Link>
            ))}
          </div>
        ) : null}
      </div>
      {navLinks.map(({ href, label }) => (
        <Link key={href} href={href} className={linkClassName} onClick={closeAll}>
          {label}
        </Link>
      ))}
    </>
  );
}

export function Navbar({ variant: variantProp }: { variant?: NavbarVariant }) {
  const pathname = usePathname();
  const router = useRouter();
  const lenis = useLenis();
  const [open, setOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [careersOpen, setCareersOpen] = useState(false);
  const [scrollVariant, setScrollVariant] = useState<NavbarVariant | null>(null);
  const [contactTipVisible, setContactTipVisible] = useState(false);
  const [contactTipPos, setContactTipPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const update = () => setScrollVariant(getVariantFromScroll());
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

  useEffect(() => {
    setOpen(false);
    setAboutOpen(false);
    setCareersOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  const effectiveVariant = variantProp ?? scrollVariant ?? "default";
  const isNegative = effectiveVariant === "negative";
  const isDropdownActive = aboutOpen || careersOpen;

  const closeMobileMenu = () => {
    setOpen(false);
    setAboutOpen(false);
    setCareersOpen(false);
  };

  const navMenuProps = {
    aboutOpen,
    careersOpen,
    setAboutOpen,
    setCareersOpen,
    onNavigate: closeMobileMenu,
  };

  return (
    <>
      <header
        className={`${styles.navbar} ${isNegative ? styles.navbarNegative : ""} ${open ? styles.navbarMenuOpen : ""}`}
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
            className={`${styles.navWrap} ${isDropdownActive ? styles.aboutActive : ""}`}
          >
            <nav className={styles.nav}>
              <NavMenu
                {...navMenuProps}
                menusInline={false}
                linkClassName={styles.link}
                dropdownClassName={styles.dropdown}
                aboutTriggerClassName={`${styles.link} ${styles.dropdownTrigger} ${styles.aboutTrigger}`}
                careersTriggerClassName={`${styles.link} ${styles.dropdownTrigger} ${styles.careerTrigger}`}
                dropdownMenuClassName={styles.dropdownMenu}
                dropdownLinkClassName={`${styles.link} ${styles.dropdownLink}`}
              />
            </nav>
            <div
              className={`${styles.dropdownMenu} ${aboutOpen || careersOpen ? styles.dropdownMenuOpen : ""}`}
              role="menu"
              aria-hidden={!(aboutOpen || careersOpen)}
            >
              {aboutOpen
                ? aboutDropdownLinks.map(({ href, label }) => (
                    <Link
                      key={href}
                      href={href}
                      className={`${styles.link} ${styles.dropdownLink}`}
                      role="menuitem"
                      onClick={closeMobileMenu}
                    >
                      {label}
                    </Link>
                  ))
                : null}
              {careersOpen
                ? careersDropdownLinks.map(({ href, label }) => (
                    <Link
                      key={href}
                      href={href}
                      className={`${styles.link} ${styles.dropdownLink}`}
                      role="menuitem"
                      onClick={closeMobileMenu}
                    >
                      {label}
                    </Link>
                  ))
                : null}
            </div>
          </div>

          <div className={styles.right}>
            <button
              type="button"
              className={styles.navButton}
              aria-label="Contact Us"
              onClick={() => {
                closeMobileMenu();
                router.push("/contact");
              }}
              onMouseEnter={(event) => {
                setContactTipVisible(true);
                setContactTipPos({ x: event.clientX + 14, y: event.clientY + 14 });
              }}
              onMouseMove={(event) => {
                setContactTipPos({ x: event.clientX + 14, y: event.clientY + 14 });
              }}
              onMouseLeave={() => setContactTipVisible(false)}
            >
              <PhoneOutgoing aria-hidden />
            </button>
            {contactTipVisible ? (
              <span
                className={styles.contactTooltip}
                style={{ left: `${contactTipPos.x}px`, top: `${contactTipPos.y}px` }}
                role="tooltip"
              >
                Contact Us
              </span>
            ) : null}
            <button
              type="button"
              className={styles.toggle}
              onClick={() => {
                setOpen((prev) => {
                  const next = !prev;
                  if (!next) {
                    setAboutOpen(false);
                    setCareersOpen(false);
                  }
                  return next;
                });
              }}
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
            >
              {open ? <X size={24} aria-hidden /> : <Menu size={24} aria-hidden />}
            </button>
          </div>
        </div>
      </header>

      <div
        className={`${styles.mobileOverlay} ${open ? styles.mobileOverlayOpen : ""}`}
        aria-hidden={!open}
        role="dialog"
        aria-modal={open}
        aria-label="Site navigation"
      >
        <nav className={styles.mobileNav} aria-label="Mobile navigation">
          <NavMenu
            {...navMenuProps}
            linkClassName={styles.mobileLink}
            dropdownClassName={styles.mobileDropdown}
            aboutTriggerClassName={`${styles.mobileLink} ${styles.mobileDropdownTrigger}`}
            careersTriggerClassName={`${styles.mobileLink} ${styles.mobileDropdownTrigger}`}
            dropdownMenuClassName={styles.mobileDropdownMenu}
            dropdownLinkClassName={styles.mobileDropdownLink}
          />
        </nav>
      </div>
    </>
  );
}
