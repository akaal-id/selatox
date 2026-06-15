"use client";

import { useRef, useState, useEffect } from "react";
import styles from "../../home/introsection/introsection.module.css";

export function BrandIntro() {
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
      id="brand-intro"
      className={`${styles.section} ${isInView ? styles.inView : ""}`.trim()}
      aria-label="Brand introduction"
      data-navbar="default"
    >
      <div className={styles.container}>
        <p className={styles.eyebrow}>
          <span className={styles.eyebrowLabel}>Rooted in Purpose, Built for Precision</span>
        </p>

        <h2 className={styles.headline}>
          Established in September 2022, PT. Selatox Bio Pharma is Indonesia&rsquo;s first specialized
          botulinum toxin manufacturer and research center. By uniting research in Depok with GMP
          manufacturing in Cikarang, we uphold{" "}
          <em className={styles.highlightGreen}>uncompromising purity and transparency</em> at every
          stage. Our Halal-certified solutions are trusted by partners in{" "}
          <em className={styles.highlightGreen}>more than 40 countries worldwide</em>.
        </h2>
      </div>
    </section>
  );
}
