"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { RichText } from "@/components/cms/rich-text";
import type { EthicsLeadershipContent } from "@/lib/cms/public-content";
import styles from "../../about/executive/executive.module.css";

type EthicsLeadershipProps = {
  content: EthicsLeadershipContent;
};

export function EthicsLeadership({ content }: EthicsLeadershipProps) {
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
      <div className={styles.pattern} aria-hidden />

      <div className={styles.container}>
        <motion.figure
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.18, ease: [0.25, 0.46, 0.45, 0.94] }}
          className={styles.quoteLayout}
        >
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.24 }}
            className={styles.eyebrow}
          >
            {content.eyebrow}
          </motion.p>

          <blockquote className={styles.blockquote}>
            <div id="ethics-leadership-heading" className={styles.quoteBody}>
              <span className={styles.quoteMark} aria-hidden>
                &ldquo;
              </span>
              <RichText html={content.quoteHtml} className={styles.quoteRichText} />
            </div>
          </blockquote>

          <motion.figcaption
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.4 }}
            className={styles.identityCol}
          >
            <span className={styles.identityRule} aria-hidden />
            <span className={styles.executiveName}>{content.name}</span>
            <span className={styles.executiveTitle}>{content.title}</span>
          </motion.figcaption>
        </motion.figure>
      </div>
    </section>
  );
}
