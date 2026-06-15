"use client";

import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import type { Product } from "@/constants/products";
import styles from "./product-detail.module.css";

type ProductDetailClientProps = {
  product: Product;
};

export function ProductDetailClient({ product }: ProductDetailClientProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const specsRef = useRef<HTMLDivElement>(null);

  const [heroInView, setHeroInView] = useState(false);
  const [specsInView, setSpecsInView] = useState(false);

  useEffect(() => {
    const entries: [React.RefObject<HTMLDivElement | null>, (v: boolean) => void][] = [
      [heroRef, setHeroInView],
      [specsRef, setSpecsInView],
    ];

    const observer = new IntersectionObserver(
      (observed) => {
        observed.forEach((entry) => {
          if (entry.isIntersecting) {
            const match = entries.find(([ref]) => ref.current === entry.target);
            if (match) match[1](true);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );

    entries.forEach(([ref]) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <main className={styles.page} data-navbar="default">
      <section className={styles.section}>
        <div className={styles.centered}>
          {/* ── Hero block: category + title + image ── */}
          <div
            ref={heroRef}
            className={`${styles.heroBlock} ${heroInView ? styles.inView : ""}`}
          >
            <div className={styles.heroBadges}>
              <span className={styles.category}>{product.category}</span>
              <span className={styles.brandBadge}>{product.brand}</span>
            </div>
            <h1 className={styles.title}>{product.title}</h1>

            <div className={styles.imageWrap}>
              <Image
                src={product.imageSrc}
                alt={product.imageAlt}
                fill
                priority
                sizes="(max-width: 1080px) 100vw, 960px"
                className={styles.image}
              />
              {/* Subtle gradient overlay on image bottom */}
              <div className={styles.imageOverlay} />
            </div>
          </div>

          {/* ── Specs block ── */}
          <div
            ref={specsRef}
            className={`${styles.specBlock} ${specsInView ? styles.inView : ""}`}
          >
            <div className={styles.specHeader}>
              <span className={styles.specEyebrow}>About This Product</span>

            </div>

            <div className={styles.specGrid}>
              {/* Left Column: Description */}
              <div className={styles.specLeftCol}>
                <p className={styles.specDescription}>
                  <strong className={styles.specShortDescription}>
                    {product.shortDescription}
                  </strong>{" "}
                  <span className={styles.specLongDescription}>
                    {product.description}
                  </span>
                </p>
              </div>

              {/* Right Column: Specification Row List */}
              <div className={styles.specRightCol}>
                <ul className={styles.specList}>
                  {product.specs.map((spec, i) => (
                    <li
                      key={spec.label}
                      className={styles.specRow}
                      style={{ animationDelay: `${0.45 + i * 0.08}s` }}
                    >
                      <span className={styles.specLabel}>{spec.label}</span>
                      <span className={styles.specValue}>
                        {spec.value}
                        {spec.note && (
                          <span className={styles.specNote}>{spec.note}</span>
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
