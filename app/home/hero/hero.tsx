"use client";

import { useRouter } from "next/navigation";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { PRIMARY_PRODUCT_SLUG } from "@/constants/products";
import styles from "@/components/pageheader/pageheader.module.css";

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
      data-navbar="negative"
      data-background="media"
    >
      <div className={styles.background} aria-hidden>
        <motion.video
          style={{ y: imageY }}
          className={styles.backgroundVideo}
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </motion.video>
      </div>

      <div className={styles.gridBackground}>
        <div className={styles.gridContainer}>
          <div className={styles.gridCols}>
            {Array.from({ length: 13 }).map((_, i) => (
              <div
                key={i}
                className={styles.gridLine}
                style={i === 12 ? { gridColumn: "12 / -1" } : undefined}
              />
            ))}
          </div>
        </div>
      </div>

      <div className={styles.gradientOverlay} />

      <motion.div
        style={{ y: textY, opacity, scale }}
        className={styles.contentWrap}
      >
        <div className={styles.container}>
          <div className={styles.titleWrap}>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              className={styles.headline}
            >
              Created by Science.
              <br />
              Inspired by Beauty.
            </motion.h1>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className={styles.bottomBar}
          >
            <div className={styles.subWrap}>
              <motion.p
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                className={styles.sub}
              >
                Advancing the future of aesthetic medicine through innovative biotechnology, world-class manufacturing, and global partnerships.
              </motion.p>
            </div>
            <div className={styles.ctaGroup}>
              <Button
                variant="blur"
                tone="light"
                showIcon
                onClick={() => router.push(`/products/${PRIMARY_PRODUCT_SLUG}`)}
              >
                Explore Products
              </Button>
              <Button
                variant="blur"
                tone="light"
                showIcon
                onClick={() => router.push("/about")}
              >
                About Us
              </Button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
