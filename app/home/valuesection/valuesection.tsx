"use client";

import Link from "next/link";
import { Globe, Sparkles, ShieldCheck, Search, ArrowRight } from "lucide-react";
import styles from "./valuesection.module.css";

const values = [
  {
    title: "Global Market Leader",
    description:
      "Establishing a professional presence that aligns with international brand values.",
    icon: Globe,
    iconColor: "var(--blue-100)",
  },
  {
    title: "Intuitive Innovation",
    description:
      "Enhancing communication with domestic and international audiences through a seamless, multilingual interface.",
    icon: Sparkles,
    iconColor: "var(--green-80)",
  },
  {
    title: "Scalable & Secure",
    description:
      "A robust digital platform built to support continuous business growth and digital marketing.",
    icon: ShieldCheck,
    iconColor: "var(--neutral-160)",
  },
  {
    title: "Enhanced Discovery",
    description:
      "Optimized content structures that make product and corporate information easily accessible.",
    icon: Search,
    iconColor: "var(--blue-80)",
  },
];

function ValueCard({
  icon: Icon,
  iconColor,
  title,
  description,
}: {
  icon: React.ComponentType<{ size?: number; className?: string; strokeWidth?: number }>;
  iconColor: string;
  title: string;
  description: string;
}) {
  return (
    <div className={styles.card}>
      <div className={styles.cardIconWrap} style={{ color: iconColor }}>
        <Icon size={64} strokeWidth={0.5} aria-hidden />
        <h3 className={styles.cardTitle}>{title}</h3>
      </div>
      
      <p className={styles.cardDescription}>{description}</p>
    </div>
  );
}

export function Valuesection() {
  return (
    <section
      id="valuesection"
      className={styles.section}
      aria-labelledby="values-heading"
      data-navbar="default"
    >
      
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Left: heading block */}
          <div className={styles.leftCol}>
            <span className={styles.eyebrow}>Our strengths</span>
            <h2 id="values-heading" className={styles.title}>
            Redefining Standards in Biotechnology
            </h2>
            <p className={styles.subtitle}>
            At Selatox, we believe that the intersection of rigorous science and human-centric care is where the future lies. We are dedicated to developing pharmaceutical-grade solutions that empower lives.


            </p>
          </div>

          {/* Right: value cards */}
          <div className={styles.rightCol}>
            {values.map((item) => (
              <ValueCard
                key={item.title}
                icon={item.icon}
                iconColor={item.iconColor}
                title={item.title}
                description={item.description}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
