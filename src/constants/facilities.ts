/**
 * Shared facilities data — used by both home/manufacturing-plan and about/facilities.
 *
 * Fields marked (about) are only rendered on the about page.
 */

export const facilities = {
  /* ── Cikarang Manufacturing Hub ── */
  eyebrow: "Manufacturing",
  headline: "Built as a high-capability\nproduction hub.",
  sub: "Engineered for precision and consistency, our facility integrates GMP-aligned workflows, sterile production capabilities, and a modular design that scales with global demand.",
  subExtended:
    "Our expansive Cikarang facility represents the pinnacle of modern biopharmaceutical production. Built to strict international GMP standards, this highly automated plant ensures absolute safety, sterility, and purity in every single vial. With the capacity to produce 6.5 million vials annually, we are fully equipped to meet both domestic needs and massive global demand.",
  video: "/videos/hero-selatox.mp4",

  pillars: [
    {
      meta: "Architecture",
      title: "Purpose-built facility",
      body: "A dedicated manufacturing building designed with clean zoning, controlled circulation, and GMP-ready operational flow.",
    },
    {
      meta: "Equipment",
      title: "High-capability infrastructure",
      body: "Equipped for sterile production, precision fill-finish, environmental monitoring, and validated quality control operations.",
    },
    {
      meta: "Capacity",
      title: "Scalable global output",
      body: "Modular capacity planning and integrated utility systems support long-term expansion while maintaining consistent product quality.",
    },
  ],

  /* (about) — key metrics for the detailed view */
  details: [
    { label: "Total Area", value: "18,469m²" },
    { label: "Annual Capacity", value: "6.5 Million Vials" },
    { label: "Compliance", value: "Global GMP Certified" },
  ],

  /* ── Depok R&D Center (about) ── */
  rnd: {
    eyebrow: "Innovation Hub",
    title: "Depok R&D Center",
    body: "Located in Indonesia's scientific core, our Depok facility is the birthplace of our premium aesthetic solutions. As the first botulinum toxin research center in Indonesia, our scientists focus on mindful innovation. This includes developing our pioneering Halal-certified products and collaborating with top institutions like Universitas Indonesia to lead the future of ethical beauty.",
    image: "/images/hero-3.webp",
    badges: [
      "First BTX Lab in Indonesia",
      "Halal-Certified Pipeline",
      "UI Research Partner",
    ],
  },
} as const;
