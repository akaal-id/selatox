"use client";

import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import styles from "./business.module.css";

export function Business() {
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
      className={`${styles.section} ${isInView ? styles.inView : ""}`}
      id="our-business"
    >
      <div className={styles.mediaContainer}>
        <img
          src="/images/hero-1.png"
          alt="Our Business Overview"
          className={styles.mediaImage}
        />
      </div>

      <div className={styles.textGrid}>
        <div className={styles.titleColumn}>
          <span className={styles.eyebrow}>Our Business</span>
          <h2 className={styles.headline}>
            Pioneering Research. Strategic Global Partnerships.
          </h2>
        </div>
        <div className={styles.descColumn}>
          <p className={styles.subtitle}>
            Developing high-purity aesthetic formulations through advanced
            biotechnology, and collaborating with top-tier international clinics
            to deliver clinical excellence across borders.
          </p>
          <Button
            variant="simple"
            showIcon={true}
            color="var(--neutral-140)"
            className={styles.cta}
          >
            Explore Our Research
          </Button>
        </div>
      </div>
    </section>
  );
}
