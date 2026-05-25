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
      description: "Establishment of PT. Selatox Bio Pharma.",
      status: "completed" as const,
    },
    {
      year: "2024",
      title: "Facility Completion",
      description: "Completion of state-of-the-art facility construction.",
      status: "completed" as const,
    },
    {
      year: "2026",
      title: "GMP & Clinical Trials",
      description:
        "Target for GMP certification and Export approval; initiation of clinical trials.",
      status: "active" as const,
    },
    {
      year: "2028",
      title: "Domestic Launch",
      description:
        "Domestic product launch in Indonesia; strategic partnering with over 40 countries.",
      status: "upcoming" as const,
    },
    {
      year: "2030",
      title: "Global Launch",
      description: "Global launching and commercialization.",
      status: "upcoming" as const,
    },
    {
      year: "2040",
      title: "Vision Milestone",
      description: "Projected milestone of US$150M in annual sales.",
      status: "vision" as const,
    },
  ],
} as const;

export const aboutFacilities = {
  header: "Scaled for Global Dominance",
  facilities: [
    {
      id: "cikarang",
      name: "Cikarang Manufacturing Plant",
      role: "Production Hub",
      focus: "High-capacity, GMP-compliant commercial manufacturing.",
      details:
        "Spanning over 18,400m², this facility integrates an automated aseptic manufacturing process. It operates under strict global GMP compliance—leveraging the NABOTA quality system—ensuring absolute safety and sterility.",
      capacity:
        "Engineered to produce 6.5 million vials annually to support both domestic demand and massive global export operations.",
      image: "/images/hero-2.webp",
      specs: [
        { label: "Area", value: "18,400 m²" },
        { label: "Capacity", value: "6.5M vials/yr" },
        { label: "Compliance", value: "Global GMP" },
      ],
    },
    {
      id: "depok",
      name: "Depok R&D Center",
      role: "Innovation Hub",
      focus: "Pioneer research and specialized pipeline development.",
      details:
        "Serving as Indonesia's first dedicated Botulinum neurotoxin research facility, this center drives our core scientific advancements. It is the birthplace of our Halal-Toxin pipeline, prioritizing stringent ingredient control and ethical consumption.",
      partnerships:
        "Bolstered by strategic research collaborations with Universitas Indonesia (Science Techno Park) and the Daewoong Foundation.",
      image: "/images/hero-3.webp",
      specs: [
        { label: "Focus", value: "BTX Research" },
        { label: "Partners", value: "UI & Daewoong" },
        { label: "Pipeline", value: "Halal-Toxin" },
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
