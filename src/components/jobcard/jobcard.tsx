"use client";

import { Briefcase, MapPin } from "lucide-react";
import type { JobListing } from "@/constants/opportunities";
import { Button } from "@/components/ui/Button";
import styles from "./jobcard.module.css";

export type JobCardProps = {
  job: JobListing;
  onViewDetails?: () => void;
  onApply?: () => void;
};

const STATUS_CLASS: Record<JobListing["status"], string> = {
  Open: styles.statusOpen,
  "Closing Soon": styles.statusClosing,
  Closed: styles.statusClosed,
};

export function JobCard({ job, onViewDetails, onApply }: JobCardProps) {
  const isClosed = job.status === "Closed";

  return (
    <article className={styles.card}>
      <span className={`${styles.status} ${STATUS_CLASS[job.status]}`}>
        {job.status}
      </span>

      <h3 className={styles.title}>{job.title}</h3>

      <p className={styles.location}>
        <MapPin size={15} strokeWidth={1.5} aria-hidden />
        <span>{job.location}</span>
      </p>

      <p className={styles.meta}>
        <Briefcase size={15} strokeWidth={1.5} aria-hidden />
        <span className={styles.metaText}>
          <span className={styles.category}>{job.category}</span>
          <span className={styles.divider} aria-hidden>
            {" "}
            |{" "}
          </span>
          <span className={styles.experience}>
            {job.experienceLevel.toUpperCase()}
          </span>
        </span>
      </p>

      <div className={styles.footer}>
        <p className={styles.deadline}>{job.applyDeadline}</p>

        <div className={styles.actions}>
        <Button
          type="button"
          variant="border"
          borderColor="var(--neutral-60)"
          size="sm"
          className={styles.actionButton}
          onClick={onViewDetails}
        >
          View Details
        </Button>
        <Button
          type="button"
          variant="primary"
          size="sm"
          className={styles.actionButton}
          backgroundColor="var(--blue-100)"
          color="var(--neutral-0)"
          onClick={onApply}
          disabled={isClosed}
        >
          Apply
        </Button>
        </div>
      </div>
    </article>
  );
}
