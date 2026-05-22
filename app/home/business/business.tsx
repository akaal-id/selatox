"use client";

import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import styles from "./business.module.css";

export function Business() {
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
      id="our-business"
      data-navbar="default"
    >
      <img
        src="/images/product.webp"
        alt=""
        className={styles.backgroundImage}
        aria-hidden
      />
      <div className={styles.overlay} aria-hidden />

      <div className={styles.container}>
        <div className={styles.top}>
          <p className={styles.eyebrow} aria-hidden>{"// Our Business"}</p>
        </div>

        <div className={styles.bottom}>
          <h2 className={styles.headline}>
            Clinical science,
            
            built for global aesthetics.
          </h2>

          <div className={styles.right}>
            <p className={styles.subtitle}>
              We develop precision toxin formulations and partner with leading
              clinics worldwide to bring trusted, scalable aesthetic solutions
              to every market we serve.
            </p>
            <div className={styles.cta}>
              <Button variant="simple" showIcon color="var(--neutral-0)">
                Explore Our Research
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
