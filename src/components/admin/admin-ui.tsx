import Link from "next/link";
import type { ReactNode } from "react";
import styles from "./admin-ui.module.css";

export function AdminShell({
  title,
  description,
  children,
  actions,
  eyebrow = "CMS",
}: {
  title: string;
  description?: string;
  children: ReactNode;
  actions?: ReactNode;
  eyebrow?: string;
}) {
  return (
    <div className={styles.shell}>
      <header className={styles.shellHeader}>
        <div className={styles.shellHeaderText}>
          <p className={styles.eyebrow}>{eyebrow}</p>
          <h1 className={styles.title}>{title}</h1>
          {description ? <p className={styles.lead}>{description}</p> : null}
        </div>
        {actions ? <div className={styles.shellActions}>{actions}</div> : null}
      </header>
      {children}
    </div>
  );
}

export function AdminNavLink({
  href,
  children,
  active,
}: {
  href: string;
  children: ReactNode;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`${styles.navLink} ${active ? styles.navLinkActive : ""}`.trim()}
    >
      {children}
    </Link>
  );
}

export function AdminBadge({
  children,
  tone = "default",
}: {
  children: ReactNode;
  tone?: "default" | "success" | "warning" | "error";
}) {
  const toneClass =
    tone === "success"
      ? styles.badgeSuccess
      : tone === "warning"
        ? styles.badgeWarning
        : tone === "error"
          ? styles.badgeError
          : styles.badgeDefault;

  return <span className={`${styles.badge} ${toneClass}`.trim()}>{children}</span>;
}

export function AdminCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`${styles.card} ${className}`.trim()}>{children}</div>;
}

export function formatCellValue(value: unknown): string {
  if (value === null || value === undefined) return "—";
  if (typeof value === "boolean") return value ? "true" : "false";
  if (typeof value === "object") return JSON.stringify(value, null, 2);
  return String(value);
}

export function isRichTextField(key: string): boolean {
  return (
    key.endsWith("_sub") ||
    key.endsWith("_html") ||
    key.includes("body_html") ||
    key.includes("description") ||
    key.includes("quote") ||
    key.includes("intro_sub") ||
    (key.includes("headline") && key.includes("intro"))
  );
}
