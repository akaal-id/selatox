export type JobStatus = "Open" | "Closing Soon" | "Closed";

export type JobCategory =
  | "Sales & Marketing"
  | "Business Development"
  | "Research & Development"
  | "Quality"
  | "Manufacturing"
  | "Manufacturing Support"
  | "EPCV"
  | "Supply Chain Management (SCM)"
  | "Corporate Support";

export const JOB_CATEGORIES: JobCategory[] = [
  "Sales & Marketing",
  "Business Development",
  "Research & Development",
  "Quality",
  "Manufacturing",
  "Manufacturing Support",
  "EPCV",
  "Supply Chain Management (SCM)",
  "Corporate Support",
];

/**
 * Single rich-text field (HTML). Supported markup:
 * - <strong> / <b> — section titles (rendered at font-weight 500)
 * - <p> — body copy
 * - <em> / <i> — emphasis
 * - <span> — inline styling hooks
 * - <br> — line breaks
 * - <ul>, <ol>, <li> — lists
 */
export type JobDescriptionHtml = string;

export type JobListing = {
  id: string;
  slug: string;
  status: JobStatus;
  title: string;
  location: string;
  category: JobCategory;
  experienceLevel: string;
  applyDeadline: string;
  description: JobDescriptionHtml;
};

export const OPPORTUNITIES_PAGE_SIZE = 9;

export function jobDescriptionToPlainText(html: JobDescriptionHtml): string {
  return html
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<\/p>/gi, " ")
    .replace(/<\/li>/gi, " ")
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function buildJobDescription(job: {
  title: string;
  category: JobCategory;
  location: string;
  experienceLevel: string;
}): JobDescriptionHtml {
  return `<p>Selatox is building Indonesia's first specialized biopharmaceutical center for modern beauty and wellness, and we are looking for a ${job.title} to strengthen our ${job.category} function at ${job.location}. In this ${job.experienceLevel} role, you will work inside a result-driven culture that values autonomy, open communication, and world-class standards across research, manufacturing, and commercial operations. You will collaborate with multidisciplinary teams who are translating advanced science into safe, precise, and scalable aesthetic solutions for Indonesia and more than 40 markets worldwide. Whether you are validating processes on the production floor, supporting regulatory submissions, or shaping the next phase of our pipeline, your work will directly influence how Selatox delivers trusted products to patients and partners. We invest heavily in talent development through structured mentoring, cross-site exposure between our Depok R&amp;D Center and Cikarang manufacturing hub, and knowledge transfer from our global pharmaceutical partners. If you are motivated by rigorous quality, continuous improvement, and meaningful impact at the intersection of science and industry, this role offers the depth, pace, and ownership to grow with us.</p>
<p><strong>Key Responsibilities</strong></p>
<ul>
<li>Execute core ${job.category.toLowerCase()} deliverables for the ${job.title} scope with adherence to GMP, internal SOPs, and global quality expectations.</li>
<li>Partner with R&amp;D, engineering, production, and quality teams to resolve technical issues, improve workflows, and support technology transfer activities.</li>
<li>Prepare, review, and maintain documentation required for operations, audits, batch release, and continuous improvement initiatives.</li>
<li>Contribute to risk assessments, deviation investigations, CAPA actions, and safety programs within your area of ownership.</li>
<li>Support training, onboarding, and knowledge sharing so best practices are consistent across shifts and departments.</li>
<li>Participate in cross-functional projects that align site priorities with Selatox's long-term biopharmaceutical roadmap.</li>
</ul>
<p><strong>Qualifications</strong></p>
<ul>
<li>Relevant degree or equivalent experience for a ${job.experienceLevel} ${job.category} role in pharmaceutical, biotechnology, or related manufacturing environments.</li>
<li>Demonstrated ability to work accurately under pressure, communicate clearly, and manage multiple priorities in a regulated setting.</li>
<li>Working knowledge of GMP, GDP, or ISO-aligned quality systems; audit readiness experience is a plus.</li>
<li>Proficiency with common workplace tools, documentation systems, and collaborative digital platforms.</li>
<li>Professional fluency in Bahasa Indonesia and working English for technical communication.</li>
<li>Commitment to integrity, transparency, and Selatox's culture of agile, outcome-focused teamwork.</li>
</ul>
<p>This position is based in ${job.location}. Selatox offers competitive compensation, comprehensive benefits, and clear pathways for career progression through our Global Talent Program and partnership with Daewoong. We welcome candidates who are ready to contribute to a high-performance environment where precision, safety, and innovation are non-negotiable. If your background aligns with this opportunity, we encourage you to apply before the published deadline.</p>`;
}

const jobListingBase = [
  {
    id: "qc-analyst-cikarang",
    slug: "qc-analyst-cikarang",
    status: "Open" as const,
    title: "Quality Control Analyst",
    location: "Cikarang, West Java",
    category: "Quality",
    experienceLevel: "Mid-Level",
    applyDeadline: "Apply by 28 Aug 2026",
  },
  {
    id: "production-supervisor-cikarang",
    slug: "production-supervisor-cikarang",
    status: "Open" as const,
    title: "Production Supervisor",
    location: "Cikarang, West Java",
    category: "Manufacturing",
    experienceLevel: "Senior",
    applyDeadline: "Apply by 12 Sep 2026",
  },
  {
    id: "formulation-scientist-depok",
    slug: "formulation-scientist-depok",
    status: "Closing Soon" as const,
    title: "Formulation Scientist",
    location: "Depok, West Java",
    category: "Research & Development",
    experienceLevel: "Mid-Level",
    applyDeadline: "Apply by 15 Jun 2026",
  },
  {
    id: "regulatory-affairs-depok",
    slug: "regulatory-affairs-depok",
    status: "Open" as const,
    title: "Regulatory Affairs Specialist",
    location: "Depok, West Java",
    category: "Quality",
    experienceLevel: "Mid-Level",
    applyDeadline: "Apply by 30 Sep 2026",
  },
  {
    id: "process-engineer-cikarang",
    slug: "process-engineer-cikarang",
    status: "Open" as const,
    title: "Process Engineer",
    location: "Cikarang, West Java",
    category: "Manufacturing Support",
    experienceLevel: "Entry-Level",
    applyDeadline: "Apply by 5 Oct 2026",
  },
  {
    id: "clinical-research-associate-depok",
    slug: "clinical-research-associate-depok",
    status: "Closing Soon" as const,
    title: "Clinical Research Associate",
    location: "Depok, West Java",
    category: "Research & Development",
    experienceLevel: "Entry-Level",
    applyDeadline: "Apply by 20 Jun 2026",
  },
  {
    id: "supply-chain-cikarang",
    slug: "supply-chain-cikarang",
    status: "Open" as const,
    title: "Supply Chain Coordinator",
    location: "Cikarang, West Java",
    category: "Supply Chain Management (SCM)",
    experienceLevel: "Mid-Level",
    applyDeadline: "Apply by 18 Oct 2026",
  },
  {
    id: "maintenance-technician-cikarang",
    slug: "maintenance-technician-cikarang",
    status: "Closed" as const,
    title: "Maintenance Technician",
    location: "Cikarang, West Java",
    category: "Manufacturing Support",
    experienceLevel: "Entry-Level",
    applyDeadline: "Applications closed",
  },
  {
    id: "commercial-analyst-jakarta",
    slug: "commercial-analyst-jakarta",
    status: "Open" as const,
    title: "Commercial Strategy Analyst",
    location: "Jakarta",
    category: "Business Development",
    experienceLevel: "Mid-Level",
    applyDeadline: "Apply by 22 Nov 2026",
  },
  {
    id: "microbiology-specialist-depok",
    slug: "microbiology-specialist-depok",
    status: "Open" as const,
    title: "Microbiology Specialist",
    location: "Depok, West Java",
    category: "Quality",
    experienceLevel: "Senior",
    applyDeadline: "Apply by 8 Sep 2026",
  },
  {
    id: "validation-engineer-cikarang",
    slug: "validation-engineer-cikarang",
    status: "Open" as const,
    title: "Validation Engineer",
    location: "Cikarang, West Java",
    category: "EPCV",
    experienceLevel: "Mid-Level",
    applyDeadline: "Apply by 14 Oct 2026",
  },
  {
    id: "talent-development-partner-jakarta",
    slug: "talent-development-partner-jakarta",
    status: "Open" as const,
    title: "Talent Development Partner",
    location: "Jakarta",
    category: "Corporate Support",
    experienceLevel: "Mid-Level",
    applyDeadline: "Apply by 2 Dec 2026",
  },
  {
    id: "packaging-development-depok",
    slug: "packaging-development-depok",
    status: "Closing Soon" as const,
    title: "Packaging Development Associate",
    location: "Depok, West Java",
    category: "Research & Development",
    experienceLevel: "Entry-Level",
    applyDeadline: "Apply by 25 Jun 2026",
  },
  {
    id: "ehs-officer-cikarang",
    slug: "ehs-officer-cikarang",
    status: "Open" as const,
    title: "Environment, Health & Safety Officer",
    location: "Cikarang, West Java",
    category: "Manufacturing Support",
    experienceLevel: "Mid-Level",
    applyDeadline: "Apply by 19 Nov 2026",
  },
  {
    id: "automation-engineer-cikarang",
    slug: "automation-engineer-cikarang",
    status: "Open" as const,
    title: "Automation Engineer",
    location: "Cikarang, West Java",
    category: "Manufacturing Support",
    experienceLevel: "Senior",
    applyDeadline: "Apply by 6 Jan 2027",
  },
  {
    id: "medical-affairs-depok",
    slug: "medical-affairs-depok",
    status: "Open" as const,
    title: "Medical Affairs Associate",
    location: "Depok, West Java",
    category: "Sales & Marketing",
    experienceLevel: "Entry-Level",
    applyDeadline: "Apply by 11 Dec 2026",
  },
  {
    id: "warehouse-lead-cikarang",
    slug: "warehouse-lead-cikarang",
    status: "Closed" as const,
    title: "Warehouse Team Lead",
    location: "Cikarang, West Java",
    category: "Supply Chain Management (SCM)",
    experienceLevel: "Senior",
    applyDeadline: "Applications closed",
  },
  {
    id: "analytical-chemist-depok",
    slug: "analytical-chemist-depok",
    status: "Open" as const,
    title: "Analytical Chemist",
    location: "Depok, West Java",
    category: "Research & Development",
    experienceLevel: "Mid-Level",
    applyDeadline: "Apply by 27 Oct 2026",
  },
  {
    id: "it-systems-analyst-jakarta",
    slug: "it-systems-analyst-jakarta",
    status: "Open" as const,
    title: "IT Systems Analyst",
    location: "Jakarta",
    category: "Corporate Support",
    experienceLevel: "Mid-Level",
    applyDeadline: "Apply by 9 Jan 2027",
  },
  {
    id: "gmp-trainer-cikarang",
    slug: "gmp-trainer-cikarang",
    status: "Closing Soon" as const,
    title: "GMP Training Specialist",
    location: "Cikarang, West Java",
    category: "Quality",
    experienceLevel: "Senior",
    applyDeadline: "Apply by 30 Jun 2026",
  },
] as const;

export const jobListings: JobListing[] = jobListingBase.map((job) => ({
  ...job,
  description: buildJobDescription(job),
}));

export function getJobBySlug(slug: string) {
  return jobListings.find((job) => job.slug === slug);
}

const JOB_STATUS_SORT_ORDER: Record<JobStatus, number> = {
  Open: 0,
  "Closing Soon": 1,
  Closed: 2,
};

export function getRecentJobOpenings(
  excludeSlug: string,
  limit = 4
): JobListing[] {
  return jobListings
    .filter((job) => job.slug !== excludeSlug)
    .sort(
      (a, b) => JOB_STATUS_SORT_ORDER[a.status] - JOB_STATUS_SORT_ORDER[b.status]
    )
    .slice(0, limit);
}

export const opportunitiesPage = {
  title: "Open Opportunities",
} as const;
