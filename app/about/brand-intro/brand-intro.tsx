"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { aboutBrandIntro } from "@/constants/about";
import styles from "./brand-intro.module.css";

export function BrandIntro() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" });

  return (
    <section
      ref={sectionRef}
      id="brand-intro"
      className={styles.section}
      aria-label="Brand introduction"
      data-navbar="default"
    >
      {/* Visible grid overlay */}
      <div className="gridOverlay">
        <div className={styles.overlayContainer}>
          <div className={styles.grid12}>
            {Array.from({ length: 13 }).map((_, i) => (
              <div
                key={i}
                className={styles.gridLine}
                style={{
                  gridColumn: i === 12 ? "12 / -1" : undefined,
                  borderRight: i === 12 ? "1px solid rgb(244 244 245)" : undefined,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.textWrap}>
            <motion.p
              initial={{ y: "100%", opacity: 0 }}
              animate={isInView ? { y: "0%", opacity: 1 } : {}}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              className={styles.paragraph}
            >
              {aboutBrandIntro.paragraph}
            </motion.p>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.6, ease: "easeOut" }}
            className={styles.supportingText}
          >
            {aboutBrandIntro.supportingText}
          </motion.p>
        </div>
      </div>
    </section>
  );
}
