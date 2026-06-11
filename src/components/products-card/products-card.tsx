"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { PRIMARY_PRODUCT_SLUG, type Product } from "@/constants/products";
import { Button } from "@/components/ui/Button";
import styles from "./products-card.module.css";

type ProductsCardProps = {
  product: Product;
};

export function ProductsCard({ product }: ProductsCardProps) {
  const router = useRouter();

  return (
    <article className={styles.card}>
      <div className={styles.imageWrap}>
        <Image
          src={product.imageSrc}
          alt={product.imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={styles.image}
        />
      </div>
      <div className={styles.body}>
        <div className={styles.metaRow}>
          <p className={styles.category}>{product.category}</p>
          <p className={styles.brand}>{product.brand}</p>
        </div>
        <h3 className={styles.title}>{product.title}</h3>
        <p className={styles.description}>{product.shortDescription}</p>
        <div className={styles.ctaWrap}>
          <Button
            variant="simple"
            color="var(--green-100)"
            showIcon
            onClick={() => router.push(`/products/${PRIMARY_PRODUCT_SLUG}`)}
          >
           Product Details
          </Button>
        </div>
      </div>
    </article>
  );
}
