"use client";

import { useLenis } from "@/components/lenis/LenisProvider";

export function useScrollToTop() {
  const lenis = useLenis();

  return () => {
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
}
