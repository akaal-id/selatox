"use client";

import { useEffect, useRef, useState } from "react";
import {
  researchFields,
  rndCenterPipelineColumns,
} from "@/constants/researchfields";
import styles from "./rnd-center.module.css";

export function RndCenter() {
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
      id="rnd-center"
      className={`${styles.section} ${isInView ? styles.inView : ""}`.trim()}
      data-navbar="default"
      aria-labelledby="rnd-center-heading"
    >
      <div className={styles.container}>
        <div className={styles.intro}>
          <p className={styles.eyebrow} aria-hidden>R&D Center</p>
          <div className={styles.headerContainer}>
            <h2 id="rnd-center-heading" className={styles.headline}>
              Advancing our
              <br />
              clinical pipeline.
            </h2>
            <p className={styles.sub}>
              Core research programs across formulation, process development,
              and clinical readiness.
            </p>
          </div>
        </div>

        <div className={styles.tableWrap} role="table" aria-label="RND pipeline">
          <div className={styles.tableHead} role="row">
            {rndCenterPipelineColumns.map((label) => (
              <span key={label} role="columnheader">
                {label}
              </span>
            ))}
          </div>

          {researchFields.map((field) => (
            <div key={field.title} className={styles.row} role="row">
              <div className={styles.programCell} role="cell">
                <p className={styles.programTitle}>{field.title}</p>
              </div>
              <p className={styles.scope} role="cell">
                {field.regimen}
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
