"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { aboutExecutive } from "@/constants/about";
import styles from "./executive.module.css";

export function ExecutiveSection() {
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
      id="executive"
      className={styles.section}
      aria-labelledby="executive-heading"
      data-navbar="negative"
    >
      <div className={styles.container}>
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.08 }}
          className={styles.eyebrow}
          aria-hidden
        >
          {aboutExecutive.eyebrow}
        </motion.p>

        {/* Split layout */}
        <div className={styles.splitLayout}>
          {/* Portrait — left side */}
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
                  src={aboutExecutive.portrait}
                  alt={aboutExecutive.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover grayscale"
                />
              </motion.div>

              {/* Overlay label */}
              <div className={styles.imageLabelWrap}>
                <p className={styles.imageLabel}>
                  Chief Executive Officer
                </p>
              </div>
            </motion.div>
          </div>

          {/* Divider line */}
          <div className={styles.dividerCol}>
            <motion.div
              initial={{ scaleY: 0 }}
              animate={isInView ? { scaleY: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className={styles.dividerLine}
            />
          </div>

          {/* Quote — right side */}
          <div className={styles.quoteCol}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {/* Giant quote mark */}
              <span className={styles.quoteMark} aria-hidden>
                &ldquo;
              </span>

              <blockquote className={styles.blockquote}>
                <p className={styles.quoteText}>
                  {aboutExecutive.message}
                </p>
              </blockquote>

              <div className={styles.quoteFooter}>
                <h2 id="executive-heading" className={styles.executiveName}>
                  {aboutExecutive.name}
                </h2>
                <p className={styles.executiveTitle}>
                  {aboutExecutive.title}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
