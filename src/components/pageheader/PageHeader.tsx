"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import styles from "./pageheader.module.css";

export type PageHeaderProps = {
  eyebrow: string;
  title: string;
  subtitle?: string;
  lead?: string;
  backgroundImage?: string;
  backgroundAlt?: string;
  id?: string;
};

export function PageHeader({
  eyebrow,
  title,
  subtitle,
  lead,
  backgroundImage,
  backgroundAlt = "",
  id = "page-header",
}: PageHeaderProps) {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  const hasMediaBackground = Boolean(backgroundImage);
  const headlineParts = title.split("\n");

  return (
    <section
      ref={containerRef}
      id={id}
      className={styles.section}
      data-navbar="negative"
      data-background={hasMediaBackground ? "media" : "gradient"}
    >
      {backgroundImage ? (
        <div className={styles.background} aria-hidden>
          <motion.div style={{ y: imageY }} className="relative h-full w-full">
            <Image
              src={backgroundImage}
              alt={backgroundAlt}
              fill
              priority
              sizes="100vw"
              className={styles.backgroundImage}
            />
          </motion.div>
        </div>
      ) : (
        <div className={styles.gradientBackground} aria-hidden>
          <div className={styles.gradientGlow} />
        </div>
      )}

      <div className={styles.gridBackground}>
        <div className={styles.gridContainer}>
          <div className={styles.gridCols}>
            {Array.from({ length: 13 }).map((_, i) => (
              <div
                key={i}
                className={styles.gridLine}
                style={
                  i === 12
                    ? { gridColumn: "12 / -1" }
                    : undefined
                }
              />
            ))}
          </div>
        </div>
      </div>

      {hasMediaBackground ? <div className={styles.gradientOverlay} /> : null}

      <motion.div
        style={{ y: textY, opacity, scale }}
        className={styles.contentWrap}
      >
        <div className={styles.container}>
          <div className={styles.titleWrap}>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
              className={styles.eyebrow}
            >
              {eyebrow}
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              className={styles.headline}
            >
              {headlineParts.map((part, index) => (
                <span key={index}>
                  {part}
                  {index < headlineParts.length - 1 && <br />}
                </span>
              ))}
            </motion.h1>
            {lead ? (
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                className={styles.lead}
              >
                {lead}
              </motion.p>
            ) : null}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className={styles.bottomBar}
          >
            {subtitle ? (
              <div className={styles.subWrap}>
                <motion.p
                  initial={{ y: "100%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className={styles.sub}
                >
                  {subtitle}
                </motion.p>
              </div>
            ) : null}

            <span className={styles.scrollIndicator}>
              Scroll to explore ↓
            </span>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
