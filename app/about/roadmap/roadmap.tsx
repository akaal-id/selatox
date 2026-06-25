"use client";

import { Fragment, useRef, useLayoutEffect, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import type { AboutRoadmapContent, RoadmapMilestone } from "@/lib/cms/public-content";
import styles from "./roadmap.module.css";

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

function isRoadmapVectorImage(src: string) {
  return /\.png(?:\?.*)?$/i.test(src);
}

function sectionMeta(content: AboutRoadmapContent) {
  return {
    history: { label: "01", title: content.historyTitle },
    milestone: { label: "02", title: content.milestonesTitle },
  } as const;
}

function SectionHeader({
  label,
  title,
  spaced,
}: {
  label: string;
  title: string;
  spaced: boolean;
}) {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { margin: "-12%" });

  return (
    <li className={styles.sectionHeaderRow}>
      <motion.div
        ref={headerRef}
        initial={{ opacity: 0, y: 16 }}
        animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
        transition={{ duration: 0.7, delay: headerInView ? 0.1 : 0, ease: EASE }}
        className={`${styles.sectionHeaderContent} ${
          spaced ? styles.sectionHeaderContentSpaced : ""
        }`.trim()}
      >
        <span className={styles.sectionEyebrow}>{label}</span>
        <h3 className={styles.sectionHeaderTitle}>{title}</h3>
      </motion.div>
    </li>
  );
}

function MilestoneItem({
  item,
  index,
}: {
  item: RoadmapMilestone;
  index: number;
}) {
  const itemRef = useRef<HTMLLIElement>(null);
  const itemInView = useInView(itemRef, { margin: "-12%" });

  // Row 1 (index 0): image right / info left, then alternate.
  const imageRight = index % 2 === 0;

  const { scrollYProgress } = useScroll({
    target: itemRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-7%", "7%"]);
  const isVectorImage = isRoadmapVectorImage(item.image);

  const dotStatusClass =
    {
      completed: styles.dotCompleted,
      active: styles.dotActive,
      upcoming: styles.dotUpcoming,
      vision: styles.dotVision,
    }[item.status] ?? styles.dotUpcoming;
  const rowStatusClass =
    {
      completed: styles.rowCompleted,
      active: styles.rowActive,
      upcoming: styles.rowUpcoming,
      vision: styles.rowVision,
    }[item.status] ?? styles.rowUpcoming;

  return (
    <li
      ref={itemRef}
      className={`${styles.milestoneRow} ${
        imageRight ? styles.rowImageRight : styles.rowImageLeft
      } ${rowStatusClass}`}
    >
      {/* Info side — year + title + items */}
      <motion.div
        initial={{ opacity: 0, x: imageRight ? -44 : 44 }}
        animate={
          itemInView
            ? { opacity: 1, x: 0 }
            : { opacity: 0, x: imageRight ? -44 : 44 }
        }
        transition={{ duration: 0.8, delay: itemInView ? 0.05 : 0, ease: EASE }}
        className={styles.infoSide}
      >
        <div className={styles.infoTopGroup}>
          <span className={styles.yearText}>{item.year}</span>
          <p className={styles.milestoneTitle}>{item.title}</p>
        </div>

        <div className={styles.milestoneItemsList}>
          {item.items.map((subItem, idx) => (
            <div key={idx} className={styles.milestoneItem}>
              {"month" in subItem && subItem.month ? (
                <span className={styles.itemMonth}>{subItem.month}</span>
              ) : null}
              <span className={styles.itemText}>{subItem.text}</span>
            </div>
          ))}
        </div>

        {item.status === "active" ? (
          <span className={styles.badgeActive}>Current Phase</span>
        ) : null}
        {item.status === "vision" ? (
          <span className={styles.badgeVision}>Vision {item.year}</span>
        ) : null}
      </motion.div>

      {/* Center spine — dot sits on the continuous progress line */}
      <div className={styles.centerCol}>
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={
            itemInView
              ? { scale: 1, opacity: 1 }
              : { scale: 0, opacity: 0 }
          }
          transition={{ duration: 0.5, delay: itemInView ? 0.18 : 0, ease: EASE }}
          className={`${styles.dot} ${dotStatusClass}`}
        />
      </div>

      {/* Image side */}
      <motion.div
        initial={{ opacity: 0, x: imageRight ? 44 : -44 }}
        animate={
          itemInView
            ? { opacity: 1, x: 0 }
            : { opacity: 0, x: imageRight ? 44 : -44 }
        }
        transition={{ duration: 0.85, delay: itemInView ? 0.05 : 0, ease: EASE }}
        className={styles.imageSide}
      >
        <div className={styles.imageWrapper}>
          <motion.div className={styles.imageInner} style={{ y: imageY }}>
            {isVectorImage && item.imageBg ? (
              <img
                src={item.imageBg}
                alt=""
                className={styles.imageBg}
                aria-hidden
              />
            ) : null}
            <img
              src={item.image}
              alt={item.title}
              className={
                isVectorImage ? styles.imageVector : styles.imageFull
              }
            />
          </motion.div>
        </div>
      </motion.div>
    </li>
  );
}

function useTimelineLinePosition(
  timelineRef: React.RefObject<HTMLOListElement | null>
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

type RoadmapProps = {
  content: AboutRoadmapContent;
};

export function Roadmap({ content }: RoadmapProps) {
  const timelineRef = useRef<HTMLOListElement>(null);
  const linePosition = useTimelineLinePosition(timelineRef);
  const metaBySection = sectionMeta(content);

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 78%", "end 55%"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      id="roadmap"
      className={styles.section}
      aria-label="Company roadmap"
      data-navbar="default"
    >
      <div className={styles.container}>
        <ol ref={timelineRef} className={styles.timelineList}>
          {content.milestones.map((item, index) => {
            const prev = content.milestones[index - 1];
            const isSectionStart = !prev || prev.section !== item.section;
            const meta = metaBySection[item.section];

            return (
              <Fragment key={item.year}>
                {isSectionStart ? (
                  <SectionHeader
                    label={`${meta.label} — ${
                      item.section === "history"
                        ? "Where we started"
                        : "Where we're headed"
                    }`}
                    title={meta.title}
                    spaced={index > 0}
                  />
                ) : null}
                <MilestoneItem item={item} index={index} />
              </Fragment>
            );
          })}

          <div
            className={`${styles.progressLineWrap} ${
              linePosition ? styles.progressLineReady : ""
            }`}
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
            <motion.div
              style={{ height: lineHeight }}
              className={styles.progressFill}
            />
          </div>
        </ol>
      </div>
    </section>
  );
}
