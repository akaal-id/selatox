"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { Calendar, ChevronLeft, Tag } from "lucide-react";
import {
  getNewsHref,
  getRecentNewsArticles,
  type NewsArticle,
} from "@/constants/news";
import { NewsCard } from "@/components/newscard/newscard";
import { Button } from "@/components/ui/Button";
import styles from "./news-detail.module.css";

type NewsDetailProps = {
  article: NewsArticle;
};

const CATEGORY_CLASS: Record<NewsArticle["category"], string> = {
  "Press Release": styles.categoryPress,
  Notice: styles.categoryNotice,
  Event: styles.categoryEvent,
};

function NewsBody({ html }: { html: string }) {
  return (
    <div
      className={styles.richText}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

export function NewsDetail({ article }: NewsDetailProps) {
  const router = useRouter();
  const heroRef = useRef<HTMLElement>(null);
  const bodyRef = useRef<HTMLElement>(null);
  const [heroInView, setHeroInView] = useState(false);
  const [bodyInView, setBodyInView] = useState(false);

  const relatedArticles = useMemo(
    () => getRecentNewsArticles(article.slug, 3),
    [article.slug]
  );

  useEffect(() => {
    const targets: [React.RefObject<HTMLElement | null>, (v: boolean) => void][] =
      [
        [heroRef, setHeroInView],
        [bodyRef, setBodyInView],
      ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const match = targets.find(([ref]) => ref.current === entry.target);
          if (match) match[1](true);
        });
      },
      { threshold: 0, rootMargin: "0px 0px 0px 0px" }
    );

    targets.forEach(([ref]) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <main className={styles.page} data-navbar="default">
      <section
        ref={heroRef}
        className={`${styles.hero} ${heroInView ? styles.inView : ""}`.trim()}
        aria-labelledby="news-article-title"
      >
        <div className={styles.heroInner}>
          <Link href="/news" className={styles.backLink}>
            <ChevronLeft size={16} strokeWidth={1.5} aria-hidden />
            Back to Newsroom
          </Link>

          <div className={styles.heroHead}>
            <h1 id="news-article-title" className={styles.title}>
              {article.title}
            </h1>
            <span
              className={`${styles.category} ${CATEGORY_CLASS[article.category]}`}
            >
              {article.category}
            </span>
          </div>

          <dl className={styles.facts}>
            <div className={styles.fact}>
              <dt className={styles.factLabel}>Published</dt>
              <dd className={styles.factValue}>
                <Calendar size={15} strokeWidth={1.5} aria-hidden />
                <time dateTime={article.date}>{article.date}</time>
              </dd>
            </div>
            <div className={styles.fact}>
              <dt className={styles.factLabel}>Category</dt>
              <dd className={styles.factValue}>
                <Tag size={15} strokeWidth={1.5} aria-hidden />
                {article.category}
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <section
        ref={bodyRef}
        className={`${styles.body} ${bodyInView ? styles.inView : ""}`.trim()}
        aria-label="Article content"
      >
        <figure className={styles.featureMedia}>
          <Image
            src={article.imageSrc}
            alt={article.imageAlt}
            fill
            priority
            sizes="(max-width: 900px) 100vw, 900px"
            className={styles.featureImage}
          />
        </figure>

        <article className={styles.article}>
          <NewsBody html={article.bodyHtml} />
        </article>

        <div className={styles.mediaContact}>
          <p className={styles.mediaContactLabel}>Media inquiries</p>
          <p className={styles.mediaContactText}>
            For press and partnership questions, contact{" "}
            <a href="mailto:contact@selatox.com">contact@selatox.com</a>.
          </p>
        </div>

        {relatedArticles.length > 0 ? (
          <div className={styles.related}>
            <div className={styles.relatedHeader}>
              <span className={styles.relatedEyebrow}>More from the newsroom</span>
              <h3 className={styles.relatedTitle}>Related updates</h3>
            </div>
            <ul className={styles.relatedGrid}>
              {relatedArticles.map((item) => (
                <li key={item.slug} className={styles.relatedGridItem}>
                  <NewsCard
                    article={item}
                    onReadArticle={() => router.push(getNewsHref(item.slug))}
                  />
                </li>
              ))}
            </ul>
            <div className={styles.relatedActions}>
              <Button
                type="button"
                variant="simple"
                showIcon
                color="var(--blue-100)"
                onClick={() => router.push("/news")}
              >
                View all news
              </Button>
            </div>
          </div>
        ) : null}
      </section>
    </main>
  );
}
