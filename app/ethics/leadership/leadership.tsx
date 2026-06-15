"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ethicsLeadership } from "@/constants/ethics";
import styles from "../../about/executive/executive.module.css";

export function EthicsLeadership() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" });

  return (
    <section
      ref={sectionRef}
      id="ethics-leadership"
      className={styles.section}
      aria-labelledby="ethics-leadership-heading"
      data-navbar="default"
    >
      <div className={styles.container}>
        {/* <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.08 }}
          className={styles.eyebrow}
        >
          {ethicsLeadership.eyebrow}
        </motion.p> */}

        <motion.figure
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.18, ease: [0.25, 0.46, 0.45, 0.94] }}
          className={styles.quoteCol}
        >
          <span className={styles.quoteMark} aria-hidden>
            &ldquo;
          </span>
          <blockquote className={styles.blockquote}>
            <p id="ethics-leadership-heading" className={styles.quoteText}>
              {ethicsLeadership.message}
            </p>
          </blockquote>
        </motion.figure>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.38 }}
          className={styles.identityCol}
        >
          <span className={styles.executiveName}>{ethicsLeadership.name}</span>
          {/* <span className={styles.executiveTitle}>{ethicsLeadership.title}</span> */}
        </motion.div>
      </div>
    </section>
  );
}
