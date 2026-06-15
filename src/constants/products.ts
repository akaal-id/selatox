export const PRODUCT_CATEGORIES = [
  "OTC Medicines",
  "Prescription Medicines",
  "Dietary Supplements",
  "Quasi-Drugs",
  "Cosmetics",
  "Others",
] as const;

export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number];

export const PRIMARY_PRODUCT_SLUG = "selatox-100u";

export type Product = {
  slug: string;
  title: string;
  brand: string;
  shortDescription: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  category: ProductCategory;
  specs: Array<{ label: string; value: string; note?: string }>;
};

export const products: Product[] = [
  {
    slug: PRIMARY_PRODUCT_SLUG,
    title: "SELATOXIN",
    brand: "Selatox",
    shortDescription:
      "A high-purity formulation engineered through advanced biotechnology.",
    description:
      "Designed to deliver natural, precise, and highly reliable aesthetic outcomes for global practitioners through pharmaceutical-grade process control.",
    imageSrc: "/images/products/selatoxin.png",
    imageAlt: "SELATOXIN 100 Units Botulinum Toxin Type A vial",
    category: "Prescription Medicines",
    specs: [
      { label: "Active Ingredient", value: "Botulinum Toxin Type A" },
      { label: "Strength", value: "100 Units" },
      { label: "Presentation", value: "Lyophilized Powder" },
      { label: "Category", value: "Prescription Medicines" },
      {
        label: "Indication",
        value: "Moderate to Severe Glabellar Lines",
        note: "Approval status may vary by product and by country/regulatory authority.",
      },
    ],
  },
];

export const featuredProducts = products.map((product) => ({
  title: `${product.brand} ${product.title}`,
  description: product.shortDescription,
  imageSrc: product.imageSrc,
  imageAlt: product.imageAlt,
  href: `/products/${PRIMARY_PRODUCT_SLUG}`,
}));
