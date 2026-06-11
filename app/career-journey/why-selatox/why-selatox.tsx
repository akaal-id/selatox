"use client";

import { useEffect, useRef, useState } from "react";
import { Globe2, Rocket, Sparkles, type LucideIcon } from "lucide-react";
import { whySelatox } from "@/constants/career-journey";
import styles from "./why-selatox.module.css";

const STRENGTH_ICONS: Record<(typeof whySelatox.strengths)[number]["id"], LucideIcon> = {
  "end-to-end": Globe2,
  ownership: Rocket,
  "global-standard": Sparkles,
};

export function WhySelatox() {
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
      id="why-selatox"
      className={`${styles.section} ${isInView ? styles.inView : ""}`.trim()}
      aria-labelledby="why-selatox-heading"
      data-navbar="default"
    >
      <div className={styles.container}>
        <header className={styles.header}>
          <p className={styles.eyebrow} aria-hidden>
            {whySelatox.eyebrow}
          </p>
          {/* <h2 id="why-selatox-heading" className={styles.title}>
            {whySelatox.title}
          </h2> */}
        </header>

        <ul className={styles.grid}>
          {whySelatox.strengths.map((strength, index) => {
            const Icon = STRENGTH_ICONS[strength.id];

            return (
              <li
                key={strength.id}
                className={styles.card}
                style={{ ["--delay" as string]: `${0.22 + index * 0.1}s` }}
              >
                <div className={styles.cardHead}>
                  <span className={styles.iconWrap} aria-hidden>
                    <Icon size={22} strokeWidth={1.5} />
                  </span>
                  <span className={styles.rule} aria-hidden />
                </div>
                <h3 className={styles.cardTitle}>{strength.title}</h3>
                <p className={styles.cardBody}>{strength.body}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
