"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { aboutRoadmap } from "@/constants/about";
import styles from "./roadmap.module.css";

function MilestoneItem({
  item,
  index,
  isInView,
}: {
  item: (typeof aboutRoadmap.milestones)[number];
  index: number;
  isInView: boolean;
}) {
  const itemRef = useRef<HTMLLIElement>(null);
  const itemInView = useInView(itemRef, { once: true, margin: "-15%" });
  const shouldAnimate = isInView && itemInView;

  const dotStatusClass = {
    completed: styles.dotCompleted,
    active: styles.dotActive,
    upcoming: styles.dotUpcoming,
    vision: styles.dotVision,
  }[item.status] ?? styles.dotUpcoming;

  return (
    <motion.li
      ref={itemRef}
      initial={{ opacity: 0, x: -20 }}
      animate={shouldAnimate ? { opacity: 1, x: 0 } : {}}
      transition={{
        duration: 0.7,
        delay: 0.1 + index * 0.08,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={styles.milestoneRow}
    >
      {/* Year column */}
      <div className={styles.yearCol}>
        <span className={styles.yearText}>
          {item.year}
        </span>
      </div>

      {/* Timeline line + dot */}
      <div className={styles.dotCol}>
        <div className={`${styles.dot} ${dotStatusClass}`} />
      </div>

      {/* Content */}
      <div className={styles.contentCol}>
        <p className={styles.milestoneTitle}>
          {item.title}
        </p>
        <p className={styles.milestoneDescription}>
          {item.description}
        </p>
        {item.status === "active" && (
          <span className={styles.badgeActive}>
            Current Phase
          </span>
        )}
        {item.status === "vision" && (
          <span className={styles.badgeVision}>
            Vision 2040
          </span>
        )}
      </div>
    </motion.li>
  );
}

export function Roadmap() {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLOListElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-5%" });

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 80%", "end 50%"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      ref={sectionRef}
      id="roadmap"
      className={styles.section}
      aria-labelledby="roadmap-heading"
      data-navbar="default"
    >
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.headerGrid}>
          <div className={styles.eyebrowCol}>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.08 }}
              className={styles.eyebrow}
              aria-hidden
            >
              {aboutRoadmap.eyebrow}
            </motion.p>
          </div>
          <div className={styles.titleCol}>
            <div className={styles.textWrap}>
              <motion.h2
                id="roadmap-heading"
                initial={{ y: "100%" }}
                animate={isInView ? { y: "0%" } : {}}
                transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
                className={styles.title}
              >
                {aboutRoadmap.title}
              </motion.h2>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <ol ref={timelineRef} className={styles.timelineList}>
          {/* Animated vertical progress line */}
          <div className={styles.progressLineWrap}>
            {/* Background track */}
            <div className={styles.progressTrack} />
            {/* Animated fill */}
            <motion.div style={{ height: lineHeight }} className={styles.progressFill} />
          </div>

          {aboutRoadmap.milestones.map((item, index) => (
            <MilestoneItem
              key={item.year}
              item={item}
              index={index}
              isInView={isInView}
            />
          ))}
        </ol>
      </div>
    </section>
  );
}
