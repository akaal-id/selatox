"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ethicsLeadership } from "@/constants/ethics";
import styles from "../../about/executive/executive.module.css";

type QuoteSegment =
  (typeof ethicsLeadership.quote.blocks)[number]["segments"][number];

function QuoteSegmentText({ segment }: { segment: QuoteSegment }) {
  if ("emphasis" in segment && segment.emphasis === "em") {
    return <em className={styles.quoteEm}>{segment.t}</em>;
  }
  return <>{segment.t}</>;
}

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
            {ethicsLeadership.eyebrow}
          </motion.p>

          <blockquote className={styles.blockquote}>
            {ethicsLeadership.quote.blocks.map((block, blockIndex) => (
              <p
                key={blockIndex}
                id={blockIndex === 0 ? "ethics-leadership-heading" : undefined}
                className={styles.quoteBody}
              >
                {blockIndex === 0 && (
                  <span className={styles.quoteMark} aria-hidden>
                    &ldquo;
                  </span>
                )}
                {block.segments.map((segment, segmentIndex) => (
                  <QuoteSegmentText key={segmentIndex} segment={segment} />
                ))}
              </p>
            ))}
          </blockquote>

          <motion.figcaption
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.4 }}
            className={styles.identityCol}
          >
            <span className={styles.identityRule} aria-hidden />
            <span className={styles.executiveName}>{ethicsLeadership.name}</span>
            <span className={styles.executiveTitle}>{ethicsLeadership.title}</span>
          </motion.figcaption>
        </motion.figure>
      </div>
    </section>
  );
}
