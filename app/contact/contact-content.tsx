"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { aboutContact } from "@/constants/about";
import styles from "./contact.module.css";

function mapEmbedUrl(query: string) {
  return `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
}

export function ContactPageContent() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-8%" });
  const [activeMap, setActiveMap] = useState<string>(
    aboutContact.locations[0].id
  );

  const selected =
    aboutContact.locations.find((loc) => loc.id === activeMap) ??
    aboutContact.locations[0];

  return (
    <section
      ref={sectionRef}
      id="contact"
      className={styles.section}
      aria-labelledby="contact-page-heading"
      data-navbar="default"
    >
      <div className={styles.splitGrid}>
        {/* Left panel — info */}
        <div className={styles.leftPanel}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className={styles.leftInner}
          >
            <p className={styles.eyebrow} aria-hidden>
              {aboutContact.eyebrow}
            </p>

            <div className={styles.titleWrap}>
              <motion.h1
                id="contact-page-heading"
                initial={{ y: "100%" }}
                animate={isInView ? { y: "0%" } : {}}
                transition={{
                  duration: 0.8,
                  delay: 0.2,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className={styles.title}
              >
                {aboutContact.title}
              </motion.h1>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
              className={styles.lead}
            >
              Reach the right team directly, or visit us at one of our two sites
              across West Java, Indonesia.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.4 }}
              className={styles.channelsWrap}
            >
              {aboutContact.channels.map((channel) => (
                <div key={channel.email}>
                  <p className={styles.channelLabel}>{channel.label}</p>
                  <a
                    href={`mailto:${channel.email}`}
                    className={styles.channelLink}
                  >
                    {channel.email}
                  </a>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.5 }}
              className={styles.switcherWrap}
            >
              {aboutContact.locations.map((loc) => {
                const isActive = activeMap === loc.id;
                return (
                  <button
                    key={loc.id}
                    type="button"
                    onClick={() => setActiveMap(loc.id)}
                    className={`${styles.switcherBtn} ${
                      isActive ? styles.switcherBtnActive : ""
                    }`}
                  >
                    <span className={styles.btnName}>{loc.name}</span>
                    <span className={styles.btnLocation}>{loc.location}</span>
                    <span className={styles.btnRole}>{loc.role}</span>
                  </button>
                );
              })}
            </motion.div>
          </motion.div>
        </div>

        {/* Right panel — map */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className={styles.rightPanel}
        >
          <AnimatePresence mode="wait">
            <motion.iframe
              key={selected.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              title={`Map — ${selected.name}`}
              src={mapEmbedUrl(selected.mapQuery)}
              className={styles.iframe}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
