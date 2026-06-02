"use client";

import { useEffect, useRef, useState } from "react";
import {
  MessagesSquare,
  Target,
  Users,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { culturePillars } from "@/constants/culture";
import styles from "./pillars.module.css";

const PILLAR_ICONS: Record<(typeof culturePillars)[number]["id"], LucideIcon> = {
  "result-only": Target,
  agile: Zap,
  communication: MessagesSquare,
  collaboration: Users,
};

const PILLAR_ICON_ACCENT: Record<
  (typeof culturePillars)[number]["id"],
  "blue" | "green"
> = {
  "result-only": "blue",
  agile: "green",
  communication: "blue",
  collaboration: "green",
};

export function CulturePillars() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsInView(true);
      },
      { threshold: 0.1, rootMargin: "0px 0px -5% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="culture-pillars"
      className={`${styles.section} ${isInView ? styles.inView : ""}`.trim()}
      aria-labelledby="culture-pillars-eyebrow"
      data-navbar="default"
    >
      <div className={styles.container}>
        <p id="culture-pillars-eyebrow" className={styles.eyebrow} aria-hidden>
          Culture Pillars
        </p>

        <ul className={styles.pillars}>
          {culturePillars.map((pillar, index) => {
            const Icon = PILLAR_ICONS[pillar.id];
            const accent = PILLAR_ICON_ACCENT[pillar.id];

            return (
              <li
                key={pillar.id}
                className={styles.pillar}
                style={{ ["--delay" as string]: `${0.22 + index * 0.1}s` }}
              >
                <div className={styles.pillarHead}>
                  <span
                    className={`${styles.pillarIconWrap} ${
                      accent === "green" ? styles.iconGreen : styles.iconBlue
                    }`}
                    aria-hidden
                  >
                    {Icon ? <Icon strokeWidth={1.25} /> : null}
                  </span>
                  <span className={styles.pillarRule} aria-hidden />
                </div>

                <div className={styles.pillarContent}>
                  <h3 className={styles.pillarTitle}>{pillar.title}</h3>
                  <p className={styles.pillarBody}>{pillar.body}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
