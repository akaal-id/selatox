import type { JobCategory } from "@/constants/opportunities";

export const careerJourneyHero = {
  title: "From Research to Reality",
  subtitle: "Every breakthrough begins with people who choose to build it.",
  backgroundImage: "/images/hero-1.webp",
  backgroundAlt: "Selatox team advancing research to reality",
} as const;

export const careerJourneyIntro = {
  eyebrow: "Your Journey",
  headline:
    "Great visions become reality through the dedication, expertise, and courage of individuals. Join exceptional colleagues, take ownership without limits, and experience the excitement of growing alongside a company shaping the future of bio-aesthetics.",
} as const;

export const whySelatox = {
  eyebrow: "Why Selatox",
  title: "Build where science meets scale",
  strengths: [
    {
      id: "end-to-end",
      title: "Rare End-to-End Exposure",
      body: "From the research bench to the global market — experience the full biopharmaceutical lifecycle within one organization, without handoffs that slow your learning.",
    },
    {
      id: "ownership",
      title: "Real Ownership & Career Growth",
      body: "Take meaningful ownership in a company that is actively scaling. Your scope expands as Selatox grows, with room to lead projects that shape our future.",
    },
    {
      id: "global-standard",
      title: "Set a New Global Standard",
      body: "Work at the intersection of rigorous science and modern beauty — where precision manufacturing and world-class R&D define what excellence looks like.",
    },
  ],
} as const;

export type ValueChainStage = {
  id: string;
  title: string;
  description: string;
  tags: readonly JobCategory[];
};

export const valueChain = {
  eyebrow: "Our Value Chain",
  image: "/images/hero-3.webp",
  imageAlt: "Selatox research and development laboratory",
  title: "How innovation becomes impact",
  lead: "Every stage of our journey depends on people who bring expertise, rigor, and ambition. See where your skills fit in the path from discovery to global delivery.",
  stages: [
    {
      id: "research",
      title: "Research",
      description:
        "Explore new formulations, validate mechanisms, and advance the science behind next-generation aesthetic solutions.",
      tags: ["Research & Development"],
    },
    {
      id: "development",
      title: "Development",
      description:
        "Translate discoveries into scalable processes, analytical methods, and technology ready for manufacturing.",
      tags: ["Research & Development", "EPCV"],
    },
    {
      id: "gmp-manufacturing",
      title: "GMP Manufacturing",
      description:
        "Produce at world-class standards in controlled environments where quality and consistency are non-negotiable.",
      tags: ["Manufacturing", "Manufacturing Support"],
    },
    {
      id: "regulatory-approval",
      title: "Regulatory Approval",
      description:
        "Navigate submissions, compliance, and quality systems that earn trust from regulators and partners alike.",
      tags: ["Quality"],
    },
    {
      id: "commercialization",
      title: "Commercialization",
      description:
        "Bring products to market through strategic partnerships, medical engagement, and commercial excellence.",
      tags: ["Sales & Marketing", "Business Development"],
    },
    {
      id: "global-impact",
      title: "Global Impact",
      description:
        "Deliver to customers across continents through supply chain precision and corporate operations that scale.",
      tags: ["Supply Chain Management (SCM)", "Corporate Support"],
    },
  ] satisfies readonly ValueChainStage[],
} as const;

export type CareerPath = {
  id: string;
  title: string;
  description: string;
  tags: readonly JobCategory[];
};

export const careerPaths = {
  eyebrow: "Career Paths",
  title: "Find your place in the journey",
  lead: "Whether you work in the lab, on the production floor, or in front of customers — there is a path where your expertise drives real impact.",
  paths: [
    {
      id: "rnd",
      title: "Research & Development",
      description:
        "Drive discovery and development from early science through formulation, analytics, and clinical research. Ideal for scientists and researchers who want their work to reach the real world.",
      tags: ["Research & Development", "EPCV"],
    },
    {
      id: "manufacturing-quality",
      title: "Manufacturing & Quality",
      description:
        "Ensure every product meets the highest standards through production leadership, process engineering, validation, and quality control across our manufacturing sites.",
      tags: ["Manufacturing", "Manufacturing Support", "Quality"],
    },
    {
      id: "regulatory-clinical",
      title: "Regulatory & Clinical",
      description:
        "Bridge science and compliance — supporting regulatory submissions, quality assurance, and clinical programs that bring safe products to market.",
      tags: ["Quality", "Research & Development"],
    },
    {
      id: "business-commercial",
      title: "Business & Commercial",
      description:
        "Shape how Selatox reaches the world through commercial strategy, sales, marketing, supply chain, and corporate operations.",
      tags: [
        "Sales & Marketing",
        "Business Development",
        "Supply Chain Management (SCM)",
        "Corporate Support",
      ],
    },
  ] satisfies readonly CareerPath[],
} as const;

export const hiringProcess = {
  eyebrow: "Hiring Process",
  title: "Our Hiring Process",
  lead: "Our process is designed to be thorough, transparent, and respectful of your time.",
  steps: [
    { id: "application", label: "Application" },
    { id: "pi-pl-test", label: "PI/PL Test" },
    { id: "first-interview", label: "1st Interview" },
    { id: "second-interview", label: "2nd Interview" },
    { id: "screening", label: "Screening & Reference Check" },
    { id: "offer", label: "Offer" },
  ],
} as const;

export const openPositionsSection = {
  eyebrow: "Open Positions",
  title: "Current opportunities",
  lead: "Explore roles across our research, manufacturing, and commercial teams.",
  moreLabel: "More Positions",
} as const;

export const talentNetworkAreas = [
  "GMP",
  "R&D",
  "RA",
  "BD",
  "Corporate/Admin",
  "Other",
] as const;

export type TalentNetworkArea = (typeof talentNetworkAreas)[number];

export const talentNetworkExperienceOptions = [
  "Less than 1 year",
  "1–3 years",
  "4–7 years",
  "8+ years",
] as const;

export type TalentNetworkExperience =
  (typeof talentNetworkExperienceOptions)[number];

export const talentNetwork = {
  eyebrow: "Talent Network",
  title: "No suitable position right now?",
  subtitle:
    "Register your profile and we'll reach out when a fitting role opens up.",
  submitLabel: "Submit My Profile",
  successTitle: "Profile submitted",
  successMessage:
    "Thank you for registering. Our talent team will review your profile and contact you when a matching opportunity opens.",
  maxNoteChars: 500,
  maxResumeBytes: 5 * 1024 * 1024,
  acceptedResumeTypes: [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ],
  acceptedResumeExtensions: [".pdf", ".doc", ".docx"],
} as const;

export type TalentNetworkFormData = {
  fullName: string;
  email: string;
  phone: string;
  nationality: string;
  areasOfInterest: TalentNetworkArea[];
  yearsOfExperience: TalentNetworkExperience | "";
  resume: File | null;
  linkedIn: string;
  message: string;
};

export const OPEN_POSITIONS_ANCHOR = "open-positions";
