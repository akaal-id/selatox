"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { aboutValues } from "@/constants/about";
import styles from "./values.module.css";

export function AboutValues() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-8%" });

  return (
    <section
      ref={sectionRef}
      id="about-values"
      className={styles.section}
      aria-labelledby="about-values-heading"
      data-navbar="default"
    >
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.headerGrid}>
          <div className={styles.eyebrowCol}>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.08 }}
              className={styles.eyebrow}
              aria-hidden
            >
              {aboutValues.eyebrow}
            </motion.p>
          </div>
          <div className={styles.titleCol}>
            <div className={styles.textWrap}>
              <motion.h2
                id="about-values-heading"
                initial={{ y: "100%" }}
                animate={isInView ? { y: "0%" } : {}}
                transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
                className={styles.title}
              >
                {aboutValues.title}
              </motion.h2>
            </div>
          </div>
        </div>

        {/* Vision & Mission row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.25 }}
          className={styles.visionMissionRow}
        >
          <article className={styles.visionCard}>
            <p className={styles.visionLabel}>
              Vision
            </p>
            <p className={styles.visionText}>
              {aboutValues.vision}
            </p>
          </article>
          <article className={styles.missionCard}>
            <p className={styles.visionLabel}>
              Mission
            </p>
            <p className={styles.visionText}>
              {aboutValues.mission}
            </p>
          </article>
        </motion.div>

        {/* Core Values — rigid modular columns */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.35 }}
          className={styles.coreValuesRow}
        >
          <div className={styles.coreValuesGrid}>
            {aboutValues.coreValues.map((value, index) => (
              <motion.article
                key={value.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: 0.4 + index * 0.08,
                  ease: "easeOut",
                }}
                className={styles.coreValueCard}
              >
                {/* Index number */}
                <span className={styles.cardIndex}>
                  {String(index + 1).padStart(2, "0")}
                </span>

                {/* Value name */}
                <h3 className={styles.cardTitle}>
                  {value.name}
                </h3>

                {/* Description */}
                <p className={styles.cardDescription}>
                  {value.description}
                </p>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
