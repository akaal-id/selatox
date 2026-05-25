"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { aboutFacilities } from "@/constants/about";
import styles from "./facilities.module.css";

function FacilityCard({
  facility,
  index,
  isInView,
}: {
  facility: (typeof aboutFacilities.facilities)[number];
  index: number;
  isInView: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.8,
        delay: 0.2 + index * 0.15,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={styles.card}
    >
      {/* Image with parallax */}
      <div className={styles.imageWrap}>
        <motion.div style={{ y: imageY }} className={styles.parallaxImage}>
          <Image
            src={facility.image}
            alt={facility.name}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </motion.div>
        {/* Role badge */}
        <div className={styles.badgeWrap}>
          <span className={styles.badge}>
            {facility.role}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className={styles.cardContent}>
        <h3 className={styles.cardTitle}>
          {facility.name}
        </h3>
        <p className={styles.cardFocus}>
          {facility.focus}
        </p>
        <p className={styles.cardDetails}>
          {facility.details}
        </p>

        {/* Spec grid */}
        <div className={styles.specGridWrap}>
          <div className={styles.specGrid}>
            {facility.specs.map((spec) => (
              <div key={spec.label}>
                <p className={styles.specLabel}>
                  {spec.label}
                </p>
                <p className={styles.specValue}>
                  {spec.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export function Facilities() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-8%" });

  return (
    <section
      ref={sectionRef}
      id="facilities"
      className={styles.section}
      aria-labelledby="facilities-heading"
      data-navbar="default"
    >
      <div className={styles.container}>
        <div className={styles.headerGrid}>
          <div className={styles.titleCol}>
            <div className={styles.textWrap}>
              <motion.h2
                id="facilities-heading"
                initial={{ y: "100%" }}
                animate={isInView ? { y: "0%" } : {}}
                transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
                className={styles.title}
              >
                {aboutFacilities.header}
              </motion.h2>
            </div>
          </div>
        </div>

        {/* Side-by-side cards */}
        <div className={styles.cardsGrid}>
          {aboutFacilities.facilities.map((facility, index) => (
            <FacilityCard
              key={facility.id}
              facility={facility}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
