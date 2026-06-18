"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import styles from "./global-partnerships.module.css";

const KEY_FOCUS = [
  "Licensing opportunities",
  "Strategic partnerships",
  "Export business",
  "Global market expansion",
];

export function GlobalPartnerships() {
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
      id="global-partnerships"
      className={`${styles.section} ${isInView ? styles.inView : ""}`.trim()}
      data-navbar="default"
      aria-labelledby="gp-heading"
    >
      <div className={styles.container}>
        {/* Asymmetric header — headline left, description right, focus strip below */}
        <div className={styles.intro}>
          <div className={styles.introMain}>
            <p className={styles.eyebrow}>
              <span className={styles.eyebrowLabel}>Global Partnerships</span>
            </p>
            <h2 id="gp-heading" className={styles.headline}>
              Expanding Innovation Beyond Borders
            </h2>
          </div>

          <div className={styles.introAside}>
            <p className={styles.description}>
              We collaborate with partners worldwide to accelerate market access,
              create new business opportunities, and deliver innovative aesthetic
              solutions to healthcare professionals and patients across global
              markets.
            </p>
          </div>

          <div className={styles.focus} aria-label="Key focus areas">
            <p className={styles.focusLabel}>Key Focus</p>
            <ul className={styles.focusTags}>
              {KEY_FOCUS.map((item) => (
                <li key={item} className={styles.focusTag}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div className={styles.cta}>
          <div className={styles.ctaLeft}>
            <h3 className={styles.ctaTitle}>
              Let&apos;s Build the Future Together
            </h3>
            <p className={styles.ctaBody}>
              For research collaboration, business development, and partnership
              opportunities, please reach out to us at{" "}
              <Link href="mailto:contact@selatox.com" className={styles.ctaEmail}>
                contact@selatox.com
              </Link>
              .
            </p>
          </div>
          <Link
            href="mailto:contact@selatox.com"
            className={styles.ctaButton}
            aria-label="Email contact@selatox.com"
          >
            Get in Touch
            <ArrowUpRight size={18} strokeWidth={1.75} aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
