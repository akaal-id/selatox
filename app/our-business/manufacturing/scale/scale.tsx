"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import styles from "./scale.module.css";

const metrics = [
  {
    label: "Total Facility Area",
    value: "18,469.36m²",
    detail: "Integrated cleanroom manufacturing campus in Cikarang.",
  },
  {
    label: "Annual Capacity",
    value: "6.5 Million Vials",
    detail: "Scalable production architecture for global distribution.",
  },
  {
    label: "Filling Speed",
    value: "200 Vials / Minute",
    detail: "High-speed, aseptic precision with continuous quality checks.",
  },
  {
    label: "Production Focus",
    value: "Specialized Botulinum Toxin Solutions",
    detail: "Purpose-built for pharmaceutical-grade aesthetic therapeutics.",
  },
] as const;

export function ManufacturingScale() {
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
            The Scale of Excellence
          </h2>
        </div>

        <div className={styles.metricsGrid}>
          {metrics.map((metric, index) => (
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
