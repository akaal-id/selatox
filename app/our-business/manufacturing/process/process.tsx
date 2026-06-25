"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import type { ManufacturingPageContent } from "@/lib/cms/public-content";
import styles from "./process.module.css";

export function ManufacturingProcess({
  content,
}: {
  content: ManufacturingPageContent["process"];
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10% 0px" });

  const { scrollYProgress } = useScroll({
    target: imageWrapRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["-6%", "8%"]);

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      aria-labelledby="manufacturing-process-heading"
      data-navbar="default"
    >
      <div className={styles.container}>
        <div className={styles.gridGuide} aria-hidden>
          {Array.from({ length: 13 }).map((_, i) => (
            <span key={i} className={styles.gridLine} />
          ))}
        </div>

        <div className={styles.contentGrid}>
          <div ref={imageWrapRef} className={styles.mediaFrame}>
            <motion.div className={styles.mediaInner} style={{ y: imageY }}>
              <Image
                src={content.imageSrc}
                alt={content.imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className={styles.mediaImage}
              />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.16 }}
            className={styles.copyWrap}
          >
            <p className={styles.eyebrow}>Advanced Processing</p>
            <div className={styles.maskWrap}>
              <motion.h2
                id="manufacturing-process-heading"
                initial={{ y: "100%" }}
                animate={isInView ? { y: "0%" } : {}}
                transition={{ duration: 0.8, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
                className={styles.heading}
              >
                {content.headline}
              </motion.h2>
            </div>
            <p className={styles.body}>{content.sub}</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
