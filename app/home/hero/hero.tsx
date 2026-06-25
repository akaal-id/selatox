"use client";

import { useRouter } from "next/navigation";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { RichHeadline } from "@/components/cms/rich-text";
import type { HeroContent } from "@/lib/cms/home-page-data";
import styles from "@/components/pageheader/pageheader.module.css";

type HeroProps = {
  content: HeroContent;
};

export function Hero({ content }: HeroProps) {
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
      className={`${styles.section} ${styles.homeHero}`}
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
          <source src={content.video} type="video/mp4" />
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
              <RichHeadline content={content.headline} />
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
                {content.sub}
              </motion.p>
            </div>
            <div className={styles.ctaGroup}>
              <Button
                variant="blur"
                tone="light"
                showIcon
                onClick={() => router.push(content.button1.href)}
              >
                {content.button1.label}
              </Button>
              <Button
                variant="blur"
                tone="light"
                showIcon
                onClick={() => router.push(content.button2.href)}
              >
                {content.button2.label}
              </Button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
