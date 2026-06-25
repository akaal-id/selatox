"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { JobCard } from "@/components/jobcard/jobcard";
import { Button } from "@/components/ui/Button";
import { OPEN_POSITIONS_ANCHOR, openPositionsSection } from "@/constants/career-journey";
import type { JourneyOpenPositionsContent } from "@/lib/cms/public-content";
import styles from "./open-positions.module.css";

type OpenPositionsProps = {
  content: JourneyOpenPositionsContent;
};

export function OpenPositions({ content }: OpenPositionsProps) {
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
      id={OPEN_POSITIONS_ANCHOR}
      className={`${styles.section} ${isInView ? styles.inView : ""}`.trim()}
      aria-labelledby="open-positions-heading"
      data-navbar="default"
    >
      <div className={styles.container}>
        <header className={styles.header}>
          <p className={styles.eyebrow} aria-hidden>
            {openPositionsSection.eyebrow}
          </p>
          <h2 id="open-positions-heading" className={styles.title}>
            {content.headline}
          </h2>
          <p className={styles.lead}>{content.sub}</p>
        </header>

        <ul className={styles.jobGrid}>
          {content.jobs.map((job, index) => (
            <li
              key={job.id}
              className={styles.jobGridItem}
              style={{ ["--delay" as string]: `${0.2 + index * 0.06}s` }}
            >
              <JobCard
                job={job}
                onViewDetails={() => router.push(`/openings/${job.slug}`)}
                onApply={() => router.push(`/openings/${job.slug}#apply`)}
              />
            </li>
          ))}
        </ul>

        <div className={styles.actions}>
          <Button
            variant="primary"
            showIcon
            backgroundColor="var(--blue-100)"
            color="var(--neutral-0)"
            onClick={() => router.push("/openings")}
          >
            {openPositionsSection.moreLabel}
          </Button>
        </div>
      </div>
    </section>
  );
}
