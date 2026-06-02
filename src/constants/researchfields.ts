export const researchFieldsPipelineColumns = [
  "Program",
  "Focus",
  "Phase",
  "Progress",
] as const;

export const rndCenterPipelineColumns = [
  "Program",
  "Scope",
  "Phase",
  "Progress",
] as const;

export const researchFields = [
  {
    title: "Halal-Toxin Pipeline",
    regimen:
      "Halal certification, ingredient control, and ethical sourcing",
    description:
      "Developing the world\u2019s first Halal-certified Botulinum Toxin product through stringent ingredient control, ethical sourcing, and full compliance with global Islamic pharmaceutical standards.",
    phase: "Primary Focus",
    tags: ["Halal Certification", "Ingredient Control", "Ethical Sourcing"],
    featured: true,
    progressPercent: 82,
  },
  {
    title: "Botulinum Neurotoxin Formulation",
    regimen: "Formulation, stability, and potency optimization",
    description:
      "Advanced formulation research for next-generation BTX products, optimizing potency, stability, and shelf life for both therapeutic and aesthetic applications.",
    phase: "Active R\u0026D",
    tags: ["Formulation", "Stability", "Potency Optimization"],
    featured: false,
    progressPercent: 56,
  },
  {
    title: "Aseptic Process Development",
    regimen: "Sterile manufacturing, fill-finish, and validation",
    description:
      "Refining sterile manufacturing protocols and validating automated aseptic fill-finish processes to ensure absolute product sterility at commercial scale.",
    phase: "Process Dev",
    tags: ["Sterile Mfg", "Fill-Finish", "Validation"],
    featured: false,
    progressPercent: 80,
  },
  {
    title: "Bio-Aesthetic Applications",
    regimen: "Aesthetics, clinical studies, and translational research",
    description:
      "Expanding the therapeutic envelope of Botulinum Toxin into emerging aesthetic indications through targeted clinical studies and translational research programs.",
    phase: "Exploratory",
    tags: ["Aesthetics", "Clinical Studies", "Translational"],
    featured: false,
    progressPercent: 54,
  },
  {
    title: "Quality Systems Engineering",
    regimen: "KFDA, BPOM, WHO-GMP, and analytics",
    description:
      "Building robust analytical methods and quality control infrastructure aligned with KFDA, BPOM, and WHO-GMP standards for multi-market regulatory submissions.",
    phase: "Ongoing",
    tags: ["KFDA", "BPOM", "WHO-GMP", "Analytics"],
    featured: false,
    progressPercent: 72,
  },
] as const;
