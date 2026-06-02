export type Product = {
  slug: string;
  title: string;
  brand: string;
  shortDescription: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  category: "Aesthetics" | "Therapeutics";
  tags: string[];
  specs: Array<{ label: string; value: string }>;
};

export const products: Product[] = [
  {
    slug: "selatox-100u",
    title: "Botulinum Toxin Type A",
    brand: "Selatox",
    shortDescription:
      "A high-purity formulation engineered through advanced biotechnology.",
    description:
      "Designed to deliver natural, precise, and highly reliable aesthetic outcomes for global practitioners through pharmaceutical-grade process control.",
    imageSrc: "/images/product.webp",
    imageAlt: "SELATOX 100 Units Botulinum Toxin Type A vial",
    category: "Aesthetics",
    tags: ["Wrinkle Correction", "Facial Aesthetics", "Botulinum Toxin"],
    specs: [
      { label: "Strain", value: "Hall A Hyper" },
      { label: "Formulation", value: "Freeze-dried white powder" },
      {
        label: "Indication",
        value:
          "Temporary improvement in the appearance of moderate to severe lines.",
      },
    ],
  },
  {
    slug: "selatox-precision",
    title: "Precision",
    brand: "Selatox",
    shortDescription:
      "Clinically trusted botulinum toxin solution for consistent outcomes.",
    description:
      "Developed with globally validated quality systems to support precision dosing and predictable treatment performance.",
    imageSrc: "/images/products/product-1.webp",
    imageAlt: "Selatox Precision product",
    category: "Aesthetics",
    tags: ["Dermatology", "Precision Dosing", "Global Quality"],
    specs: [
      { label: "Form", value: "Lyophilized vial" },
      { label: "Standard", value: "GMP-aligned manufacturing" },
      { label: "Use", value: "Professional aesthetic treatment" },
    ],
  },
  {
    slug: "selatox-clinical-plus",
    title: "Clinical Plus",
    brand: "Selatox",
    shortDescription: "High-stability toxin profile for clinic-scale operations.",
    description:
      "Built for medical teams requiring efficient throughput, strong vial integrity, and dependable quality release.",
    imageSrc: "/images/products/product-1.webp",
    imageAlt: "Selatox Clinical Plus product",
    category: "Therapeutics",
    tags: ["Clinic Operations", "Stability", "Quality Control"],
    specs: [
      { label: "Release Tests", value: "Chemical and microbiological" },
      { label: "Storage", value: "Controlled cold-chain support" },
      { label: "Target", value: "Clinical treatment environments" },
    ],
  },
  {
    slug: "selatox-pro-aesthetic",
    title: "Pro Aesthetic",
    brand: "Selatox",
    shortDescription: "Premium aesthetic-grade profile for natural visual results.",
    description:
      "Formulated to support smooth, refined outcomes with strict consistency controls across each batch.",
    imageSrc: "/images/products/product-1.webp",
    imageAlt: "Selatox Pro Aesthetic product",
    category: "Aesthetics",
    tags: ["Premium Aesthetics", "Batch Consistency", "Medical Beauty"],
    specs: [
      { label: "Process", value: "Fully automated filling line" },
      { label: "Assay", value: "Advanced cell-based assays" },
      { label: "Benchmark", value: "International regulatory alignment" },
    ],
  },
  {
    slug: "selatox-neuro-refine",
    title: "Neuro Refine",
    brand: "Selatox",
    shortDescription: "Refined neurotoxin profile for subtle aesthetic balancing.",
    description:
      "Engineered for practitioners who require controlled onset and reliable diffusion behavior in high-precision facial applications.",
    imageSrc: "/images/products/product-1.webp",
    imageAlt: "Selatox Neuro Refine product",
    category: "Aesthetics",
    tags: ["Fine Lines", "Precision Injection", "Clinical Reliability"],
    specs: [
      { label: "Dose Consistency", value: "High batch uniformity" },
      { label: "Form", value: "Lyophilized injectable" },
      { label: "Monitoring", value: "End-to-end QC release checks" },
    ],
  },
  {
    slug: "selatox-derma-lift",
    title: "Derma Lift",
    brand: "Selatox",
    shortDescription: "Aesthetic-support formula focused on lift and contour outcomes.",
    description:
      "Designed for clinics seeking stable and repeatable treatment quality in contour-focused aesthetic protocols.",
    imageSrc: "/images/products/product-1.webp",
    imageAlt: "Selatox Derma Lift product",
    category: "Aesthetics",
    tags: ["Contour", "Lift", "Medical Aesthetics"],
    specs: [
      { label: "Purity", value: "Pharmaceutical-grade refinement" },
      { label: "Assay", value: "Cell-based activity validation" },
      { label: "Stability", value: "Long-term validated profile" },
    ],
  },
  {
    slug: "selatox-thera-balance",
    title: "Thera Balance",
    brand: "Selatox",
    shortDescription: "Balanced therapeutic performance for controlled clinical use.",
    description:
      "Supports treatment consistency with robust manufacturing safeguards and validated release criteria.",
    imageSrc: "/images/products/product-1.webp",
    imageAlt: "Selatox Thera Balance product",
    category: "Therapeutics",
    tags: ["Therapeutic Use", "Stability", "Controlled Response"],
    specs: [
      { label: "Standard", value: "GMP compliance framework" },
      { label: "Release", value: "Chemical and microbiological pass" },
      { label: "Storage", value: "Cold-chain ready" },
    ],
  },
  {
    slug: "selatox-ultra-stable",
    title: "Ultra Stable",
    brand: "Selatox",
    shortDescription: "Extended stability profile for demanding distribution chains.",
    description:
      "Optimized for regions requiring strong shelf-life reliability and strict quality assurance conditions.",
    imageSrc: "/images/products/product-1.webp",
    imageAlt: "Selatox Ultra Stable product",
    category: "Therapeutics",
    tags: ["Shelf-life", "Distribution", "Global Supply"],
    specs: [
      { label: "Stability Test", value: "Long-term multi-point validation" },
      { label: "Environment", value: "24/7 monitored production line" },
      { label: "Focus", value: "Global logistics readiness" },
    ],
  },
  {
    slug: "selatox-core-50u",
    title: "Core 50U",
    brand: "Selatox",
    shortDescription: "Lower-dose option for fine control and smaller treatment areas.",
    description:
      "Developed to support subtle correction protocols where controlled, low-unit precision is critical.",
    imageSrc: "/images/products/product-1.webp",
    imageAlt: "Selatox Core 50U product",
    category: "Aesthetics",
    tags: ["Low Dose", "Fine Control", "Subtle Correction"],
    specs: [
      { label: "Unit Size", value: "50 Units" },
      { label: "Use Case", value: "Targeted aesthetic treatment" },
      { label: "Format", value: "Single-use sterile vial" },
    ],
  },
  {
    slug: "selatox-core-200u",
    title: "Core 200U",
    brand: "Selatox",
    shortDescription: "High-capacity option for advanced and multi-site protocols.",
    description:
      "Supports efficient clinic workflows with a larger unit profile while retaining strict quality consistency.",
    imageSrc: "/images/products/product-1.webp",
    imageAlt: "Selatox Core 200U product",
    category: "Therapeutics",
    tags: ["High Capacity", "Advanced Protocol", "Clinic Efficiency"],
    specs: [
      { label: "Unit Size", value: "200 Units" },
      { label: "Workflow", value: "Designed for multi-site treatment plans" },
      { label: "QA", value: "Batch-level performance verification" },
    ],
  },
  // {
  //   slug: "selatox-prime-a",
  //   title: "Prime A",
  //   brand: "Selatox",
  //   shortDescription: "Premium-grade profile for high-standard specialist clinics.",
  //   description:
  //     "Combines a precision manufacturing line with advanced assays for dependable specialist-level outcomes.",
  //   imageSrc: "/images/products/product-1.webp",
  //   imageAlt: "Selatox Prime A product",
  //   category: "Aesthetics",
  //   tags: ["Specialist Clinics", "Premium Grade", "Precision"],
  //   specs: [
  //     { label: "Assurance", value: "Globally benchmarked quality system" },
  //     { label: "Focus", value: "Premium aesthetic procedures" },
  //     { label: "Control", value: "Automated aseptic process chain" },
  //   ],
  // },
];

export const featuredProducts = products.map((product) => ({
  title: `${product.brand} ${product.title}`,
  description: product.shortDescription,
  imageSrc: product.imageSrc,
  imageAlt: product.imageAlt,
  href: `/products/${product.slug}`,
}));

