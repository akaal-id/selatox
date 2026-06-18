"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Globe,
  Target,
  Star,
  Lightbulb,
  ShieldCheck,
  Handshake,
  type LucideIcon,
} from "lucide-react";
import { aboutValues } from "@/constants/about";
import styles from "./values.module.css";

const EASE_OUT_EXPO = [0.25, 0.46, 0.45, 0.94] as const;

const CORE_VALUE_ICONS: Record<string, LucideIcon> = {
  excellence: Star,
  innovation: Lightbulb,
  integrity: ShieldCheck,
  partnership: Handshake,
};

const CORE_VALUE_ACCENT: Record<string, "blue" | "green"> = {
  excellence: "green",
  innovation: "blue",
  integrity: "green",
  partnership: "blue",
};

/** Split "Lead phrase — supporting copy" into a prominent lead + body. */
function splitStatement(text: string): { lead: string; body: string } {
  const [lead, ...rest] = text.split("—");
  return { lead: lead.trim(), body: rest.join("—").trim() };
}

const vision = splitStatement(aboutValues.vision);
const mission = splitStatement(aboutValues.mission);

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
        <div className={styles.statementGrid}>
          <motion.article
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.2, ease: EASE_OUT_EXPO }}
            className={`${styles.statementCard} ${styles.card_green}`}
          >
            <div className={styles.statementIllustration} aria-hidden>
              <Globe className={styles.statementIllustrationIcon} strokeWidth={1.25} />
            </div>
            <div className={styles.statementTop}>
              <div className={styles.statementIconWrap} aria-hidden>
                <Globe strokeWidth={1.3} />
              </div>
              <span className={styles.statementIndex}>01</span>
            </div>
            <div className={styles.statementBody}>
              <span className={styles.statementCategory}>Vision</span>
              <h3 className={styles.statementTitle}>{vision.lead}</h3>
              {vision.body ? (
                <p className={styles.statementDescription}>{vision.body}</p>
              ) : null}
            </div>
          </motion.article>

          <motion.article
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.32, ease: EASE_OUT_EXPO }}
            className={`${styles.statementCard} ${styles.card_blue}`}
          >
            <div className={styles.statementIllustration} aria-hidden>
              <Target className={styles.statementIllustrationIcon} strokeWidth={1.25} />
            </div>
            <div className={styles.statementTop}>
              <div className={styles.statementIconWrap} aria-hidden>
                <Target strokeWidth={1.3} />
              </div>
              <span className={styles.statementIndex}>02</span>
            </div>
            <div className={styles.statementBody}>
              <span className={styles.statementCategory}>Mission</span>
              <h3 className={styles.statementTitle}>{mission.lead}</h3>
              {mission.body ? (
                <p className={styles.statementDescription}>{mission.body}</p>
              ) : null}
            </div>
          </motion.article>
        </div>

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
                  className={`${styles.principleCard} ${
                    accent === "green" ? styles.cardAccentGreen : styles.cardAccentBlue
                  }`}
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
