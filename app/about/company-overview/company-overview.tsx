"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { aboutCompanyOverview } from "@/constants/about";
import styles from "./company-overview.module.css";

export function CompanyOverview() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-8%" });

  return (
    <section
      ref={sectionRef}
      id="company-overview"
      className={styles.section}
      aria-label={aboutCompanyOverview.title}
      data-navbar="default"
    >
      <div className={styles.container}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className={styles.gridWrap}
        >
          <div className={styles.eyebrowCol}>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.08 }}
              className={styles.eyebrow}
            >
              {aboutCompanyOverview.eyebrow}
            </motion.p>
          </div>

          <div className={styles.grid3}>
            {aboutCompanyOverview.items.map((item, index) => (
              <motion.article
                key={item.label}
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: 0.35 + index * 0.08,
                  ease: "easeOut",
                }}
                className={styles.card}
              >
                <p className={styles.cardLabel}>
                  {item.label}
                </p>
                <p
                  className={item.mono ? styles.cardValueMono : styles.cardValueStandard}
                >
                  {item.value}
                </p>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
