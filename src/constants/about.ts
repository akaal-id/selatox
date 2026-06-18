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
            t: "At Selatox, our commitment goes beyond manufacturing; it is about establishing a sustainable, world-class bio-ecosystem in Indonesia.",
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

export const aboutRoadmap = {
  historyTitle: "Company History",
  milestonesTitle: "Milestones",
  milestones: [
    {
      year: "2023",
      title: "Establishment of Selatox",
      section: "history" as const,
      status: "completed" as const,
      image: "/images/selatox-hero.webp",
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
      image: "/images/intro.webp",
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
      image: "/images/selatox-hero-2.webp",
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
      image: "/images/product.webp",
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
      image: "/images/hero-1.webp",
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
      image: "/images/hero-4.webp",
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
  ],
  locations: [
    {
      id: "depok",
      name: "R&D Center",
      location: "Depok, West Java, Indonesia",
      role: "Innovation Hub & Corporate Operations",
      mapQuery: "Depok, West Java, Indonesia",
    },
    {
      id: "cikarang",
      name: "Manufacturing Site",
      location: "Cikarang, Bekasi Regency, West Java, Indonesia",
      role: "Global Production & Export Hub",
      mapQuery: "Cikarang, Bekasi Regency, West Java, Indonesia",
    },
  ],
} as const;
