"use client";

import { useEffect, useRef, useState } from "react";
import { facilities } from "@/constants/facilities";
import styles from "./manufacturing-plan.module.css";

export function ManufacturingPlan() {
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

  /* Split the headline on \n so we can insert <br /> */
  const headlineParts = facilities.headline.split("\n");

  return (
    <section
      ref={sectionRef}
      id="manufacturing-plan"
      className={`${styles.section} ${isInView ? styles.inView : ""}`.trim()}
      data-navbar="default"
      aria-labelledby="manufacturing-plan-heading"
    >
      <div className={styles.container}>
        <div className={styles.media}>
          <video
            className={styles.video}
            controls
            muted
            playsInline
            preload="metadata"
            aria-label="Selatox manufacturing facility overview"
          >
            <source src={facilities.video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        <div className={styles.intro}>
          <p className={styles.eyebrow} aria-hidden>
            {facilities.eyebrow}
          </p>
          <div className={styles.headerContainer}>
            <h2 id="manufacturing-plan-heading" className={styles.headline}>
              {headlineParts.map((part, i) => (
                <span key={i}>
                  {part}
                  {i < headlineParts.length - 1 && <br />}
                </span>
              ))}
            </h2>
            <p className={styles.sub}>
              {facilities.sub}
            </p>
          </div>
        </div>

        <ul className={styles.pillars}>
          {facilities.pillars.map((pillar) => (
            <li key={pillar.title} className={styles.pillar}>
              <div className={styles.pillarHead} />
              <h3 className={styles.pillarTitle}>{pillar.title}</h3>
              <p className={styles.pillarBody}>{pillar.body}</p>
              <span className={styles.pillarMeta}>{pillar.meta}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
