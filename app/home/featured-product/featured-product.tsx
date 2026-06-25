"use client";

import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import type { Product, ProductValueChipIcon } from "@/constants/products";
import { products } from "@/constants/products";
import styles from "./featured-product.module.css";

function splitValueChipLabel(label: string): [string, string] {
  const words = label.trim().split(/\s+/);
  if (words.length <= 2) {
    return [words[0] ?? label, words.slice(1).join(" ")];
  }

  const splitAt = words.length === 3 ? 2 : 2;
  return [words.slice(0, splitAt).join(" "), words.slice(splitAt).join(" ")];
}

function ValueChipIcon({ icon }: { icon: ProductValueChipIcon }) {
  const props = {
    width: 20,
    height: 20,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    "aria-hidden": true as const,
  };

  switch (icon) {
    case "shield":
      return (
        <svg {...props}>
          <path d="M12 3 4 7v6c0 5 3.5 8.5 8 9 4.5-.5 8-4 8-9V7l-8-4Z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      );
    case "target":
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="5" />
          <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
        </svg>
      );
    case "globe":
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
        </svg>
      );
  }
}

type FeaturedProductProps = {
  product?: Product;
};

export function FeaturedProduct({ product }: FeaturedProductProps) {
  const featured = product ?? products[0];
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
      className={`${styles.section} ${isInView ? styles.inView : ""}`}
      aria-labelledby="featured-product-heading"
      data-navbar="default"
    >
      <div className={styles.media}>
        <img
          src={featured.imageSrc}
          alt={featured.imageAlt}
          className={styles.mediaImage}
        />
      </div>

      <div className={styles.panel}>
        <div className={styles.titleGroup}>
          <p className={styles.eyebrow}>{featured.eyebrow}</p>
          <h2 id="featured-product-heading" className={styles.title}>
            {featured.title}
          </h2>
          <p className={styles.tagline}>{featured.tagline}</p>
        </div>

        <div className={styles.details}>
          <p className={styles.subtitle}>{featured.shortDescription}</p>

          <ul className={styles.valueChips} aria-label="Product highlights">
            {featured.valueChips.map((chip) => {
              const [line1, line2] = splitValueChipLabel(chip.label);

              return (
                <li key={chip.label} className={styles.valueChip}>
                  <span className={styles.chipIcon}>
                    <ValueChipIcon icon={chip.icon} />
                  </span>
                  <span className={styles.chipText}>
                    {line1}
                    {line2 ? (
                      <>
                        <br />
                        {line2}
                      </>
                    ) : null}
                  </span>
                </li>
              );
            })}
          </ul>

          <div className={styles.cta}>
            <Button
              variant="border"
              showIcon
              color="var(--green-100)"
              borderColor="var(--green-100)"
              onClick={() => router.push(`/products/${featured.slug}`)}
            >
              View Detail
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
