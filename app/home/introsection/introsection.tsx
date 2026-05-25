"use client";

import { useRef, useState, useEffect } from "react";
import styles from "./introsection.module.css";

export function Introsection() {
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
      id="intro"
      className={`${styles.section} ${isInView ? styles.inView : ""}`.trim()}
      aria-label="Company Overview"
      data-navbar="default"
    >
      <div className={styles.container}>
        <p className={styles.eyebrow}>
          <span className={styles.eyebrowLabel}>
            A Foundation of Absolute Precision
          </span>
        </p>

        <h2 className={styles.headline}>
          We believe true aesthetic innovation begins with{" "}
          <em className={styles.highlightBlue}>uncompromising quality</em>. By
          combining state-of-the-art research with rigorous global standards,
          Selatox is creating a safer, more precise foundation for modern beauty
          and wellness. As{" "}
          <em className={styles.highlightGreen}>
            Indonesia&rsquo;s first specialized biopharmaceutical center
          </em>
          , we are redefining what is possible in aesthetic medicine.
        </h2>
      </div>
    </section>
  );
}
