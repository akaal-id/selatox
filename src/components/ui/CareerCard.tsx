import { ArrowUpRight } from "lucide-react";
import styles from "./CareerCard.module.css";

interface CareerCardProps {
  title: string;
  location: string;
  type: string;
  department: string;
  theme?: "dark" | "light";
}

export function CareerCard({ title, location, type, department, theme = "dark" }: CareerCardProps) {
  const cardClass = theme === "light"
    ? `${styles.card} ${styles.cardLight}`
    : styles.card;

  return (
    <div className={cardClass}>
      <div className={theme === "light" ? `${styles.topRow} ${styles.topRowLight}` : styles.topRow}>
        <span>[ {location} ]</span>
        <span>[ {type} ]</span>
      </div>

      <h3 className={theme === "light" ? `${styles.title} ${styles.titleLight}` : styles.title}>
        {title}
      </h3>

      <div className={styles.bottomRow}>
        <span className={theme === "light" ? `${styles.department} ${styles.departmentLight}` : styles.department}>
          {department}
        </span>
        <ArrowUpRight
          size={24}
          className={theme === "light" ? `${styles.icon} ${styles.iconLight}` : styles.icon}
          strokeWidth={1.5}
          aria-hidden
        />
      </div>
    </div>
  );
}
