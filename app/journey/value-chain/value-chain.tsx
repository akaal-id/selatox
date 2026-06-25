"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { JourneyPageContent } from "@/lib/cms/public-content";
import styles from "./value-chain.module.css";

type ValueChainProps = {
  content: JourneyPageContent["valueChain"];
};

export function ValueChain({ content }: ValueChainProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsInView(true);
      },
      { threshold: 0.08, rootMargin: "0px 0px -5% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="value-chain"
      className={`${styles.section} ${isInView ? styles.inView : ""}`.trim()}
      aria-labelledby="value-chain-heading"
      data-navbar="default"
    >
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.headerVisual}>
            <Image
              src={content.image}
              alt={content.imageAlt}
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
              className={styles.image}
            />
            <div className={styles.imageOverlay} aria-hidden />
            <p className={styles.eyebrow} aria-hidden>
              {content.eyebrow}
            </p>
          </div>

          <div className={styles.headerPanel}>
            <h2 id="value-chain-heading" className={styles.title}>
              {content.headline}
            </h2>
            <p className={styles.lead}>{content.sub}</p>
          </div>
        </header>

        <div className={styles.flow}>
          <ol className={styles.stages}>
            {content.stages.map((stage, index) => (
              <li
                key={stage.id}
                className={styles.stage}
                style={{ ["--delay" as string]: `${0.2 + index * 0.08}s` }}
              >
                <div className={styles.stageNode}>
                  <span className={styles.stageIndex} aria-hidden>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className={styles.stageContent}>
                  <h3 className={styles.stageTitle}>{stage.title}</h3>
                  <p className={styles.stageDescription}>{stage.description}</p>
                  <ul className={styles.tags} aria-label={`Related roles for ${stage.title}`}>
                    {stage.tags.map((tag) => (
                      <li key={tag}>
                        <span className={styles.tag}>{tag}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
