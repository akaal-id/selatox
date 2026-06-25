"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { LogOut } from "lucide-react";
import styles from "./dashboard.module.css";

export function AdminSignOutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSignOut() {
    setLoading(true);

    try {
      await fetch("/api/auth/signout", { method: "POST" });
      router.replace("/admin/login");
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      className={styles.signOutButton}
      onClick={handleSignOut}
      disabled={loading}
    >
      <LogOut size={14} strokeWidth={1.75} aria-hidden />
      {loading ? "Signing out…" : "Sign out"}
    </button>
  );
}
