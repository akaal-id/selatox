import { ArrowUpRight } from "lucide-react";
import styles from "./CareerCard.module.css";

interface CareerCardProps {
  title: string;
  location: string;
  type: string;
  department: string;
}

export function CareerCard({ title, location, type, department }: CareerCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.topRow}>
        <span>[ {location} ]</span>
        <span>[ {type} ]</span>
      </div>
      
      <h3 className={styles.title}>{title}</h3>
      
      <div className={styles.bottomRow}>
        <span className={styles.department}>{department}</span>
        <ArrowUpRight size={24} className={styles.icon} strokeWidth={1.5} aria-hidden />
      </div>
    </div>
  );
}
