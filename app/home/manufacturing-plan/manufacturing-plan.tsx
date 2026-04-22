"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./manufacturing-plan.module.css";

const pillars = [
  {
    title: "Purpose-built facility",
    body:
      "A dedicated manufacturing building designed with clean zoning, controlled circulation, and GMP-ready operational flow.",
  },
  {
    title: "High-capability infrastructure",
    body:
      "Equipped for sterile production, precision fill-finish, environmental monitoring, and validated quality control operations.",
  },
  {
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
        <div className={styles.intro}>
          <p className={styles.eyebrow} aria-hidden>{"// Manufacturing"}</p>
          <h2 id="manufacturing-plan-heading" className={styles.headline}>
            Built as a high-capability
            {/* <br /> */}
            production hub.
          </h2>
        </div>

        <div className={styles.media}>
          <video
            className={styles.video}
            controls
            muted
            playsInline
            preload="metadata"
            aria-label="Manufacturing plan overview video"
          >
            <source src="/videos/hero-selatox.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        

        <div className={styles.pillars}>
          {pillars.map((pillar, index) => (
            <div key={pillar.title} className={styles.pillar}>
              <p className={styles.pillarNumber}>{String(index + 1).padStart(2, "0")}</p>
              <h3 className={styles.pillarTitle}>{pillar.title}</h3>
              <p className={styles.pillarBody}>{pillar.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
