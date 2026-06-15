"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { JobCard } from "@/components/jobcard/jobcard";
import { Button } from "@/components/ui/Button";
import {
  OPEN_POSITIONS_ANCHOR,
  openPositionsSection,
} from "@/constants/career-journey";
import { jobListings } from "@/constants/opportunities";
import styles from "./open-positions.module.css";

const JOB_STATUS_SORT_ORDER = {
  Open: 0,
  "Closing Soon": 1,
  Closed: 2,
} as const;

export function OpenPositions() {
  const router = useRouter();
  const sectionRef = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);

  const featuredJobs = useMemo(
    () =>
      jobListings
        .filter((job) => job.status !== "Closed")
        .sort(
          (a, b) =>
            JOB_STATUS_SORT_ORDER[a.status] - JOB_STATUS_SORT_ORDER[b.status]
        )
        .slice(0, 6),
    []
  );

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
            {openPositionsSection.title}
          </h2>
          <p className={styles.lead}>{openPositionsSection.lead}</p>
        </header>

        <ul className={styles.jobGrid}>
          {featuredJobs.map((job, index) => (
            <li
              key={job.id}
              className={styles.jobGridItem}
              style={{ ["--delay" as string]: `${0.2 + index * 0.06}s` }}
            >
              <JobCard
                job={job}
                onViewDetails={() => router.push(`/openings/${job.slug}`)}
                onApply={() =>
                  router.push(`/openings/${job.slug}#apply`)
                }
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
