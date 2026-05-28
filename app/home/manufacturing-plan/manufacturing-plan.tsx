"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./manufacturing-plan.module.css";

const pillars = [
  {
    meta: "Architecture",
    title: "Purpose-built facility",
    body:
      "A dedicated manufacturing building designed with clean zoning, controlled circulation, and GMP-ready operational flow.",
  },
  {
    meta: "Equipment",
    title: "High-capability infrastructure",
    body:
      "Equipped for sterile production, precision fill-finish, environmental monitoring, and validated quality control operations.",
  },
  {
    meta: "Capacity",
    title: "Scalable global output",
    body:
      "Modular capacity planning and integrated utility systems support long-term expansion while maintaining consistent product quality.",
  },
];

export function ManufacturingPlan() {
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
      id="manufacturing-plan"
      className={`${styles.section} ${isInView ? styles.inView : ""}`.trim()}
      data-navbar="default"
      aria-labelledby="manufacturing-plan-heading"
    >
      <div className={styles.container}>
        <div className={styles.media}>
          <video
            className={styles.video}
            controls
            muted
            playsInline
            preload="metadata"
            aria-label="Selatox manufacturing facility overview"
          >
            <source src="/videos/hero-selatox.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        <div className={styles.intro}>
          <p className={styles.eyebrow} aria-hidden>
            Manufacturing
          </p>
          <div className={styles.headerContainer}>
            <h2 id="manufacturing-plan-heading" className={styles.headline}>
              Built as a high-capability
              <br />
              production hub.
            </h2>
            <p className={styles.sub}>
              Engineered for precision and consistency, our facility integrates
              GMP-aligned workflows, sterile production capabilities, and a
              modular design that scales with global demand.
            </p>
          </div>
        </div>

        <ul className={styles.pillars}>
          {pillars.map((pillar, index) => (
            <li key={pillar.title} className={styles.pillar}>
              <div className={styles.pillarHead}>
                {/* <span className={styles.pillarNumber}>
                  {String(index + 1).padStart(2, "0")}
                </span> */}
                {/* <span className={styles.pillarRule} aria-hidden /> */}
              </div>
              <h3 className={styles.pillarTitle}>{pillar.title}</h3>
              <p className={styles.pillarBody}>{pillar.body}</p>
              <span className={styles.pillarMeta}>{pillar.meta}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
