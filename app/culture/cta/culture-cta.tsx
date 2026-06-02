"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { cultureCareersHref } from "@/constants/culture";
import styles from "./culture-cta.module.css";

export function CultureCta() {
  const router = useRouter();
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
      id="culture-cta"
      className={`${styles.section} ${isInView ? styles.inView : ""}`.trim()}
      aria-labelledby="culture-cta-heading"
      data-navbar="default"
    >
      <div className={styles.container}>
        <div className={styles.inner}>
          <div className={styles.copy}>
            <h2 id="culture-cta-heading" className={styles.title}>
              Ready to shape what&apos;s next?
            </h2>
            <p className={styles.support}>
              Explore open roles across research, manufacturing, and commercial
              teams.
            </p>
          </div>
          <div className={styles.actions}>
            <Button
              variant="primary"
              showIcon
              backgroundColor="var(--blue-100)"
              color="var(--neutral-0)"
              onClick={() => router.push(cultureCareersHref)}
            >
              View Careers
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
