"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import styles from "./hero.module.css";

export function Hero() {
  const router = useRouter();

  return (
    <section id="hero" className={styles.section} aria-label="Hero" data-navbar="default">
      {/* Navbar variant: negative (transparent, light text) while this section is in view */}
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
