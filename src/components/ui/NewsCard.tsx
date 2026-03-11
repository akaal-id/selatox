"use client";

import Link from "next/link";
import styles from "./NewsCard.module.css";

interface NewsCardProps {
  title: string;
  date: string;
  category: string;
  image: string;
  href: string;
}

export function NewsCard({
  title,
  date,
  category,
  image,
  href,
}: NewsCardProps) {
  return (
    <Link href={href} className={styles.card}>
      <div className={styles.imageWindow}>
        <img src={image} alt={title} className={styles.image} />
      </div>
      <div className={styles.textContainer}>
        <div className={styles.meta}>
          <span className={styles.category}>{category}</span>
          <span className={styles.separator}>•</span>
          <span className={styles.date}>{date}</span>
        </div>
        <h3 className={styles.title}>{title}</h3>
      </div>
    </Link>
  );
}
