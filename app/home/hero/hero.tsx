"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import styles from "./hero.module.css";

export function Hero() {
  const router = useRouter();

  return (
    <section className={styles.section} aria-label="Hero">
      <div className={styles.gridContainer}></div>
      <div className={styles.container}>
        <div className={styles.textContainer}>
          <h1 className={styles.title}>
            Innovation in{" "}
            <span className={styles.accent}>Biotech</span> & Pharmaceutical
            Excellence
          </h1>
          <p className={styles.subtitle}>
            PT. Selatox Bio Pharma — trusted globally for quality, safety, and
            research-driven solutions.
          </p>
        </div>
        <Button
          variant="primary"
          onClick={() => router.push("/home#contact")}
          className={styles.cta}
          showIcon={true}
          iconColor="var(--blue-100)"
        >
          Get in touch
        </Button>
      </div>
    </section>
  );
}
