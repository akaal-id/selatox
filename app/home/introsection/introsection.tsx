"use client";

import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import styles from "./introsection.module.css";

export function Introsection() {
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
      id="intro"
      className={`${styles.section} ${isInView ? styles.inView : ""}`.trim()}
      aria-label="Company Overview"
      data-navbar="default"
    >
      <div className={styles.container}>
        {/* Left Column: Eyebrow & Headline */}
        <div className={styles.leftColumn}>
          <p className={styles.eyebrow} aria-hidden>// Overview</p>
          <h2 className={styles.headline}>
            Where <span className={styles.highlightGreen}>Safety</span> meets{" "}
            <span className={styles.highlightBlue}>Innovation.</span> Redefining beauty through medical precision.
          </h2>
        </div>

        {/* Right Column: Copy & CTA — offset downwards */}
        <div className={styles.rightColumn}>
          <p className={styles.paragraph}>
            We are a global biopharmaceutical leader dedicated to clinical excellence. Selatox delivers innovative toxin solutions to set a new standard in global aesthetics.          </p>
          <Button
            variant="simple"
            showIcon={true}
            onClick={() => router.push("/about")}
            className={styles.ctaButton}
            color="var(--blue-100)"
          >
            Discover Our Vision
          </Button>
        </div>
      </div>
    </section>
  );
}
