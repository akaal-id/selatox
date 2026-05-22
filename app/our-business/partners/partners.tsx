"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import styles from "./partners.module.css";

const partners = [
  "Universitas Indonesia (STP)",
  "Daewoong Foundation",
  "Global GMP Alliance",
  "NABOTA Quality Systems",
  "KFDA Regulatory Partners",
  "BPOM Compliance Network",
];

const highlights = [
  {
    label: "Strategic R\u0026D",
    title: "Universitas Indonesia (Science Techno Park)",
    description:
      "Collaborating with UI STP to pioneer advanced biopharmaceutical research, focusing on specialized neurotoxin formulations and driving clinical excellence within the region.",
  },
  {
    label: "Global Backbone",
    title: "Daewoong Foundation",
    description:
      "A fundamental partnership empowering our global operations with robust infrastructure, world-class GMP protocols, and extensive pharmaceutical network capabilities.",
  },
];

export function Partners() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" });

  return (
    <section
      ref={sectionRef}
      id="strategic-partners"
      className={styles.section}
      aria-labelledby="partners-heading"
      data-navbar="default"
    >
      {/* Visible 12-column grid overlay */}
      <div className="gridOverlay">
        <div className={styles.overlayContainer}>
          <div className={styles.grid12}>
            {Array.from({ length: 13 }).map((_, i) => (
              <div
                key={i}
                className={styles.gridLine}
                style={{
                  gridColumn: i === 12 ? "12 / -1" : undefined,
                  borderRight:
                    i === 12 ? "1px solid rgb(229 229 229)" : undefined,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <div className={styles.container}>
        {/* Header */}
        <div className={styles.headerGrid}>
          <div className={styles.eyebrowCol}>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.08 }}
              className={styles.eyebrow}
            >
              {"// Alliances"}
            </motion.p>
          </div>
          <div className={styles.titleCol}>
            <div className={styles.textWrap}>
              <motion.h2
                id="partners-heading"
                initial={{ y: "100%" }}
                animate={isInView ? { y: "0%" } : {}}
                transition={{
                  duration: 0.9,
                  delay: 0.15,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className={styles.title}
              >
                Strategic Partnerships.
              </motion.h2>
            </div>
          </div>
        </div>
      </div>

      {/* Infinite marquee block */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 0.3 }}
        className={styles.marqueeOuter}
      >
        <div className={styles.marqueeTrack} aria-hidden="true">
          {/* Double the array to ensure seamless infinite scrolling */}
          {[...partners, ...partners].map((partner, index) => (
            <div key={`${partner}-${index}`} className={styles.marqueeItem}>
              <span className={styles.partnerName}>{partner}</span>
              <span className={styles.marqueeDivider}>{"\u25A0"}</span>
            </div>
          ))}
        </div>
      </motion.div>

      <div className={styles.container}>
        {/* Partnership highlights */}
        <div className={styles.highlights}>
          {highlights.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.4 + index * 0.15 }}
              className={styles.highlightCard}
            >
              <p className={styles.highlightLabel}>{item.label}</p>
              <h3 className={styles.highlightTitle}>{item.title}</h3>
              <p className={styles.highlightDescription}>{item.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Call-to-action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.7 }}
          className={styles.ctaWrap}
        >
          <div className={styles.ctaContent}>
            <p className={styles.ctaText}>
              Interested in integrating our clinical pipeline or leveraging our
              Cikarang capabilities?
            </p>
            <Link href="/about#contact" className={styles.ctaButton}>
              Collaboration Inquiries
              <span className={styles.ctaArrow}>{"\u2192"}</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
