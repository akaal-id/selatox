import {
  aboutContact,
  aboutExecutive,
  aboutHero,
  aboutRoadmap,
  aboutValues,
  type RoadmapMilestone,
} from "@/constants/about";

export type { RoadmapMilestone };
import {
  careerJourneyHero,
  careerJourneyIntro,
  careerPaths,
  openPositionsSection,
  talentNetwork,
  valueChain,
  whySelatox,
} from "@/constants/career-journey";
import {
  ethicsCommitment,
  ethicsHero,
  ethicsHotline,
  ethicsIntro,
  ethicsLeadership,
} from "@/constants/ethics";
import { jobListings, opportunitiesPage, type JobListing } from "@/constants/opportunities";
import { newsArticles, newsPage, type NewsArticle } from "@/constants/news";
import { products as fallbackProducts, type Product } from "@/constants/products";
import { ourBusinessManufacturing } from "@/constants/our-business";
import { researchFields } from "@/constants/researchfields";
import {
  mapCareerRow,
  mapNewsRow,
  mapProductRow,
  mapRoadmapRow,
  mapRndRow,
} from "@/lib/cms/mappers";
import { sortNewsRowsByPublishDate } from "@/lib/cms/news-cms";
import {
  fetchPublicCollection,
  fetchPublicSingleton,
} from "@/lib/cms/repository";

export const revalidate = 30;

// ─── Shared types ───────────────────────────────────────────────────────────

export type PageHeaderContent = {
  headline: string;
  sub: string;
  bgImage?: string;
  bgAlt?: string;
  lead?: string;
};

export type ContactChannelContent = {
  label: string;
  email: string;
};

export type ContactLocationContent = {
  id: string;
  name: string;
  location: string;
  role: string;
  mapQuery: string;
};

export type ContactSectionContent = {
  eyebrow: string;
  title: string;
  pageLead?: string;
  channels: ContactChannelContent[];
  locations: ContactLocationContent[];
};

export type AboutCoreValueContent = {
  id: string;
  name: string;
  description: string;
};

export type AboutValuesContent = {
  vision: { headline: string; sub: string };
  mission: { headline: string; sub: string };
  coreValues: AboutCoreValueContent[];
};

export type AboutExecutiveContent = {
  eyebrow: string;
  name: string;
  title: string;
  portrait: string;
  quoteHtml: string;
};

export type AboutRoadmapContent = {
  historyTitle: string;
  milestonesTitle: string;
  milestones: RoadmapMilestone[];
};

export type AboutPageContent = {
  header: PageHeaderContent;
  values: AboutValuesContent;
  executive: AboutExecutiveContent;
  roadmap: AboutRoadmapContent;
  contact: ContactSectionContent;
};

export type EthicsIntroContent = {
  eyebrow: string;
  headline: string;
  sub: string;
};

export type EthicsCommitmentContent = {
  eyebrow: string;
  commitments: { id: string; text: string }[];
  closing: string;
};

export type EthicsLeadershipContent = {
  eyebrow: string;
  name: string;
  title: string;
  quoteHtml: string;
};

export type EthicsHotlineCmsContent = {
  title: string;
  intro: string;
  contactEmail: string;
  reportableTitle: string;
  reportableItems: { title: string; description: string }[];
  protectionTitle: string;
  protectionIntro: string;
  protectionCards: { title: string; description: string }[];
  guidelinesTitle: string;
  guidelinesIntro: string;
  guidelines: string[];
  guidelinesNote: string;
  formTitle: string;
  formIntro: string;
  successTitle: string;
  successMessage: string;
};

export type EthicsPageContent = {
  header: PageHeaderContent;
  intro: EthicsIntroContent;
  commitment: EthicsCommitmentContent;
  leadership: EthicsLeadershipContent;
  hotline: EthicsHotlineCmsContent;
};

export type JourneyIntroContent = {
  eyebrow: string;
  headline: string;
  sub: string;
};

export type JourneyStrengthContent = {
  id: string;
  title: string;
  body: string;
};

export type JourneyStageContent = {
  id: string;
  title: string;
  description: string;
  tags: readonly string[];
};

export type JourneyPathContent = {
  id: string;
  title: string;
  description: string;
  tags: readonly string[];
};

export type JourneyOpenPositionsContent = {
  headline: string;
  sub: string;
  jobs: JobListing[];
};

export type JourneyTalentNetworkContent = {
  headline: string;
  sub: string;
  submitLabel: string;
  successTitle: string;
  successMessage: string;
};

export type JourneyPageContent = {
  header: PageHeaderContent;
  intro: JourneyIntroContent;
  whySelatox: { headline: string; strengths: JourneyStrengthContent[] };
  valueChain: {
    image: string;
    imageAlt: string;
    eyebrow: string;
    headline: string;
    sub: string;
    stages: JourneyStageContent[];
  };
  careerPaths: {
    headline: string;
    sub: string;
    paths: JourneyPathContent[];
  };
  openPositions: JourneyOpenPositionsContent;
  talentNetwork: JourneyTalentNetworkContent;
};

export type RndProgramContent = {
  title: string;
  regimen: string;
  phase: string;
  targetLaunch: string;
  description?: string;
};

export type ResearchSectionContent = {
  headline: string;
  subParagraphs: [string, string];
  focusAreas: string[];
  programs: RndProgramContent[];
};

export type OurBusinessManufacturingSectionContent = {
  headline: string;
  subParagraphs: [string, string];
  focusAreas: string[];
  video: string;
  catchphrase: string;
  pillars: { title: string; body: string }[];
};

export type GlobalPartnershipsContent = {
  headline: string;
  sub: string;
  focusAreas: string[];
  closingHeadline: string;
  closingSub: string;
};

export type OurBusinessPageContent = {
  header: PageHeaderContent;
  research: ResearchSectionContent;
  manufacturing: OurBusinessManufacturingSectionContent;
  partnerships: GlobalPartnershipsContent;
};

export type ManufacturingMetricContent = {
  label: string;
  value: string;
  detail: string;
};

export type ManufacturingPageContent = {
  header: PageHeaderContent;
  scale: { headline: string; metrics: ManufacturingMetricContent[] };
  process: {
    imageSrc: string;
    imageAlt: string;
    headline: string;
    sub: string;
  };
  quality: { headline: string; sub: string; points: string[] };
  workplace: {
    headline: string;
    sub: string;
    imageSrc: string;
    imageAlt: string;
  };
};

export type NewsPageMeta = {
  title: string;
  subtitle: string;
};

// ─── Helpers ────────────────────────────────────────────────────────────────

const JOB_STATUS_SORT_ORDER = {
  Open: 0,
  "Closing Soon": 1,
  Closed: 2,
} as const;

const CORE_VALUE_IDS = ["excellence", "innovation", "integrity", "partnership"] as const;
const COMMITMENT_IDS = ethicsCommitment.commitments.map((c) => c.id);

function pick(row: string | null | undefined, fallback: string): string {
  const value = row?.trim();
  return value || fallback;
}

function pickField(
  row: Record<string, unknown> | null,
  key: string,
  fallback: string
): string {
  if (!row) return fallback;
  return pick(row[key] as string, fallback);
}

function toRndProgram(row: Record<string, unknown>): RndProgramContent {
  const mapped = mapRndRow(row);
  return {
    title: mapped.title,
    regimen: mapped.regimen,
    phase: mapped.phase,
    targetLaunch: mapped.targetLaunch,
    description: mapped.description,
  };
}

function sortCareers(jobs: JobListing[]): JobListing[] {
  return [...jobs].sort(
    (a, b) => JOB_STATUS_SORT_ORDER[a.status] - JOB_STATUS_SORT_ORDER[b.status]
  );
}

function buildFallbackContact(): ContactSectionContent {
  return {
    eyebrow: aboutContact.eyebrow,
    title: aboutContact.title,
    pageLead:
      "Reach the right team directly, or visit us at one of our two sites across West Java, Indonesia.",
    channels: aboutContact.channels.map((c) => ({ label: c.label, email: c.email })),
    locations: aboutContact.locations.map((loc) => ({
      id: loc.id,
      name: loc.name,
      location: loc.location,
      role: loc.role,
      mapQuery: loc.mapQuery,
    })),
  };
}

function mapContactRow(
  row: Record<string, unknown> | null,
  fallback: ContactSectionContent
): ContactSectionContent {
  if (!row) return fallback;

  return {
    eyebrow: aboutContact.eyebrow,
    title: pick(row.title as string, fallback.title),
    pageLead: pick(row.page_lead as string, fallback.pageLead ?? ""),
    channels: [
      {
        label: pick(row.channel_1_label as string, fallback.channels[0]?.label ?? ""),
        email: pick(row.channel_1_email as string, fallback.channels[0]?.email ?? ""),
      },
      {
        label: pick(row.channel_2_label as string, fallback.channels[1]?.label ?? ""),
        email: pick(row.channel_2_email as string, fallback.channels[1]?.email ?? ""),
      },
      {
        label: pick(row.channel_3_label as string, fallback.channels[2]?.label ?? ""),
        email: pick(row.channel_3_email as string, fallback.channels[2]?.email ?? ""),
      },
      {
        label: pick(row.channel_4_label as string, fallback.channels[3]?.label ?? ""),
        email: pick(row.channel_4_email as string, fallback.channels[3]?.email ?? ""),
      },
    ],
    locations: [
      {
        id: "depok",
        name: pick(row.location_depok_name as string, fallback.locations[0]?.name ?? ""),
        location: pick(row.location_depok_address as string, fallback.locations[0]?.location ?? ""),
        role: pick(row.location_depok_role as string, fallback.locations[0]?.role ?? ""),
        mapQuery: pick(
          row.location_depok_map_query as string,
          fallback.locations[0]?.mapQuery ?? ""
        ),
      },
      {
        id: "cikarang",
        name: pick(row.location_cikarang_name as string, fallback.locations[1]?.name ?? ""),
        location: pick(
          row.location_cikarang_address as string,
          fallback.locations[1]?.location ?? ""
        ),
        role: pick(row.location_cikarang_role as string, fallback.locations[1]?.role ?? ""),
        mapQuery: pick(
          row.location_cikarang_map_query as string,
          fallback.locations[1]?.mapQuery ?? ""
        ),
      },
    ],
  };
}

// ─── About ──────────────────────────────────────────────────────────────────

function buildFallbackAboutContent(): AboutPageContent {
  const contact = buildFallbackContact();
  delete contact.pageLead;

  return {
    header: {
      headline: aboutHero.headline,
      sub: aboutHero.subheadline,
      bgImage: aboutHero.backgroundImage,
    },
    values: {
      vision: {
        headline: aboutValues.vision.split("—")[0]?.trim() ?? aboutValues.vision,
        sub: aboutValues.vision.split("—").slice(1).join("—").trim(),
      },
      mission: {
        headline: aboutValues.mission.split("—")[0]?.trim() ?? aboutValues.mission,
        sub: aboutValues.mission.split("—").slice(1).join("—").trim(),
      },
      coreValues: aboutValues.coreValues.map((v) => ({
        id: v.id,
        name: v.name,
        description: v.description,
      })),
    },
    executive: {
      eyebrow: aboutExecutive.eyebrow,
      name: aboutExecutive.name,
      title: aboutExecutive.title,
      portrait: aboutExecutive.portrait,
      quoteHtml: `<p>At Selatox, our commitment goes beyond manufacturing;</p><p>it is about establishing a sustainable, world-class bio-ecosystem in Indonesia.</p><p>Through strategic partnerships, rigorous talent discovery, and an unwavering adherence to quality, we are not just entering the global market—we are <em>preparing to lead it.</em></p>`,
    },
    roadmap: {
      historyTitle: aboutRoadmap.historyTitle,
      milestonesTitle: aboutRoadmap.milestonesTitle,
      milestones: aboutRoadmap.milestones.map((m) => ({ ...m, items: [...m.items] })),
    },
    contact,
  };
}

export async function getAboutPageContent(): Promise<AboutPageContent> {
  const fallback = buildFallbackAboutContent();
  const [row, roadmapRows, contactRow] = await Promise.all([
    fetchPublicSingleton("about"),
    fetchPublicCollection("roadmap", {
      filters: { is_published: true },
      orderBy: { column: "sort_order", ascending: true },
    }),
    fetchPublicSingleton("contact"),
  ]);

  const content = { ...fallback };

  if (row) {
    content.header = {
      headline: pick(row.header_headline as string, fallback.header.headline),
      sub: pick(row.header_sub as string, fallback.header.sub),
      bgImage: pick(row.header_bg_image as string, fallback.header.bgImage ?? ""),
    };
    content.values = {
      vision: {
        headline: pick(row.value_vision_headline as string, fallback.values.vision.headline),
        sub: pick(row.value_vision_sub as string, fallback.values.vision.sub),
      },
      mission: {
        headline: pick(row.value_mission_headline as string, fallback.values.mission.headline),
        sub: pick(row.value_mission_sub as string, fallback.values.mission.sub),
      },
      coreValues: CORE_VALUE_IDS.map((id, index) => {
        const n = index + 1;
        const fb = fallback.values.coreValues[index];
        return {
          id,
          name: pick(row[`core_value_${n}_name`] as string, fb?.name ?? ""),
          description: pick(row[`core_value_${n}_sub`] as string, fb?.description ?? ""),
        };
      }),
    };
    content.executive = {
      eyebrow: aboutExecutive.eyebrow,
      name: pick(row.executive_name as string, fallback.executive.name),
      title: pick(row.executive_title as string, fallback.executive.title),
      portrait: pick(row.executive_portrait as string, fallback.executive.portrait),
      quoteHtml: pick(row.executive_quote as string, fallback.executive.quoteHtml),
    };
    content.roadmap = {
      historyTitle: pick(
        row.roadmap_history_title as string,
        fallback.roadmap.historyTitle
      ),
      milestonesTitle: pick(
        row.roadmap_milestones_title as string,
        fallback.roadmap.milestonesTitle
      ),
      milestones: fallback.roadmap.milestones,
    };
  }

  if (roadmapRows.length) {
    content.roadmap.milestones = roadmapRows.map(mapRoadmapRow);
  }

  const contactFallback = buildFallbackContact();
  delete contactFallback.pageLead;
  content.contact = mapContactRow(contactRow, contactFallback);

  return content;
}

// ─── Contact page ───────────────────────────────────────────────────────────

export async function getContactPageContent(): Promise<ContactSectionContent> {
  const fallback = buildFallbackContact();
  const row = await fetchPublicSingleton("contact");
  return mapContactRow(row, fallback);
}

// ─── Ethics ─────────────────────────────────────────────────────────────────

function buildFallbackEthicsContent(): EthicsPageContent {
  return {
    header: {
      headline: ethicsHero.headline,
      sub: ethicsHero.subheadline,
      bgImage: ethicsHero.backgroundImage,
      bgAlt: ethicsHero.backgroundAlt,
    },
    intro: {
      eyebrow: ethicsIntro.eyebrow,
      headline: "Conducting Business with<br><em>Integrity &amp; Accountability</em>",
      sub: `<p>${ethicsIntro.paragraphs.join("</p><p>")}</p>`,
    },
    commitment: {
      eyebrow: ethicsCommitment.eyebrow,
      commitments: ethicsCommitment.commitments.map((c) => ({
        id: c.id,
        text: c.text,
      })),
      closing: ethicsCommitment.closing,
    },
    leadership: {
      eyebrow: ethicsLeadership.eyebrow,
      name: ethicsLeadership.name,
      title: ethicsLeadership.title,
      quoteHtml: `<p>At Selatox, we believe that scientific innovation and business success must be accompanied by strong ethical principles. As we continue to expand our global presence, we remain committed to conducting our business responsibly, transparently, and in full compliance with applicable laws and regulations.</p><p>Our commitment extends beyond compliance—it reflects our responsibility to patients, healthcare professionals, partners, employees, and communities worldwide. We encourage all employees and stakeholders to speak up when they encounter concerns and to actively contribute to a culture built on trust, accountability, and mutual respect. By upholding these values, we will continue to strengthen Selatox as a <em>trusted global biopharmaceutical company.</em></p>`,
    },
    hotline: {
      title: ethicsHotline.title,
      intro: ethicsHotline.intro,
      contactEmail: ethicsHotline.contactEmail,
      reportableTitle: ethicsHotline.reportableTitle,
      reportableItems: ethicsHotline.reportableItems.map((item) => ({
        title: item.title,
        description: item.description,
      })),
      protectionTitle: ethicsHotline.protectionTitle,
      protectionIntro: ethicsHotline.protectionIntro,
      protectionCards: ethicsHotline.protectionCards.map((card) => ({
        title: card.title,
        description: card.description,
      })),
      guidelinesTitle: ethicsHotline.guidelinesTitle,
      guidelinesIntro: ethicsHotline.guidelinesIntro,
      guidelines: [...ethicsHotline.guidelines],
      guidelinesNote: ethicsHotline.guidelinesNote,
      formTitle: ethicsHotline.formTitle,
      formIntro: ethicsHotline.formIntro,
      successTitle: ethicsHotline.successTitle,
      successMessage: ethicsHotline.successMessage,
    },
  };
}

export async function getEthicsPageContent(): Promise<EthicsPageContent> {
  const fallback = buildFallbackEthicsContent();
  const row = await fetchPublicSingleton("ethics");
  if (!row) return fallback;

  const commitments = COMMITMENT_IDS.map((id, index) => {
    const n = index + 1;
    return {
      id,
      text: pick(
        row[`commitment_${n}_text`] as string,
        fallback.commitment.commitments[index]?.text ?? ""
      ),
    };
  });

  const reportableItems = [1, 2, 3, 4, 5].map((n, index) => ({
    title: pick(
      row[`hotline_reportable_${n}_title`] as string,
      fallback.hotline.reportableItems[index]?.title ?? ""
    ),
    description: pick(
      row[`hotline_reportable_${n}_sub`] as string,
      fallback.hotline.reportableItems[index]?.description ?? ""
    ),
  }));

  const protectionCards = [1, 2].map((n, index) => ({
    title: pick(
      row[`hotline_protection_${n}_title`] as string,
      fallback.hotline.protectionCards[index]?.title ?? ""
    ),
    description: pick(
      row[`hotline_protection_${n}_sub`] as string,
      fallback.hotline.protectionCards[index]?.description ?? ""
    ),
  }));

  const guidelines = [1, 2, 3, 4, 5, 6].map((n, index) =>
    pick(
      row[`hotline_guideline_${n}`] as string,
      fallback.hotline.guidelines[index] ?? ""
    )
  );

  return {
    header: {
      headline: pick(row.header_headline as string, fallback.header.headline),
      sub: pick(row.header_sub as string, fallback.header.sub),
      bgImage: pick(row.header_bg_image as string, fallback.header.bgImage ?? ""),
      bgAlt: pick(row.header_bg_alt as string, fallback.header.bgAlt ?? ""),
    },
    intro: {
      eyebrow: ethicsIntro.eyebrow,
      headline: pick(row.intro_headline as string, fallback.intro.headline),
      sub: pick(row.intro_sub as string, fallback.intro.sub),
    },
    commitment: {
      eyebrow: ethicsCommitment.eyebrow,
      commitments,
      closing: pick(row.commitment_closing as string, fallback.commitment.closing),
    },
    leadership: {
      eyebrow: pick(row.leadership_heading as string, fallback.leadership.eyebrow),
      name: pick(row.leadership_name as string, fallback.leadership.name),
      title: pick(row.leadership_title as string, fallback.leadership.title),
      quoteHtml: pick(row.leadership_quote as string, fallback.leadership.quoteHtml),
    },
    hotline: {
      title: pick(row.hotline_title as string, fallback.hotline.title),
      intro: pick(row.hotline_intro as string, fallback.hotline.intro),
      contactEmail: pick(
        row.hotline_contact_email as string,
        fallback.hotline.contactEmail
      ),
      reportableTitle: pick(
        row.hotline_reportable_title as string,
        fallback.hotline.reportableTitle
      ),
      reportableItems,
      protectionTitle: pick(
        row.hotline_protection_title as string,
        fallback.hotline.protectionTitle
      ),
      protectionIntro: pick(
        row.hotline_protection_intro as string,
        fallback.hotline.protectionIntro
      ),
      protectionCards,
      guidelinesTitle: pick(
        row.hotline_guidelines_title as string,
        fallback.hotline.guidelinesTitle
      ),
      guidelinesIntro: pick(
        row.hotline_guidelines_intro as string,
        fallback.hotline.guidelinesIntro
      ),
      guidelines,
      guidelinesNote: pick(
        row.hotline_guidelines_note as string,
        fallback.hotline.guidelinesNote
      ),
      formTitle: pick(row.hotline_form_title as string, fallback.hotline.formTitle),
      formIntro: pick(row.hotline_form_intro as string, fallback.hotline.formIntro),
      successTitle: pick(
        row.hotline_success_title as string,
        fallback.hotline.successTitle
      ),
      successMessage: pick(
        row.hotline_success_message as string,
        fallback.hotline.successMessage
      ),
    },
  };
}

// ─── Journey ────────────────────────────────────────────────────────────────

function buildFallbackJourneyContent(): JourneyPageContent {
  return {
    header: {
      headline: careerJourneyHero.title,
      sub: careerJourneyHero.subtitle,
      bgImage: careerJourneyHero.backgroundImage,
      bgAlt: careerJourneyHero.backgroundAlt,
    },
    intro: {
      eyebrow: careerJourneyIntro.eyebrow,
      headline: `${careerJourneyIntro.headlineLead}<br><em>${careerJourneyIntro.headlineAccent}</em>`,
      sub: `<p>Great visions become reality through the <em>dedication, expertise, and courage</em> of individuals. Join exceptional colleagues, take ownership without limits, and experience the excitement of growing alongside a company shaping the future of bio-aesthetics. Selatox is a biopharmaceutical company that covers the <em>entire value chain — from research and development, to GMP manufacturing, to global commercialization</em>. Here, your work is never isolated: every experiment, batch, and partnership moves us closer to delivering <em>trusted aesthetic solutions to the world</em>.</p>`,
    },
    whySelatox: {
      headline: whySelatox.title,
      strengths: whySelatox.strengths.map((s) => ({
        id: s.id,
        title: s.title,
        body: s.body,
      })),
    },
    valueChain: {
      image: valueChain.image,
      imageAlt: valueChain.imageAlt,
      eyebrow: valueChain.eyebrow,
      headline: valueChain.title,
      sub: valueChain.lead,
      stages: valueChain.stages.map((stage) => ({
        id: stage.id,
        title: stage.title,
        description: stage.description,
        tags: stage.tags,
      })),
    },
    careerPaths: {
      headline: careerPaths.title,
      sub: careerPaths.lead,
      paths: careerPaths.paths.map((path) => ({
        id: path.id,
        title: path.title,
        description: path.description,
        tags: path.tags,
      })),
    },
    openPositions: {
      headline: openPositionsSection.title,
      sub: openPositionsSection.lead,
      jobs: jobListings
        .filter((job) => job.status !== "Closed")
        .sort((a, b) => JOB_STATUS_SORT_ORDER[a.status] - JOB_STATUS_SORT_ORDER[b.status])
        .slice(0, 6),
    },
    talentNetwork: {
      headline: talentNetwork.title,
      sub: talentNetwork.subtitle,
      submitLabel: talentNetwork.submitLabel,
      successTitle: talentNetwork.successTitle,
      successMessage: talentNetwork.successMessage,
    },
  };
}

export async function getJourneyPageContent(): Promise<JourneyPageContent> {
  const fallback = buildFallbackJourneyContent();
  const [row, careerRows] = await Promise.all([
    fetchPublicSingleton("journey"),
    fetchPublicCollection("careers", {
      orderBy: { column: "sort_order", ascending: true },
    }),
  ]);

  const content = { ...fallback };

  if (row) {
    content.header = {
      headline: pick(row.header_headline as string, fallback.header.headline),
      sub: pick(row.header_sub as string, fallback.header.sub),
      bgImage: pick(row.header_bg_image as string, fallback.header.bgImage ?? ""),
      bgAlt: pick(row.header_bg_alt as string, fallback.header.bgAlt ?? ""),
    };
    content.intro = {
      eyebrow: careerJourneyIntro.eyebrow,
      headline: pick(row.intro_headline as string, fallback.intro.headline),
      sub: pick(row.intro_sub as string, fallback.intro.sub),
    };
    content.whySelatox = {
      headline: pick(row.why_headline as string, fallback.whySelatox.headline),
      strengths: whySelatox.strengths.map((s, index) => {
        const n = index + 1;
        return {
          id: s.id,
          title: pick(
            row[`why_strength_${n}_headline`] as string,
            fallback.whySelatox.strengths[index]?.title ?? ""
          ),
          body: pick(
            row[`why_strength_${n}_sub`] as string,
            fallback.whySelatox.strengths[index]?.body ?? ""
          ),
        };
      }),
    };
    content.valueChain = {
      image: pick(row.value_chain_image as string, fallback.valueChain.image),
      imageAlt: pick(row.value_chain_image_alt as string, fallback.valueChain.imageAlt),
      eyebrow: valueChain.eyebrow,
      headline: pick(row.value_chain_headline as string, fallback.valueChain.headline),
      sub: pick(row.value_chain_sub as string, fallback.valueChain.sub),
      stages: valueChain.stages.map((stage, index) => {
        const n = index + 1;
        return {
          id: stage.id,
          title: pick(
            row[`value_chain_stage_${n}_headline`] as string,
            fallback.valueChain.stages[index]?.title ?? ""
          ),
          description: pick(
            row[`value_chain_stage_${n}_sub`] as string,
            fallback.valueChain.stages[index]?.description ?? ""
          ),
          tags: stage.tags,
        };
      }),
    };
    content.careerPaths = {
      headline: pick(
        row.career_paths_headline as string,
        fallback.careerPaths.headline
      ),
      sub: pick(row.career_paths_sub as string, fallback.careerPaths.sub),
      paths: careerPaths.paths.map((path, index) => {
        const n = index + 1;
        return {
          id: path.id,
          title: pick(
            row[`career_path_${n}_headline`] as string,
            fallback.careerPaths.paths[index]?.title ?? ""
          ),
          description: pick(
            row[`career_path_${n}_sub`] as string,
            fallback.careerPaths.paths[index]?.description ?? ""
          ),
          tags: path.tags,
        };
      }),
    };
    content.openPositions = {
      headline: pick(
        row.open_positions_headline as string,
        fallback.openPositions.headline
      ),
      sub: pick(row.open_positions_sub as string, fallback.openPositions.sub),
      jobs: fallback.openPositions.jobs,
    };
    content.talentNetwork = {
      headline: pick(
        row.talent_network_headline as string,
        fallback.talentNetwork.headline
      ),
      sub: pick(row.talent_network_sub as string, fallback.talentNetwork.sub),
      submitLabel: pick(
        row.talent_network_submit_label as string,
        fallback.talentNetwork.submitLabel
      ),
      successTitle: pick(
        row.talent_network_success_title as string,
        fallback.talentNetwork.successTitle
      ),
      successMessage: pick(
        row.talent_network_success_message as string,
        fallback.talentNetwork.successMessage
      ),
    };
  }

  if (careerRows.length) {
    content.openPositions.jobs = careerRows
      .map(mapCareerRow)
      .filter((job) => job.status !== "Closed")
      .sort((a, b) => JOB_STATUS_SORT_ORDER[a.status] - JOB_STATUS_SORT_ORDER[b.status])
      .slice(0, 6);
  }

  return content;
}

// ─── Our Business ───────────────────────────────────────────────────────────

function buildFallbackOurBusinessContent(): OurBusinessPageContent {
  return {
    header: {
      headline: "From Discovery to Delivery",
      sub: "Selatox integrates research, innovation, manufacturing, and global business development to create sustainable value across the aesthetic biotechnology industry.",
    },
    research: {
      headline: "Creating the Science Behind Tomorrow's Aesthetics",
      subParagraphs: [
        "At Selatox, innovation begins with research. Our dedicated R&D capabilities support the development of next-generation aesthetic solutions, process optimization, and future pipeline opportunities.",
        "By combining scientific expertise with practical manufacturing knowledge, we transform ideas into scalable and commercially viable solutions.",
      ],
      focusAreas: [
        "Product and formulation development",
        "Process optimization",
        "Analytical and quality innovation",
        "Future pipeline development",
      ],
      programs: researchFields.map((field) => ({
        title: field.title,
        regimen: field.regimen,
        phase: field.phase,
        targetLaunch: field.targetLaunch,
        description: field.description,
      })),
    },
    manufacturing: {
      headline: "Bringing Innovation to Life",
      subParagraphs: [
        "From development to commercial production, Selatox integrates scientific expertise with advanced GMP manufacturing capabilities to deliver safe, reliable, and high-quality aesthetic products.",
        "Led by SELATOXIN, our manufacturing platform is designed to meet the highest international standards while supporting future portfolio expansion.",
      ],
      focusAreas: [
        "Pharmaceutical manufacturing",
        "Quality assurance",
        "Commercial production",
      ],
      video: ourBusinessManufacturing.video,
      catchphrase: ourBusinessManufacturing.catchphrase,
      pillars: ourBusinessManufacturing.pillars.map((p) => ({
        title: p.title,
        body: p.body,
      })),
    },
    partnerships: {
      headline: "Expanding Innovation Beyond Borders",
      sub: "We collaborate with partners worldwide to accelerate market access, create new business opportunities, and deliver innovative aesthetic solutions to healthcare professionals and patients across global markets.",
      focusAreas: [
        "Licensing opportunities",
        "Strategic partnerships",
        "Export business",
        "Global market expansion",
      ],
      closingHeadline: "Let's Build the Future Together",
      closingSub: `For research collaboration, business development, and partnership opportunities, please reach out to us at <a href="mailto:contact@selatox.com">contact@selatox.com</a>.`,
    },
  };
}

export async function getOurBusinessPageContent(): Promise<OurBusinessPageContent> {
  const fallback = buildFallbackOurBusinessContent();
  const [row, rndRows] = await Promise.all([
    fetchPublicSingleton("our_business"),
    fetchPublicCollection("rnd", {
      filters: { is_published: true },
      orderBy: { column: "sort_order", ascending: true },
    }),
  ]);

  const content = { ...fallback };

  if (row) {
    content.header = {
      headline: pick(row.header_headline as string, fallback.header.headline),
      sub: pick(row.header_sub as string, fallback.header.sub),
    };
    content.research = {
      headline: pick(row.research_headline as string, fallback.research.headline),
      subParagraphs: [
        pick(row.research_sub_1 as string, fallback.research.subParagraphs[0]),
        pick(row.research_sub_2 as string, fallback.research.subParagraphs[1]),
      ],
      focusAreas: [1, 2, 3, 4].map((n, index) =>
        pick(
          row[`research_focus_${n}`] as string,
          fallback.research.focusAreas[index] ?? ""
        )
      ),
      programs: fallback.research.programs,
    };
    content.manufacturing = {
      headline: pick(
        row.manufacturing_headline as string,
        fallback.manufacturing.headline
      ),
      subParagraphs: [
        pick(row.manufacturing_sub_1 as string, fallback.manufacturing.subParagraphs[0]),
        pick(row.manufacturing_sub_2 as string, fallback.manufacturing.subParagraphs[1]),
      ],
      focusAreas: [1, 2, 3].map((n, index) =>
        pick(
          row[`manufacturing_focus_${n}`] as string,
          fallback.manufacturing.focusAreas[index] ?? ""
        )
      ),
      video: pick(row.manufacturing_video as string, fallback.manufacturing.video),
      catchphrase: pick(
        row.manufacturing_catchphrase as string,
        fallback.manufacturing.catchphrase
      ),
      pillars: [1, 2, 3, 4].map((n, index) => ({
        title: pick(
          row[`manufacturing_pillar_${n}_headline`] as string,
          fallback.manufacturing.pillars[index]?.title ?? ""
        ),
        body: pick(
          row[`manufacturing_pillar_${n}_sub`] as string,
          fallback.manufacturing.pillars[index]?.body ?? ""
        ),
      })),
    };
    content.partnerships = {
      headline: pick(
        row.partnerships_headline as string,
        fallback.partnerships.headline
      ),
      sub: pick(row.partnerships_sub as string, fallback.partnerships.sub),
      focusAreas: [1, 2, 3, 4].map((n, index) =>
        pick(
          row[`partnerships_focus_${n}`] as string,
          fallback.partnerships.focusAreas[index] ?? ""
        )
      ),
      closingHeadline: pick(
        row.partnerships_closing_headline as string,
        fallback.partnerships.closingHeadline
      ),
      closingSub: pick(
        row.partnerships_closing_sub as string,
        fallback.partnerships.closingSub
      ),
    };
  }

  if (rndRows.length) {
    content.research.programs = rndRows.map(toRndProgram);
  }

  return content;
}

// ─── Manufacturing subpage ──────────────────────────────────────────────────

function buildFallbackManufacturingContent(): ManufacturingPageContent {
  return {
    header: {
      headline: "Engineered for\nGlobal Scale",
      sub: "World-class biopharmaceutical manufacturing.",
      lead: "Located in Cikarang, our expansive facility represents the pinnacle of modern production. As Indonesia's first specialized botulinum toxin manufacturer, we combine state-of-the-art automation with uncompromising quality controls to deliver premium aesthetic solutions to the world.",
    },
    scale: {
      headline: "The Scale of Excellence",
      metrics: [
        {
          label: "Total Facility Area",
          value: "18,469.36m²",
          detail: "Integrated cleanroom manufacturing campus in Cikarang.",
        },
        {
          label: "Annual Capacity",
          value: "6.5 Million Vials",
          detail: "Scalable production architecture for global distribution.",
        },
        {
          label: "Filling Speed",
          value: "200 Vials / Minute",
          detail: "High-speed, aseptic precision with continuous quality checks.",
        },
        {
          label: "Production Focus",
          value: "Specialized Botulinum Toxin Solutions",
          detail: "Purpose-built for pharmaceutical-grade aesthetic therapeutics.",
        },
      ],
    },
    process: {
      imageSrc: "/images/our-business/facility-main.webp",
      imageAlt: "Automated pharmaceutical processing line",
      headline: "Absolute Purity. Fully Automated.",
      sub: "Perfection requires total control. Our manufacturing hub is equipped with the industry's most innovative aseptic manufacturing systems, designed to completely prevent contamination at every single stage of production. Utilizing a fully automated lyophilization and high-speed filling process, we guarantee flawless consistency and the highest pharmaceutical quality in every vial we produce.",
    },
    quality: {
      headline: "Uncompromising Safety Standards",
      sub: "Excellence is our baseline. We rigorously maintain safety, cleanliness, and quality across every stage of production through strict GMP (Good Manufacturing Practice) compliance. By integrating the proven technology and globally recognized quality management systems of NABOTA, our facility aligns with the highest international regulatory benchmarks.",
      points: [
        "Chemical and Microbiological Release Tests",
        "Advanced Cell-Based Assays",
        "Long-term Stability Testing",
        "24/7 Environmental Monitoring",
      ],
    },
    workplace: {
      headline: "A Culture of Agility",
      sub: 'Behind our advanced machinery is a team of dedicated experts. The Cikarang facility features a modern "Smart Office" designed to enhance autonomy and efficiency. By fostering an agile, result-only work environment, we encourage open communication and seamless collaboration across all our engineering and quality control departments.',
      imageSrc: "/images/our-business/about-main.webp",
      imageAlt: "Selatox team collaboration and workplace innovation",
    },
  };
}

export async function getManufacturingPageContent(): Promise<ManufacturingPageContent> {
  const fallback = buildFallbackManufacturingContent();
  const row = await fetchPublicSingleton("manufacturing");
  if (!row) return fallback;

  return {
    header: {
      headline: pick(row.header_headline as string, fallback.header.headline),
      sub: pick(row.header_sub as string, fallback.header.sub),
      lead: pick(row.header_lead as string, fallback.header.lead ?? ""),
    },
    scale: {
      headline: pick(row.scale_headline as string, fallback.scale.headline),
      metrics: [1, 2, 3, 4].map((n, index) => ({
        label: pick(
          row[`metric_${n}_label`] as string,
          fallback.scale.metrics[index]?.label ?? ""
        ),
        value: pick(
          row[`metric_${n}_value`] as string,
          fallback.scale.metrics[index]?.value ?? ""
        ),
        detail: pick(
          row[`metric_${n}_detail`] as string,
          fallback.scale.metrics[index]?.detail ?? ""
        ),
      })),
    },
    process: {
      imageSrc: pick(row.process_image_src as string, fallback.process.imageSrc),
      imageAlt: pick(row.process_image_alt as string, fallback.process.imageAlt),
      headline: pick(row.process_headline as string, fallback.process.headline),
      sub: pick(row.process_sub as string, fallback.process.sub),
    },
    quality: {
      headline: pick(row.quality_headline as string, fallback.quality.headline),
      sub: pick(row.quality_sub as string, fallback.quality.sub),
      points: [1, 2, 3, 4].map((n, index) =>
        pick(
          row[`quality_point_${n}`] as string,
          fallback.quality.points[index] ?? ""
        )
      ),
    },
    workplace: {
      headline: pick(row.workplace_headline as string, fallback.workplace.headline),
      sub: pick(row.workplace_sub as string, fallback.workplace.sub),
      imageSrc: pick(row.workplace_image_src as string, fallback.workplace.imageSrc),
      imageAlt: pick(row.workplace_image_alt as string, fallback.workplace.imageAlt),
    },
  };
}

// ─── Products, news, careers (list & detail pages) ──────────────────────────

export async function getProducts(): Promise<Product[]> {
  const rows = await fetchPublicCollection("products", {
    filters: { is_published: true },
    orderBy: { column: "sort_order", ascending: true },
  });

  if (!rows.length) return fallbackProducts;
  return rows.map(mapProductRow);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const rows = await fetchPublicCollection("products", {
    filters: { is_published: true, slug },
    limit: 1,
  });

  if (rows[0]) return mapProductRow(rows[0]);
  return fallbackProducts.find((product) => product.slug === slug) ?? null;
}

export async function getProductSlugs(): Promise<string[]> {
  const products = await getProducts();
  return products.map((product) => product.slug);
}

export async function getNewsArticles(): Promise<NewsArticle[]> {
  const rows = await fetchPublicCollection("news", {
    filters: { status: "published" },
    orderBy: { column: "created_at", ascending: false },
  });

  if (!rows.length) return newsArticles;
  return sortNewsRowsByPublishDate(rows).map(mapNewsRow);
}

export async function getNewsBySlug(slug: string): Promise<NewsArticle | null> {
  const rows = await fetchPublicCollection("news", {
    filters: { status: "published", slug },
    limit: 1,
  });

  if (rows[0]) return mapNewsRow(rows[0]);
  return newsArticles.find((article) => article.slug === slug) ?? null;
}

export async function getNewsSlugs(): Promise<string[]> {
  const articles = await getNewsArticles();
  return articles.map((article) => article.slug);
}

export async function getNewsPageMeta(): Promise<NewsPageMeta> {
  const row = await fetchPublicSingleton("newsroom");

  return {
    title: pickField(row, "title", newsPage.title),
    subtitle: pickField(row, "subtitle", newsPage.subtitle),
  };
}

export async function getCareers(): Promise<JobListing[]> {
  const rows = await fetchPublicCollection("careers", {
    orderBy: { column: "sort_order", ascending: true },
  });

  if (!rows.length) return sortCareers(jobListings);
  return sortCareers(rows.map(mapCareerRow));
}

export async function getCareerBySlug(slug: string): Promise<JobListing | null> {
  const rows = await fetchPublicCollection("careers", {
    filters: { slug },
    limit: 1,
  });

  if (rows[0]) return mapCareerRow(rows[0]);
  return jobListings.find((career) => career.slug === slug) ?? null;
}

export async function getCareerSlugs(): Promise<string[]> {
  const careers = await getCareers();
  return careers.map((career) => career.slug);
}

export async function getOpeningsPageTitle(): Promise<string> {
  const row = await fetchPublicSingleton("openings");
  return pickField(row, "title", opportunitiesPage.title);
}
