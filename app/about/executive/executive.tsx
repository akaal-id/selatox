"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { aboutExecutive } from "@/constants/about";
import styles from "./executive.module.css";

export function ExecutiveSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" });

  return (
    <section
      ref={sectionRef}
      id="executive"
      className={styles.section}
      aria-labelledby="executive-heading"
      data-navbar="default"
    >
      <div className={styles.container}>
        <motion.figure
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.18, ease: [0.25, 0.46, 0.45, 0.94] }}
          className={styles.quoteLayout}
        >
          <span className={styles.quoteMark} aria-hidden>
            &ldquo;
          </span>

          <div className={styles.quoteContent}>
            <blockquote className={styles.blockquote}>
              <p id="executive-heading" className={styles.quoteText}>
                {aboutExecutive.message}
              </p>
            </blockquote>

            <div className={styles.identityCol}>
              <span className={styles.executiveName}>{aboutExecutive.name}</span>
            </div>
          </div>
        </motion.figure>
      </div>
    </section>
  );
}
