"use client";

import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Eye, Target, Heart, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/Button";
import styles from "./valuesection.module.css";

const CARD_ICONS: Record<string, LucideIcon> = {
  vision: Eye,
  mission: Target,
  "core-value": Heart,
};

const CARD_ACCENT: Record<string, "green" | "blue"> = {
  vision: "green",
  mission: "blue",
  "core-value": "green",
};

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
      { threshold: 0.1, rootMargin: "0px 0px -5% 0px" }
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
      <h2 id="values-heading" className={styles.srOnly}>
        Vision, Mission &amp; Values
      </h2>

      <div className={styles.container}>
        <div className={styles.cardGrid}>
          {values.map((item, index) => {
            const Icon = CARD_ICONS[item.id];
            const accent = CARD_ACCENT[item.id];
            return (
              <article
                key={item.id}
                className={`${styles.card} ${styles[`card_${accent}`]}`}
                style={{ ["--i" as string]: index }}
              >
                <div className={styles.cardTop}>
                  <div className={styles.cardIconWrap} aria-hidden>
                    {Icon && <Icon strokeWidth={1.3} />}
                  </div>
                  <span className={styles.cardIndex}>{item.index}</span>
                </div>

                <div className={styles.cardBody}>
                  <span className={styles.cardCategory}>{item.category}</span>
                  <h3 className={styles.cardTitle}>{item.title}</h3>
                  <p className={styles.cardDescription}>{item.description}</p>
                </div>
              </article>
            );
          })}
        </div>

        <div className={styles.ctaWrap}>
          <Button
            variant="primary"
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
