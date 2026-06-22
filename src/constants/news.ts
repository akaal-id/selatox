export type NewsCategory = "Press Release" | "Notice" | "Event";

export type NewsArticle = {
  id: number;
  slug: string;
  category: NewsCategory;
  date: string;
  publishedYear: number;
  title: string;
  imageSrc: string;
  imageAlt: string;
  bodyHtml: string;
};

export const NEWS_PAGE_SIZE = 6;

export const newsPage = {
  title: "Newsroom",
  subtitle:
    "Press releases, regulatory notices, and events from Selatox Bio Pharma.",
} as const;

/** "Test Article" → "test-article" */
export function slugifyTitle(title: string): string {
  return title
    .replace(/\.+$/, "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const IMAGES = [
  { src: "/images/product.webp", alt: "Selatox product vial in laboratory lighting" },
  { src: "/images/hero-1.webp", alt: "Clinical research team reviewing trial documentation" },
  { src: "/images/hero-4.webp", alt: "Conference hall with international delegates" },
  { src: "/images/our-business/facility-main.webp", alt: "Selatox GMP manufacturing facility exterior" },
  { src: "/images/intro.webp", alt: "Packaging line for pharmaceutical products" },
  { src: "/images/hero-2.webp", alt: "Business leaders signing partnership documents" },
  { src: "/images/selatox-hero.webp", alt: "Medical symposium audience in Jakarta" },
  { src: "/images/our-business/about-main.webp", alt: "Quality assurance specialists in manufacturing workspace" },
  { src: "/images/hero-3.webp", alt: "Research and development laboratory interior" },
  { src: "/images/selatox-hero-2.webp", alt: "Selatox corporate presentation and brand environment" },
  { src: "/images/products/product-1.webp", alt: "Selatox branded product packaging display" },
] as const;

function bodyHtml(paragraphs: string[]): string {
  return `\n${paragraphs.map((text) => `      <p>${text}</p>`).join("\n")}\n    `;
}

const newsArticlesData: Omit<NewsArticle, "slug">[] = [
  {
    id: 1,
    category: "Press Release",
    date: "Mar 12, 2026",
    publishedYear: 2026,
    title: "Selatox Announces Breakthrough in High-Purity Toxin Formulation.",
    imageSrc: IMAGES[0].src,
    imageAlt: IMAGES[0].alt,
    bodyHtml: bodyHtml([
      "Selatox Bio Pharma today announced a breakthrough in high-purity botulinum toxin formulation, achieving materially tighter batch-to-batch consistency across its flagship aesthetic line. The achievement follows multi-year investments in upstream fermentation control, downstream purification modelling, and real-time analytics integrated across the company's primary GMP suites in Indonesia.",
      "Engineering teams validated the improved process through extended comparability studies, including accelerated stability assessments, subvisible particle profiling, and practitioner-focused reconstitution trials conducted with independent clinical educators. Results demonstrated reduced variability in potency assays and improved clarity metrics at the point of care, factors that matter for predictable aesthetic outcomes in diverse practice settings.",
      "Distribution partners in ASEAN and selected export markets have received technical briefing packages summarizing the change control rationale, anticipated implementation timeline, and guidance for inventory transition. Selatox emphasized that commercial supply continuity will be maintained through phased lot release, with no interruption to standing orders for qualified accounts.",
      "Leadership described the milestone as aligned with a broader strategy to deliver pharmaceutical-grade bio-aesthetics developed locally and trusted internationally. The company intends to publish supplementary manufacturing science summaries for regulatory agencies and key accounts, reinforcing transparency around how process discipline translates into product performance.",
      "Looking ahead, Selatox will expand analytical capacity to support additional SKUs in its aesthetics portfolio, while continuing collaboration with university partners on bioprocess optimisation. The organisation reaffirmed its commitment to documentation rigour, deviation management, and batch release governance as non-negotiable foundations for global growth.",
    ]),
  },
  {
    id: 2,
    category: "Notice",
    date: "Feb 28, 2026",
    publishedYear: 2026,
    title: "Successful Completion of Phase III Global Clinical Trials.",
    imageSrc: IMAGES[1].src,
    imageAlt: IMAGES[1].alt,
    bodyHtml: bodyHtml([
      "Selatox Bio Pharma confirms the successful completion of Phase III global clinical trials for its lead aesthetic indication, representing a major step toward expanded regulatory submissions in priority markets. The program enrolled participants across multiple regions, with investigator sites adhering to harmonised protocols, centralized monitoring, and predefined statistical analysis plans reviewed by external advisors.",
      "Primary and secondary endpoints addressed efficacy, tolerability, and practitioner-reported outcomes, including standardized photography review, patient-reported satisfaction instruments, and safety surveillance for adverse events of special interest. Independent committees conducted interim reviews in accordance with charter obligations, and no trial-stopping safety signals were observed during the final analysis window.",
      "Data management teams have locked clinical databases and initiated preparation of integrated summaries for health authorities, incorporating manufacturing comparability references, pharmacovigilance histories, and proposed labeling claims supported by evidence tables. Regulatory affairs staff are coordinating sequencing of filings to balance resource capacity with market readiness criteria established by regional partners.",
      "Selatox thanked investigators, coordinators, and participants for disciplined execution throughout recruitment and follow-up periods that spanned seasonal operational challenges. The company noted that medical affairs will release educational materials aligned with approved indications once regulatory decisions are obtained, ensuring responsible communication with healthcare professionals.",
      "Until formal approvals are granted, Selatox reminds stakeholders that investigational product must not be promoted for unapproved uses. Updates on submission milestones will be communicated through official newsroom channels and direct partner notifications as appropriate.",
    ]),
  },
  {
    id: 3,
    category: "Event",
    date: "Feb 15, 2026",
    publishedYear: 2026,
    title: "Participation in the 2026 International Aesthetics Congress.",
    imageSrc: IMAGES[2].src,
    imageAlt: IMAGES[2].alt,
    bodyHtml: bodyHtml([
      "Selatox Bio Pharma will participate in the 2026 International Aesthetics Congress, presenting manufacturing discipline, quality systems, and product science to a global audience of clinicians, distributors, and industry specialists. The company's pavilion will feature interactive exhibits on cold-chain integrity, batch traceability, and the analytical methods used to support release decisions.",
      "Delegates are invited to schedule meetings with medical affairs and commercial teams to discuss partnership models, training pathways, and pharmacovigilance reporting expectations for new accounts. Session topics led by Selatox experts will include GMP scale-up lessons from Indonesia, practical considerations for injection safety, and evidence-based approaches to patient counseling in aesthetic practice.",
      "A dedicated theater program will showcase case discussions moderated by regional key opinion leaders, emphasizing anatomical planning, conservative dosing strategies, and follow-up documentation that strengthens long-term patient relationships. Printed and digital resources will be available in multiple languages, with QR-linked portals for verified product information.",
      "Selatox will also host a closed-door workshop for distribution partners focused on inventory planning, returns governance, and compliant promotional practices. Attendance is limited to credentialed organizations with active agreements or advanced onboarding status.",
      "Media representatives may request interviews through the congress press desk or by contacting the Selatox corporate communications team in advance. Photography within the pavilion is permitted during published hours, subject to patient-privacy policies that prohibit capture of identifiable treatment demonstrations without consent.",
    ]),
  },
  {
    id: 5,
    category: "Notice",
    date: "Jan 08, 2026",
    publishedYear: 2026,
    title: "New Halal-Certified Product Line Receives Regulatory Approval.",
    imageSrc: IMAGES[4].src,
    imageAlt: IMAGES[4].alt,
    bodyHtml: bodyHtml([
      "Selatox Bio Pharma announced regulatory approval for a new halal-certified product line, enabling distribution in priority domestic and regional markets where certification is a prerequisite for institutional and retail channels. The approval follows audits of manufacturing, warehousing, and documentation workflows designed to align with national halal requirements and internal governance standards.",
      "Certification scope covers ingredient sourcing, cleaning validation, segregation controls, and transport procedures that prevent commingling with non-certified materials. Quality teams implemented additional label verification steps and reconciliation checks to ensure only approved artwork revisions reach packaging lines.",
      "Commercial organizations are coordinating launch timelines with distribution partners, medical education stakeholders, and customer service teams prepared to address product identification questions. Training modules explain visual identifiers, storage guidance, and reporting channels for suspected quality complaints.",
      "Selatox noted that existing non-certified SKUs remain available where permitted, with clear commercial differentiation to support accurate ordering. Partners are asked to review updated price lists, minimum order quantities, and promotional rules that reflect certification-specific positioning.",
      "For questions regarding certification documentation, partners should contact their regional account manager or regulatory support desk. Selatox will publish FAQ updates on the corporate newsroom as additional markets confirm acceptance of the certified line.",
    ]),
  },
  {
    id: 6,
    category: "Press Release",
    date: "Dec 18, 2025",
    publishedYear: 2025,
    title: "Selatox Signs Strategic Distribution Agreement in Southeast Asia.",
    imageSrc: IMAGES[5].src,
    imageAlt: IMAGES[5].alt,
    bodyHtml: bodyHtml([
      "Selatox Bio Pharma has entered a strategic distribution agreement covering multiple Southeast Asian markets, extending reach for its aesthetics portfolio through partners with established clinic networks and hospital channels. The agreement defines service levels for forecasting, replenishment, temperature-controlled logistics, and complaint handling with measurable KPIs reviewed quarterly.",
      "Partners will receive training, medical affairs support, and coordinated pharmacovigilance reporting infrastructure integrated with Selatox global safety databases. Joint business plans outline education investments, congress participation, and digital tools that help practitioners access verified product information without reliance on unapproved third-party content.",
      "Legal and compliance teams structured contracts to reinforce anti-counterfeiting measures, authorized resale restrictions, and transparent transfer pricing documentation. Both parties emphasized long-term collaboration built on quality, regulatory adherence, and clinician trust rather than short-term volume incentives alone.",
      "Implementation workstreams are already active, covering IT connectivity for order status, localized labeling reviews, and market access sequencing based on registration status. Selatox will deploy field-based medical liaisons in select territories to support responsible adoption and feedback collection.",
      "Executives from both organizations attended a signing ceremony in Jakarta, noting the agreement as a milestone in Indonesia-origin bio-aesthetics reaching broader ASEAN populations through disciplined commercialization.",
    ]),
  },
  {
    id: 7,
    category: "Event",
    date: "Nov 22, 2025",
    publishedYear: 2025,
    title: "Selatox Hosts Regional Medical Affairs Symposium in Jakarta.",
    imageSrc: IMAGES[6].src,
    imageAlt: IMAGES[6].alt,
    bodyHtml: bodyHtml([
      "Selatox Bio Pharma hosted a regional medical affairs symposium in Jakarta, bringing together practitioners, trainers, and internal scientific teams for two days of structured education on injection technique, patient selection, and evidence-based outcomes reporting. The agenda combined plenary lectures, small-group workshops, and moderated case reviews designed to encourage conservative, anatomy-aware treatment planning.",
      "Faculty included regional key opinion leaders and Selatox scientists who presented stability data summaries, device handling recommendations, and pharmacovigilance expectations for clinics enrolling in active surveillance programs. Attendees received certificates of participation where continuing education credit could be applied through local accrediting bodies.",
      "A dedicated session addressed practice operations, including informed consent documentation, photography standards, and adverse event workflows that reduce reporting delays. Participants provided feedback used to refine upcoming digital education modules and localized patient brochures.",
      "The symposium reinforced Selatox's commitment to responsible promotion, emphasizing that all claims must align with approved labeling and that off-label discussion is prohibited in sponsored settings. Networking sessions connected clinics with authorized distributors to streamline supply onboarding.",
      "Selatox plans to rotate the symposium to additional cities in 2026, pending partner demand and venue availability. Registration interest lists are open through regional medical affairs contacts.",
    ]),
  },
  {
    id: 9,
    category: "Press Release",
    date: "Aug 14, 2025",
    publishedYear: 2025,
    title: "R&D Center Opens Expanded Formulation Laboratory.",
    imageSrc: IMAGES[8].src,
    imageAlt: IMAGES[8].alt,
    bodyHtml: bodyHtml([
      "Selatox Bio Pharma opened an expanded formulation laboratory at its R&D center, increasing capacity for stability studies, prototype development, and analytical method refinement supporting aesthetics and therapeutic pipeline programs. The laboratory introduces modular bench space, segregated areas for potent compound handling, and environmental chambers capable of simulating tropical storage stress conditions.",
      "Scientists will use the facility to evaluate excipient interactions, container compatibility, and reconstitution performance under accelerated and real-time protocols. Collaboration zones enable joint working sessions with manufacturing engineers early in tech transfer planning, reducing surprises during scale-up campaigns.",
      "Leadership highlighted cross-functional governance that routes experimental plans through safety review, material stewardship, and documentation standards before experiments begin. Digital notebooks capture raw data with audit trails suitable for regulatory inspection scenarios.",
      "University partnerships will host graduate researchers on supervised projects aligned with Selatox publication policies and intellectual property frameworks. Selected findings may be presented at scientific conferences once peer review and internal clearance are complete.",
      "The company expects the expansion to shorten iteration cycles for next-generation presentations while maintaining strict separation between experimental materials and commercial GMP production areas.",
    ]),
  },
  {
    id: 10,
    category: "Press Release",
    date: "Jul 02, 2025",
    publishedYear: 2025,
    title: "Selatox Launches Global Pharmacovigilance Reporting Portal.",
    imageSrc: IMAGES[9].src,
    imageAlt: IMAGES[9].alt,
    bodyHtml: bodyHtml([
      "Selatox Bio Pharma launched a global pharmacovigilance reporting portal that allows healthcare professionals, patients, and distribution partners to submit adverse event information through a secure, multilingual interface available twenty-four hours a day. The portal supports structured data capture, attachment uploads for medical records where permitted, and automatic routing to qualified safety specialists for triage within defined service levels.",
      "Implementation followed validation of privacy controls, role-based access, and backup procedures tested during simulated disaster recovery exercises. Training webinars demonstrated how clinics should document injection details, concomitant therapies, and outcomes to accelerate case assessment without compromising patient confidentiality.",
      "Regional affiliates received localized quick-reference guides and call-center scripts harmonized with portal workflows to ensure consistent responses across channels. Selatox emphasized that all reports, regardless of source, contribute to signal detection activities reviewed by safety committees on recurring calendars.",
      "Partners must discontinue use of legacy email-only reporting for serious events unless explicitly authorized as contingency during outages published on the newsroom site. Metrics dashboards for partners with data-sharing agreements will summarize submission volumes and closure timelines quarterly.",
      "The company views robust pharmacovigilance as essential to ethical aesthetics practice and long-term brand trust, pledging transparent communication of safety updates when regulatory actions require customer notifications.",
    ]),
  },
  {
    id: 11,
    category: "Notice",
    date: "Jun 19, 2025",
    publishedYear: 2025,
    title: "Scheduled Maintenance Window for Manufacturing IT Systems.",
    imageSrc: IMAGES[10].src,
    imageAlt: IMAGES[10].alt,
    bodyHtml: bodyHtml([
      "Selatox Bio Pharma will perform scheduled maintenance on manufacturing IT systems supporting electronic batch records, environmental monitoring, and inventory control from Saturday, June 28, 2025, 22:00 WIB through Sunday, June 29, 2025, 06:00 WIB. During this window, automated data collection will pause and manual contingency procedures will govern critical monitoring points staffed by qualified personnel.",
      "Production activities not requiring live system interfaces may continue as approved by site leadership and quality assurance. Lot release decisions depending on electronic signatures will be deferred until system restoration and verification checks confirm data integrity.",
      "Distribution partners should anticipate delayed availability of certain shipping confirmations and certificate uploads immediately following the maintenance period. Customer service teams will prioritize urgent clinic supply inquiries once systems return to normal operations.",
      "Selatox will post a completion notice on the newsroom when validation scripts confirm functional restoration. Partners experiencing integration errors with ordering portals after maintenance should log tickets through standard technical support channels with screenshots and timestamps.",
      "This notice supersedes informal communications shared through regional chat groups. Only published newsroom updates and partner bulletin emails should be considered authoritative for maintenance timing adjustments.",
    ]),
  },
  {
    id: 12,
    category: "Event",
    date: "May 30, 2025",
    publishedYear: 2025,
    title: "Selatox Exhibits at Korea MedTech Expo 2025.",
    imageSrc: IMAGES[2].src,
    imageAlt: IMAGES[2].alt,
    bodyHtml: bodyHtml([
      "Selatox Bio Pharma will exhibit at Korea MedTech Expo 2025, presenting its aesthetics portfolio and manufacturing capabilities to hospital procurement teams, specialty clinics, and international distributors evaluating Indonesia-origin biopharmaceutical suppliers. Booth design highlights batch traceability tools, temperature monitoring demos, and scientific posters summarizing stability and usability studies.",
      "Visitors can register for one-on-one meetings with regulatory and medical affairs leaders to discuss registration pathways, bridging data requirements, and training resources available upon partnership approval. Live demonstrations will focus on product handling and storage rather than patient treatments, in compliance with venue medical policies.",
      "Selatox partners attending the expo are encouraged to coordinate schedules through centralized booking links to avoid overlapping appointments. Marketing materials distributed onsite will carry version codes verified against the corporate asset library to prevent outdated claims.",
      "Evening networking sessions will feature moderated panels on ASEAN supply resilience and ethical aesthetics promotion. Translation services will be available for Korean and English discussions.",
      "Post-expo summaries and lead follow-up timelines will be communicated to registered participants within ten business days. Media inquiries should be directed to the expo press office with copy to Selatox corporate communications.",
    ]),
  },
  {
    id: 13,
    category: "Press Release",
    date: "Apr 17, 2025",
    publishedYear: 2025,
    title: "Peer-Reviewed Publication of Extended Stability Data.",
    imageSrc: IMAGES[0].src,
    imageAlt: IMAGES[0].alt,
    bodyHtml: bodyHtml([
      "Selatox Bio Pharma announced the peer-reviewed publication of extended stability data for its lead botulinum toxin presentation, detailing performance under long-term refrigerated storage and stress conditions relevant to tropical distribution lanes. The manuscript describes analytical methods, acceptance criteria, and statistical treatment of potency trends across multiple commercial-scale lots.",
      "Authors include Selatox formulation scientists and external collaborators who contributed independent laboratory verification of select assays. The publication supports product claims related to shelf life and storage guidance appearing in approved labeling for participating markets.",
      "Medical affairs will distribute digests summarizing clinical relevance for practitioners, emphasizing that storage recommendations must always follow local labeling regardless of general scientific interest. Reprint requests for educational symposia may be submitted through the publications desk with attendance rosters.",
      "Selatox reiterated its support for transparent scientific discourse while cautioning against misinterpretation of in vitro findings as substitutes for approved indications or dosing guidance. Future submissions on device compatibility and reconstitution ergonomics are in preparation.",
      "The company congratulated research teams whose disciplined documentation enabled successful peer review, noting publications as one pillar of a broader evidence strategy underpinning global partnerships.",
    ]),
  },
  {
    id: 14,
    category: "Notice",
    date: "Mar 25, 2025",
    publishedYear: 2025,
    title: "Updated Product Labeling for ASEAN Distribution Markets.",
    imageSrc: IMAGES[4].src,
    imageAlt: IMAGES[4].alt,
    bodyHtml: bodyHtml([
      "Selatox Bio Pharma is implementing updated product labeling for selected ASEAN distribution markets to harmonize storage statements, reporting contacts, and barcode identifiers with recent regulatory clearances. Transition will occur over eight weeks using a lot-based cutover plan designed to minimize mixed inventory in clinic settings.",
      "Distributors must reconcile warehouse stock, quarantine obsolete label versions, and confirm that customer-facing materials reflect approved claims only. Quality assurance will issue reconciliation forms capturing destruction records for discarded packaging components where required.",
      "Customer service scripts and digital FAQs are revised to address common questions about label appearance changes that do not alter formulation composition. Partners should not characterize the update as a product reformulation unless explicitly authorized in writing by regulatory affairs.",
      "Clinics should continue to report adverse events through the pharmacovigilance portal using identifiers printed on cartons active at time of use. Photographs of labels assist safety teams when investigating inquiries.",
      "Questions about market-specific effective dates should be directed to regional regulatory coordinators listed in partner bulletins. Unauthorized label modifications remain strictly prohibited.",
    ]),
  },
  {
    id: 15,
    category: "Event",
    date: "Feb 11, 2025",
    publishedYear: 2025,
    title: "Webinar Series on Injection Safety and Patient Counseling.",
    imageSrc: IMAGES[1].src,
    imageAlt: IMAGES[1].alt,
    bodyHtml: bodyHtml([
      "Selatox Bio Pharma will host a three-part webinar series on injection safety and patient counseling, accessible to licensed healthcare professionals registered through the corporate education portal. Sessions cover facial anatomy refreshers, sterile technique reminders, pain-management options, and documentation practices that support follow-up care.",
      "Faculty will use case vignettes to illustrate conservative dosing, avoidance of high-risk zones, and management of expected local reactions versus events requiring medical evaluation. Attendees may submit anonymized questions during moderated Q&A segments.",
      "Certificates will be issued upon completion of post-session assessments achieving minimum passing scores. Translations will be provided for Indonesian and English audiences, with recorded replays available for thirty days to registered participants only.",
      "Selatox clarifies that webinars are educational and do not replace hands-on training required by local authorities for new injectors. Promotional pricing or product offers will not appear in webinar interfaces, maintaining separation between education and commercial incentives.",
      "Registration opens two weeks prior to the first session; partners should disseminate links through compliant email channels rather than social advertisements lacking fair balance where required.",
    ]),
  },
  {
    id: 16,
    category: "Press Release",
    date: "Jan 20, 2025",
    publishedYear: 2025,
    title: "Selatox Appoints Dr. Elena Hartono as Chief Medical Officer.",
    imageSrc: IMAGES[6].src,
    imageAlt: IMAGES[6].alt,
    bodyHtml: bodyHtml([
      "Selatox Bio Pharma appointed Dr. Elena Hartono as Chief Medical Officer, overseeing global medical affairs, clinical research governance, and safety strategy for the company's aesthetics and emerging therapeutic programs. Dr. Hartono joins from a multinational pharmaceutical organization where she led regional medical teams across ASEAN and supervised post-marketing studies for neuromodulator portfolios.",
      "In her new role, she will chair the medical review committee responsible for educational content, investigator-initiated study proposals, and engagement policies with key opinion leaders. She reports directly to the chief executive officer and participates in the executive committee shaping portfolio prioritization.",
      "Dr. Hartono stated her commitment to evidence-based practice, respectful collaboration with clinicians, and transparent safety communication. Immediate priorities include harmonizing medical training curricula, strengthening pharmacovigilance analytics, and aligning research investments with unmet medical needs identified through disciplined market listening.",
      "Employees and partners can expect introductory roadshows in Jakarta, Singapore, and virtual formats for remote affiliates. Selatox believes the appointment strengthens scientific credibility as the company scales distribution while maintaining promotional compliance.",
      "Biographical materials and high-resolution portraits are available to media upon request through corporate communications.",
    ]),
  },
  {
    id: 17,
    category: "Notice",
    date: "Dec 03, 2024",
    publishedYear: 2024,
    title: "Holiday Shipping Schedule for Q4 Distribution Partners.",
    imageSrc: IMAGES[5].src,
    imageAlt: IMAGES[5].alt,
    bodyHtml: bodyHtml([
      "Selatox Bio Pharma published its holiday shipping schedule for Q4 distribution partners, accounting for year-end customs processing delays, carrier capacity constraints, and planned warehouse inventory counts at the Cikarang campus. Partners should submit forecast adjustments by November 15 to support allocation decisions for high-demand SKUs.",
      "Last guaranteed departure dates for standard sea lanes and express air options are listed in the partner portal bulletin, with contingency recommendations for clinics maintaining safety stock within labeled storage limits. Customer service will staff reduced hours on national holidays while monitoring urgent clinic shortages.",
      "Temperature-controlled lanes require pre-booking; Selatox logistics will confirm slot availability within two business days of request receipt. Documentation for export shipments must be complete forty-eight hours before cargo acceptance to avoid holds.",
      "Partners are reminded to verify receiving capabilities during holiday closures at clinic warehouses, as undeliverable returns incur delays and potential cold-chain excursions. Selatox will not automatically reship refused deliveries without quality assessment.",
      "Updates to the schedule will be posted on the newsroom if carrier advisories change materially. This notice should be archived with local operations teams responsible for last-mile planning.",
    ]),
  },
  {
    id: 18,
    category: "Event",
    date: "Oct 21, 2024",
    publishedYear: 2024,
    title: "University Partnership on Bioprocess Engineering Announced.",
    imageSrc: IMAGES[8].src,
    imageAlt: IMAGES[8].alt,
    bodyHtml: bodyHtml([
      "Selatox Bio Pharma announced a multi-year university partnership focused on bioprocess engineering, combining academic research with industrial mentorship for graduate students studying fermentation science, downstream processing, and pharmaceutical quality systems. The collaboration establishes a shared seminar series, internship placements, and equipment access governed by safety and confidentiality agreements.",
      "Initial projects will explore productivity improvements in upstream culture monitoring and statistical approaches to reduce purification variability. Selatox scientists will co-supervise theses subject to publication review and intellectual property policies protecting commercially sensitive know-how.",
      "University leadership welcomed the partnership as a pathway to strengthen Indonesia's biomanufacturing talent pool and attract research funding aligned with national health priorities. Students will visit the Cikarang site on scheduled education days with personal protective equipment training completed in advance.",
      "Selatox emphasized that partnership activities remain separate from commercial GMP operations, with no experimental materials entering qualified production areas without formal change control. Community open days will share high-level manufacturing science concepts without disclosing proprietary parameters.",
      "Interested faculty may contact the corporate affairs desk for memorandum details and annual review calendars.",
    ]),
  },
];

export const newsArticles: NewsArticle[] = newsArticlesData.map((article) => ({
  ...article,
  slug: slugifyTitle(article.title),
}));

export function getNewsHref(slug: string): string {
  return `/news/${slug}`;
}

export function getNewsBySlug(slug: string): NewsArticle | undefined {
  return newsArticles.find((article) => article.slug === slug);
}

export function getNewsDescription(article: NewsArticle): string {
  const plain = article.bodyHtml
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return plain.length > 160 ? `${plain.slice(0, 157)}…` : plain;
}

export function getRecentNewsArticles(
  excludeSlug: string,
  limit: number
): NewsArticle[] {
  return newsArticles
    .filter((article) => article.slug !== excludeSlug)
    .slice(0, limit);
}
