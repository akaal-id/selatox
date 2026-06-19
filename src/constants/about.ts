export const aboutHero = {
  headline: "Pioneering Excellence,\nWhere Quality Meets Value",
  subheadline:
    "Selatox is a biotechnology company dedicated to developing and manufacturing innovative aesthetic solutions, combining scientific expertise, precision manufacturing, and global quality standards.",
  backgroundImage: "/images/hero-4.webp",
} as const;

export const aboutBrandIntro = {
  paragraph:
    "Fusing uncompromising global GMP standards with localized innovation to develop a world-class pipeline engineered for absolute precision, safety, and scale.",
  supportingText:
    "Established in September 2022, PT. Selatox Bio Pharma is redefining the global biopharmaceutical landscape from Indonesia — pioneering a new standard for toxin specialization and bio-aesthetic research across Southeast Asia and beyond.",
} as const;

export const aboutExecutive = {
  eyebrow: "Leadership",
  name: "Joh Younghoon",
  title: "Chief Executive Officer",
  quote: {
    blocks: [
      {
        segments: [
          {
            t: "At Selatox, our commitment goes beyond manufacturing;",
          },
        ],
      },
      {
        segments: [
          {
            t: "it is about establishing a sustainable, world-class bio-ecosystem in Indonesia.",
            emphasis: "lead" as const,
          },
        ],
      },
      {
        segments: [
          {
            t: "Through strategic partnerships, rigorous talent discovery, and an unwavering adherence to quality, we are not just entering the global market—we are ",
          },
          { t: "preparing to lead it.", emphasis: "em" as const },
        ],
      },
    ],
  },
  portrait: "/images/placeholder.jpg",
} as const;

export const aboutValues = {
  eyebrow: "Purpose",
  title: "Vision, Mission & Core Values",
  vision:
    "Advancing Beauty Through Science — To become a globally trusted biotechnology company that transforms aesthetic medicine through innovation, quality, and scientific excellence.",
  mission:
    "Delivering Innovative Solutions for Global Aesthetic Healthcare — We develop and manufacture high-quality aesthetic therapies through advanced biotechnology and pharmaceutical-grade manufacturing, creating lasting value for patients, healthcare professionals, and partners worldwide.",
  coreValues: [
    {
      id: "excellence",
      name: "Excellence",
      description:
        "We pursue excellence in every process, product, and decision to achieve the highest standards of quality and reliability.",
    },
    {
      id: "innovation",
      name: "Innovation",
      description:
        "We challenge conventions and embrace innovation to advance science and create meaningful solutions.",
    },
    {
      id: "integrity",
      name: "Integrity",
      description:
        "We act with transparency, ethics, and accountability in everything we do.",
    },
    {
      id: "partnership",
      name: "Partnership",
      description:
        "We build long-term partnerships based on trust, respect, and shared success.",
    },
  ],
} as const;

export type RoadmapMilestone = {
  year: string;
  title: string;
  section: "history" | "milestone";
  status: "completed" | "active" | "upcoming" | "vision";
  image: string;
  /** Optional background image for .png milestones; gradient-1 is used when omitted. */
  imageBg?: string;
  items: ReadonlyArray<{ month?: string; text: string }>;
};

export const aboutRoadmap = {
  historyTitle: "Company History",
  milestonesTitle: "Milestones",
  milestones: [
    {
      year: "2023",
      title: "Establishment of Selatox",
      section: "history" as const,
      status: "completed" as const,
      image: "/images/roadmap/1.png",
      items: [
        {
          month: "September",
          text: "Establishment of PT. Selatox Bio Pharma",
        },
      ],
    },
    {
      year: "2024",
      title: "Completion of the Cikarang Manufacturing Facility",
      section: "history" as const,
      status: "completed" as const,
      image: "/images/roadmap/2.webp",
      items: [
        {
          month: "March",
          text: "Pile construction",
        },
        {
          month: "April",
          text: "Main construction",
        },
        {
          month: "December",
          text: "Construction completion (SLF application)",
        },
      ],
    },
    {
      year: "2025",
      title: "Execution of Global Botulinum Toxin Technology Transfer Agreement",
      section: "history" as const,
      status: "completed" as const,
      image: "/images/roadmap/3.webp",
      items: [
        {
          month: "November",
          text: "Technology development contract",
        },
      ],
    },
    {
      year: "2026",
      title: "GMP Approval",
      section: "history" as const,
      status: "active" as const,
      image: "/images/roadmap/44.webp",
      items: [
        {
          text: "GMP certification and Expert approval",
        },
        {
          text: "R&D center establishment",
        },
      ],
    },
    {
      year: "2028",
      title: "Domestic Launch",
      section: "milestone" as const,
      status: "upcoming" as const,
      image: "/images/roadmap/5.webp",
      items: [
        {
          text: "Product registration (Indonesia)",
        },
        {
          text: "Partnering with +40 countries",
        },
      ],
    },
    {
      year: "2030",
      title: "Global Scaling",
      section: "milestone" as const,
      status: "vision" as const,
      image: "/images/roadmap/6.webp",
      items: [
        {
          text: "Global Launching and commercialization",
        },
      ],
    },
  ],
} as const;

export const aboutContact = {
  eyebrow: "Contact",
  title: "Get in Touch",
  channels: [
    { label: "Business & General Inquiries", email: "contact@selatox.com" },
    { label: "HR & Careers", email: "careers@selatox.com" },
    { label: "Public Relations", email: "pr@selatox.com" },
    { label: "Ethics & Compliance", email: "compliance@selatox.com" },
  ],
  locations: [
    {
      id: "depok",
      name: "R&D Center",
      location:
        "Integrated Laboratory and Research Center (ILRC), UI Campus Depok, Beji, Depok City, West Java 16424, Indonesia",
      role: "Innovation Hub & Corporate Operations",
      mapQuery:
        "Integrated Laboratory and Research Center, Universitas Indonesia, Depok, West Java 16424, Indonesia",
    },
    {
      id: "cikarang",
      name: "Manufacturing Site",
      location:
        "Jl. Science Timur 1 Blok A5D No. 7, Kawasan Industri Jababeka, Sertajaya, Cikarang Timur, Bekasi Regency, West Java 17530, Indonesia",
      role: "Global Production & Export Hub",
      mapQuery:
        "Jl. Science Timur 1 Blok A5D No. 7, Kawasan Industri Jababeka, Sertajaya, Cikarang Timur, Bekasi Regency, West Java 17530, Indonesia",
    },
  ],
} as const;
