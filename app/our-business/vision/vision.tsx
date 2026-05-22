"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import styles from "./vision.module.css";

const ease: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

const dataPoints = [
  { label: "Location", value: "Depok, West Java" },
  { label: "Function", value: "BTX Research" },
  { label: "Pipeline", value: "Halal-Toxin" },
  { label: "Partners", value: "UI STP / Daewoong" },
];

export function Vision() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" });

  return (
    <section
      ref={sectionRef}
      id="rd-vision"
      className={styles.section}
      aria-labelledby="rd-vision-heading"
      data-navbar="default"
    >
      {/* Visible 12-column grid overlay */}
      <div className={styles.gridOverlay}>
        <div className={styles.overlayContainer}>
          <div className={styles.grid12}>
            {Array.from({ length: 13 }).map((_, i) => (
              <div
                key={i}
                className={styles.gridLine}
                style={{
                  gridColumn: i === 12 ? "12 / -1" : undefined,
                  borderRight:
                    i === 12 ? "1px solid rgb(229 229 229)" : undefined,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <div className={styles.container}>
        {/* Section header */}
        <div className={styles.headerGrid}>
          <div className={styles.eyebrowCol}>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.08, ease: "easeOut" }}
              className={styles.eyebrow}
            >
              {"// R\u0026D Vision"}
            </motion.p>
          </div>
          <div className={styles.titleCol}>
            <div className={styles.textWrap}>
              <motion.h2
                id="rd-vision-heading"
                initial={{ y: "100%" }}
                animate={isInView ? { y: "0%" } : {}}
                transition={{ duration: 0.9, delay: 0.15, ease }}
                className={styles.title}
              >
                {"Depok R\u0026D Center \u2014"}
                <br />
                Where Innovation Begins.
              </motion.h2>
            </div>
          </div>
        </div>

        {/* Narrative block */}
        <div className={styles.narrativeGrid}>
          <div className={styles.narrativeLabel}>
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className={styles.labelText}
            >
              Our Purpose
            </motion.p>
          </div>

          <div className={styles.narrativeContent}>
            <div className={styles.textWrap}>
              <motion.p
                initial={{ y: "100%", opacity: 0 }}
                animate={isInView ? { y: "0%", opacity: 1 } : {}}
                transition={{ duration: 0.9, delay: 0.25, ease }}
                className={styles.paragraph}
              >
                {
                  "Indonesia\u2019s first dedicated Botulinum neurotoxin research facility \u2014 pioneering localized innovation to develop a world-class global pipeline engineered for absolute precision, safety, and scale."
                }
              </motion.p>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.55, ease: "easeOut" }}
              className={styles.supportingText}
            >
              Serving as the birthplace of our proprietary Halal-Toxin pipeline,
              the Depok R&D Center drives core scientific advancements through
              strategic research collaborations and an unwavering commitment to
              ethical, globally compliant biopharmaceutical development.
            </motion.p>
          </div>
        </div>

        {/* Data strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.7 }}
          className={styles.dataStrip}
        >
          {dataPoints.map((item) => (
            <div key={item.label} className={styles.dataItem}>
              <p className={styles.dataLabel}>{item.label}</p>
              <p className={styles.dataValue}>{item.value}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
