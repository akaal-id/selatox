"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/Button";
import styles from "./business.module.css";

const ease: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

export function Business() {
  const router = useRouter();
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });

  return (
    <section
      ref={containerRef}
      id="our-business"
      className={styles.section}
      aria-labelledby="our-business-heading"
      data-navbar="negative"
    >
      <div className={styles.background} aria-hidden>
        <div className={styles.backgroundInner}>
          <Image
            src="/images/hero-4.webp"
            alt=""
            fill
            sizes="100vw"
            className={styles.backgroundImage}
          />
        </div>
      </div>

      <div className={styles.gridBackground}>
        <div className={styles.gridContainer}>
          <div className={styles.gridCols}>
            {Array.from({ length: 13 }).map((_, i) => (
              <div
                key={i}
                className={styles.gridLine}
                style={
                  i === 12 ? { gridColumn: "12 / -1" } : undefined
                }
              />
            ))}
          </div>
        </div>
      </div>

      <div className={styles.gradientOverlay} />

      <div className={styles.contentWrap}>
        <div className={styles.container}>
          <div className={styles.titleWrap}>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.08, ease: "easeOut" }}
              className={styles.eyebrow}
            >
              Our Business
            </motion.p>
            <motion.h2
              id="our-business-heading"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2, ease }}
              className={styles.headline}
            >
              Clinical Science,
              
              Built For Global Aesthetics.
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.45 }}
            className={styles.bottomBar}
          >
            <div className={styles.subWrap}>
              <motion.p
                initial={{ y: "100%" }}
                animate={isInView ? { y: "0%" } : {}}
                transition={{ duration: 1, delay: 0.35, ease }}
                className={styles.sub}
              >
                We develop precision toxin formulations and partner with leading
                clinics worldwide to bring trusted, scalable aesthetic solutions
                to every market we serve.
              </motion.p>
            </div>

            <div className={styles.ctaGroup}>
              <Button
                variant="blur"
                tone="light"
                showIcon
                onClick={() => router.push("/our-business")}
              >
                Explore Our Research
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
