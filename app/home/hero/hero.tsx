"use client";

import { useRouter } from "next/navigation";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import styles from "./hero.module.css";

export function Hero() {
  const router = useRouter();
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  return (
    <section
      ref={containerRef}
      id="hero"
      className={styles.section}
      aria-label="Welcome Hero"
      data-navbar="negative"
    >
      {/* Background Video with Parallax & Grayscale overlay */}
      <div className={styles.heroImage} aria-hidden>
        <motion.div style={{ y: imageY }} className="relative h-full w-full">
          <video
            className={styles.heroVideo}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          >
            <source src="/videos/hero-selatox.mp4" type="video/mp4" />
          </video>
        </motion.div>
      </div>

      {/* Subtle grid background */}
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

      {/* Gradient overlays */}
      <div className={styles.gradientOverlay} />

      {/* Content wrapper */}
      <motion.div
        style={{ y: textY, opacity, scale }}
        className={styles.contentWrap}
      >
        <div className={styles.container}>
          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className={styles.eyebrow}
          >
            // Welcome to Selatox
          </motion.p>

          {/* Headline */}
          <div className={styles.titleWrap}>
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              className={styles.title}
            >
              Innovation in <span className={styles.accent}>Biotech</span>  &amp; Pharmaceutical Excellence
            </motion.h1>
          </div>

          {/* Bottom Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className={styles.bottomBar}
          >
            {/* Action CTA Button replaces Est. 2022 label */}
            <button
              onClick={() => router.push("/products")}
              className={styles.ctaButton}
              type="button"
            >
              Explore Products
              <svg
                className={styles.ctaIcon}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </button>

            {/* Scroll Indicator */}
            <span className={styles.scrollIndicator}>
              Scroll to explore ↓
            </span>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
