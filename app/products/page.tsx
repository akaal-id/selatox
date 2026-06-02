import type { Metadata } from "next";
import { FeaturedProduct } from "../home/featured-product/featured-product";
import { ProductsBrowser } from "./products-browser";

export const metadata: Metadata = {
  title: "Products | Selatox",
  description:
    "Browse Selatox product portfolio with quick filtering and detailed pharmaceutical product pages.",
};

export default function ProductsPage() {
  return (
    <main>
      <FeaturedProduct />
      <ProductsBrowser />
    </main>
  );
}
