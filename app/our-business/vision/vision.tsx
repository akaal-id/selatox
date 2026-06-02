"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./vision.module.css";

export function Vision() {
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
      id="rd-vision"
      className={`${styles.section} ${isInView ? styles.inView : ""}`.trim()}
      aria-labelledby="rd-vision-heading"
      data-navbar="default"
    >
      <div className={styles.container}>
        <p className={styles.eyebrow}>
          <span className={styles.eyebrowLabel}>A Collaborative Ecosystem</span>
        </p>

        <h2 id="rd-vision-heading" className={styles.headline}>
          At Selatox,{" "}
          <em className={styles.highlightGreen}>
            true innovation is built together.
          </em>{" "}
          Our operations thrive on the synergy between pioneering research and
          strategic global partnerships. Anchored by our Depok R&amp;D Center,
          we collaborate with leading academic institutions and industry experts
          to transform advanced science, including our Halal-certified pipeline,
          <em className={styles.highlightGreen}>
            {" "}
            into world-class, premium beauty solutions
          </em>
        </h2>
      </div>
    </section>
  );
}
