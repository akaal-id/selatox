"use client";

import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { PRIMARY_PRODUCT_SLUG, products } from "@/constants/products";
import styles from "./featured-product.module.css";

const FEATURED_PRODUCT = products[0];

export function FeaturedProduct() {
  const sectionRef = useRef<HTMLElement>(null);
  const router = useRouter();
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
              src={FEATURED_PRODUCT.imageSrc}
              alt={FEATURED_PRODUCT.imageAlt}
              className={styles.productImage}
            />
          </div>
        </div>

        {/* Right — The Dossier */}
        <div className={styles.dossier}>
          <p className={styles.eyebrow} aria-hidden>
            Featured Innovation
          </p>
          <h2 id="featured-product-heading" className={styles.headline}>
            {FEATURED_PRODUCT.title}
          </h2>
          <p className={styles.subheadline}>{FEATURED_PRODUCT.brand}</p>
          <p className={styles.paragraph}>
            {FEATURED_PRODUCT.shortDescription} {FEATURED_PRODUCT.description}
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
              onClick={() => router.push(`/products/${PRIMARY_PRODUCT_SLUG}`)}
            >
              View Technical Specs
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
