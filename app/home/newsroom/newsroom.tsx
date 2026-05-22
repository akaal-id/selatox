"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import styles from "./newsroom.module.css";
import { useRouter } from "next/navigation";

// Mock Data Array for Window Cards
const NEWS_ITEMS = [
  {
    id: 1,
    category: "Press Release",
    date: "Mar 12, 2026",
    title: "Selatox Announces Breakthrough in High-Purity Toxin Formulation.",
    image: "/images/hero-2.webp",
    href: "/news/1",
  },
  {
    id: 2,
    category: "Notice",
    date: "Feb 28, 2026",
    title: "Successful Completion of Phase III Global Clinical Trials.",
    image: "/images/hero-2.webp",
    href: "/news/2",
  },
  {
    id: 3,
    category: "Event",
    date: "Feb 15, 2026",
    title: "Participation in the 2026 International Aesthetics Congress.",
    image: "/images/hero-2.webp",
    href: "/news/3",
  },
];

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
    >
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.titleColumn}>
            <span className={styles.eyebrow} aria-hidden>{"// Newsroom"}</span>
            <h2 className={styles.headline}>Latest Updates &amp; Insights.</h2>
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

        <div className={styles.grid}>
          {NEWS_ITEMS.map((article, index) => (
            <Link
              key={article.id}
              href={article.href}
              className={styles.newsCard}
              style={{ animationDelay: `${0.38 + index * 0.1}s` }}
            >
              <div className={styles.media}>
                <img src={article.image} alt={article.title} className={styles.image} />
              </div>
              <div className={styles.content}>
                <p className={styles.meta}>
                  <span>{article.category}</span>
                  <span>{article.date}</span>
                </p>
                <h3 className={styles.title}>{article.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
