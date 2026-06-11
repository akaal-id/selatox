"use client";

import { useEffect, useRef, useState } from "react";
import { ethicsIntro } from "@/constants/ethics";
import styles from "./intro.module.css";

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

        {ethicsIntro.paragraphs.map((paragraph, index) => (
          <p key={index} className={styles.paragraph}>
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  );
}
