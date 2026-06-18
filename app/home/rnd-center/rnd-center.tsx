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
        <header className={styles.intro}>
          <p className={styles.eyebrow} aria-hidden>
            R&amp;D Center
          </p>
          <h2 id="rnd-center-heading" className={styles.headline}>
            Advancing our{" "}
            <em className={styles.headlineAccent}>clinical pipeline.</em>
          </h2>
          <p className={styles.sub}>
            Core research programs across formulation, process development, and
            clinical readiness.
          </p>
        </header>

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
              <p className={styles.phase} role="cell">
                {field.targetLaunch}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
