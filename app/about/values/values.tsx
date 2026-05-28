"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Brain,
  Equal,
  HandHeart,
  Handshake,
  Scale,
  type LucideIcon,
} from "lucide-react";
import { aboutValues } from "@/constants/about";
import styles from "./values.module.css";

const EASE_OUT_EXPO = [0.25, 0.46, 0.45, 0.94] as const;

const CORE_VALUE_ICONS: Record<string, LucideIcon> = {
  justice: Scale,
  stewardship: HandHeart,
  fairness: Equal,
  "open-mind": Brain,
  "win-win": Handshake,
};

const CORE_VALUE_ACCENT: Record<string, "blue" | "green"> = {
  justice: "blue",
  stewardship: "green",
  fairness: "blue",
  "open-mind": "green",
  "win-win": "blue",
};

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
        {/* ────────── VISION / MISSION ────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: EASE_OUT_EXPO }}
          className={styles.statementGrid}
        >
          <article className={styles.statementCard}>
            <div className={styles.statementLabelWrap}>
              <span
                className={`${styles.statementAccent} ${styles.accentGreen}`}
              />
              <span
                className={`${styles.statementLabel} ${styles.statementLabelVision}`}
              >
                Vision
              </span>
            </div>
            <p className={styles.statementText}>{aboutValues.vision}</p>
          </article>

          <article className={styles.statementCard}>
            <div className={styles.statementLabelWrap}>
              <span
                className={`${styles.statementAccent} ${styles.accentBlue}`}
              />
              <span
                className={`${styles.statementLabel} ${styles.statementLabelMission}`}
              >
                Mission
              </span>
            </div>
            <p
              className={`${styles.statementText} ${styles.statementTextMission}`}
            >
              {aboutValues.mission}
            </p>
          </article>
        </motion.div>

        {/* ────────── CORE VALUES ────────── */}
        <div className={styles.principlesBlock}>
          <ul className={styles.principlesGrid}>
            <motion.li
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.38 }}
              className={`${styles.principleCard} ${styles.principlesIntroCard}`}
            >
              <p className={styles.principlesIntroLabel}>Core Values</p>
              <h3 className={styles.principlesIntroTitle}>Our Shared Principles</h3>
              <p className={styles.principlesIntroText}>
                Five commitments that guide every decision, partnership, and
                long-term move at Selatox.
              </p>
            </motion.li>

            {aboutValues.coreValues.map((value, index) => {
              const Icon = CORE_VALUE_ICONS[value.id];
              const accent = CORE_VALUE_ACCENT[value.id];

              return (
                <motion.li
                  key={value.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.65,
                    delay: 0.46 + (index + 1) * 0.08,
                    ease: EASE_OUT_EXPO,
                  }}
                  className={styles.principleCard}
                >
                  <div
                    className={`${styles.principleIconWrap} ${
                      accent === "green" ? styles.iconGreen : styles.iconBlue
                    }`}
                    aria-hidden
                  >
                    {Icon ? <Icon strokeWidth={1.25} /> : null}
                  </div>

                  <div className={styles.principleContent}>
                    <h3 className={styles.principleTitle}>{value.name}</h3>
                    <p className={styles.principleDescription}>
                      {value.description}
                    </p>
                  </div>
                </motion.li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
