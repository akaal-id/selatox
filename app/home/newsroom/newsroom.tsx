"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import styles from "./newsroom.module.css";
import { useRouter } from "next/navigation";
import { getNewsHref, newsArticles } from "@/constants/news";

export function Newsroom() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsInView(true);
      },
      { threshold: 0.15, rootMargin: "0px 0px -5% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`${styles.section} ${isInView ? styles.inView : ""}`}
      id="newsroom"
      data-navbar="default"
      aria-labelledby="newsroom-heading"
    >
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.titleColumn}>
            <span className={styles.eyebrow} aria-hidden>
              Newsroom
            </span>
            <h2 id="newsroom-heading" className={styles.headline}>
              Latest Updates &amp; Insights.
            </h2>
          </div>
          <div className={styles.actionColumn}>
            <Button
              variant="simple"
              showIcon={true}
              color="var(--neutral-140)"
              className={styles.viewAllButton}
              onClick={() => router.push("/news")}
            >
              View All News
            </Button>
          </div>
        </div>

        <ul className={styles.list} aria-label="Latest news">
          {newsArticles.slice(0, 5).map((article, index) => (
            <li key={article.id}>
              <Link
                href={getNewsHref(article.slug)}
                className={styles.listItem}
                style={{ animationDelay: `${0.38 + index * 0.08}s` }}
              >
                <span className={styles.category}>{article.category}</span>
                <span className={styles.date}>{article.date}</span>
                <h3 className={styles.title}>{article.title}</h3>
                <span className={styles.arrow} aria-hidden>
                  <ArrowRight size={18} />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
