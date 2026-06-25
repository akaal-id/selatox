"use client";

import { useRef, useState, useEffect, Fragment } from "react";
import { Globe, ShieldCheck, BadgeCheck, Shield, type LucideIcon } from "lucide-react";
import { CmsImage } from "@/components/cms/cms-image";
import { RichHeadline, RichText } from "@/components/cms/rich-text";
import type { IntroContent } from "@/lib/cms/home-page-data";
import styles from "./introsection.module.css";

const STAT_ICONS: LucideIcon[] = [Globe, ShieldCheck, BadgeCheck, Shield];

type IntrosectionProps = {
  content: IntroContent;
};

export function Introsection({ content }: IntrosectionProps) {
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
      id="intro"
      className={`${styles.section} ${styles.withMedia} ${isInView ? styles.inView : ""}`.trim()}
      aria-label="Company Overview"
      data-navbar="default"
    >
      <div className={styles.container}>
        <div className={styles.content}>
          <p className={styles.eyebrow}>
            <span className={styles.eyebrowLabel}>{content.eyebrow}</span>
          </p>

          <h2 className={styles.headline}>
            <RichHeadline content={content.headline} />
          </h2>

          <div className={styles.sub}>
            <RichText html={content.sub} />
          </div>

          <div className={styles.statsBar}>
            {content.stats.map((stat, i) => {
              const Icon = STAT_ICONS[i] ?? Globe;
              return (
                <Fragment key={stat.label}>
                  <div
                    className={`${styles.statCell} ${styles[`stat_${stat.accent}`]}`}
                  >
                    <Icon className={styles.statIcon} strokeWidth={1.4} aria-hidden />
                    <div className={styles.statText}>
                      <span className={styles.statTitle}>{stat.value}</span>
                      <span className={styles.statLabel}>{stat.label}</span>
                    </div>
                  </div>
                  {i < content.stats.length - 1 && (
                    <span className={styles.statDivider} aria-hidden />
                  )}
                </Fragment>
              );
            })}
          </div>
        </div>

        <div className={styles.media}>
          <CmsImage
            src={content.imageSrc}
            alt={content.imageAlt}
            width={1024}
            height={1024}
            sizes="(max-width: 1200px) 100vw, 42vw"
            className={styles.mediaImage}
          />
        </div>
      </div>
    </section>
  );
}
