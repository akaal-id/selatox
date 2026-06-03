"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  Briefcase,
  Calendar,
  ChevronLeft,
  MapPin,
} from "lucide-react";
import type { JobDescriptionHtml, JobListing } from "@/constants/opportunities";
import { Button } from "@/components/ui/Button";
import styles from "./job-detail.module.css";

type JobDetailProps = {
  job: JobListing;
};

const STATUS_CLASS: Record<JobListing["status"], string> = {
  Open: styles.statusOpen,
  "Closing Soon": styles.statusClosing,
  Closed: styles.statusClosed,
};

function JobDescriptionContent({ html }: { html: JobDescriptionHtml }) {
  return (
    <div
      className={styles.richText}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

export function JobDetail({ job }: JobDetailProps) {
  const heroRef = useRef<HTMLElement>(null);
  const bodyRef = useRef<HTMLElement>(null);
  const [heroInView, setHeroInView] = useState(false);
  const [bodyInView, setBodyInView] = useState(false);
  const isClosed = job.status === "Closed";

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
        aria-labelledby="job-title"
      >
        <div className={styles.heroInner}>
          <Link href="/opportunities" className={styles.backLink}>
            <ChevronLeft size={16} strokeWidth={1.5} aria-hidden />
            Back to Opportunities
          </Link>

          <div className={styles.heroHead}>
            
            <h1 id="job-title" className={styles.title}>
              {job.title}
            </h1>
            <span className={`${styles.status} ${STATUS_CLASS[job.status]}`}>
              {job.status}
            </span>
          </div>

          <dl className={styles.facts}>
            <div className={styles.fact}>
              <dt className={styles.factLabel}>Location</dt>
              <dd className={styles.factValue}>
                <MapPin size={15} strokeWidth={1.5} aria-hidden />
                {job.location}
              </dd>
            </div>
            <div className={styles.fact}>
              <dt className={styles.factLabel}>Function</dt>
              <dd className={styles.factValue}>
                <Briefcase size={15} strokeWidth={1.5} aria-hidden />
                {job.category}
              </dd>
            </div>
            <div className={styles.fact}>
              <dt className={styles.factLabel}>Experience</dt>
              <dd className={`${styles.factValue} ${styles.factMono}`}>
                {job.experienceLevel}
              </dd>
            </div>
            <div className={styles.fact}>
              <dt className={styles.factLabel}>Apply by</dt>
              <dd className={styles.factValue}>
                <Calendar size={15} strokeWidth={1.5} aria-hidden />
                {job.applyDeadline}
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <section
        ref={bodyRef}
        className={`${styles.body} ${bodyInView ? styles.inView : ""}`.trim()}
        aria-labelledby="job-description-heading"
      >
        <article className={styles.article}>
          <header className={styles.articleHeader}>
            
            <h2 id="job-description-heading" className={styles.articleTitle}>
              About This Role
            </h2>
          </header>
          <JobDescriptionContent html={job.description} />
        </article>

        <div id="apply" className={styles.applyBanner}>
          <h3 className={styles.applyTitle}>
            {isClosed ? (
              "Applications closed"
            ) : (
              <em className={styles.highlightGreen}>
                Interested in joining Selatox?
              </em>
            )}
          </h3>
          <p className={styles.applySub}>
            {isClosed
              ? "This role is no longer accepting applications."
              : "Submit your application before the deadline."}
          </p>
          <Button
            type="button"
            variant="primary"
            showIcon
            backgroundColor="var(--blue-100)"
            color="var(--neutral-0)"
            disabled={isClosed}
            className={styles.applyButton}
          >
            {isClosed ? "Applications Closed" : "Apply for This Role"}
          </Button>
          <Link href="/opportunities" className={styles.applyBackLink}>
            Back to opportunities
          </Link>
        </div>
      </section>
    </main>
  );
}
