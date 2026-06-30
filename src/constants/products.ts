export const PRODUCT_CATEGORIES = [
  "OTC Medicines",
  "Prescription Medicines",
  "Dietary Supplements",
  "Quasi-Drugs",
  "Cosmetics",
  "Others",
] as const;

export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number];

export const PRIMARY_PRODUCT_SLUG = "selatoxin";

export type ProductValueChipIcon = "shield" | "target" | "globe";

export type ProductSpecIcon =
  | "molecule"
  | "vial"
  | "snowflake"
  | "shield"
  | "pulse";

/** Fixed hero value chips. Only label text varies per product. */
export const PRODUCT_VALUE_CHIP_DEFINITIONS: ReadonlyArray<{
  icon: ProductValueChipIcon;
  fieldLabel: string;
}> = [
  { icon: "shield", fieldLabel: "Grade" },
  { icon: "target", fieldLabel: "Purity" },
  { icon: "globe", fieldLabel: "Trusted By" },
] as const;

/** Fixed spec rows stored per product. Category is taken from general and rendered first on the page. */
export const PRODUCT_SPEC_DEFINITIONS: ReadonlyArray<{
  label: string;
  icon: ProductSpecIcon;
}> = [
  { label: "Active Ingredient", icon: "molecule" },
  { label: "Strength", icon: "vial" },
  { label: "Presentation", icon: "snowflake" },
  { label: "Indication", icon: "pulse" },
] as const;

export function getProductDisplaySpecs(
  product: Pick<Product, "category" | "specs">
): Product["specs"] {
  const stored = product.specs.filter((spec) => spec.label !== "Category");

  return [
    { label: "Category", value: product.category, icon: "shield" },
    ...stored,
  ];
}

export type Product = {
  slug: string;
  title: string;
  brand: string;
  eyebrow: string;
  tagline: string;
  shortDescription: string;
  description: string;
  specHeadline: string;
  specEyebrow: string;
  imageSrc: string;
  imageAlt: string;
  category: ProductCategory;
  valueChips: Array<{ icon: ProductValueChipIcon; label: string }>;
  regulatoryTags: string[];
  specs: Array<{
    label: string;
    value: string;
    note?: string;
    icon: ProductSpecIcon;
  }>;
};

export const products: Product[] = [
  {
    slug: PRIMARY_PRODUCT_SLUG,
    title: "SELATOXIN",
    brand: "Selatox",
    eyebrow: "Precision · Purity · Confidence",
    tagline: "Botulinum Toxin Type A",
    shortDescription:
      "A high-purity formulation engineered through advanced biotechnology.",
    description:
      "Designed to deliver natural, precise, and highly reliable aesthetic outcomes for global practitioners through pharmaceutical-grade process control.",
    specHeadline: "Engineered for Precision. Trusted Worldwide.",
    specEyebrow: "Premium Purity",
    imageSrc: "/images/products/selatoxin.png",
    imageAlt: "SELATOXIN 100 Units Botulinum Toxin Type A vial",
    category: "Prescription Medicines",
    valueChips: [
      { icon: "shield", label: "Pharmaceutical Grade" },
      { icon: "target", label: "High Purity Formulation" },
      { icon: "globe", label: "Trusted by Global Professionals" },
    ],
    regulatoryTags: [
      "Prescription Medicine",
      "Moderate to Severe Glabellar Lines",
      "Regulatory approval varies by country",
    ],
    specs: [
      {
        label: "Active Ingredient",
        value: "Botulinum Toxin Type A",
        icon: "molecule",
      },
      { label: "Strength", value: "100 Units", icon: "vial" },
      { label: "Presentation", value: "Lyophilized Powder", icon: "snowflake" },
      {
        label: "Indication",
        value: "Moderate to Severe Glabellar Lines",
        note: "Approval status may vary by product and by country/regulatory authority.",
        icon: "pulse",
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
