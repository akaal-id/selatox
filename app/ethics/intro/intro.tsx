"use client";

import { useEffect, useRef, useState } from "react";
import { ethicsIntro } from "@/constants/ethics";
import styles from "../../home/introsection/introsection.module.css";

export function EthicsIntro() {
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
      id="ethics-intro"
      className={`${styles.section} ${isInView ? styles.inView : ""}`.trim()}
      aria-label="Ethics introduction"
      data-navbar="default"
    >
      <div className={styles.container}>
        <p className={styles.eyebrow}>
          <span className={styles.eyebrowLabel}>{ethicsIntro.eyebrow}</span>
        </p>

        <h2 className={styles.headline}>
          As an emerging global biopharmaceutical company, we are committed to conducting
          business with{" "}
          <em className={styles.highlightGreen}>
            integrity, transparency, and accountability
          </em>
          . We believe that long-term success is built on trust, and that trust is earned
          through responsible actions, ethical decision-making, and unwavering compliance
          with the highest standards of business conduct. By fostering a culture of
          integrity, we strive to create{" "}
          <em className={styles.highlightGreen}>
            lasting value for patients, healthcare professionals, business partners,
            employees, shareholders, and society
          </em>
          .
        </h2>
      </div>
    </section>
  );
}
