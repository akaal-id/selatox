"use client";

import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { NewsCard } from "@/components/ui/NewsCard";
import styles from "./newsroom.module.css";
import { useRouter } from "next/navigation";

// Mock Data Array for Window Cards
const NEWS_ITEMS = [
  {
    id: 1,
    category: "Press Release",
    date: "Mar 12, 2026",
    title: "Selatox Announces Breakthrough in High-Purity Toxin Formulation.",
    image: "/images/hero-2.png",
    href: "/news/1",
  },
  {
    id: 2,
    category: "Notice",
    date: "Feb 28, 2026",
    title: "Successful Completion of Phase III Global Clinical Trials.",
    image: "/images/hero-2.png",
    href: "/news/2",
  },
  {
    id: 3,
    category: "Event",
    date: "Feb 15, 2026",
    title: "Participation in the 2026 International Aesthetics Congress.",
    image: "/images/hero-2.png",
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
    >
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.titleColumn}>
            <span className={styles.eyebrow}>Newsroom</span>
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
            <div 
              key={article.id} 
              className={styles.cardWrapper}
              style={{ animationDelay: `${0.4 + index * 0.1}s` }}
            >
              <NewsCard
                title={article.title}
                date={article.date}
                category={article.category}
                image={article.image}
                href={article.href}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
