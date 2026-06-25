import type { Metadata } from "next";
import { getProducts } from "@/lib/cms/public-content";
import { FeaturedProduct } from "../home/featured-product/featured-product";
import { ProductsBrowser } from "./products-browser";

export const revalidate = 30;

export const metadata: Metadata = {
  title: "Products | Selatox",
  description:
    "Browse Selatox product portfolio with quick filtering and detailed pharmaceutical product pages.",
};

export default async function ProductsPage() {
  const products = await getProducts();
  const featuredProduct = products[0];

  return (
    <main>
      <FeaturedProduct product={featuredProduct} />
      <ProductsBrowser products={products} />
    </main>
  );
}
