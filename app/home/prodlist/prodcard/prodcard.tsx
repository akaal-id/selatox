import Image from "next/image";
import Link from "next/link";
import styles from "./prodcard.module.css";

export type ProdcardProps = {
  title: string;
  description?: string;
  imageSrc?: string;
  imageAlt?: string;
  href?: string;
};

export function Prodcard({
  title,
  description,
  imageSrc,
  imageAlt,
  href,
}: ProdcardProps) {
  const content = (
    <>
      {imageSrc && (
        <div className={styles.imageWrap}>
          <Image
            src={imageSrc}
            alt={imageAlt ?? title}
            width={400}
            height={300}
            className={styles.image}
          />
        </div>
      )}
      <div className={styles.body}>
        <h3 className={styles.title}>{title}</h3>
        {description && <p className={styles.description}>{description}</p>}
      </div>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={styles.link}>
        <article className={styles.card}>{content}</article>
      </Link>
    );
  }

  return <article className={styles.card}>{content}</article>;
}
