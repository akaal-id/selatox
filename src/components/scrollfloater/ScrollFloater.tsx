"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { useLenis } from "@/components/lenis/LenisProvider";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import styles from "./scrollfloater.module.css";

const CIRCLE_R = 45;
const CIRCLE_CIRCUMFERENCE = 2 * Math.PI * CIRCLE_R;

const SCROLL_AT_TOP = 16;
const SCROLL_LEAVE_TOP = 48;

const LERP_FACTOR = 0.12;

export function ScrollFloater() {
  const lenis = useLenis();
  const scrollToTop = useScrollToTop();
  const [scrollY, setScrollY] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
  const [showAtTop, setShowAtTop] = useState(true);
  const [displayProgress, setDisplayProgress] = useState(0);
  const rafRef = useRef<number | null>(null);
  const latestRef = useRef({ scrollY: 0, maxScroll: 0 });
  const displayProgressRef = useRef(0);

  useEffect(() => {
    const update = () => {
      const sy = lenis ? lenis.scroll : window.scrollY;
      const max = lenis
        ? lenis.limit
        : document.documentElement.scrollHeight - window.innerHeight;
      latestRef.current = { scrollY: sy, maxScroll: max };

      if (rafRef.current != null) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        setScrollY(latestRef.current.scrollY);
        setMaxScroll(latestRef.current.maxScroll);
        setShowAtTop((prev) => {
          if (sy < SCROLL_AT_TOP) return true;
          if (sy > SCROLL_LEAVE_TOP) return false;
          return prev;
        });
      });
    };

    update();

    if (lenis) {
      const unsubscribe = lenis.on("scroll", update);
      window.addEventListener("resize", update);
      return () => {
        unsubscribe();
        window.removeEventListener("resize", update);
        if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      };
    }

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, [lenis]);

  useEffect(() => {
    let rafId: number;
    const tick = () => {
      const max = latestRef.current.maxScroll;
      const target =
        max > 0
          ? Math.min(Math.max(latestRef.current.scrollY / max, 0), 1)
          : 0;
      const current = displayProgressRef.current;
      const diff = target - current;
      if (Math.abs(diff) < 0.0005) {
        displayProgressRef.current = target;
        setDisplayProgress(target);
      } else {
        const next = current + diff * LERP_FACTOR;
        displayProgressRef.current = next;
        setDisplayProgress(next);
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  const atTop = showAtTop;

  const handleClick = () => {
    if (atTop) return;
    scrollToTop();
  };

  const strokeDasharray = `${displayProgress * CIRCLE_CIRCUMFERENCE} ${CIRCLE_CIRCUMFERENCE}`;

  return (
    <button
      type="button"
      className={styles.floater}
      onClick={handleClick}
      aria-label={atTop ? "Scroll down" : "Scroll to top"}
      title={atTop ? "Scroll down" : "Scroll to top"}
    >
      <svg
        className={styles.ring}
        viewBox="0 0 100 100"
        aria-hidden
      >
        <circle
          className={styles.ringTrack}
          cx="50"
          cy="50"
          r={CIRCLE_R}
          fill="none"
        />
        <circle
          className={styles.ringProgress}
          cx="50"
          cy="50"
          r={CIRCLE_R}
          fill="none"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={0}
          transform="rotate(-90 50 50)"
        />
      </svg>
      <span
        className={`${styles.icon} ${atTop ? "" : styles.iconUp}`}
        aria-hidden
      >
        <ChevronDown size={24} strokeWidth={2} />
      </span>
    </button>
  );
}
