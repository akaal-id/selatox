"use client";

import { useRef, useState, useEffect } from "react";
import { cultureIntro } from "@/constants/culture";
import styles from "../../home/introsection/introsection.module.css";

export function CultureIntro() {
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
      id="culture-intro"
      className={`${styles.section} ${isInView ? styles.inView : ""}`.trim()}
      aria-label="Culture overview"
      data-navbar="default"
    >
      <div className={styles.container}>
        <p className={styles.eyebrow}>
          <span className={styles.eyebrowLabel}>{cultureIntro.eyebrow}</span>
        </p>

        <h2 className={styles.headline}>
          Join{" "}
          <em className={styles.highlightGreen}>
            Indonesia&rsquo;s first specialized biopharmaceutical center
          </em>
          . At Selatox, we are building a culture that values
          
            autonomy, open communication, and the continuous development of
            world-class talent. Here, your work directly shapes the{" "}
          <em className={styles.highlightGreen}>
            future of global beauty and wellness
          </em>
          .
        </h2>
      </div>
    </section>
  );
}
