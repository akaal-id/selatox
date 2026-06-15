"use client";

import Image from "next/image";
import { Fragment, useRef, useLayoutEffect, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { aboutRoadmap } from "@/constants/about";
import styles from "./roadmap.module.css";

const SECTION_META = {
  history: { label: "01", title: aboutRoadmap.historyTitle },
  milestone: { label: "02", title: aboutRoadmap.milestonesTitle },
} as const;

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
  const rowStatusClass = {
    completed: styles.rowCompleted,
    active: styles.rowActive,
    upcoming: styles.rowUpcoming,
    vision: styles.rowVision,
  }[item.status] ?? styles.rowUpcoming;

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
      className={`${styles.milestoneRow} ${rowStatusClass}`}
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
        {/* Left: Image */}
        <div className={styles.imageCol}>
          <div className={styles.imageWrapper}>
            <Image
              src={item.image}
              alt={item.title}
              fill
              sizes="(max-width: 768px) 100vw, 25vw"
              className="object-cover"
            />
          </div>
        </div>

        {/* Right: flex column -> milestone title and sub */}
        <div className={styles.infoCol}>
          <div className={styles.infoTopGroup}>
            <span className={styles.mobileYear}>
              {item.year}
            </span>
            <p className={styles.milestoneTitle}>
              {item.title}
            </p>
            <div className={styles.milestoneItemsList}>
              {item.items.map((subItem, idx) => (
                <div key={idx} className={styles.milestoneItem}>
                  {"month" in subItem && subItem.month && (
                    <span className={styles.itemMonth}>
                      {subItem.month}
                    </span>
                  )}
                  <span className={styles.itemText}>
                    {subItem.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
          {item.status === "active" && (
            <span className={styles.badgeActive}>
              Current Phase
            </span>
          )}
          {item.status === "vision" && (
            <span className={styles.badgeVision}>
              Vision {item.year}
            </span>
          )}
        </div>
      </div>
    </motion.li>
  );
}

function useTimelineLinePosition(
  timelineRef: React.RefObject<HTMLOListElement | null>,
) {
  const [linePosition, setLinePosition] = useState<{
    left: number;
    top: number;
    height: number;
  } | null>(null);

  useLayoutEffect(() => {
    const update = () => {
      const list = timelineRef.current;
      if (!list) return;

      const dots = list.querySelectorAll<HTMLElement>(`.${styles.dot}`);
      if (dots.length === 0) return;

      const listRect = list.getBoundingClientRect();
      const first = dots[0].getBoundingClientRect();
      const last = dots[dots.length - 1].getBoundingClientRect();
      const firstCenterY = first.top + first.height / 2 - listRect.top;
      const lastCenterY = last.top + last.height / 2 - listRect.top;

      setLinePosition({
        left: first.left + first.width / 2 - listRect.left,
        top: firstCenterY,
        height: Math.max(0, lastCenterY - firstCenterY),
      });
    };

    update();
    const observer = new ResizeObserver(update);
    if (timelineRef.current) observer.observe(timelineRef.current);
    window.addEventListener("resize", update);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", update);
    };
  }, [timelineRef]);

  return linePosition;
}

export function Roadmap() {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLOListElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-5%" });
  const linePosition = useTimelineLinePosition(timelineRef);

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
      aria-label="Company roadmap"
      data-navbar="default"
    >
      <div className={styles.container}>
        {/* Single timeline: two labeled sections share one continuous line */}
        <ol ref={timelineRef} className={styles.timelineList}>
          {aboutRoadmap.milestones.map((item, index) => {
            const prev = aboutRoadmap.milestones[index - 1];
            const isSectionStart = !prev || prev.section !== item.section;
            const meta = SECTION_META[item.section];

            return (
              <Fragment key={item.year}>
                {isSectionStart && (
                  <li className={styles.sectionHeaderRow}>
                    <div className={styles.sectionSpacer} aria-hidden />
                    <motion.div
                      initial={{ opacity: 0, y: 16 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{
                        duration: 0.7,
                        delay: 0.1,
                        ease: [0.25, 0.46, 0.45, 0.94],
                      }}
                      className={`${styles.sectionHeaderContent} ${
                        index === 0 ? "" : styles.sectionHeaderContentSpaced
                      }`.trim()}
                    >
                      <span className={styles.sectionEyebrow}>
                        {meta.label} &mdash;{" "}
                        {item.section === "history"
                          ? "Where we started"
                          : "Where we're headed"}
                      </span>
                      <h3 className={styles.sectionHeaderTitle}>{meta.title}</h3>
                    </motion.div>
                  </li>
                )}
                <MilestoneItem item={item} index={index} isInView={isInView} />
              </Fragment>
            );
          })}

          <div
            className={`${styles.progressLineWrap} ${linePosition ? styles.progressLineReady : ""}`}
            aria-hidden
            style={
              linePosition
                ? {
                    left: linePosition.left,
                    top: linePosition.top,
                    height: linePosition.height,
                  }
                : undefined
            }
          >
            <div className={styles.progressTrack} />
            <motion.div style={{ height: lineHeight }} className={styles.progressFill} />
          </div>
        </ol>
      </div>
    </section>
  );
}
