"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import styles from "./partners.module.css";

const partnerLogos = [
  {
    name: "Universitas Indonesia Science Techno Park",
    src: "/images/partnerships/stp_ui.png",
  },
  {
    name: "Daewoong Foundation",
    src: "/images/partnerships/daewoong.png",
  },
  {
    name: "Global GMP Alliance",
    src: "/images/partnerships/gmp.png",
  },
  {
    name: "NABOTA Quality Systems",
    src: "/images/partnerships/nabota.png",
  },
  {
    name: "KFDA Regulatory Partners",
    src: "/images/partnerships/kfda.png",
  },
  {
    name: "BPOM Compliance Network",
    src: "/images/partnerships/bpom.png",
  },
] as const;

const highlights = [
  {
    label: "Product Lineage",
    title: "NABOTA",
    description:
      "NABOTA is Daewoong Pharmaceutical\u2019s established botulinum toxin brand and the parent product behind Selatox. Our pipeline builds on this proven reference with localized innovation, Halal-certified development, and manufacturing scaled for Indonesia and export markets.",
  },
  {
    label: "Global Backbone",
    title: "Daewoong Foundation",
    description:
      "A fundamental partnership empowering our global operations with robust infrastructure, world-class GMP protocols, and extensive pharmaceutical network capabilities.",
  },
] as const;

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
        <header className={styles.headerGrid}>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.06 }}
            className={styles.eyebrow}
          >
            Alliances
          </motion.p>

          <div className={styles.headlineCol}>
            <div className={styles.headlineMask}>
              <motion.h2
                id="partners-heading"
                initial={{ y: "110%" }}
                animate={isInView ? { y: "0%" } : {}}
                transition={{
                  duration: 0.95,
                  delay: 0.14,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className={styles.headline}
              >
                Strategic{" "}
                <span className={styles.headlineAccent}>Partnerships.</span>
              </motion.h2>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 12 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.32 }}
            className={styles.headerAside}
          >
            <p className={styles.sub}>
              From NABOTA product lineage and Daewoong infrastructure to
              university research, GMP systems, and multi-market regulatory
              networks.
            </p>
          </motion.div>
        </header>
      </div>

      {/* Infinite marquee block */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 0.3 }}
        className={styles.marqueeOuter}
      >
        <div
          className={styles.marqueeTrack}
          aria-label="Partner organizations"
        >
          {[...partnerLogos, ...partnerLogos].map((partner, index) => (
            <div key={`${partner.src}-${index}`} className={styles.marqueeItem}>
              <Image
                src={partner.src}
                alt={partner.name}
                width={220}
                height={56}
                className={styles.partnerLogo}
              />
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
      </div>
    </section>
  );
}
