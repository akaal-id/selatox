import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { products } from "@/constants/products";
import { ProductsCard } from "@/components/products-card/products-card";
import styles from "./product-detail.module.css";

type ProductDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: ProductDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);
  if (!product) {
    return { title: "Product Not Found | Selatox" };
  }
  return {
    title: `${product.brand} ${product.title} | Selatox`,
    description: product.description,
  };
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);

  if (!product) {
    notFound();
  }

  const otherProducts = products
    .filter((item) => item.slug !== product.slug)
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);

  return (
    <main className={styles.page} data-navbar="default">
      <section className={styles.section}>
        <div className={styles.centered}>
          <p className={styles.category}>{product.category}</p>
          <h1 className={styles.title}>{product.title}</h1>

          <div className={styles.imageWrap}>
            <Image
              src={product.imageSrc}
              alt={product.imageAlt}
              fill
              sizes="(max-width: 1080px) 100vw, 960px"
              className={styles.image}
            />
          </div>

          <p className={styles.description}>{product.description}</p>

          <div className={styles.tags}>
            {product.tags.map((tag) => (
              <span key={tag} className={styles.tag}>
                {tag}
              </span>
            ))}
          </div>

          <div className={styles.specBlock}>
            <h2 className={styles.specHeading}>Specifications</h2>
            <ul className={styles.specList}>
              {product.specs.map((spec) => (
                <li key={spec.label} className={styles.specRow}>
                  <span className={styles.specLabel}>{spec.label}</span>
                  <span className={styles.specValue}>{spec.value}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.otherSection}>
            <div className={styles.otherHeader}>
              <h2 className={styles.otherHeading}>Other Products</h2>
              <Link href="/products" className={styles.backButton}>
                Back to products
              </Link>
            </div>
            <div className={styles.otherRow}>
              {otherProducts.map((item) => (
                <div key={item.slug} className={styles.otherCard}>
                  <ProductsCard product={item} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
