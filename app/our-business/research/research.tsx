"use client";

import { useEffect, useRef, useState } from "react";
import {
  researchFields,
  researchFieldsPipelineColumns,
} from "@/constants/researchfields";
import styles from "./research.module.css";

export function Research() {
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
      id="research-fields"
      className={`${styles.section} ${isInView ? styles.inView : ""}`.trim()}
      aria-labelledby="research-heading"
      data-navbar="default"
    >
      <div className={styles.container}>
        <div className={styles.intro}>
          <p className={styles.eyebrow} aria-hidden>
            Research Fields
          </p>
          <div className={styles.headerContainer}>
            <h2 id="research-heading" className={styles.headline}>
              Major Research
              <br />
              Disciplines.
            </h2>
            <p className={styles.sub}>
              Our core research programs are anchored by the Halal-Toxin
              Pipeline, prioritizing stringent ingredient control and ethical
              consumption at every stage.
            </p>
          </div>
        </div>

        <div
          className={styles.tableWrap}
          role="table"
          aria-label="Research disciplines"
        >
          <div className={styles.tableHead} role="row">
            {researchFieldsPipelineColumns.map((label) => (
              <span key={label} role="columnheader">
                {label}
              </span>
            ))}
          </div>

          {researchFields.map((field) => (
            <div key={field.title} className={styles.row} role="row">
              <div className={styles.programCell} role="cell">
                <p className={styles.programTitle}>{field.title}</p>
                <p className={styles.regimen}>{field.regimen}</p>
              </div>
              <p className={styles.indication} role="cell">
                {field.description}
              </p>
              <p className={styles.phase} role="cell">
                {field.phase}
              </p>
              <div className={styles.progressCell} role="cell">
                <div className={styles.progressTrack} aria-hidden>
                  <div
                    className={styles.progressFill}
                    style={{ width: `${field.progressPercent}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
