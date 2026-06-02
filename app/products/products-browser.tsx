"use client";

import { useMemo, useState } from "react";
import { products } from "@/constants/products";
import { ProductsCard } from "@/components/products-card/products-card";
import styles from "./products.module.css";

const allCategories = ["All", ...Array.from(new Set(products.map((p) => p.category)))] as const;

export function ProductsBrowser() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<(typeof allCategories)[number]>("All");

  const filteredProducts = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return products.filter((product) => {
      const matchesCategory =
        activeCategory === "All" || product.category === activeCategory;

      const searchable = [
        product.brand,
        product.title,
        product.shortDescription,
      ]
        .join(" ")
        .toLowerCase();
      const matchesQuery = !normalized || searchable.includes(normalized);

      return matchesCategory && matchesQuery;
    });
  }, [query, activeCategory]);

  return (
    <section className={styles.section} data-navbar="default">
      <div className={styles.container}>
        {/* <p className={styles.eyebrow}>Product Directory</p>
        <h1 className={styles.heading}>Search and Filter Portfolio</h1> */}

        <div className={styles.toolbar}>
          <label className={styles.searchWrap}>
            <span className={styles.label}>Search</span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by name, brand, or indication"
              className={styles.searchInput}
            />
          </label>
          <div className={styles.filterWrap}>
            <label htmlFor="products-category" className={styles.label}>
              Category
            </label>
            <select
              id="products-category"
              value={activeCategory}
              onChange={(event) =>
                setActiveCategory(event.target.value as (typeof allCategories)[number])
              }
              className={styles.selectInput}
            >
              {allCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {filteredProducts.length > 0 ? (
          <div className={styles.grid}>
            {filteredProducts.map((product) => (
              <ProductsCard key={product.slug} product={product} />
            ))}
          </div>
        ) : (
          <p className={styles.emptyState}>
            No products matched your current search and filter selection.
          </p>
        )}
      </div>
    </section>
  );
}
