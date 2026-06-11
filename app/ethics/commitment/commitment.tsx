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

const COMMITMENT_TITLES: Record<
  (typeof ethicsCommitment.commitments)[number]["id"],
  string
> = {
  honesty: "Honest Conduct",
  compliance: "Regulatory Compliance",
  prevention: "Anti-Corruption",
  protection: "Data Protection",
  diversity: "Diversity & Inclusion",
  accountability: "Accountability",
  culture: "Trust & Culture",
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
          <h2 id="ethics-commitment-heading" className={styles.eyebrow}>
            {ethicsCommitment.eyebrow}
          </h2>
        </motion.header>

        <ul className={styles.commitmentsList}>
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
                className={styles.commitmentItem}
              >
                <article className={styles.commitmentCard}>
                  <div
                    className={`${styles.iconWrap} ${
                      accent === "green" ? styles.iconGreen : styles.iconBlue
                    }`}
                    aria-hidden
                  >
                    {Icon ? <Icon strokeWidth={1.25} /> : null}
                  </div>
                  <div className={styles.cardContent}>
                    <h3 className={styles.cardTitle}>
                      {COMMITMENT_TITLES[item.id]}
                    </h3>
                    <p className={styles.cardBody}>{item.text}</p>
                  </div>
                </article>
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
      </div>
    </section>
  );
}
