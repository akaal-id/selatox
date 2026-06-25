import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import styles from "./cms-form.module.css";

type EditorHeaderProps = {
  title?: string;
  description?: string;
  backHref?: string;
  backLabel?: string;
  compact?: boolean;
};

export function EditorHeader({
  title,
  description,
  backHref,
  backLabel,
  compact = false,
}: EditorHeaderProps) {
  if (compact && !description && !backHref) {
    return null;
  }

  return (
    <header className={`${styles.pageHeader} ${compact ? styles.pageHeaderCompact : ""}`.trim()}>
      {backHref && backLabel ? (
        <Link href={backHref} className={styles.backLink}>
          <ChevronLeft size={15} strokeWidth={1.75} aria-hidden />
          {backLabel}
        </Link>
      ) : null}
      {!compact && title ? <h1 className={styles.title}>{title}</h1> : null}
      {description ? (
        <p className={compact ? styles.pageIntro : styles.lead}>{description}</p>
      ) : null}
    </header>
  );
}
