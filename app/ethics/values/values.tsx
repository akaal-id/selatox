"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Eye,
  HandshakeIcon,
  Scale,
  ShieldCheck,
  Users,
  type LucideIcon,
} from "lucide-react";
import { ethicsValues, ethicsValuesSection } from "@/constants/ethics";
import styles from "./values.module.css";

const EASE_OUT_EXPO = [0.25, 0.46, 0.45, 0.94] as const;

const VALUE_ICONS: Record<
  (typeof ethicsValues)[number]["id"],
  LucideIcon
> = {
  integrity: Scale,
  transparency: Eye,
  accountability: ShieldCheck,
  respect: Users,
  trust: HandshakeIcon,
};

export function EthicsValues() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-8%" });

  return (
    <section
      ref={sectionRef}
      id="ethics-values"
      className={styles.section}
      aria-labelledby="ethics-values-heading"
      data-navbar="default"
    >
      <div className={styles.container}>
        <motion.header
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease: EASE_OUT_EXPO }}
          className={styles.header}
        >
          <p className={styles.eyebrow} aria-hidden>
            {ethicsValuesSection.eyebrow}
          </p>
          <h2 id="ethics-values-heading" className={styles.title}>
            {ethicsValuesSection.title}
          </h2>
        </motion.header>

        <ul className={styles.grid}>
          {ethicsValues.map((value, index) => {
            const Icon = VALUE_ICONS[value.id];
            return (
              <motion.li
                key={value.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.65,
                  delay: 0.2 + index * 0.08,
                  ease: EASE_OUT_EXPO,
                }}
                className={styles.card}
              >
                <span className={styles.iconWrap} aria-hidden>
                  <Icon size={22} strokeWidth={1.25} />
                </span>
                <h3 className={styles.cardTitle}>{value.title}</h3>
                <p className={styles.cardBody}>{value.description}</p>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
