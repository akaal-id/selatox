"use client";

import { useEffect, useRef, useState } from "react";
import { RichHeadline, RichText } from "@/components/cms/rich-text";
import type { EthicsIntroContent } from "@/lib/cms/public-content";
import styles from "../../home/introsection/introsection.module.css";

type EthicsIntroProps = {
  content: EthicsIntroContent;
};

export function EthicsIntro({ content }: EthicsIntroProps) {
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
      id="ethics-intro"
      className={`${styles.section} ${styles.alignStart} ${isInView ? styles.inView : ""}`.trim()}
      aria-label="Ethics introduction"
      data-navbar="default"
    >
      <div className={styles.container}>
        <div className={styles.content}>
          <p className={styles.eyebrow}>
            <span className={styles.eyebrowLabel}>{content.eyebrow}</span>
          </p>

          <h2 className={styles.headline}>
            <RichHeadline content={content.headline} />
          </h2>

          <div className={styles.sub}>
            <RichText html={content.sub} />
          </div>
        </div>
      </div>
    </section>
  );
}
