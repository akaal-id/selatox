import { Suspense } from "react";
import { AdminLoginForm } from "./login-form";
import styles from "./login.module.css";

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <div className={styles.page}>
          <div className={styles.card}>
            <p className={styles.lead}>Loading…</p>
          </div>
        </div>
      }
    >
      <AdminLoginForm />
    </Suspense>
  );
}
