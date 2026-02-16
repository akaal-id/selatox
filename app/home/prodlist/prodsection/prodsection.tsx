import { Prodcard } from "../prodcard/prodcard";
import styles from "./prodsection.module.css";

export type FeaturedProduct = {
  title: string;
  description?: string;
  imageSrc?: string;
  imageAlt?: string;
  href?: string;
};

export type ProdsectionProps = {
  title?: string;
  products: FeaturedProduct[];
};

export function Prodsection({
  title = "Featured products",
  products,
}: ProdsectionProps) {
  return (
    <section className={styles.section} aria-labelledby="featured-products-heading">
      <div className={styles.container}>
        <h2 id="featured-products-heading" className={styles.eyebrow}>
          {title}
        </h2>
        <div className={styles.grid}>
          {products.map((product) => (
            <Prodcard
              key={product.title}
              title={product.title}
              description={product.description}
              imageSrc={product.imageSrc}
              imageAlt={product.imageAlt}
              href={product.href}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
