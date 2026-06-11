import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { products } from "@/constants/products";
import { ProductDetailClient } from "./product-detail-client";

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

  return <ProductDetailClient product={product} />;
}
