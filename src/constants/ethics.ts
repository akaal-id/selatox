export const ethicsHero = {
  headline: "Integrity in Every Action. Trust in Every Partnership.",
  subheadline:
    "At Selatox, ethical management is more than a corporate principle—it is the foundation of how we operate, innovate, and grow.",
  backgroundImage: "/images/hero-2.webp",
  backgroundAlt: "Selatox corporate ethics and compliance",
} as const;

export const ethicsIntro = {
  eyebrow: "Ethical Management",
  paragraphs: [
    "As an emerging global biopharmaceutical company, we are committed to conducting business with integrity, transparency, and accountability. We believe that long-term success is built on trust, and that trust is earned through responsible actions, ethical decision-making, and unwavering compliance with the highest standards of business conduct.",
    "By fostering a culture of integrity, we strive to create lasting value for patients, healthcare professionals, business partners, employees, shareholders, and society.",
  ],
} as const;

export const ethicsCommitment = {
  eyebrow: "Our Commitment to Ethical Management",
  intro:
    "Selatox is dedicated to advancing biotechnology and healthcare while maintaining the highest standards of ethics, compliance, and corporate responsibility.",
  commitmentsLabel: "We are committed to:",
  commitments: [
    {
      id: "honesty",
      text: "Conducting business honestly, fairly, and transparently.",
    },
    {
      id: "compliance",
      text: "Complying with all applicable laws, regulations, and industry standards.",
    },
    {
      id: "prevention",
      text: "Preventing corruption, bribery, fraud, and conflicts of interest.",
    },
    {
      id: "protection",
      text: "Protecting confidential information, intellectual property, and personal data.",
    },
    {
      id: "diversity",
      text: "Promoting diversity, inclusion, respect, and equal opportunity.",
    },
    {
      id: "accountability",
      text: "Ensuring accountability in all business decisions and operations.",
    },
    {
      id: "culture",
      text: "Building a sustainable corporate culture founded on trust and responsibility.",
    },
  ],
  closing:
    "Ethical conduct is a shared responsibility across our organization. Every employee is expected to uphold these principles and contribute to a culture where integrity guides every decision.",
  valuesEyebrow: "Our Ethical Values",
  valuesTitle: "Principles That Guide Us",
  valuesIntro:
    "Five values that shape how we act, communicate, and build trust with every stakeholder.",
  values: [
    {
      id: "integrity",
      name: "Integrity",
      description: "We do what is right, even when no one is watching.",
    },
    {
      id: "transparency",
      name: "Transparency",
      description: "We communicate openly and conduct business honestly.",
    },
    {
      id: "accountability",
      name: "Accountability",
      description: "We take responsibility for our actions and decisions.",
    },
    {
      id: "respect",
      name: "Respect",
      description: "We value people, diversity, and professional conduct.",
    },
    {
      id: "trust",
      name: "Trust",
      description:
        "We build lasting relationships through ethical behavior and responsible business practices.",
    },
  ],
} as const;

export const ethicsLeadership = {
  eyebrow: "Message from Leadership",
  heading: "Leading with Integrity",
  message:
    "At Selatox, we believe that scientific innovation and business success must be accompanied by strong ethical principles. As we continue to expand our global presence, we remain committed to conducting our business responsibly, transparently, and in full compliance with applicable laws and regulations. Our commitment extends beyond compliance—it reflects our responsibility to patients, healthcare professionals, partners, employees, and communities worldwide. We encourage all employees and stakeholders to speak up when they encounter concerns and to actively contribute to a culture built on trust, accountability, and mutual respect. By upholding these values, we will continue to strengthen Selatox as a trusted global biopharmaceutical company.",
  name: "Joh younghoon",
  title: "PT Selatox Bio Pharma",
  portrait: "/images/placeholder.jpg",
} as const;

export const ethicsHotline = {
  eyebrow: "Ethics & Compliance Hotline",
  title: "Speak Up with Confidence",
  intro:
    "Selatox encourages employees, customers, suppliers, distributors, healthcare professionals, and other stakeholders to report concerns regarding unethical, illegal, or inappropriate conduct. Reports submitted through the Ethics & Compliance Hotline are reviewed confidentially and handled with fairness, objectivity, and professionalism.",
  ctaLabel: "Submit a Report",
  reportableTitle: "What Can Be Reported?",
  reportableItems: [
    {
      id: "business-ethics",
      title: "Business Ethics Violations",
      description:
        "Any conduct that violates company policies, ethical standards, or applicable regulations.",
    },
    {
      id: "corruption",
      title: "Corruption & Improper Business Practices",
      description:
        "Bribery, kickbacks, fraud, conflicts of interest, improper payments, or unfair business activities.",
    },
    {
      id: "workplace",
      title: "Workplace Misconduct",
      description:
        "Harassment, discrimination, bullying, retaliation, or behavior that undermines a respectful workplace culture.",
    },
    {
      id: "information-security",
      title: "Information Security & Confidentiality Breaches",
      description:
        "Unauthorized disclosure or misuse of confidential business information, personal data, or intellectual property.",
    },
    {
      id: "compliance",
      title: "Compliance Concerns & Improvement Suggestions",
      description:
        "Recommendations that strengthen ethical management, compliance practices, or organizational culture.",
    },
  ],
  protectionTitle: "Protection of Reporters",
  protectionIntro:
    "Selatox is committed to protecting individuals who raise concerns in good faith.",
  protectionCards: [
    {
      id: "confidentiality",
      title: "Confidentiality",
      description:
        "Information relating to reports and the identity of reporters will be handled with strict confidentiality. Disclosure of a reporter's identity without consent is strictly prohibited except where required by law.",
    },
    {
      id: "retaliation",
      title: "Protection Against Retaliation",
      description:
        "No individual will be subject to retaliation, discrimination, harassment, or adverse treatment for reporting concerns, participating in investigations, or providing relevant information in good faith.",
    },
  ],
  guidelinesTitle: "Reporting Guidelines",
  guidelinesIntro:
    "To facilitate a timely and thorough review, please provide as much relevant information as possible, including:",
  guidelines: [
    "Who was involved",
    "What occurred",
    "When it occurred",
    "Where it occurred",
    "How it occurred",
    "Supporting evidence, if available",
  ],
  guidelinesNote:
    "Reports may be submitted anonymously. However, providing contact information may help facilitate a more efficient investigation and follow-up process.",
  formTitle: "Submit a Report",
  formIntro:
    "Reports can be submitted directly through the online form below. All submissions will be delivered confidentially to the designated Ethics & Compliance contact.",
  submitLabel: "Submit Report",
  successTitle: "Report Received",
  successMessage:
    "Thank you for speaking up. Your submission has been received and will be reviewed confidentially by our Ethics & Compliance team.",
  maxDescriptionChars: 2000,
  acceptedDocumentExtensions: [".pdf", ".doc", ".docx", ".jpg", ".jpeg", ".png"] as const,
  acceptedDocumentTypes: [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "image/jpeg",
    "image/png",
  ] as const,
  maxDocumentBytes: 5 * 1024 * 1024,
} as const;

export const ethicsReportTypes = [
  "Business Ethics Violation",
  "Corruption / Bribery",
  "Workplace Misconduct",
  "Information Security Concern",
  "Compliance Concern",
  "Suggestion or Other",
] as const;

export type EthicsReportType = (typeof ethicsReportTypes)[number];

export type EthicsReportFormData = {
  reportType: EthicsReportType | "";
  subject: string;
  description: string;
  incidentDate: string;
  departmentOrIndividual: string;
  supportingDocument: File | null;
  reporterName: string;
  reporterEmail: string;
  anonymous: boolean;
};
