"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import styles from "./hero.module.css";

export function Hero() {
  const router = useRouter();

  return (
    <section id="hero" className={styles.section} aria-label="Hero">
      
      <div className={styles.container}>
          <h1 className={styles.title}>
            Innovation in{" "}
            <span className={styles.accent}>Biotech</span> & Pharmaceutical
            Excellence
          </h1>
        <div className={styles.textContainer}>
          <p className={styles.subtitle}>
            PT. Selatox Bio Pharma — trusted globally for quality, safety, and
            research-driven solutions.
          </p>
          <Button
          variant="primary"
          onClick={() => router.push("/#contact")}
          className={styles.cta}
          showIcon={true}
          iconColor="var(--blue-100)"
        >
          Get in touch
        </Button>
        </div>
        
      </div>
    </section>
  );
}
