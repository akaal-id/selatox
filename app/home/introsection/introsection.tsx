"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import styles from "./introsection.module.css";

export function Introsection() {
  const router = useRouter();

  return (
    <section id="introsection" className={styles.section} aria-label="Introduction" data-navbar="negative">
      {/* Navbar variant: negative while this section is in view */}
      <div className={styles.container}>
        <h2 className={styles.eyebrow}>Introduction</h2>
        <h1 className={styles.title}>
        PT. Selatox Bio Pharma is a global pharmaceutical leader dedicated to bridging the gap between innovative research and life-enhancing solutions
        </h1>
        
        <div className={styles.buttonWrapperBlur}>
            <Button
              variant="blur"
              onClick={() => router.push("/about")}
              showIcon={true}
              iconColor="var(--neutral-100)"
            >
              About us
            </Button>
          </div>
      </div>
    </section>
  );
}
