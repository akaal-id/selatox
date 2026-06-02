"use client";

import { useEffect, useRef, useState } from "react";
import { cultureGtd } from "@/constants/culture";
import styles from "./gtd.module.css";

export function CultureGtd() {
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
      id="global-talent"
      className={`${styles.section} ${isInView ? styles.inView : ""}`.trim()}
      aria-labelledby="culture-gtd-heading"
      data-navbar="default"
    >
      <div className={styles.split}>
        <div className={styles.visualWrap}>
          <div className={styles.imageWrap}>
            <img
              src={cultureGtd.image}
              alt={cultureGtd.imageAlt}
              className={styles.image}
            />
          </div>
        </div>

        <div className={styles.dossier}>
          <div className={styles.dossierInner}>
            <header className={styles.dossierHeader}>
              <p className={styles.eyebrow}>{cultureGtd.eyebrow}</p>
              <h2 id="culture-gtd-heading" className={styles.headline}>
                {cultureGtd.title}
              </h2>
            </header>

            <p className={styles.lead}>{cultureGtd.lead}</p>

            <ul className={styles.highlights} aria-label="Program highlights">
              {cultureGtd.highlights.map((item) => (
                <li key={item.label} className={styles.highlightRow}>
                  <span className={styles.highlightLabel}>{item.label}</span>
                  <span className={styles.highlightValue}>{item.value}</span>
                </li>
              ))}
            </ul>

            <article
              className={styles.synergyBlock}
              aria-labelledby="culture-gtd-synergy"
            >
              <div className={styles.synergyLabelWrap}>
                <span className={styles.synergyAccent} aria-hidden />
                <h3 id="culture-gtd-synergy" className={styles.synergyTitle}>
                  {cultureGtd.synergy.label}
                </h3>
              </div>
              <p className={styles.synergyBody}>{cultureGtd.synergy.body}</p>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
