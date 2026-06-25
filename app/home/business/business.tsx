"use client";

import { CmsImage } from "@/components/cms/cms-image";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { RichHeadline, RichText } from "@/components/cms/rich-text";
import type { BusinessContent } from "@/lib/cms/home-page-data";
import styles from "../../../src/components/pageheader/pageheader.module.css";

const ease: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

type BusinessProps = {
  content: BusinessContent;
};

export function Business({ content }: BusinessProps) {
  const router = useRouter();
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });

  return (
    <section
      ref={containerRef}
      id="our-business"
      className={styles.section}
      aria-labelledby="our-business-heading"
      data-navbar="negative"
      data-background="media"
    >
      <div className={styles.background} aria-hidden>
        <div className="relative h-full w-full">
          <CmsImage
            src={content.backgroundImage}
            alt=""
            fill
            sizes="100vw"
            className={styles.backgroundImage}
          />
        </div>
      </div>

      <div className={styles.gridBackground}>
        <div className={styles.gridContainer}>
          <div className={styles.gridCols}>
            {Array.from({ length: 13 }).map((_, i) => (
              <div
                key={i}
                className={styles.gridLine}
                style={
                  i === 12 ? { gridColumn: "12 / -1" } : undefined
                }
              />
            ))}
          </div>
        </div>
      </div>

      <div className={styles.gradientOverlay} />

      <div className={styles.contentWrap}>
        <div className={styles.container}>
          <div className={styles.titleWrap}>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.08, ease: "easeOut" }}
              className={styles.eyebrow}
            >
              {content.eyebrow}
            </motion.p>
            <motion.h2
              id="our-business-heading"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2, ease }}
              className={styles.headline}
            >
              <RichHeadline content={content.headline} />
            </motion.h2>
          </div>

          <div className={styles.bottomBar}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.45 }}
              className={styles.subWrap}
            >
              <motion.div
                initial={{ y: "100%" }}
                animate={isInView ? { y: "0%" } : {}}
                transition={{ duration: 1, delay: 0.35, ease }}
                className={styles.sub}
              >
                <RichText html={content.sub} />
              </motion.div>
            </motion.div>

            <div className={styles.ctaGroup}>
              <Button
                variant="blur"
                tone="light"
                showIcon
                onClick={() => router.push(content.cta.href)}
              >
                {content.cta.label}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
