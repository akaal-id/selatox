"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  CheckCircle2,
  Eye,
  Heart,
  Lock,
  Scale,
  Shield,
  Users,
  Handshake,
  type LucideIcon,
} from "lucide-react";
import { ethicsCommitment } from "@/constants/ethics";
import styles from "./commitment.module.css";

const EASE_OUT_EXPO = [0.25, 0.46, 0.45, 0.94] as const;

const COMMITMENT_ICONS: Record<
  (typeof ethicsCommitment.commitments)[number]["id"],
  LucideIcon
> = {
  honesty: Scale,
  compliance: Shield,
  prevention: CheckCircle2,
  protection: Lock,
  diversity: Users,
  accountability: Eye,
  culture: Heart,
};

const COMMITMENT_ACCENT: Record<
  (typeof ethicsCommitment.commitments)[number]["id"],
  "blue" | "green"
> = {
  honesty: "blue",
  compliance: "green",
  prevention: "blue",
  protection: "green",
  diversity: "blue",
  accountability: "green",
  culture: "blue",
};

const VALUE_ICONS: Record<
  (typeof ethicsCommitment.values)[number]["id"],
  LucideIcon
> = {
  integrity: Scale,
  transparency: Eye,
  accountability: CheckCircle2,
  respect: Users,
  trust: Handshake,
};

const VALUE_ACCENT: Record<
  (typeof ethicsCommitment.values)[number]["id"],
  "blue" | "green"
> = {
  integrity: "blue",
  transparency: "green",
  accountability: "blue",
  respect: "green",
  trust: "blue",
};

export function EthicsCommitment() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-8%" });

  return (
    <section
      ref={sectionRef}
      id="ethics-commitment"
      className={styles.section}
      aria-labelledby="ethics-commitment-heading"
      data-navbar="default"
    >
      <div className={styles.container}>
        <motion.header
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease: EASE_OUT_EXPO }}
          className={styles.header}
        >
          <p className={styles.eyebrow}>{ethicsCommitment.eyebrow}</p>
          <h2 id="ethics-commitment-heading" className={styles.title}>
            {ethicsCommitment.intro}
          </h2>
          <p className={styles.commitmentsLabel}>
            {ethicsCommitment.commitmentsLabel}
          </p>
        </motion.header>

        <ul className={styles.commitmentsGrid}>
          {ethicsCommitment.commitments.map((item, index) => {
            const Icon = COMMITMENT_ICONS[item.id];
            const accent = COMMITMENT_ACCENT[item.id];

            return (
              <motion.li
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.65,
                  delay: 0.2 + index * 0.06,
                  ease: EASE_OUT_EXPO,
                }}
                className={styles.commitmentCard}
              >
                <div
                  className={`${styles.iconWrap} ${
                    accent === "green" ? styles.iconGreen : styles.iconBlue
                  }`}
                  aria-hidden
                >
                  {Icon ? <Icon strokeWidth={1.25} /> : null}
                </div>
                <p className={styles.commitmentText}>{item.text}</p>
              </motion.li>
            );
          })}
        </ul>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.65, ease: EASE_OUT_EXPO }}
          className={styles.closing}
        >
          {ethicsCommitment.closing}
        </motion.p>

        <div className={styles.valuesBlock}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.72, ease: EASE_OUT_EXPO }}
            className={styles.valuesHeader}
          >
            <p className={styles.valuesEyebrow}>
              {ethicsCommitment.valuesEyebrow}
            </p>
            <h3 className={styles.valuesTitle}>{ethicsCommitment.valuesTitle}</h3>
            <p className={styles.valuesIntro}>{ethicsCommitment.valuesIntro}</p>
          </motion.div>

          <ul className={styles.valuesGrid}>
            <motion.li
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.78 }}
              className={`${styles.valueCard} ${styles.valuesIntroCard}`}
            >
              <p className={styles.valuesIntroLabel}>
                {ethicsCommitment.valuesEyebrow}
              </p>
              <h4 className={styles.valuesIntroTitle}>
                {ethicsCommitment.valuesTitle}
              </h4>
              <p className={styles.valuesIntroText}>
                {ethicsCommitment.valuesIntro}
              </p>
            </motion.li>

            {ethicsCommitment.values.map((value, index) => {
              const Icon = VALUE_ICONS[value.id];
              const accent = VALUE_ACCENT[value.id];

              return (
                <motion.li
                  key={value.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.65,
                    delay: 0.84 + (index + 1) * 0.08,
                    ease: EASE_OUT_EXPO,
                  }}
                  className={styles.valueCard}
                >
                  <div
                    className={`${styles.iconWrap} ${
                      accent === "green" ? styles.iconGreen : styles.iconBlue
                    }`}
                    aria-hidden
                  >
                    {Icon ? <Icon strokeWidth={1.25} /> : null}
                  </div>
                  <div className={styles.valueContent}>
                    <h4 className={styles.valueName}>{value.name}</h4>
                    <p className={styles.valueDescription}>
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
