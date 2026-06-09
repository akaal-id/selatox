"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import styles from "./loader.module.css";

type LoaderProps = {
  visible: boolean;
};

export function Loader({ visible }: LoaderProps) {
  return (
    <motion.div
      className={styles.overlay}
      role="status"
      aria-live="polite"
      aria-busy={visible}
      aria-hidden={!visible}
      aria-label="Loading"
      initial={{ opacity: 1 }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{ pointerEvents: visible ? "all" : "none" }}
    >
      <div className={styles.logoWrap}>
        <Image
          src="/assets/icon.svg"
          alt=""
          width={24}
          height={24}
          className={styles.logo}
          priority
        />
      </div>
      <div className={styles.track} aria-hidden>
        <div className={styles.bar} />
      </div>
    </motion.div>
  );
}
