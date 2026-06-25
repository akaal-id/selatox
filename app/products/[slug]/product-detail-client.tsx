"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState, useEffect, Fragment } from "react";
import { Button } from "@/components/ui/Button";
import type {
  Product,
  ProductSpecIcon,
  ProductValueChipIcon,
} from "@/constants/products";
import styles from "./product-detail.module.css";
import headerStyles from "./product-detail-header.module.css";

type ProductDetailClientProps = {
  product: Product;
};

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

function SpecIcon({ icon }: { icon: ProductSpecIcon }) {
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
    case "molecule":
      return (
        <svg {...props}>
          <circle cx="7" cy="7" r="2.5" />
          <circle cx="17" cy="7" r="2.5" />
          <circle cx="12" cy="17" r="2.5" />
          <path d="M9 8.5 10.5 15M15 8.5 13.5 15M9.2 7h5.6" />
        </svg>
      );
    case "vial":
      return (
        <svg {...props}>
          <path d="M9 3h6v3l2 14H7L9 6V3Z" />
          <path d="M9 10h6" />
        </svg>
      );
    case "snowflake":
      return (
        <svg {...props}>
          <path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6 5.6 18.4" />
        </svg>
      );
    case "shield":
      return (
        <svg {...props}>
          <path d="M12 3 4 7v6c0 5 3.5 8.5 8 9 4.5-.5 8-4 8-9V7l-8-4Z" />
        </svg>
      );
    case "pulse":
      return (
        <svg {...props}>
          <path d="M3 12h4l2.5-6 4 12 2.5-6H21" />
        </svg>
      );
  }
}

export function ProductDetailClient({ product }: ProductDetailClientProps) {
  const router = useRouter();
  const heroRef = useRef<HTMLElement>(null);
  const specsRef = useRef<HTMLElement>(null);

  const [headerInView, setHeaderInView] = useState(false);
  const [specsInView, setSpecsInView] = useState(false);

  useEffect(() => {
    const entries: [React.RefObject<HTMLElement | null>, (v: boolean) => void][] =
      [
        [heroRef, setHeaderInView],
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
    <main className={styles.page}>
      <section
        ref={heroRef}
        className={`${headerStyles.header} ${headerInView ? headerStyles.inView : ""}`}
        aria-labelledby="product-title"
        data-navbar="default"
      >
        <div className={headerStyles.container}>
          <div className={headerStyles.panel}>
            <div className={headerStyles.titleGroup}>
              <p className={headerStyles.eyebrow}>{product.eyebrow}</p>
              <h1 id="product-title" className={headerStyles.title}>
                {product.title}
              </h1>
              <p className={headerStyles.tagline}>{product.tagline}</p>
            </div>

            <div className={headerStyles.details}>
              <p className={headerStyles.subtitle}>{product.shortDescription}</p>

              <div className={headerStyles.highlightsBar} aria-label="Product highlights">
                {product.valueChips.map((chip, index) => {
                  const [line1, line2] = splitValueChipLabel(chip.label);

                  return (
                    <Fragment key={chip.label}>
                      <div className={headerStyles.highlightCell}>
                        <span className={headerStyles.chipIcon}>
                          <ValueChipIcon icon={chip.icon} />
                        </span>
                        <div className={headerStyles.chipText}>
                          <span className={headerStyles.chipLine1}>{line1}</span>
                          {line2 ? (
                            <span className={headerStyles.chipLine2}>{line2}</span>
                          ) : null}
                        </div>
                      </div>
                      {index < product.valueChips.length - 1 ? (
                        <span className={headerStyles.highlightDivider} aria-hidden />
                      ) : null}
                    </Fragment>
                  );
                })}
              </div>

              <div className={headerStyles.cta}>
                <Button
                  variant="simple"
                  showIcon
                  color="var(--green-100)"
                  onClick={() => router.push("/contact")}
                >
                  Contact Us
                </Button>
              </div>
            </div>
          </div>

          <div className={headerStyles.media}>
            <Image
              src={product.imageSrc}
              alt={product.imageAlt}
              width={1024}
              height={1024}
              priority
              sizes="(max-width: 1200px) 100vw, 42vw"
              className={headerStyles.mediaImage}
            />
          </div>
        </div>
      </section>

      <section
        ref={specsRef}
        className={`${styles.specSection} ${specsInView ? styles.inView : ""}`}
        aria-labelledby="spec-headline"
        data-navbar="default"
      >
        <div className={styles.specContainer}>
          <div className={styles.specPanel}>
            <p className={styles.specEyebrow}>{product.specEyebrow}</p>
            <div className={styles.specGrid}>
              <div className={styles.specLead}>
                <h2 id="spec-headline" className={styles.specHeadline}>
                  {product.specHeadline}
                </h2>
                <p className={styles.specDescription}>{product.description}</p>

                <ul className={styles.specTags} aria-label="Regulatory context">
                  {product.regulatoryTags.map((tag) => (
                    <li key={tag} className={styles.specTag}>
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>

              <ul className={styles.specCardList}>
                {product.specs.map((spec, i) => (
                  <li
                    key={spec.label}
                    className={styles.specCard}
                    style={{ animationDelay: `${0.2 + i * 0.08}s` }}
                  >
                    <span className={styles.specCardIcon}>
                      <SpecIcon icon={spec.icon} />
                    </span>
                    <div className={styles.specCardBody}>
                      <span className={styles.specLabel}>{spec.label}</span>
                      <span className={styles.specValue}>{spec.value}</span>
                      {spec.note && (
                        <span className={styles.specNote}>{spec.note}</span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
