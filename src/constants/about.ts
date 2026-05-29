export const aboutHero = {
  headline: "Engineering the Future of Bio-Aesthetics.",
  subheadline: "Indonesia's Pioneer in Biopharmaceutical Specialization.",
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
  name: "Joh Young hoon",
  title: "Chief Executive Officer",
  message:
    "At Selatox, our commitment goes beyond manufacturing; it is about establishing a sustainable, world-class bio-ecosystem in Indonesia. Through strategic partnerships, rigorous talent discovery, and an unwavering adherence to quality, we are not just entering the global market—we are preparing to lead it.",
  portrait: "/images/placeholder.jpg",
} as const;

export const aboutValues = {
  eyebrow: "Purpose",
  title: "Vision, Mission & Core Values",
  vision: "2030 Global Leading Biopharmaceutical Company",
  mission:
    "To be a world-class leader in toxin production and distribution excellence.",
  coreValues: [
    {
      id: "justice",
      name: "Justice",
      description:
        "Never take an unrighteous path even if it can bring profits.",
    },
    {
      id: "stewardship",
      name: "Stewardship",
      description:
        "Think in the shoes of others and never lean too much to one side.",
    },
    {
      id: "fairness",
      name: "Fairness",
      description:
        "Unite work and fate and work hard until being successful.",
    },
    {
      id: "open-mind",
      name: "Open Mind",
      description:
        "Always speak the truth and listen to other opinions with an open mind.",
    },
    {
      id: "win-win",
      name: "Win-Win",
      description:
        "Only do work that is in the interest of us, our counterparts, and society (Win-Win-Win).",
    },
  ],
} as const;

export const aboutRoadmap = {
  title: "Strategy & Milestones",
  milestones: [
    {
      year: "2022",
      title: "Establishment",
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
      year: "2023",
      title: "Facility Foundation",
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
      ],
    },
    {
      year: "2024",
      title: "Facility Completion",
      status: "completed" as const,
      image: "/images/selatox-hero-2.webp",
      items: [
        {
          month: "November",
          text: "Technology development contract (w/ Daewoong)",
        },
        {
          month: "December",
          text: "Construction completion (SLF application)",
        },
      ],
    },
    {
      year: "2026",
      title: "GMP & Clinical Approval",
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
  generalInquiry: "info@selatox.com",
  phone: "+62 21 0000 0000",
  locations: [
    {
      id: "depok",
      name: "R&D Center (Headquarters)",
      location: "Depok, West Java, Indonesia",
      role: "Innovation Hub & Corporate Operations",
      mapQuery: "Depok, West Java, Indonesia",
    },
    {
      id: "cikarang",
      name: "Manufacturing Facility",
      location: "Cikarang, Bekasi Regency, West Java, Indonesia",
      role: "Global Production & Export Hub",
      mapQuery: "Cikarang, Bekasi Regency, West Java, Indonesia",
    },
  ],
} as const;
