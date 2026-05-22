"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import styles from "./research.module.css";

const ease: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

const researchFields = [
  {
    title: "Halal-Toxin Pipeline",
    description:
      "Developing the world\u2019s first Halal-certified Botulinum Toxin product through stringent ingredient control, ethical sourcing, and full compliance with global Islamic pharmaceutical standards.",
    phase: "Primary Focus",
    tags: ["Halal Certification", "Ingredient Control", "Ethical Sourcing"],
    featured: true,
  },
  {
    title: "Botulinum Neurotoxin Formulation",
    description:
      "Advanced formulation research for next-generation BTX products, optimizing potency, stability, and shelf life for both therapeutic and aesthetic applications.",
    phase: "Active R\u0026D",
    tags: ["Formulation", "Stability", "Potency Optimization"],
    featured: false,
  },
  {
    title: "Aseptic Process Development",
    description:
      "Refining sterile manufacturing protocols and validating automated aseptic fill-finish processes to ensure absolute product sterility at commercial scale.",
    phase: "Process Dev",
    tags: ["Sterile Mfg", "Fill-Finish", "Validation"],
    featured: false,
  },
  {
    title: "Bio-Aesthetic Applications",
    description:
      "Expanding the therapeutic envelope of Botulinum Toxin into emerging aesthetic indications through targeted clinical studies and translational research programs.",
    phase: "Exploratory",
    tags: ["Aesthetics", "Clinical Studies", "Translational"],
    featured: false,
  },
  {
    title: "Quality Systems Engineering",
    description:
      "Building robust analytical methods and quality control infrastructure aligned with KFDA, BPOM, and WHO-GMP standards for multi-market regulatory submissions.",
    phase: "Ongoing",
    tags: ["KFDA", "BPOM", "WHO-GMP", "Analytics"],
    featured: false,
  },
];

export function Research() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-8%" });

  return (
    <section
      ref={sectionRef}
      id="research-fields"
      className={styles.section}
      aria-labelledby="research-heading"
      data-navbar="default"
    >
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.headerRow}>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.08 }}
            className={styles.eyebrow}
          >
            {"// Research Fields"}
          </motion.p>

          <div className={styles.headerInner}>
            <div className={styles.textWrap}>
              <motion.h2
                id="research-heading"
                initial={{ y: "100%", opacity: 0 }}
                animate={isInView ? { y: "0%", opacity: 1 } : {}}
                transition={{ duration: 0.9, delay: 0.15, ease }}
                className={styles.headline}
              >
                Major Research
                <br />
                Disciplines.
              </motion.h2>
            </div>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.35 }}
              className={styles.headerSub}
            >
              Our core research programs are anchored by the Halal-Toxin
              Pipeline, prioritizing stringent ingredient control and ethical
              consumption at every stage.
            </motion.p>
          </div>
        </div>

        {/* Research grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4, ease }}
          className={styles.researchGrid}
        >
          {researchFields.map((field, index) => (
            <div
              key={field.title}
              className={
                field.featured ? styles.featuredCard : styles.researchCard
              }
            >
              {field.featured && (
                <p className={styles.featuredBadge}>
                  {"\u2588"} Core Pipeline
                </p>
              )}

              <div className={styles.cardHeader}>
                <span className={styles.cardIndex}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className={styles.cardPhase}>{field.phase}</span>
              </div>

              <h3 className={styles.cardTitle}>{field.title}</h3>
              <p className={styles.cardDescription}>{field.description}</p>

              <div className={styles.cardTags}>
                {field.tags.map((tag) => (
                  <span key={tag} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
