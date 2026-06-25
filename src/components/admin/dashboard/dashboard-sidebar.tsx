"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Briefcase,
  Building2,
  ChevronDown,
  ClipboardList,
  ExternalLink,
  Factory,
  FlaskConical,
  Home,
  LayoutDashboard,
  Layers,
  Mail,
  Map,
  Newspaper,
  Package,
  Scale,
  type LucideIcon,
} from "lucide-react";
import {
  getAdminHref,
  getCmsNavGroups,
  getHomeNavSections,
} from "@/lib/admin/cms-nav";
import type { CmsTableConfig } from "@/lib/admin/cms-tables";
import { HOME_ADMIN_HREF } from "@/lib/cms/home";
import { getPageNavSections } from "@/lib/cms/page-sections";
import styles from "./dashboard.module.css";

const PAGE_ICONS: Record<string, LucideIcon> = {
  about: Building2,
  contact: Mail,
  our_business: Briefcase,
  manufacturing: Factory,
  journey: Map,
  ethics: Scale,
  newsroom: Newspaper,
  openings: ClipboardList,
};

const COLLECTION_ICONS: Record<string, LucideIcon> = {
  products: Package,
  news: Newspaper,
  careers: Briefcase,
  rnd: FlaskConical,
};

function isNavActive(pathname: string, href: string): boolean {
  if (href === "/admin") {
    return pathname === "/admin" || pathname === "/admin/";
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

function isNavGroupActive(pathname: string, href: string): boolean {
  const parts = href.split("/").filter(Boolean);
  if (parts[0] === "admin" && parts[1]) {
    const basePath = `/admin/${parts[1]}`;
    return pathname === basePath || pathname.startsWith(`${basePath}/`);
  }
  return isNavActive(pathname, href);
}

function NavItem({
  href,
  label,
  icon: Icon,
  active,
  onNavigate,
}: {
  href: string;
  label: string;
  icon: LucideIcon;
  active: boolean;
  onNavigate?: () => void;
}) {
  return (
    <Link
      href={href}
      className={`${styles.navLink} ${active ? styles.navLinkActive : ""}`.trim()}
      onClick={onNavigate}
    >
      <span className={styles.navIcon}>
        <Icon size={16} strokeWidth={1.75} />
      </span>
      <span className={styles.navLinkText}>{label}</span>
    </Link>
  );
}

function closeMobileSidebar() {
  if (typeof window !== "undefined" && window.innerWidth < 1024) {
    document.dispatchEvent(new CustomEvent("cms-close-sidebar"));
  }
}

function ExpandableNavGroup({
  href,
  label,
  icon: Icon,
  pathname,
  sections,
}: {
  href: string;
  label: string;
  icon: LucideIcon;
  pathname: string;
  sections: { id: string; title: string; href: string }[];
}) {
  const isActive = isNavGroupActive(pathname, href);
  const [expanded, setExpanded] = useState(isActive);

  useEffect(() => {
    if (isActive) {
      setExpanded(true);
      return;
    }
    setExpanded(false);
  }, [isActive]);

  return (
    <div className={styles.navExpandGroup}>
      <div className={`${styles.navLinkRow} ${isActive ? styles.navLinkActive : ""}`.trim()}>
        <button
          type="button"
          className={styles.navLinkMain}
          aria-expanded={expanded}
          aria-label={expanded ? `Collapse ${label} sections` : `Expand ${label} sections`}
          onClick={() => setExpanded((value) => !value)}
        >
          <span className={styles.navIcon}>
            <Icon size={16} strokeWidth={1.75} />
          </span>
          <span className={styles.navLinkText}>{label}</span>
          <ChevronDown
            size={14}
            strokeWidth={1.75}
            className={`${styles.navChevron} ${expanded ? styles.navChevronOpen : ""}`.trim()}
            aria-hidden
          />
        </button>
      </div>

      {expanded ? (
        <div className={styles.navSubList}>
          {sections.map((section) => (
            <Link
              key={section.id}
              href={section.href}
              prefetch
              className={`${styles.navSubLink} ${
                pathname === section.href || pathname.startsWith(`${section.href}/`)
                  ? styles.navSubLinkActive
                  : ""
              }`.trim()}
              onClick={closeMobileSidebar}
            >
              {section.title}
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function HomeNavGroup({ pathname }: { pathname: string }) {
  return (
    <ExpandableNavGroup
      href={HOME_ADMIN_HREF}
      label="Home"
      icon={Home}
      pathname={pathname}
      sections={getHomeNavSections()}
    />
  );
}

function PageNavItem({
  table,
  pathname,
}: {
  table: CmsTableConfig;
  pathname: string;
}) {
  const href = getAdminHref(table.slug);
  const Icon = PAGE_ICONS[table.slug] ?? Layers;
  const sections = getPageNavSections(table.slug);

  if (sections.length > 0) {
    return (
      <ExpandableNavGroup
        href={href}
        label={table.label}
        icon={Icon}
        pathname={pathname}
        sections={sections}
      />
    );
  }

  return (
    <NavItem
      href={href}
      label={table.label}
      icon={Icon}
      active={isNavActive(pathname, href)}
      onNavigate={closeMobileSidebar}
    />
  );
}

function CollectionNavItem({
  table,
  pathname,
}: {
  table: CmsTableConfig;
  pathname: string;
}) {
  const href = getAdminHref(table.slug);
  const Icon = COLLECTION_ICONS[table.slug] ?? Layers;
  return (
    <NavItem
      href={href}
      label={table.label}
      icon={Icon}
      active={isNavActive(pathname, href)}
      onNavigate={closeMobileSidebar}
    />
  );
}

export function DashboardSidebar({ open }: { open: boolean }) {
  const pathname = usePathname() ?? "/admin";
  const { pages, other } = getCmsNavGroups();

  return (
    <aside
      className={`${styles.sidebar} ${open ? styles.sidebarOpen : ""}`.trim()}
      aria-label="CMS navigation"
    >
      <div className={styles.sidebarBrand}>
        <div className={styles.brandWrap}>
          <Link href="/admin" className={styles.brandLink} aria-label="Selatox CMS">
            <Image
              src="/assets/Selatox Logo.svg"
              alt="Selatox"
              width={602}
              height={101}
              className={styles.brandLogo}
              priority
            />
          </Link>
        </div>
      </div>

      <nav className={styles.sidebarNav}>
        <div className={styles.navGroup}>
          <NavItem
            href="/admin"
            label="Dashboard"
            icon={LayoutDashboard}
            active={isNavActive(pathname, "/admin")}
            onNavigate={closeMobileSidebar}
          />
        </div>

        <div className={styles.navGroup}>
          <p className={styles.navGroupLabel}>Pages</p>
          <HomeNavGroup pathname={pathname} />
          {pages.map((table) => (
            <PageNavItem key={table.slug} table={table} pathname={pathname} />
          ))}
        </div>

        <div className={styles.navGroup}>
          <p className={styles.navGroupLabel}>Other</p>
          {other.map((table) =>
            table.kind === "singleton" ? (
              <PageNavItem key={table.slug} table={table} pathname={pathname} />
            ) : (
              <CollectionNavItem key={table.slug} table={table} pathname={pathname} />
            )
          )}
        </div>
      </nav>

      <div className={styles.sidebarFooter}>
        <Link href="/" target="_blank" className={styles.sidebarFooterLink}>
          <ExternalLink size={15} strokeWidth={1.75} />
          View live site
        </Link>
      </div>
    </aside>
  );
}
