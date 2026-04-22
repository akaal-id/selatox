"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import styles from "./hero.module.css";

export function Hero() {
  const router = useRouter();

  return (
    <section id="hero" className={styles.section} aria-label="Hero" data-navbar="default">
      <div className={styles.heroImage} aria-hidden>
        <video
          className={styles.heroVideo}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        >
          <source src="/videos/hero-selatox.mp4" type="video/mp4" />
        </video>
      </div>
      <div className={styles.container}>
          <h1 className={styles.title}>
            Innovation in{" "}
            <span className={styles.accent}>Biotech</span> & Pharmaceutical
            Excellence
          </h1>
        

        <div className={styles.buttonGroup} aria-label="Hero actions">
          <Button
            variant="simple"
            onClick={() => router.push("/products")}
            showIcon={true}
            color="var(--blue-100)"
          >
            Our products
          </Button>
          <span className={styles.divider} aria-hidden />
          <Button
            variant="simple"
            onClick={() => router.push("/about")}
            showIcon={false}
            color="var(--green-100)"
          >
            About us
          </Button>
        </div>
        
      </div>
    </section>
  );
}
