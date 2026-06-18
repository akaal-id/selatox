"use client";

import { useEffect, useRef, useState } from "react";
import { ourBusinessManufacturing } from "@/constants/our-business";
import styles from "./manufacturing.module.css";

const KEY_FOCUS = [
  "Pharmaceutical manufacturing",
  "Quality assurance",
  "Commercial production",
];

export function Manufacturing() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsInView(true);
      },
      { threshold: 0.12, rootMargin: "0px 0px -5% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const catchphraseParts = ourBusinessManufacturing.catchphrase.split("\n");

  return (
    <section
      ref={sectionRef}
      id="manufacturing"
      className={`${styles.section} ${isInView ? styles.inView : ""}`.trim()}
      data-navbar="default"
      aria-labelledby="manufacturing-heading"
    >
      <div className={styles.container}>
        {/* ────────── LEAD HEADER ────────── */}
        <div className={styles.lead}>
          <div className={styles.leadHero}>
            <p className={styles.leadEyebrow}>
              <span className={styles.leadEyebrowLabel}>
                Development and Manufacturing
              </span>
            </p>
            <h2 id="manufacturing-heading" className={styles.leadHeadline}>
              Bringing Innovation to Life
            </h2>
          </div>

          <div className={styles.leadBand}>
            <div className={styles.leadDescription}>
              <p>
                From development to commercial production, Selatox integrates
                scientific expertise with advanced GMP manufacturing capabilities
                to deliver safe, reliable, and high-quality aesthetic products.
              </p>
              <p>
                Led by SELATOXIN, our manufacturing platform is designed to meet
                the highest international standards while supporting future
                portfolio expansion.
              </p>
            </div>

            <div className={styles.leadFocus} aria-label="Key focus areas">
              <p className={styles.focusLabel}>Key Focus</p>
              <ul className={styles.focusTags}>
                {KEY_FOCUS.map((item) => (
                  <li key={item} className={styles.focusTag}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className={styles.media}>
          <video
            className={styles.video}
            controls
            muted
            playsInline
            preload="metadata"
            aria-label="Selatox manufacturing facility overview"
          >
            <source src={ourBusinessManufacturing.video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        <header className={styles.intro}>
          <h3 className={styles.headline}>
            {catchphraseParts.map((part, i) => (
              <span key={i}>
                {part}
                {i < catchphraseParts.length - 1 && <br />}
              </span>
            ))}
          </h3>
        </header>

        <ol className={styles.pillars}>
          {ourBusinessManufacturing.pillars.map((pillar, i) => (
            <li
              key={pillar.title}
              className={styles.pillar}
              style={{ transitionDelay: `${0.12 + i * 0.08}s` }}
            >
              <div className={styles.pillarIndexCol}>
                <span className={styles.pillarNumber}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className={styles.pillarRule} aria-hidden />
              </div>
              <div className={styles.pillarBodyCol}>
                <h3 className={styles.pillarTitle}>{pillar.title}</h3>
                <p className={styles.pillarBody}>{pillar.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
