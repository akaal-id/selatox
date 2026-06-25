"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ExternalLink, Menu } from "lucide-react";
import { getAdminPageMeta } from "@/lib/admin/cms-nav";
import { HOME_ADMIN_HREF } from "@/lib/cms/home";
import {
  getPageDefaultAdminHref,
  getPageSection,
  getPageSectionAdminHref,
} from "@/lib/cms/page-sections";
import styles from "./dashboard.module.css";
import { AdminSignOutButton } from "./admin-sign-out-button";

type ClientMode = "service" | "anon" | "missing";

export function DashboardTopbar({
  clientMode,
  userEmail,
  onMenuClick,
}: {
  clientMode: ClientMode;
  userEmail?: string;
  onMenuClick: () => void;
}) {
  const pathname = usePathname() ?? "/admin";
  const meta = getAdminPageMeta(pathname);

  const status =
    clientMode === "service"
      ? { label: "Service role", className: styles.statusSuccess }
      : clientMode === "anon"
        ? { label: "Anon key", className: styles.statusWarning }
        : { label: "Not configured", className: styles.statusError };

  return (
    <header className={styles.topbar}>
      <div className={styles.topbarLeft}>
        <button
          type="button"
          className={styles.menuButton}
          onClick={onMenuClick}
          aria-label="Open navigation menu"
        >
          <Menu size={18} strokeWidth={1.75} />
        </button>

        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link href="/admin" className={styles.breadcrumbRoot}>
            CMS
          </Link>
          {meta.slug === "home" && meta.sectionId ? (
            <>
              <span className={styles.breadcrumbSep} aria-hidden>
                /
              </span>
              <Link href={HOME_ADMIN_HREF} className={styles.breadcrumbRoot}>
                Home
              </Link>
              <span className={styles.breadcrumbSep} aria-hidden>
                /
              </span>
              <span className={styles.breadcrumbCurrent}>{meta.title}</span>
            </>
          ) : meta.parentSlug && meta.sectionId && meta.parentTitle ? (
            <>
              <span className={styles.breadcrumbSep} aria-hidden>
                /
              </span>
              <Link
                href={
                  meta.parentSlug === "home"
                    ? HOME_ADMIN_HREF
                    : getPageDefaultAdminHref(meta.parentSlug)
                }
                className={styles.breadcrumbRoot}
              >
                {meta.parentTitle}
              </Link>
              {meta.slug !== meta.parentSlug ? (
                <>
                  <span className={styles.breadcrumbSep} aria-hidden>
                    /
                  </span>
                  <Link
                    href={getPageSectionAdminHref(meta.parentSlug, meta.sectionId)}
                    className={styles.breadcrumbRoot}
                  >
                    {getPageSection(meta.parentSlug, meta.sectionId)?.title ?? meta.sectionId}
                  </Link>
                </>
              ) : (
                <>
                  <span className={styles.breadcrumbSep} aria-hidden>
                    /
                  </span>
                </>
              )}
              <span className={styles.breadcrumbCurrent}>{meta.title}</span>
            </>
          ) : meta.parentSlug && meta.parentTitle ? (
            <>
              <span className={styles.breadcrumbSep} aria-hidden>
                /
              </span>
              <Link href={`/admin/${meta.parentSlug}`} className={styles.breadcrumbRoot}>
                {meta.parentTitle}
              </Link>
              <span className={styles.breadcrumbSep} aria-hidden>
                /
              </span>
              <span className={styles.breadcrumbCurrent}>{meta.title}</span>
            </>
          ) : meta.slug || pathname !== "/admin" ? (
            <>
              <span className={styles.breadcrumbSep} aria-hidden>
                /
              </span>
              <span className={styles.breadcrumbCurrent}>{meta.title}</span>
            </>
          ) : (
            <>
              <span className={styles.breadcrumbSep} aria-hidden>
                /
              </span>
              <span className={styles.breadcrumbCurrent}>Dashboard</span>
            </>
          )}
        </nav>
      </div>

      <div className={styles.topbarRight}>
        {userEmail ? <span className={styles.topbarMeta}>{userEmail}</span> : null}
        <span className={`${styles.statusPill} ${status.className}`.trim()}>
          {status.label}
        </span>
        <AdminSignOutButton />
        <Link href="/" target="_blank" className={styles.topbarLink}>
          <ExternalLink size={14} strokeWidth={1.75} />
          View site
        </Link>
      </div>
    </header>
  );
}
