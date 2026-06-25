"use client";

import { useEffect, useState, type ReactNode } from "react";
import { DashboardSidebar } from "./dashboard-sidebar";
import { DashboardTopbar } from "./dashboard-topbar";
import styles from "./dashboard.module.css";

type ClientMode = "service" | "anon" | "missing";

export function DashboardShell({
  children,
  clientMode,
  userEmail,
}: {
  children: ReactNode;
  clientMode: ClientMode;
  userEmail?: string;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    function handleClose() {
      setSidebarOpen(false);
    }

    document.body.style.overflow = "hidden";
    document.addEventListener("cms-close-sidebar", handleClose);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("cms-close-sidebar", handleClose);
    };
  }, []);

  return (
    <div className={styles.root}>
      {sidebarOpen ? (
        <button
          type="button"
          className={styles.overlay}
          aria-label="Close navigation menu"
          onClick={() => setSidebarOpen(false)}
        />
      ) : null}

      <DashboardSidebar open={sidebarOpen} />

      <div className={styles.main}>
        <DashboardTopbar
          clientMode={clientMode}
          userEmail={userEmail}
          onMenuClick={() => setSidebarOpen((open) => !open)}
        />
        <div className={styles.content} data-lenis-prevent>
          <div className={styles.contentInner}>{children}</div>
        </div>
      </div>
    </div>
  );
}
