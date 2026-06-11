"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { ethicsLeadership } from "@/constants/ethics";
import styles from "../../about/executive/executive.module.css";

export function EthicsLeadership() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" });

  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section
      ref={sectionRef}
      id="ethics-leadership"
      className={styles.section}
      aria-labelledby="ethics-leadership-heading"
      data-navbar="default"
    >
      <div className={styles.container}>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.08 }}
          className={styles.eyebrow}
          aria-hidden
        >
          {ethicsLeadership.eyebrow}
        </motion.p>

        <div className={styles.splitLayout}>
          <div className={styles.portraitCol}>
            <motion.div
              ref={imageRef}
              initial={{ opacity: 0, scale: 1.02 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1, delay: 0.2 }}
              className={styles.imageWrapper}
            >
              <motion.div style={{ y: imageY }} className={styles.parallaxImage}>
                <Image
                  src={ethicsLeadership.portrait}
                  alt={ethicsLeadership.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover grayscale"
                />
              </motion.div>

              <div className={styles.imageLabelWrap}>
                <p className={styles.imageLabel}>{ethicsLeadership.heading}</p>
              </div>
            </motion.div>
          </div>

          <div className={styles.dividerCol}>
            <motion.div
              initial={{ scaleY: 0 }}
              animate={isInView ? { scaleY: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className={styles.dividerLine}
            />
          </div>

          <div className={styles.quoteCol}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.9,
                delay: 0.35,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              <span className={styles.quoteMark} aria-hidden>
                &ldquo;
              </span>

              <blockquote className={styles.blockquote}>
                <p className={styles.quoteText}>{ethicsLeadership.message}</p>
              </blockquote>

              <div className={styles.quoteFooter}>
                <h2 id="ethics-leadership-heading" className={styles.executiveName}>
                  {ethicsLeadership.name}
                </h2>
                <p className={styles.executiveTitle}>{ethicsLeadership.title}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
