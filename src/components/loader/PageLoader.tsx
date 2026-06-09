"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Loader } from "./Loader";

const BOOT_MIN_MS = 500;
const NAV_HIDE_DELAY_MS = 120;

function isInternalNavigation(anchor: HTMLAnchorElement, pathname: string) {
  if (anchor.target === "_blank") return false;

  const href = anchor.getAttribute("href");
  if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) {
    return false;
  }

  const url = new URL(anchor.href, window.location.href);
  if (url.origin !== window.location.origin) return false;
  if (url.pathname === pathname && url.search === window.location.search) return false;

  return true;
}

export function PageLoader() {
  const pathname = usePathname();
  const [isBooting, setIsBooting] = useState(true);
  const [isNavigating, setIsNavigating] = useState(false);
  const bootStartedRef = useRef(Date.now());
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = isBooting || isNavigating;

  const finishBoot = useCallback(() => {
    const elapsed = Date.now() - bootStartedRef.current;
    const remaining = Math.max(0, BOOT_MIN_MS - elapsed);
    window.setTimeout(() => setIsBooting(false), remaining);
  }, []);

  useEffect(() => {
    if (document.readyState === "complete") {
      finishBoot();
      return;
    }

    window.addEventListener("load", finishBoot, { once: true });
    return () => window.removeEventListener("load", finishBoot);
  }, [finishBoot]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented) return;
      if (event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const anchor = (event.target as Element | null)?.closest("a");
      if (!anchor || !isInternalNavigation(anchor, pathname)) return;

      setIsNavigating(true);
    };

    const onPopState = () => setIsNavigating(true);

    document.addEventListener("click", onClick, true);
    window.addEventListener("popstate", onPopState);

    return () => {
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("popstate", onPopState);
    };
  }, [pathname]);

  useEffect(() => {
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
      hideTimerRef.current = null;
    }

    hideTimerRef.current = setTimeout(() => {
      setIsNavigating(false);
      hideTimerRef.current = null;
    }, NAV_HIDE_DELAY_MS);

    return () => {
      if (hideTimerRef.current) {
        clearTimeout(hideTimerRef.current);
        hideTimerRef.current = null;
      }
    };
  }, [pathname]);

  useEffect(() => {
    if (!show) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [show]);

  return <Loader visible={show} />;
}
