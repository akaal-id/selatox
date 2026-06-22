"use client";

import Image from "next/image";
import { useRef, useState, useEffect, Fragment } from "react";
import { Globe, ShieldCheck, BadgeCheck, Shield, type LucideIcon } from "lucide-react";
import styles from "./introsection.module.css";

const STATS: {
  value: string;
  label: string;
  icon: LucideIcon;
  accent: "green" | "blue";
}[] = [
  { value: "40+", label: "Partner Countries", icon: Globe, accent: "blue" },
  { value: "GMP", label: "Certified Facility", icon: ShieldCheck, accent: "green" },
  { value: "Halal", label: "Certified", icon: BadgeCheck, accent: "blue" },
  { value: "Global", label: "Safety Standards", icon: Shield, accent: "green" },
];

export function Introsection() {
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
            <span className={styles.eyebrowLabel}>
              A Foundation of Absolute Precision
            </span>
          </p>

          <h2 className={styles.headline}>
            Pioneering the Future of
            <br />
            <span className={styles.headlineAccent}>Aesthetic Bioscience</span>
          </h2>

          <p className={styles.sub}>
            We believe true aesthetic innovation begins with{" "}
            <em>uncompromising quality</em>. By combining state-of-the-art
            research with rigorous global standards, Selatox is creating a
            safer, more precise foundation for modern beauty and wellness. As{" "}
            <em>
              Indonesia&rsquo;s first specialized biopharmaceutical center
            </em>
            , we are redefining what is possible in aesthetic medicine.
          </p>

          <div className={styles.statsBar}>
            {STATS.map((stat, i) => {
              const Icon = stat.icon;
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
                  {i < STATS.length - 1 && (
                    <span className={styles.statDivider} aria-hidden />
                  )}
                </Fragment>
              );
            })}
          </div>
        </div>

        <div className={styles.media}>
          <Image
            src="/images/products/selatoxin.png"
            alt="SELATOXIN 100 Units Botulinum Toxin Type A vial"
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
