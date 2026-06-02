"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
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

export function Partners() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" });
  const router = useRouter();

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
        <header className={styles.header}>
          <motion.h2
            id="partners-heading"
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.9,
              delay: 0.1,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className={styles.title}
          >
            Strategic Partnerships.
          </motion.h2>
        </header>

        <div className={styles.logoGrid} aria-label="Partner organizations">
          {partnerLogos.map((partner, index) => (
            <motion.div
              key={partner.src}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.28 + index * 0.08 }}
              className={styles.logoCard}
            >
              <Image
                src={partner.src}
                alt={partner.name}
                width={220}
                height={72}
                className={styles.partnerLogo}
              />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.8 }}
          className={styles.ctaWrap}
        >
          <p className={styles.ctaText}>
            Interested in joining our partnership ecosystem?
          </p>
          <Button
            variant="border"
            size="md"
            showIcon
            color="var(--blue-100)"
            iconColor="var(--blue-100)"
            borderColor="var(--blue-100)"
            backgroundColor="transparent"
            onClick={() => router.push("/about#contact")}
          >
            Join Partnership
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
