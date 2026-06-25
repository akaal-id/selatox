"use client";

import { useEffect, useRef, useState } from "react";
import { Building2, Factory, Layers, type LucideIcon } from "lucide-react";
import { RichHeadline, RichText } from "@/components/cms/rich-text";
import type { ManufacturingContent } from "@/lib/cms/home-page-data";
import styles from "./manufacturing-plan.module.css";

const PILLAR_ICONS: LucideIcon[] = [Building2, Factory, Layers];
const PILLAR_ACCENTS = ["green", "blue", "green"] as const;

type ManufacturingPlanProps = {
  content: ManufacturingContent;
};

export function ManufacturingPlan({ content }: ManufacturingPlanProps) {
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
            <source src={content.video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        <div className={styles.intro}>
          <p className={styles.eyebrow} aria-hidden>
            {content.eyebrow}
          </p>
          <div className={styles.headerContainer}>
            <h2 id="manufacturing-plan-heading" className={styles.headline}>
              <RichHeadline content={content.headline} />
            </h2>
            <div className={styles.sub}>
              <RichText html={content.sub} />
            </div>
          </div>
        </div>

        <ul className={styles.cardGrid}>
          {content.pillars.map((pillar, index) => {
            const Icon = PILLAR_ICONS[index];
            const accent = PILLAR_ACCENTS[index];
            return (
              <li
                key={pillar.meta}
                className={`${styles.card} ${styles[`card_${accent}`]}`}
                style={{ "--i": index } as React.CSSProperties}
              >
                <div className={styles.cardTop}>
                  <div className={styles.cardIconWrap} aria-hidden>
                    {Icon && <Icon strokeWidth={1.3} />}
                  </div>
                  <span className={styles.cardIndex}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className={styles.cardBody}>
                  <span className={styles.cardCategory}>{pillar.meta}</span>
                  <h3 className={styles.cardTitle}>
                    <RichHeadline content={pillar.title} />
                  </h3>
                  <div className={styles.cardDescription}>
                    <RichText html={pillar.body} />
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
