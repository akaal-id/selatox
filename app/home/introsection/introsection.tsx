"use client";

import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";
import styles from "./introsection.module.css";

const plusIconProps = { strokeWidth: 0.5 };

export function Introsection() {
  const router = useRouter();

  return (
    <section id="introsection" className={styles.section} aria-label="Introduction" data-navbar="negative">
      {/* Navbar variant: negative while this section is in view */}
      <div className={styles.container}>
        <div className={styles.iconContainer1} aria-hidden>
          <Plus size={120} {...plusIconProps} />
        </div>
        <div className={styles.iconContainer2} aria-hidden>
          <Plus size={120} {...plusIconProps} />
        </div>
        <div className={styles.textContainer}>  
          <h2 className={styles.eyebrow}>Introduction</h2>
          <h1 className={styles.title}>
          Selatox Bio Pharma is a global biopharmaceutical innovator dedicated to delivering world-class health solutions through cutting-edge R&D and strategic international partnerships.
          </h1>
        </div>
        <div className={styles.textContainer2}>  
          <p className={styles.subtitle}>
          We bridge the gap between advanced research and global accessibility, ensuring our mission of excellence reaches stakeholders worldwide.
          </p>
          
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
        
      </div>
    </section>
  );
}
