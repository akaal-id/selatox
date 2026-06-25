"use client";

import { useEffect, useRef, useState } from "react";
import type { OurBusinessManufacturingSectionContent } from "@/lib/cms/public-content";
import styles from "./manufacturing.module.css";

export function Manufacturing({
  content,
}: {
  content: OurBusinessManufacturingSectionContent;
}) {
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

  const catchphraseParts = content.catchphrase.split("\n");

  return (
    <section
      ref={sectionRef}
      id="manufacturing"
      className={`${styles.section} ${isInView ? styles.inView : ""}`.trim()}
      data-navbar="default"
      aria-labelledby="manufacturing-heading"
    >
      <div className={styles.container}>
        <div className={styles.lead}>
          <div className={styles.leadHero}>
            <p className={styles.leadEyebrow}>
              <span className={styles.leadEyebrowLabel}>
                Development and Manufacturing
              </span>
            </p>
            <h2 id="manufacturing-heading" className={styles.leadHeadline}>
              {content.headline}
            </h2>
          </div>

          <div className={styles.leadBand}>
            <div className={styles.leadDescription}>
              <p>{content.subParagraphs[0]}</p>
              <p>{content.subParagraphs[1]}</p>
            </div>

            <div className={styles.leadFocus} aria-label="Key focus areas">
              <p className={styles.focusLabel}>Key Focus</p>
              <ul className={styles.focusTags}>
                {content.focusAreas.map((item) => (
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
            <source src={content.video} type="video/mp4" />
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
          {content.pillars.map((pillar, i) => (
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
