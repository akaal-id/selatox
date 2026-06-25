"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

const LenisContext = createContext<Lenis | null>(null);

export function useLenis() {
  return useContext(LenisContext);
}

export function LenisProvider({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin") ?? false;

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion || isAdminRoute) {
      return;
    }

    const instance = new Lenis({
      autoRaf: true,
      anchors: true,
      lerp: 0.08,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    setLenis(instance);

    return () => {
      instance.destroy();
      setLenis(null);
    };
  }, [isAdminRoute]);

  useEffect(() => {
    if (!lenis || isAdminRoute) return;
    lenis.scrollTo(0, { immediate: true });
  }, [pathname, lenis, isAdminRoute]);

  return (
    <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
  );
}
