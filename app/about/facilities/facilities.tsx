"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { facilities } from "@/constants/facilities";
import styles from "./facilities.module.css";

export function Facilities() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);

  /* R&D image parallax */
  const rdImgRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: rdImgRef,
    offset: ["start end", "end start"],
  });
  const rdImageY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

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

  const headlineParts = facilities.headline.split("\n");

  return (
    <section
      ref={sectionRef}
      id="facilities"
      className={`${styles.section} ${isInView ? styles.inView : ""}`.trim()}
      data-navbar="default"
      aria-labelledby="facilities-heading"
    >
      <div className={styles.container}>
        {/* ─── 1. Intro ─── */}
        <div className={styles.intro}>
          <div className={styles.headerContainer}>
            <div className={styles.headlineContainer}>
              <p className={styles.eyebrow} aria-hidden>
                {facilities.eyebrow}
              </p>
              <h2 id="facilities-heading" className={styles.headline}>
                {headlineParts.map((part, i) => (
                  <span key={i}>
                    {part}
                    {i < headlineParts.length - 1 && <br />}
                  </span>
                ))}
              </h2>
            </div>
            <div className={styles.subContainer}>
              <p className={styles.sub}>
                {facilities.sub}
              </p>
              <p className={styles.subExtended}>
                {facilities.subExtended}
              </p>
            </div>
          </div>
        </div>

        {/* ─── 2. Video ─── */}
        <div className={styles.media}>
          <video
            className={styles.video}
            controls
            muted
            playsInline
            preload="metadata"
            aria-label="Selatox Cikarang manufacturing facility overview"
          >
            <source src={facilities.video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* ─── 3. Pillars ─── */}
        <ul className={styles.pillars}>
          {facilities.pillars.map((pillar) => (
            <li key={pillar.title} className={styles.pillar}>
              <h3 className={styles.pillarTitle}>{pillar.title}</h3>
              <p className={styles.pillarBody}>{pillar.body}</p>
              <span className={styles.pillarMeta}>{pillar.meta}</span>
            </li>
          ))}
        </ul>

        {/* ─── 4. Details strip ─── */}
        <div className={styles.detailsStrip}>
          {facilities.details.map((d) => (
            <div key={d.label} className={styles.detailCell}>
              <p className={styles.detailLabel}>{d.label}</p>
              <p className={styles.detailValue}>{d.value}</p>
            </div>
          ))}
        </div>

        {/* ─── 5. R&D Card ─── */}
        <article className={styles.rdCard}>
          <div ref={rdImgRef} className={styles.rdImageWrap}>
            <motion.div
              style={{ y: rdImageY }}
              className={styles.rdImageInner}
            >
              <Image
                src={facilities.rnd.image}
                alt="Depok R&D Center — research laboratory facility"
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover"
              />
            </motion.div>
          </div>

          <div className={styles.rdContent}>
            <div className={styles.rdLabel}>
              <span className={styles.rdLabelText}>{facilities.rnd.eyebrow}</span>
            </div>

            <h3 className={styles.rdTitle}>{facilities.rnd.title}</h3>

            <p className={styles.rdBody}>
              {facilities.rnd.body}
            </p>

            <div className={styles.badgeRow}>
              {facilities.rnd.badges.map((badge) => (
                <span key={badge} className={styles.badge}>
                  <span className={styles.badgeDot} />
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
