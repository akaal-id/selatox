"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./facilities.module.css";

const dataPoints = [
  { label: "Total Area", value: "18,469.36m\u00B2", small: false },
  { label: "Annual Capacity", value: "6.5M vials/yr", small: false },
  { label: "Process Type", value: "Automated Aseptic", small: true },
  { label: "Location", value: "Cikarang, West Java", small: true },
];

const pillars = [
  {
    title: "Purpose-built facility",
    body: "A dedicated manufacturing building designed with clean zoning, controlled circulation, and GMP-ready operational flow from day one.",
  },
  {
    title: "High-capability infrastructure",
    body: "Equipped for sterile production, precision fill-finish, environmental monitoring, and validated quality control operations.",
  },
  {
    title: "Scalable global output",
    body: "Modular capacity planning and integrated utility systems support long-term expansion while maintaining consistent product quality.",
  },
];

export function OurBusinessFacilities() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsInView(true);
      },
      { threshold: 0.15, rootMargin: "0px 0px -5% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="ob-facilities"
      className={`${styles.section} ${isInView ? styles.inView : ""}`.trim()}
      data-navbar="default"
      aria-labelledby="ob-facilities-heading"
    >
      <div className={styles.container}>
        {/* Centered header — mirrors home manufacturing */}
        <div className={styles.intro}>
          <p className={styles.eyebrow} aria-hidden>
            {"// Facilities"}
          </p>
          <h2 id="ob-facilities-heading" className={styles.headline}>
            Cikarang Manufacturing Plant.
          </h2>
        </div>

        {/* Video block */}
        <div className={styles.media}>
          <video
            className={styles.video}
            controls
            muted
            playsInline
            preload="metadata"
            aria-label="Cikarang manufacturing facility overview"
          >
            <source src="/videos/hero-selatox.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Brutalist data grid */}
        <div className={styles.dataGrid}>
          {dataPoints.map((item) => (
            <div key={item.label} className={styles.dataCell}>
              <p className={styles.dataCellLabel}>{item.label}</p>
              <p
                className={
                  item.small ? styles.dataCellValueSmall : styles.dataCellValue
                }
              >
                {item.value}
              </p>
            </div>
          ))}

          {/* GMP Compliance accent row */}
          <div className={styles.gmpCell}>
            <p className={styles.gmpTitle}>
              Strict Global GMP Compliance
            </p>
            <span className={styles.gmpBadge}>NABOTA Quality System</span>
          </div>
        </div>

        {/* 3-column pillars — identical to manufacturing */}
        <div className={styles.pillars}>
          {pillars.map((pillar, index) => (
            <div key={pillar.title} className={styles.pillar}>
              <p className={styles.pillarNumber}>
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className={styles.pillarTitle}>{pillar.title}</h3>
              <p className={styles.pillarBody}>{pillar.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
