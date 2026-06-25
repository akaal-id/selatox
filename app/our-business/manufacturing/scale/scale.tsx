"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { ManufacturingPageContent } from "@/lib/cms/public-content";
import styles from "./scale.module.css";

export function ManufacturingScale({
  content,
}: {
  content: ManufacturingPageContent["scale"];
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-12% 0px" });

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      aria-labelledby="manufacturing-scale-heading"
      data-navbar="default"
    >
      <div className={styles.container}>
        <div className={styles.gridGuide} aria-hidden>
          {Array.from({ length: 13 }).map((_, i) => (
            <span key={i} className={styles.gridLine} />
          ))}
        </div>

        <div className={styles.headingWrap}>
          <p className={styles.eyebrow}>Manufacturing Scale</p>
          <h2 id="manufacturing-scale-heading" className={styles.heading}>
            {content.headline}
          </h2>
        </div>

        <div className={styles.metricsGrid}>
          {content.metrics.map((metric, index) => (
            <motion.article
              key={metric.label}
              initial={{ opacity: 0, y: 28 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.14 + index * 0.1 }}
              className={styles.metricCard}
            >
              <p className={styles.metricLabel}>{metric.label}</p>
              <p className={styles.metricValue}>{metric.value}</p>
              <p className={styles.metricDetail}>{metric.detail}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
