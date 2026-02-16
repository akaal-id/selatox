"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import styles from "./hero.module.css";

export function Hero() {
  const router = useRouter();

  return (
    <section id="hero" className={styles.section} aria-label="Hero" data-navbar="negative">
      {/* Navbar variant: negative (transparent, light text) while this section is in view */}
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
        </div>

        <div className={styles.buttonGroup} aria-label="Hero actions">
          <Button
            variant="primary"
            onClick={() => router.push("/products")}
            showIcon={true}
            iconColor="var(--blue-100)"
          >
            Our products
          </Button>
          <span className={styles.buttonWrapperBlur}>
            <Button
              variant="blur"
              onClick={() => router.push("/about")}
              showIcon={false}
              iconColor="var(--neutral-100)"
            >
              About us
            </Button>
          </span>
        </div>
        
      </div>
    </section>
  );
}
