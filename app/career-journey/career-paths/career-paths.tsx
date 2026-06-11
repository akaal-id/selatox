"use client";

import { useEffect, useRef, useState } from "react";
import {
  Briefcase,
  Check,
  FlaskConical,
  Factory,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { careerPaths, hiringProcess } from "@/constants/career-journey";
import styles from "./career-paths.module.css";

const PATH_ICONS: Record<(typeof careerPaths.paths)[number]["id"], LucideIcon> = {
  rnd: FlaskConical,
  "manufacturing-quality": Factory,
  "regulatory-clinical": ShieldCheck,
  "business-commercial": Briefcase,
};

export function CareerPaths() {
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
      id="career-paths"
      className={`${styles.section} ${isInView ? styles.inView : ""}`.trim()}
      aria-labelledby="career-paths-heading"
      data-navbar="default"
    >
      <div className={styles.container}>
        <header className={styles.header}>
          <p className={styles.eyebrow} aria-hidden>
            {careerPaths.eyebrow}
          </p>
          <div className={styles.headerBody}>
            <h2 id="career-paths-heading" className={styles.title}>
              {careerPaths.title}
            </h2>
            <p className={styles.lead}>{careerPaths.lead}</p>
          </div>
          {/* <div className={styles.headerRule} aria-hidden /> */}
        </header>

        <ul className={styles.grid}>
          {careerPaths.paths.map((path, index) => {
            const Icon = PATH_ICONS[path.id];

            return (
              <li
                key={path.id}
                className={styles.path}
                style={{ ["--delay" as string]: `${0.24 + index * 0.08}s` }}
              >
                <div className={styles.pathCard}>
                  <div className={styles.pathHead}>
                    <span className={styles.pathIndex} aria-hidden>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className={styles.pathRule} aria-hidden />
                    <span className={styles.pathIcon} aria-hidden>
                      <Icon size={20} strokeWidth={1.5} />
                    </span>
                  </div>

                  <h3 className={styles.pathTitle}>{path.title}</h3>
                  <p className={styles.pathDescription}>{path.description}</p>

                  <ul
                    className={styles.tags}
                    aria-label={`Related categories for ${path.title}`}
                  >
                    {path.tags.map((tag) => (
                      <li key={tag}>
                        <span className={styles.tag}>{tag}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            );
          })}
        </ul>

        <aside
          className={styles.hiring}
          id="hiring-process"
          aria-labelledby="hiring-process-heading"
        >
          <div className={styles.hiringCard}>
            <header className={styles.hiringIntro}>
              <h3 id="hiring-process-heading" className={styles.hiringTitle}>
                {hiringProcess.title}
              </h3>
              <p className={styles.hiringLead}>{hiringProcess.lead}</p>
            </header>

            <ol className={styles.hiringSteps}>
              {hiringProcess.steps.map((step, index) => {
                const isLast = index === hiringProcess.steps.length - 1;

                return (
                  <li
                    key={step.id}
                    className={`${styles.hiringStep} ${isLast ? styles.hiringStepLast : ""}`.trim()}
                    style={{
                      ["--delay" as string]: `${0.56 + index * 0.06}s`,
                    }}
                  >
                    <span className={styles.hiringStepIndex} aria-hidden>
                      {isLast ? (
                        <Check size={16} strokeWidth={2.25} />
                      ) : (
                        String(index + 1).padStart(2, "0")
                      )}
                    </span>
                    <p className={styles.hiringStepLabel}>{step.label}</p>
                  </li>
                );
              })}
            </ol>
          </div>
        </aside>
      </div>
    </section>
  );
}
