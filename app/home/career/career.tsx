"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { JobCard } from "@/components/jobcard/jobcard";
import { Button } from "@/components/ui/Button";
import { RichHeadline, RichText } from "@/components/cms/rich-text";
import type { CareersContent } from "@/lib/cms/home-page-data";
import styles from "./career.module.css";

type CareerSectionProps = {
  content: CareersContent;
};

export function CareerSection({ content }: CareerSectionProps) {
  const router = useRouter();
  const sectionRef = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsInView(true);
      },
      { threshold: 0.1, rootMargin: "0px 0px -5% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`${styles.section} ${isInView ? styles.inView : ""}`.trim()}
      id="careers"
      data-navbar="default"
      aria-labelledby="careers-heading"
    >
      <div className={styles.container}>
        <header className={styles.header}>
          <span className={styles.eyebrow} aria-hidden>
            {content.eyebrow}
          </span>
          <div className={styles.headerRow}>
            <h2 id="careers-heading" className={styles.headline}>
              <RichHeadline content={content.headline} />
            </h2>
            <div className={styles.subtitle}>
              <RichText html={content.sub} />
            </div>
          </div>
        </header>

        <ul className={styles.jobGrid}>
          {content.jobs.map((job, index) => (
            <li
              key={job.id}
              className={styles.jobGridItem}
              style={{ "--delay": `${0.2 + index * 0.06}s` } as React.CSSProperties}
            >
              <JobCard
                job={job}
                onViewDetails={() => router.push(`/openings/${job.slug}`)}
                onApply={() => router.push(`/openings/${job.slug}#apply`)}
              />
            </li>
          ))}
        </ul>

        <div className={styles.cta}>
          <Button
            variant="simple"
            showIcon
            color="var(--green-120)"
            onClick={() => router.push("/openings")}
          >
            View all open roles
          </Button>
        </div>
      </div>
    </section>
  );
}
