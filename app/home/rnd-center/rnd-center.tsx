"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./rnd-center.module.css";

const programs = [
  {
    title: "Lorem Ipsum Program",
    regimen: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    indication: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    phase: "Lorem 2",
    progressClass: styles.progress82,
  },
  {
    title: "Dolor Sit Program",
    regimen: "Sed do eiusmod tempor incididunt ut labore et dolore",
    indication: "Ut enim ad minim veniam, quis nostrud exercitation",
    phase: "Lorem 1",
    progressClass: styles.progress56,
  },
  {
    title: "Amet Consectetur Program",
    regimen: "Duis aute irure dolor in reprehenderit in voluptate",
    indication: "Excepteur sint occaecat cupidatat non proident",
    phase: "Lorem 2",
    progressClass: styles.progress80,
  },
  {
    title: "Adipiscing Elit Program",
    regimen: "Sunt in culpa qui officia deserunt mollit anim",
    indication: "Lorem ipsum dolor sit amet, sed do eiusmod tempor",
    phase: "Lorem 1",
    progressClass: styles.progress54,
  },
];

export function RndCenter() {
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
      id="rnd-center"
      className={`${styles.section} ${isInView ? styles.inView : ""}`.trim()}
      data-navbar="default"
      aria-labelledby="rnd-center-heading"
    >
      <div className={styles.container}>
        <div className={styles.intro}>
          <p className={styles.eyebrow} aria-hidden>{"// R&D Center"}</p>
          <h2 id="rnd-center-heading" className={styles.headline}>
            Advancing our
            <br />
            clinical pipeline.
          </h2>
        </div>

        <div className={styles.tableWrap} role="table" aria-label="RND pipeline">
          <div className={styles.tableHead} role="row">
            <span role="columnheader">Lorem</span>
            <span role="columnheader">Ipsum</span>
            <span role="columnheader">Dolor</span>
            <span role="columnheader">Sit</span>
          </div>

          {programs.map((program) => (
            <div key={program.title} className={styles.row} role="row">
              <div className={styles.programCell} role="cell">
                <p className={styles.programTitle}>{program.title}</p>
                <p className={styles.regimen}>{program.regimen}</p>
              </div>
              <p className={styles.indication} role="cell">{program.indication}</p>
              <p className={styles.phase} role="cell">{program.phase}</p>
              <div className={styles.progressCell} role="cell">
                <div className={styles.progressTrack} aria-hidden>
                  <div className={`${styles.progressFill} ${program.progressClass}`} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
