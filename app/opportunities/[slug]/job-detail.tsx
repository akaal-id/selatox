"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  Briefcase,
  Calendar,
  ChevronLeft,
  Clock,
  MapPin,
} from "lucide-react";
import type { JobDescriptionBlock, JobListing } from "@/constants/opportunities";
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

function JobDescriptionContent({ blocks }: { blocks: JobDescriptionBlock[] }) {
  return (
    <div className={styles.descriptionBody}>
      {blocks.map((block, index) => {
        if (block.type === "paragraph") {
          return (
            <p key={index} className={styles.paragraph}>
              {block.content}
            </p>
          );
        }

        if (block.type === "heading") {
          return (
            <h3 key={index} className={styles.blockHeading}>
              {block.content}
            </h3>
          );
        }

        return (
          <ul key={index} className={styles.list}>
            {block.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        );
      })}
    </div>
  );
}

function ApplyActions({
  isClosed,
  className,
}: {
  isClosed: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
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
      <Link href="/opportunities" className={styles.viewAllLink}>
        Browse all opportunities
      </Link>
    </div>
  );
}

export function JobDetail({ job }: JobDetailProps) {
  const pageRef = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);
  const isClosed = job.status === "Closed";

  useEffect(() => {
    const el = pageRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsInView(true);
      },
      { threshold: 0.08, rootMargin: "0px 0px -5% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <main
      ref={pageRef}
      className={`${styles.page} ${isInView ? styles.inView : ""}`.trim()}
      data-navbar="default"
    >
      <div className={styles.container}>
        <Link href="/opportunities" className={styles.backLink}>
          <ChevronLeft size={16} strokeWidth={1.5} aria-hidden />
          Back to Opportunities
        </Link>

        <div className={styles.layout}>
          <div className={styles.main}>
            <header className={styles.hero}>
              <div className={styles.heroTop}>
                <span className={`${styles.status} ${STATUS_CLASS[job.status]}`}>
                  {job.status}
                </span>
                <p className={styles.deadline}>
                  <Calendar size={14} strokeWidth={1.5} aria-hidden />
                  {job.applyDeadline}
                </p>
              </div>

              <h1 className={styles.title}>{job.title}</h1>

              <ul className={styles.facts}>
                <li className={styles.fact}>
                  <MapPin size={15} strokeWidth={1.5} aria-hidden />
                  <span className={styles.factLabel}>Location</span>
                  <span className={styles.factValue}>{job.location}</span>
                </li>
                <li className={styles.fact}>
                  <Briefcase size={15} strokeWidth={1.5} aria-hidden />
                  <span className={styles.factLabel}>Category</span>
                  <span className={styles.factValue}>{job.category}</span>
                </li>
                <li className={styles.fact}>
                  <Clock size={15} strokeWidth={1.5} aria-hidden />
                  <span className={styles.factLabel}>Level</span>
                  <span className={styles.factValue}>
                    {job.experienceLevel}
                  </span>
                </li>
              </ul>
            </header>

            <section
              className={styles.article}
              aria-labelledby="job-description-heading"
            >
              <div className={styles.articleHeader}>
                <p
                  id="job-description-heading"
                  className={styles.articleEyebrow}
                >
                  Role Overview
                </p>
                <h2 className={styles.articleTitle}>Job Description</h2>
              </div>
              <div className={styles.articlePanel}>
                <JobDescriptionContent blocks={job.description} />
              </div>
            </section>

            <section
              id="apply"
              className={styles.applyMobile}
              aria-label="Apply for this role"
            >
              <div className={styles.applyCard}>
                <h2 className={styles.applyTitle}>Interested in this role?</h2>
                <p className={styles.applyCopy}>
                  Join Selatox and help shape the future of bio-aesthetics in
                  Indonesia.
                </p>
                <ApplyActions isClosed={isClosed} className={styles.applyStack} />
              </div>
            </section>
          </div>

          <aside className={styles.aside} aria-label="Application summary">
            <div className={styles.sideCard}>
              <p className={styles.sideEyebrow}>At a Glance</p>
              <p className={styles.sideTitle}>{job.title}</p>

              <dl className={styles.sideMeta}>
                <div className={styles.sideRow}>
                  <dt>Status</dt>
                  <dd>
                    <span
                      className={`${styles.status} ${styles.statusCompact} ${STATUS_CLASS[job.status]}`}
                    >
                      {job.status}
                    </span>
                  </dd>
                </div>
                <div className={styles.sideRow}>
                  <dt>Location</dt>
                  <dd>{job.location}</dd>
                </div>
                <div className={styles.sideRow}>
                  <dt>Category</dt>
                  <dd>{job.category}</dd>
                </div>
                <div className={styles.sideRow}>
                  <dt>Experience</dt>
                  <dd>{job.experienceLevel}</dd>
                </div>
                <div className={styles.sideRow}>
                  <dt>Deadline</dt>
                  <dd>{job.applyDeadline}</dd>
                </div>
              </dl>

              <ApplyActions
                isClosed={isClosed}
                className={styles.applyStack}
              />
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
