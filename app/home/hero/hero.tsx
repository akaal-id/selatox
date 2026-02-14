import Link from "next/link";
import styles from "./hero.module.css";

export function Hero() {
  return (
    <section className={styles.section} aria-label="Hero">
      <div className={styles.container}>
        <h1 className={styles.title}>
          Innovation in{" "}
          <span className={styles.accent}>Biotech</span> & Pharmaceutical
          Excellence
        </h1>
        <p className={styles.subtitle}>
          PT. Selatox Bio Pharma — trusted globally for quality, safety, and
          research-driven solutions.
        </p>
        <Link href="/home#contact" className={styles.cta}>
          Get in touch
        </Link>
      </div>
    </section>
  );
}
