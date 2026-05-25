"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import styles from "./career.module.css";

const careerData = [
  {
    title: "Digital Marketing Specialist",
    location: "Jakarta, ID",
    type: "Full-Time",
    department: "Marketing & Strategy"
  },
  {
    title: "HR & Talent Acquisition Manager",
    location: "Jakarta, ID",
    type: "Full-Time",
    department: "Human Resources"
  },
  {
    title: "Senior Clinical Researcher",
    location: "Global / Remote",
    type: "Full-Time",
    department: "Research & Development"
  },
];

export function CareerSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);

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
      className={`${styles.section} ${isInView ? styles.inView : ""}`.trim()}
      id="careers"
      data-navbar="default"
    >
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.titleArea}>
            <span className={styles.eyebrow} aria-hidden>Careers</span>
            <h2 className={styles.title}>Join Teams Building Global Impact.</h2>
            <p className={styles.subtitle}>
              Explore open opportunities across research, strategy, and
              operations as we scale the next generation of aesthetic medicine.
            </p>
          </div>
          <div className={styles.actionArea}>
            <Button variant="simple" showIcon={true} color="var(--neutral-140)">
              View All Roles
            </Button>
          </div>
        </div>
        <div className={styles.grid}>
          {careerData.map((job, index) => (
            <article key={index} className={styles.jobCard}>
              <p className={styles.jobMeta}>
                <span>{job.location}</span>
                <span>{job.type}</span>
              </p>
              <h3>{job.title}</h3>
              <p>{job.department}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
