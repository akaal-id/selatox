"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import styles from "./workplace.module.css";

export function ManufacturingWorkplace() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-8% 0px" });

  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      aria-labelledby="manufacturing-workplace-heading"
      data-navbar="default"
    >
      <div className={styles.container}>
        <div className={styles.gridGuide} aria-hidden>
          {Array.from({ length: 13 }).map((_, i) => (
            <span key={i} className={styles.gridLine} />
          ))}
        </div>

        <div className={styles.panel}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.14 }}
            className={styles.copy}
          >
            <p className={styles.eyebrow}>Workplace Innovation</p>
            <h2 id="manufacturing-workplace-heading" className={styles.heading}>
              A Culture of Agility
            </h2>
            <p className={styles.body}>
              Behind our advanced machinery is a team of dedicated experts. The
              Cikarang facility features a modern &quot;Smart Office&quot;
              designed to enhance autonomy and efficiency. By fostering an
              agile, result-only work environment, we encourage open
              communication and seamless collaboration across all our engineering
              and quality control departments.
            </p>
          </motion.div>

          <div ref={imageRef} className={styles.media}>
            <motion.div style={{ y: imageY }} className={styles.mediaInner}>
              <Image
                src="/images/our-business/about-main.webp"
                alt="Selatox team collaboration and workplace innovation"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className={styles.image}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
