import { Fragment } from "react";
import { normalizeHeadingHtml, sanitizeRichText } from "@/lib/cms/sanitize";
import styles from "./rich-text.module.css";

type RichTextProps = {
  html: string;
  className?: string;
  mode?: "block" | "heading";
};

export function RichText({ html, className, mode = "block" }: RichTextProps) {
  const safe = mode === "heading" ? normalizeHeadingHtml(html) : sanitizeRichText(html);
  if (!safe) return null;

  if (mode === "heading") {
    return <span className={className} dangerouslySetInnerHTML={{ __html: safe }} />;
  }

  return (
    <div
      className={`${styles.root} ${className ?? ""}`.trim()}
      dangerouslySetInnerHTML={{ __html: safe }}
    />
  );
}

type RichHeadlineProps = {
  content: string;
  className?: string;
};

/** Renders CMS headline copy as plain lines or sanitized inline HTML. */
export function RichHeadline({ content, className }: RichHeadlineProps) {
  const trimmed = content.trim();
  if (!trimmed) return null;

  if (/<[a-z][\s\S]*>/i.test(trimmed)) {
    return <RichText html={trimmed} className={className} mode="heading" />;
  }

  const lines = trimmed.split("\n").map((line) => line.trim()).filter(Boolean);
  return (
    <span className={className}>
      {lines.map((line, index) => (
        <Fragment key={`${line}-${index}`}>
          {line}
          {index < lines.length - 1 ? <br /> : null}
        </Fragment>
      ))}
    </span>
  );
}
