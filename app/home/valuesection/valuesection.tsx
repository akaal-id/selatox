"use client";

import { useRef, useState, useEffect } from "react";
import styles from "./valuesection.module.css";

const values = [
  {
    id: "vision",
    label: "[01] Vision",
    title: "2030 Global Leading Biopharmaceutical Company.",
    description:
      "We are committed to setting new standards in the global aesthetics market—combining scientific rigor with a clear roadmap to become the reference for quality, innovation, and trust.",
    image: "/images/hero-1.webp",
  },
  {
    id: "mission",
    label: "[02] Mission",
    title: "World-Class Production.",
    description:
      "Excellence in toxin production and global distribution sits at the heart of our operations. We invest in state-of-the-art facilities and processes to deliver pharmaceutical-grade solutions that meet the highest international standards.",
    image: "/images/hero-3.webp",
  },
  {
    id: "core-value",
    label: "[03] Core Value",
    title: "Uncompromising Justice.",
    description:
      "Never taking an unrighteous path, ensuring clinical safety, transparency, and trust in every vial we produce.",
    image: "/images/intro.webp",
  },
];

export function Valuesection() {
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
      id="valuesection"
      className={`${styles.section} ${isInView ? styles.inView : ""}`.trim()}
      aria-labelledby="values-heading"
      data-navbar="default"
    >
      <div className={styles.container}>
        {/* Top: section heading + tagline */}
        <div className={styles.topBlock}>
          <p className={styles.eyebrow} aria-hidden>
            {"// Why Selatox"}
          </p>
          <h2 id="values-heading" className={styles.headline}>
            Driven by Justice.
            <br />
            Defined by Excellence.
          </h2>
        </div>

        {/* Bottom: card grid */}
        <div className={styles.cardGrid}>
          {values.map((item, index) => (
            <article
              key={item.id}
              className={styles.valueCard}
              style={{ ["--delay" as string]: `${0.25 + index * 0.15}s` }}
            >
              <div className={styles.cardImageWrap}>
                <img
                  src={item.image}
                  alt=""
                  className={styles.cardImage}
                />
              </div>
              <div className={styles.cardContent}>
                <p className={styles.valueLabel} aria-hidden>{item.label}</p>
                <h3 className={styles.valueTitle}>{item.title}</h3>
                <p className={styles.valueDescription}>{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
