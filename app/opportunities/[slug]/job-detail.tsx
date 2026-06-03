"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Briefcase,
  Calendar,
  ChevronLeft,
  GraduationCap,
  MapPin,
} from "lucide-react";
import {
  getRecentJobOpenings,
  type JobDescriptionHtml,
  type JobListing,
} from "@/constants/opportunities";
import { JobCard } from "@/components/jobcard/jobcard";
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
  const router = useRouter();
  const heroRef = useRef<HTMLElement>(null);
  const bodyRef = useRef<HTMLElement>(null);
  const [heroInView, setHeroInView] = useState(false);
  const [bodyInView, setBodyInView] = useState(false);
  const isClosed = job.status === "Closed";
  const recentOpenings = useMemo(
    () => getRecentJobOpenings(job.slug, 3),
    [job.slug]
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
              <dd className={styles.factValue}>
                <GraduationCap size={15} strokeWidth={1.5} aria-hidden />
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
          <div className={styles.applyBannerLead}>
            <h3 className={styles.applyTitle}>
              {isClosed ? (
                "Applications closed"
              ) : (
                <>
                  Build what&apos;s next,
                  <br />
                  <span className={styles.applyTitleAccent}>with us.</span>
                </>
              )}
            </h3>
          </div>

          <div className={styles.applyBannerDivider} aria-hidden />

          <div className={styles.applyBannerActions}>
            <div className={styles.applyActionsPanel}>
              <div className={styles.applyActionsHeader}>
                <p className={styles.applyActionsEyebrow}>Applying for</p>
                <p className={styles.applyRoleTitle}>{job.title}</p>
              </div>
              <div className={styles.applyActionsCtas}>
                <Button
                  type="button"
                  variant="primary"
                  showIcon
                  backgroundColor="var(--blue-100)"
                  color="var(--neutral-0)"
                  disabled={isClosed}
                  className={styles.applyButton}
                >
                  {isClosed ? "Applications Closed" : "Apply"}
                </Button>
              </div>
            </div>
          </div>
        </div>

        <section
          className={styles.applyOthers}
          aria-labelledby="recent-openings-heading"
        >
          <p id="recent-openings-heading" className={styles.applyOthersEyebrow}>
            Recent openings
          </p>
          <div className={styles.applyRecentGrid}>
            {recentOpenings.map((opening) => (
              <JobCard
                key={opening.id}
                job={opening}
                onViewDetails={() =>
                  router.push(`/opportunities/${opening.slug}`)
                }
                onApply={() =>
                  router.push(`/opportunities/${opening.slug}#apply`)
                }
              />
            ))}
          </div>
          <div className={styles.applyOthersFooter}>
            <Button
              type="button"
              variant="simple"
              showIcon
              color="var(--green-100)"
              className={styles.applyListingsLink}
              onClick={() => router.push("/opportunities")}
            >
              Back to Opportunities
            </Button>
          </div>
        </section>
      </section>
    </main>
  );
}
