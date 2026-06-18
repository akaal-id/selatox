"use client";

import { useEffect, useRef, useState } from "react";
import {
  researchFields,
  researchFieldsPipelineColumns,
} from "@/constants/researchfields";
import styles from "./research.module.css";

const KEY_FOCUS = [
  "Product and formulation development",
  "Process optimization",
  "Analytical and quality innovation",
  "Future pipeline development",
];

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
      { threshold: 0.12, rootMargin: "0px 0px -5% 0px" }
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
        <div className={styles.lead}>
          <div className={styles.leadHero}>
            <p className={styles.leadEyebrow}>
              <span className={styles.leadEyebrowLabel}>Research and Innovation</span>
            </p>
            <h2 id="research-heading" className={styles.leadHeadline}>
              Creating the Science Behind Tomorrow&apos;s Aesthetics
            </h2>
          </div>

          <div className={styles.leadBand}>
            <div className={styles.leadDescription}>
              <p>
                At Selatox, innovation begins with research. Our dedicated R&amp;D
                capabilities support the development of next-generation aesthetic
                solutions, process optimization, and future pipeline opportunities.
              </p>
              <p>
                By combining scientific expertise with practical manufacturing
                knowledge, we transform ideas into scalable and commercially
                viable solutions.
              </p>
            </div>

            <div className={styles.leadFocus} aria-label="Key focus areas">
              <p className={styles.focusLabel}>Key Focus</p>
              <ul className={styles.focusTags}>
                {KEY_FOCUS.map((item) => (
                  <li key={item} className={styles.focusTag}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
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
              <p className={styles.targetLaunch} role="cell">
                {field.targetLaunch}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
