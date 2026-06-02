"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import styles from "./quality.module.css";

const highlights = [
  "Chemical and Microbiological Release Tests",
  "Advanced Cell-Based Assays",
  "Long-term Stability Testing",
  "24/7 Environmental Monitoring",
] as const;

export function ManufacturingQuality() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-8% 0px" });

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      aria-labelledby="manufacturing-quality-heading"
      data-navbar="default"
    >
      <div className={styles.container}>
        <div className={styles.gridGuide} aria-hidden>
          {Array.from({ length: 13 }).map((_, i) => (
            <span key={i} className={styles.gridLine} />
          ))}
        </div>

        <div className={styles.layout}>
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className={styles.copy}
          >
            <p className={styles.eyebrow}>Global Quality & GMP Compliance</p>
            <h2 id="manufacturing-quality-heading" className={styles.heading}>
              Uncompromising Safety Standards
            </h2>
            <p className={styles.body}>
              Excellence is our baseline. We rigorously maintain safety,
              cleanliness, and quality across every stage of production through
              strict GMP (Good Manufacturing Practice) compliance. By integrating
              the proven technology and globally recognized quality management
              systems of NABOTA, our facility aligns with the highest
              international regulatory benchmarks.
            </p>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0, y: 26 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.22 }}
            className={styles.points}
          >
            {highlights.map((item, index) => (
              <li key={item} className={styles.pointItem}>
                <span className={styles.pointIndex}>
                  {(index + 1).toString().padStart(2, "0")}
                </span>
                <span className={styles.pointText}>{item}</span>
              </li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}
