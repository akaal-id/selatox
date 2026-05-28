"use client";

import { useRef, useState, useEffect } from "react";
import styles from "./brand-intro.module.css";

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
          botulinum toxin manufacturer and research center. We were founded with a clear vision: <em className={styles.highlightGreen}>to
          elevate the standard of global aesthetics through safe, ethical, and advanced science.</em> By
          combining state-of-the-art research in Depok with world-class manufacturing in Cikarang, we
          control every step of the creation process. Our pioneering Halal-certified pipeline ensures
          that every product we make is backed by uncompromising purity and transparency. Today, Selatox is not just creating premium aesthetic solutions for Indonesia,
          <em className={styles.highlightGreen}> but building a trusted
          foundation for beauty and wellness across more than 40 countries worldwide.</em>
        </h2>
      </div>
    </section>
  );
}
