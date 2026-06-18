"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { JobCard } from "@/components/jobcard/jobcard";
import { Button } from "@/components/ui/Button";
import { jobListings } from "@/constants/opportunities";
import styles from "./career.module.css";

const JOB_STATUS_SORT_ORDER = {
  Open: 0,
  "Closing Soon": 1,
  Closed: 2,
} as const;

export function CareerSection() {
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
        .slice(0, 3),
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
      className={`${styles.section} ${isInView ? styles.inView : ""}`.trim()}
      id="careers"
      data-navbar="default"
      aria-labelledby="careers-heading"
    >
      <div className={styles.container}>
        <header className={styles.header}>
          <span className={styles.eyebrow} aria-hidden>
            Careers
          </span>
          <div className={styles.headerRow}>
            <h2 id="careers-heading" className={styles.headline}>
              Build what&apos;s next,{" "}
              <em className={styles.headlineAccent}>with us.</em>
            </h2>
            <p className={styles.subtitle}>
              We&apos;re assembling a team of scientists, strategists, and operators
              who believe the next era of bio-aesthetics will be engineered in
              Indonesia — and shared with the world.
            </p>
          </div>
        </header>

        <ul className={styles.jobGrid}>
          {featuredJobs.map((job, index) => (
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
