"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import styles from "./pillars.module.css";

const PILLARS = [
  {
    number: "01",
    title: "Research & Innovation",
    body: "Our Depok R&D Center drives biotechnology discovery — from drug substance development to global clinical trials — anchoring a pipeline built on rigorous science and world-class expertise.",
  },
  {
    number: "02",
    title: "Development & Manufacturing",
    body: "A cGMP-certified facility engineered for consistency and scale. Advanced automation, ethics-guided quality evaluation, and pharmaceutical-grade controls ensure every product meets the highest global standards.",
  },
  {
    number: "03",
    title: "Global Partnerships",
    body: "We collaborate with leading institutions, distributors, and healthcare professionals across markets — bringing Indonesian biotechnology innovation to patients and partners worldwide.",
  },
] as const;

export function BusinessPillars() {
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
      id="business-pillars"
      className={`${styles.section} ${isInView ? styles.inView : ""}`.trim()}
      data-navbar="default"
      aria-labelledby="pillars-heading"
    >
      <div className={styles.container}>
        {/* ────────── INTRO ────────── */}
        <div className={styles.intro}>
          <span className={styles.eyebrow} aria-hidden>Our Business</span>
          <h2 id="pillars-heading" className={styles.headline}>
            From Discovery to Delivery
          </h2>
          <p className={styles.subheadline}>
            Every step of our value chain — from foundational research and
            ethical manufacturing to global distribution — is designed to
            deliver consistent, science-backed aesthetic solutions that
            healthcare professionals and patients can trust.
          </p>
        </div>

        {/* ────────── THREE PILLARS ────────── */}
        <ol className={styles.pillars} aria-label="Business pillars">
          {PILLARS.map((pillar, i) => (
            <li
              key={pillar.number}
              className={styles.pillar}
              style={{ transitionDelay: `${0.15 + i * 0.1}s` }}
            >
              <span className={styles.pillarNumber} aria-hidden>
                {pillar.number}
              </span>
              <div className={styles.pillarBody}>
                <h3 className={styles.pillarTitle}>{pillar.title}</h3>
                <p className={styles.pillarText}>{pillar.body}</p>
              </div>
            </li>
          ))}
        </ol>

        {/* ────────── CTA ────────── */}
        <div className={styles.cta}>
          <div className={styles.ctaCopy}>
            <p className={styles.ctaTitle}>Let&apos;s Build the Future Together</p>
            <p className={styles.ctaBody}>
              Whether you&apos;re a distributor, research partner, or healthcare
              institution — we&apos;d love to explore how we can collaborate.
            </p>
          </div>
          <Link href="mailto:contact@selatox.com" className={styles.ctaLink}>
            contact@selatox.com
            <ArrowUpRight size={18} strokeWidth={1.75} aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
