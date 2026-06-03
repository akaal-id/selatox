"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import styles from "./career.module.css";

export function CareerSection() {
  const router = useRouter();
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
        {/* ────────── INTRO ROW ────────── */}
        <div className={styles.introRow}>
          <div className={styles.introPrimary}>
            <span className={styles.eyebrow} aria-hidden>
              Careers
            </span>
            <h2 id="careers-heading" className={styles.headline}>
              Build what&apos;s next,
              <br />
              <span className={styles.headlineAccent}>with us.</span>
            </h2>
          </div>
          <p className={styles.subtitle}>
            We&apos;re assembling a team of scientists, strategists, and
            operators who believe the next era of bio-aesthetics will be
            engineered in Indonesia — and shared with the world. If you&apos;re
            looking for work that compounds, this is where it starts.
          </p>
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
              variant="blur"
              tone="light"
              showIcon
              onClick={() => router.push("/opportunities")}
            >
              View Open Roles
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
