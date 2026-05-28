"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import styles from "./career.module.css";

const teamStats = [
  { value: "5+", label: "Disciplines" },
  { value: "40+", label: "Global markets" },
  { value: "2030", label: "Vision year" },
];

export function CareerSection() {
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
      className={`${styles.section} ${isInView ? styles.inView : ""}`.trim()}
      id="careers"
      data-navbar="negative"
      aria-labelledby="careers-heading"
    >
      <div className={styles.container}>
        {/* ────────── HEADER ROW ────────── */}
        <div className={styles.header}>
          <span className={styles.eyebrow} aria-hidden>
            Careers
          </span>
          <h2 id="careers-heading" className={styles.headline}>
            Build what&apos;s next,
            <br />
            <span className={styles.headlineAccent}>with us.</span>
          </h2>
        </div>

        {/* ────────── INTRO + STATS ROW ────────── */}
        <div className={styles.introRow}>
          <p className={styles.subtitle}>
            We&apos;re assembling a team of scientists, strategists, and
            operators who believe the next era of bio-aesthetics will be
            engineered in Indonesia — and shared with the world. If you&apos;re
            looking for work that compounds, this is where it starts.
          </p>

          <ul className={styles.stats} aria-label="Team at a glance">
            {teamStats.map((stat) => (
              <li key={stat.label} className={styles.stat}>
                <span className={styles.statValue}>{stat.value}</span>
                <span className={styles.statLabel}>{stat.label}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* ────────── FEATURE IMAGE ────────── */}
        <div className={styles.mediaWrap}>
          <div className={styles.media}>
            <Image
              src="/images/hero-1.webp"
              alt="Selatox team at work"
              fill
              sizes="(max-width: 1024px) 100vw, 1280px"
              className={styles.mediaImage}
              priority={false}
            />
            <div className={styles.mediaOverlay} aria-hidden />
            <div className={styles.mediaCaption}>
              <span className={styles.mediaCaptionLabel}>The Team</span>
              <p className={styles.mediaCaptionText}>
                A multidisciplinary group working across research, manufacturing,
                regulatory, and global partnerships.
              </p>
            </div>
          </div>
        </div>

        {/* ────────── CTA ────────── */}
        <div className={styles.cta}>
          <div className={styles.ctaCopy}>
            <p className={styles.ctaLead}>Ready to make your mark?</p>
            <p className={styles.ctaSupport}>
              See current openings across research, operations, and
              commercial.
            </p>
          </div>
          <div className={styles.ctaActions}>
            <Button
              variant="border"
              showIcon
              color="var(--neutral-0)"
              borderColor="var(--neutral-100)"
            >
              View Open Roles
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
