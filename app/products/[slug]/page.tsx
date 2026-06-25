import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug, getProductSlugs } from "@/lib/cms/public-content";
import { ProductDetailClient } from "./product-detail-client";

export const revalidate = 30;

type ProductDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getProductSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ProductDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
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
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return <ProductDetailClient product={product} />;
}
