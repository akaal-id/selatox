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

const PRINCIPLE_SLOTS = [
  { type: "eyebrow" as const, area: "eyebrow" },
  { type: "card" as const, area: "card1", valueIndex: 0 },
  { type: "card" as const, area: "card2", valueIndex: 1 },
  { type: "card" as const, area: "card3", valueIndex: 2 },
  { type: "card" as const, area: "card4", valueIndex: 3 },
  { type: "card" as const, area: "card5", valueIndex: 4 },
] as const;

const PRINCIPLE_AREA_CLASS: Record<
  (typeof PRINCIPLE_SLOTS)[number]["area"],
  string
> = {
  card1: styles.principleAreaCard1,
  eyebrow: styles.principleAreaEyebrow,
  card2: styles.principleAreaCard2,
  card3: styles.principleAreaCard3,
  card4: styles.principleAreaCard4,
  card5: styles.principleAreaCard5,
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
        {/* ────────── HEADER ────────── */}
        {/* <header className={styles.header}>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.08 }}
            className={styles.eyebrow}
            aria-hidden
          >
            {aboutValues.eyebrow}
          </motion.p>

          <div className={styles.titleWrap}>
            <motion.h2
              id="about-values-heading"
              initial={{ y: "100%" }}
              animate={isInView ? { y: "0%" } : {}}
              transition={{ duration: 0.9, delay: 0.15, ease: EASE_OUT_EXPO }}
              className={styles.title}
            >
              {aboutValues.title}
            </motion.h2>
          </div>
        </header> */}

        {/* ────────── VISION / MISSION BILLBOARD ────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          className={styles.statementGrid}
        >
          <article className={styles.statementCard}>
            <span className={`${styles.statementLabel} ${styles.statementLabelVision}`}>
              Vision
            </span>

            <div className={styles.statementBody}>
              <p className={styles.statementText}>
                {aboutValues.vision}
              </p>
            </div>
          </article>

          <article className={styles.statementCard}>
            <span className={`${styles.statementLabel} ${styles.statementLabelMission}`}>
              Mission
            </span>

            <div className={styles.statementBody}>
              <p className={`${styles.statementText} ${styles.statementTextMission}`}>
                {aboutValues.mission}
              </p>
            </div>
          </article>
        </motion.div>

        {/* ────────── CORE VALUES ────────── */}
        <div className={styles.principlesBlock}>
          <ul className={styles.principlesGrid}>
            {PRINCIPLE_SLOTS.map((slot) => {
              if (slot.type === "eyebrow") {
                return (
                  <motion.li
                    key="core-values-eyebrow"
                    initial={{ opacity: 0, y: 12 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, delay: 0.42 }}
                    className={`${styles.principlesEyebrowCell} ${PRINCIPLE_AREA_CLASS.eyebrow}`}
                  >
                    <span className={styles.principlesEyebrow}>Core Values</span>
                  </motion.li>
                );
              }

              const value = aboutValues.coreValues[slot.valueIndex];
              const Icon = CORE_VALUE_ICONS[value.id];
              const areaClass = PRINCIPLE_AREA_CLASS[slot.area];

              return (
                <motion.li
                  key={value.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.65,
                    delay: 0.48 + slot.valueIndex * 0.06,
                    ease: EASE_OUT_EXPO,
                  }}
                  className={`${styles.principleCard} ${areaClass}`}
                >
                  <div className={styles.principleIconWrap} aria-hidden>
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
