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
      className={`${styles.section} ${styles.alignStart} ${isInView ? styles.inView : ""}`.trim()}
      aria-label="Career journey overview"
      data-navbar="default"
    >
      <div className={styles.container}>
        <div className={styles.content}>
          <p className={styles.eyebrow}>
            <span className={styles.eyebrowLabel}>{careerJourneyIntro.eyebrow}</span>
          </p>

          <h2 className={styles.headline}>
            {careerJourneyIntro.headlineLead}
            <br />
            <span className={styles.headlineAccent}>
              {careerJourneyIntro.headlineAccent}
            </span>
          </h2>

          <p className={styles.sub}>
            Great visions become reality through the{" "}
            <em>dedication, expertise, and courage</em> of individuals. Join
            exceptional colleagues, take ownership without limits, and experience
            the excitement of growing alongside a company shaping the future of
            bio-aesthetics. Selatox is a biopharmaceutical company that covers
            the{" "}
            <em>
              entire value chain — from research and development, to GMP
              manufacturing, to global commercialization
            </em>
            . Here, your work is never isolated: every experiment, batch, and
            partnership moves us closer to delivering{" "}
            <em>trusted aesthetic solutions to the world</em>.
          </p>
        </div>
      </div>
    </section>
  );
}
