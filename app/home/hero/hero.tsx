"use client";

import { useRouter } from "next/navigation";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import styles from "@/components/pageheader/pageheader.module.css";
import navStyles from "@/components/navbar/navbar.module.css";

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
      <div className={styles.background} aria-hidden>
        <motion.div style={{ y: imageY }} className="relative h-full w-full">
          <video
            className={styles.backgroundVideo}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          >
            <source src="/videos/hero.mp4" type="video/mp4" />
          </video>
        </motion.div>
      </div>

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
              Elevating Global Beauty Through Advanced Science
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
                The New Standard in Premium Bio-Aesthetics, Developed in Indonesia for the World.
              </motion.p>
            </div>
            <div className={styles.ctaGroup}>
              <button
                type="button"
                className={`${navStyles.navButton} ${styles.heroCta}`}
                onClick={() => router.push("/products")}
              >
                <span className={navStyles.textWrapper}>
                  <span className={navStyles.textPrimary}>Explore Products</span>
                  <span className={navStyles.textSecondary} aria-hidden>
                    Explore Products
                  </span>
                </span>
                <span className={navStyles.iconWrapper}>
                  <ArrowRight size={16} className={navStyles.iconPrimary} aria-hidden />
                  <ArrowRight size={16} className={navStyles.iconSecondary} aria-hidden />
                </span>
              </button>

              <button
                type="button"
                className={`${navStyles.navButton} ${styles.heroCta}`}
                onClick={() => router.push("/about")}
              >
                <span className={navStyles.textWrapper}>
                  <span className={navStyles.textPrimary}>About Us</span>
                  <span className={navStyles.textSecondary} aria-hidden>
                    About Us
                  </span>
                </span>
                <span className={navStyles.iconWrapper}>
                  <ArrowRight size={16} className={navStyles.iconPrimary} aria-hidden />
                  <ArrowRight size={16} className={navStyles.iconSecondary} aria-hidden />
                </span>
              </button>
            </div>

            {/* <span className={styles.scrollIndicator}>
              Scroll to explore ↓
            </span> */}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
