"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export type PageHeaderProps = {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  backgroundImage?: string;
  backgroundAlt?: string;
  id?: string;
  monoAccent?: string;
};

export function PageHeader({
  title,
  subtitle,
  eyebrow = "// PT. Selatox Bio Pharma",
  backgroundImage,
  backgroundAlt = "",
  id = "page-header",
  monoAccent = "Est. 2022 — Cikarang & Depok",
}: PageHeaderProps) {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  return (
    <section
      ref={containerRef}
      id={id}
      className="relative h-screen w-full overflow-hidden bg-zinc-950"
      data-navbar="negative"
    >
      {/* Background Image with Parallax & Grayscale styling */}
      {backgroundImage && (
        <div className="absolute inset-0 z-0 overflow-hidden">
          <motion.div style={{ y: imageY }} className="relative h-full w-full">
            <Image
              src={backgroundImage}
              alt={backgroundAlt}
              fill
              priority
              sizes="100vw"
              className="object-cover grayscale-0 opacity-95"
            />
          </motion.div>
        </div>
      )}

      {/* Subtle grid background */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="mx-auto h-full max-w-[1800px] px-6">
          <div className="grid h-full grid-cols-12">
            {Array.from({ length: 13 }).map((_, i) => (
              <div
                key={i}
                className="border-l border-white/[0.03]"
                style={{
                  gridColumn: i === 12 ? "12 / -1" : undefined,
                  borderRight: i === 12 ? "1px solid rgba(255,255,255,0.03)" : undefined,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Gradient overlays */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-zinc-950/10 via-transparent to-zinc-950/35" />

      {/* Content */}
      <motion.div
        style={{ y: textY, opacity, scale }}
        className="relative z-10 flex h-full flex-col items-start justify-end px-6 pb-24 md:px-16 lg:px-24"
      >
        <div className="mx-auto w-full max-w-[1800px]">
          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mb-8 font-mono text-xs font-medium uppercase tracking-[0.25em] text-zinc-300"
          >
            {eyebrow}
          </motion.p>

          {/* Main headline */}
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="max-w-[1200px] text-[clamp(40px,7.5vw,120px)] font-light leading-[1.05] tracking-[-0.04em] text-white"
            >
              {title}
            </motion.h1>
          </div>

          {/* Bottom bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="mt-16 flex items-center justify-between border-t border-white/10 pt-6"
          >
            <span className="font-mono text-[13px] uppercase tracking-[0.18em] text-zinc-200">
              {monoAccent}
            </span>
            <span className="font-mono text-[13px] uppercase tracking-[0.18em] text-zinc-200">
              Scroll to explore ↓
            </span>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
