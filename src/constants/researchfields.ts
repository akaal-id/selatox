export const researchFieldsPipelineColumns = [
  "Program",
  "Focus",
  "Phase",
  "Target Launch",
] as const;

export const rndCenterPipelineColumns = [
  "Program",
  "Scope",
  "Phase",
  "Target Launch",
] as const;

export const researchFields = [
  {
    title: "SELATOXIN (Botulinum Toxin Type A)",
    regimen: "Global Phase III Clinical Trial (Glabellar Lines)",
    description:
      "SELATOXIN is undergoing a global Phase III clinical trial for glabellar lines, targeting regulatory approval and commercial launch.",
    phase: "Phase III",
    tags: ["Botulinum Toxin", "Glabellar Lines", "Phase III"],
    featured: true,
    targetLaunch: "2028",
  },
  {
    title: "SELATOXIN Halal Version",
    regimen: "Drug Substance Development",
    description:
      "Developing a Halal-certified formulation of SELATOXIN through stringent ingredient control and compliance with global Islamic pharmaceutical standards.",
    phase: "Development",
    tags: ["Halal Certification", "Drug Substance", "Development"],
    featured: false,
    targetLaunch: "2030",
  },
] as const;
