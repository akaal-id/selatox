"use client";

import { useEffect, useRef, useState } from "react";
import { careerJourneyIntro } from "@/constants/career-journey";
import styles from "../../home/introsection/introsection.module.css";

export function CareerJourneyIntro() {
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
      id="career-journey-intro"
      className={`${styles.section} ${isInView ? styles.inView : ""}`.trim()}
      aria-label="Career journey overview"
      data-navbar="default"
    >
      <div className={styles.container}>
        <p className={styles.eyebrow}>
          <span className={styles.eyebrowLabel}>{careerJourneyIntro.eyebrow}</span>
        </p>

        <h2 className={styles.headline}>
          {careerJourneyIntro.headline} Selatox is a biopharmaceutical company that
          covers the{" "}
          <em className={styles.highlightGreen}>
            entire value chain — from research and development, to GMP manufacturing,
            to global commercialization
          </em>
          . Here, your work is never isolated: every experiment, batch, and
          partnership moves us closer to delivering trusted aesthetic solutions to
          the world.
        </h2>
      </div>
    </section>
  );
}
