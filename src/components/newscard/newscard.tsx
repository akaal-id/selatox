"use client";

import Image from "next/image";
import { Calendar } from "lucide-react";
import type { NewsArticle } from "@/constants/news";
import { Button } from "@/components/ui/Button";
import styles from "./newscard.module.css";

export type NewsCardProps = {
  article: NewsArticle;
  onReadArticle?: () => void;
};

const CATEGORY_CLASS: Record<NewsArticle["category"], string> = {
  "Press Release": styles.categoryPress,
  Notice: styles.categoryNotice,
  Event: styles.categoryEvent,
};

export function NewsCard({ article, onReadArticle }: NewsCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.media}>
        <Image
          src={article.imageSrc}
          alt={article.imageAlt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 900px) 50vw, 33vw"
          className={styles.image}
        />
      </div>

      <div className={styles.body}>
        <span className={`${styles.category} ${CATEGORY_CLASS[article.category]}`}>
          {article.category}
        </span>

        <h3 className={styles.title}>{article.title}</h3>

        <p className={styles.date}>
          <Calendar size={15} strokeWidth={1.5} aria-hidden />
          <span>{article.date}</span>
        </p>

        <div className={styles.footer}>
          <Button
            type="button"
            variant="border"
            borderColor="var(--neutral-60)"
            size="sm"
            className={styles.actionButton}
            onClick={onReadArticle}
          >
            Read Article
          </Button>
        </div>
      </div>
    </article>
  );
}
