"use client";

import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import styles from "./valuesection.module.css";

const values = [
  {
    id: "vision",
    index: "01",
    category: "Vision",
    title: "2030 Global Leadership",
    description:
      "We aim to set a new standard in aesthetics—combining safe science with mindful innovation, including Halal-certified products, for over 40 countries.",
  },
  {
    id: "mission",
    index: "02",
    category: "Mission",
    title: "World-Class Production",
    description:
      "Manufacturing excellence is at our core. Advanced, certified facilities deliver pharmaceutical-grade solutions with international safety and purity.",
  },
  {
    id: "core-value",
    index: "03",
    category: "Core Value",
    title: "Uncompromising Integrity",
    description:
      "True innovation requires honesty—complete transparency, strict clinical safety, and absolute trust in every vial we produce.",
  },
];

export function Valuesection() {
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
      id="valuesection"
      className={`${styles.section} ${isInView ? styles.inView : ""}`.trim()}
      aria-labelledby="values-heading"
      data-navbar="default"
    >
      <div className={styles.container}>
        <div className={styles.cardGrid}>
          {values.map((item, index) => (
            <article
              key={item.id}
              className={styles.valueCard}
              style={{ ["--delay" as string]: `${0.25 + index * 0.15}s` }}
            >
              {/* <div className={styles.cardHead}>
                <span className={styles.cardNumber} aria-hidden>
                  {item.index}
                </span>
                <span className={styles.cardRule} aria-hidden />
              </div> */}

              <div className={styles.cardBody}>
                <p className={styles.cardCategory}>{item.category}</p>
                <h3 className={styles.valueTitle}>{item.title}</h3>
                <p className={styles.valueDescription}>{item.description}</p>
              </div>
            </article>
          ))}
        </div>

        <div className={styles.ctaWrap}>
          <Button
            variant="simple"
            showIcon={true}
            color="var(--blue-100)"
            onClick={() => router.push("/about")}
          >
            More About Selatox
          </Button>
        </div>
      </div>
    </section>
  );
}
