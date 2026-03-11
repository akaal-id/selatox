"use client";

import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import styles from "./featured-product.module.css";

const FEATURED_PRODUCT = {
  image: "/images/hero-2.png",
  specs: [
    { label: "Strain", value: "Hall A Hyper" },
    { label: "Formulation", value: "Freeze-dried white powder" },
    {
      label: "Indication",
      value:
        "Temporary improvement in the appearance of moderate to severe lines.",
    },
  ] as const,
} as const;

export function FeaturedProduct() {
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
      id="featured-product"
      className={`${styles.section} ${isInView ? styles.inView : ""}`.trim()}
      aria-labelledby="featured-product-heading"
      data-navbar="default"
    >
      <div className={styles.split}>
        {/* Left — The Visual */}
        <div className={styles.visualWrap}>
          <div className={styles.productImageWrap}>
            <img
              src={FEATURED_PRODUCT.image}
              alt="SELATOX® 100 Units — Botulinum Toxin Type A vial"
              className={styles.productImage}
            />
          </div>
        </div>

        {/* Right — The Dossier */}
        <div className={styles.dossier}>
          <p className={styles.eyebrow} aria-hidden>
            {"// Featured Innovation"}
          </p>
          <h2 id="featured-product-heading" className={styles.headline}>
            Botulinum Toxin Type A
          </h2>
          <p className={styles.subheadline}>SELATOX®</p>
          <p className={styles.paragraph}>
            A high-purity formulation engineered through advanced biotechnology.
            Designed to deliver natural, precise, and highly reliable aesthetic
            outcomes for global practitioners.
          </p>

          <ul className={styles.specsList}>
            {FEATURED_PRODUCT.specs.map(({ label, value }) => (
              <li key={label} className={styles.specRow}>
                <span className={styles.specLabel}>{label}</span>
                <span className={styles.specValue}>{value}</span>
              </li>
            ))}
          </ul>

          <div className={styles.ctaWrap}>
            <Button
              variant="simple"
              showIcon={true}
              color="var(--green-100)"
              onClick={() => { }}
            >
              View Technical Specs
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
