"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import styles from "./newsroom.module.css";
import { useRouter } from "next/navigation";

const NEWS_ITEMS = [
  {
    id: 1,
    category: "Press Release",
    date: "Mar 12, 2026",
    title: "Selatox Announces Breakthrough in High-Purity Toxin Formulation.",
    href: "/news/1",
  },
  {
    id: 2,
    category: "Notice",
    date: "Feb 28, 2026",
    title: "Successful Completion of Phase III Global Clinical Trials.",
    href: "/news/2",
  },
  {
    id: 3,
    category: "Event",
    date: "Feb 15, 2026",
    title: "Participation in the 2026 International Aesthetics Congress.",
    href: "/news/3",
  },
  {
    id: 4,
    category: "Press Release",
    date: "Jan 30, 2026",
    title: "Selatox Expands GMP Manufacturing Capacity in Cikarang Facility.",
    href: "/news/4",
  },
  {
    id: 5,
    category: "Notice",
    date: "Jan 08, 2026",
    title: "New Halal-Certified Product Line Receives Regulatory Approval.",
    href: "/news/5",
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
          {NEWS_ITEMS.map((article, index) => (
            <li key={article.id}>
              <Link
                href={article.href}
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
