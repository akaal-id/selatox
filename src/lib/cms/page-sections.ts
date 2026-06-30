import type { CmsLinkedModule } from "@/lib/cms/home";

export type PagePillarDef = {
  headlineKey: string;
  subKey: string;
  label: string;
};

export type PageSectionDef = {
  id: string;
  title: string;
  description: string;
  keys?: string[];
  pillars?: PagePillarDef[];
  linkedModule?: CmsLinkedModule;
  collectionSlug?: string;
  pillarsFirst?: boolean;
};

export type PageSectionsConfig = {
  slug: string;
  label: string;
  defaultSectionId: string;
  sections: PageSectionDef[];
};

const PAGE_SECTIONS: PageSectionsConfig[] = [
  {
    slug: "about",
    label: "About",
    defaultSectionId: "header",
    sections: [
      {
        id: "header",
        title: "Header",
        description: "Page hero headline, subheadline, and background image.",
        keys: ["header_headline", "header_sub", "header_bg_image"],
      },
      {
        id: "values",
        title: "Vision & Values",
        description: "Vision, mission, and core value cards.",
        pillarsFirst: true,
        pillars: [
          {
            headlineKey: "value_vision_headline",
            subKey: "value_vision_sub",
            label: "Vision",
          },
          {
            headlineKey: "value_mission_headline",
            subKey: "value_mission_sub",
            label: "Mission",
          },
        ],
        keys: [
          "values_title",
          "core_value_1_name",
          "core_value_1_sub",
          "core_value_2_name",
          "core_value_2_sub",
          "core_value_3_name",
          "core_value_3_sub",
          "core_value_4_name",
          "core_value_4_sub",
        ],
      },
      {
        id: "executive",
        title: "Leadership",
        description: "Executive name, title, and quote.",
        keys: ["executive_name", "executive_title", "executive_quote"],
      },
      {
        id: "roadmap",
        title: "Roadmap",
        description: "Section titles and timeline entries for the about page.",
        keys: ["roadmap_history_title", "roadmap_milestones_title"],
        collectionSlug: "roadmap",
      },
    ],
  },
  {
    slug: "contact",
    label: "Contact",
    defaultSectionId: "header",
    sections: [
      {
        id: "header",
        title: "Header",
        description: "Page title and lead paragraph.",
        keys: ["title", "page_lead"],
      },
      {
        id: "channels",
        title: "Contact channels",
        description: "Email channels for business, HR, PR, and compliance.",
        keys: [
          "channel_1_label",
          "channel_1_email",
          "channel_2_label",
          "channel_2_email",
          "channel_3_label",
          "channel_3_email",
          "channel_4_label",
          "channel_4_email",
        ],
      },
      {
        id: "locations",
        title: "Locations",
        description: "Depok and Cikarang office details.",
        keys: [
          "location_depok_name",
          "location_depok_address",
          "location_depok_role",
          "location_depok_map_query",
          "location_cikarang_name",
          "location_cikarang_address",
          "location_cikarang_role",
          "location_cikarang_map_query",
        ],
      },
    ],
  },
  {
    slug: "our_business",
    label: "Our Business",
    defaultSectionId: "header",
    sections: [
      {
        id: "header",
        title: "Header",
        description: "Page hero headline and subheadline.",
        keys: ["header_headline", "header_sub"],
      },
      {
        id: "research",
        title: "Research",
        description: "R&D section copy and focus areas.",
        keys: [
          "research_headline",
          "research_sub_1",
          "research_sub_2",
          "research_focus_1",
          "research_focus_2",
          "research_focus_3",
          "research_focus_4",
        ],
        linkedModule: {
          menuLabel: "R&D Pipeline",
          href: "/admin/rnd",
          body: "Pipeline cards are managed in",
        },
      },
      {
        id: "manufacturing",
        title: "Manufacturing",
        description: "Manufacturing overview, video, and pillar cards.",
        keys: [
          "manufacturing_headline",
          "manufacturing_sub_1",
          "manufacturing_sub_2",
          "manufacturing_focus_1",
          "manufacturing_focus_2",
          "manufacturing_focus_3",
          "manufacturing_video",
          "manufacturing_catchphrase",
        ],
        pillars: [
          {
            headlineKey: "manufacturing_pillar_1_headline",
            subKey: "manufacturing_pillar_1_sub",
            label: "Pillar 1",
          },
          {
            headlineKey: "manufacturing_pillar_2_headline",
            subKey: "manufacturing_pillar_2_sub",
            label: "Pillar 2",
          },
          {
            headlineKey: "manufacturing_pillar_3_headline",
            subKey: "manufacturing_pillar_3_sub",
            label: "Pillar 3",
          },
          {
            headlineKey: "manufacturing_pillar_4_headline",
            subKey: "manufacturing_pillar_4_sub",
            label: "Pillar 4",
          },
        ],
      },
      {
        id: "partnerships",
        title: "Partnerships",
        description: "Global partnerships section and closing CTA.",
        keys: [
          "partnerships_headline",
          "partnerships_sub",
          "partnerships_focus_1",
          "partnerships_focus_2",
          "partnerships_focus_3",
          "partnerships_focus_4",
          "partnerships_closing_headline",
          "partnerships_closing_sub",
        ],
      },
    ],
  },
  {
    slug: "manufacturing",
    label: "Manufacturing",
    defaultSectionId: "header",
    sections: [
      {
        id: "header",
        title: "Header",
        description: "Subpage hero and lead copy.",
        keys: ["header_headline", "header_sub", "header_lead"],
      },
      {
        id: "scale",
        title: "Scale",
        description: "Facility metrics and scale headline.",
        keys: [
          "scale_headline",
          "metric_1_label",
          "metric_1_value",
          "metric_1_detail",
          "metric_2_label",
          "metric_2_value",
          "metric_2_detail",
          "metric_3_label",
          "metric_3_value",
          "metric_3_detail",
          "metric_4_label",
          "metric_4_value",
          "metric_4_detail",
        ],
      },
      {
        id: "process",
        title: "Process",
        description: "Manufacturing process image and copy.",
        keys: [
          "process_image_src",
          "process_image_alt",
          "process_headline",
          "process_sub",
        ],
      },
      {
        id: "quality",
        title: "Quality",
        description: "Quality standards section.",
        keys: [
          "quality_headline",
          "quality_sub",
          "quality_point_1",
          "quality_point_2",
          "quality_point_3",
          "quality_point_4",
        ],
      },
      {
        id: "workplace",
        title: "Workplace",
        description: "Workplace culture section.",
        keys: [
          "workplace_headline",
          "workplace_sub",
          "workplace_image_src",
          "workplace_image_alt",
        ],
      },
    ],
  },
  {
    slug: "journey",
    label: "Career Journey",
    defaultSectionId: "header",
    sections: [
      {
        id: "header",
        title: "Header",
        description: "Page hero with background image.",
        keys: ["header_headline", "header_sub", "header_bg_image", "header_bg_alt"],
      },
      {
        id: "intro",
        title: "Intro",
        description: "Opening headline and body copy.",
        keys: ["intro_headline", "intro_sub"],
      },
      {
        id: "why",
        title: "Why Selatox",
        description: "Strengths and reasons to join.",
        keys: ["why_headline"],
        pillars: [
          {
            headlineKey: "why_strength_1_headline",
            subKey: "why_strength_1_sub",
            label: "Strength 1",
          },
          {
            headlineKey: "why_strength_2_headline",
            subKey: "why_strength_2_sub",
            label: "Strength 2",
          },
          {
            headlineKey: "why_strength_3_headline",
            subKey: "why_strength_3_sub",
            label: "Strength 3",
          },
        ],
      },
      {
        id: "value-chain",
        title: "Value chain",
        description: "Innovation journey stages.",
        keys: [
          "value_chain_image",
          "value_chain_image_alt",
          "value_chain_headline",
          "value_chain_sub",
        ],
        pillars: [
          {
            headlineKey: "value_chain_stage_1_headline",
            subKey: "value_chain_stage_1_sub",
            label: "Stage 1",
          },
          {
            headlineKey: "value_chain_stage_2_headline",
            subKey: "value_chain_stage_2_sub",
            label: "Stage 2",
          },
          {
            headlineKey: "value_chain_stage_3_headline",
            subKey: "value_chain_stage_3_sub",
            label: "Stage 3",
          },
          {
            headlineKey: "value_chain_stage_4_headline",
            subKey: "value_chain_stage_4_sub",
            label: "Stage 4",
          },
          {
            headlineKey: "value_chain_stage_5_headline",
            subKey: "value_chain_stage_5_sub",
            label: "Stage 5",
          },
          {
            headlineKey: "value_chain_stage_6_headline",
            subKey: "value_chain_stage_6_sub",
            label: "Stage 6",
          },
        ],
      },
      {
        id: "career-paths",
        title: "Career paths",
        description: "Role families and descriptions.",
        keys: ["career_paths_headline", "career_paths_sub"],
        pillars: [
          {
            headlineKey: "career_path_1_headline",
            subKey: "career_path_1_sub",
            label: "Path 1",
          },
          {
            headlineKey: "career_path_2_headline",
            subKey: "career_path_2_sub",
            label: "Path 2",
          },
          {
            headlineKey: "career_path_3_headline",
            subKey: "career_path_3_sub",
            label: "Path 3",
          },
          {
            headlineKey: "career_path_4_headline",
            subKey: "career_path_4_sub",
            label: "Path 4",
          },
        ],
      },
      {
        id: "open-positions",
        title: "Open positions",
        description: "Section header above the job listings.",
        keys: ["open_positions_headline", "open_positions_sub"],
        linkedModule: {
          menuLabel: "Careers",
          href: "/admin/careers",
          body: "Job listings are managed in",
        },
      },
      {
        id: "talent-network",
        title: "Talent network",
        description: "Talent network form copy and success messages.",
        keys: [
          "talent_network_headline",
          "talent_network_sub",
          "talent_network_submit_label",
          "talent_network_success_title",
          "talent_network_success_message",
        ],
      },
    ],
  },
  {
    slug: "ethics",
    label: "Ethics",
    defaultSectionId: "header",
    sections: [
      {
        id: "header",
        title: "Header",
        description: "Page hero with background image.",
        keys: ["header_headline", "header_sub", "header_bg_image", "header_bg_alt"],
      },
      {
        id: "intro",
        title: "Intro",
        description: "Opening headline and body copy.",
        keys: ["intro_headline", "intro_sub"],
      },
      {
        id: "commitments",
        title: "Commitments",
        description: "Ethical commitment statements.",
        keys: [
          "commitment_closing",
          "commitment_1_text",
          "commitment_2_text",
          "commitment_3_text",
          "commitment_4_text",
          "commitment_5_text",
          "commitment_6_text",
          "commitment_7_text",
        ],
      },
      {
        id: "leadership",
        title: "Leadership",
        description: "CEO message, name, and title.",
        keys: [
          "leadership_heading",
          "leadership_name",
          "leadership_title",
          "leadership_quote",
        ],
      },
      {
        id: "hotline-intro",
        title: "Hotline — Overview",
        description: "Ethics hotline title, intro, and contact email.",
        keys: ["hotline_title", "hotline_intro", "hotline_contact_email"],
      },
      {
        id: "hotline-reportable",
        title: "Hotline — Reportable items",
        description: "What can be reported through the hotline.",
        keys: [
          "hotline_reportable_title",
          "hotline_reportable_1_title",
          "hotline_reportable_1_sub",
          "hotline_reportable_2_title",
          "hotline_reportable_2_sub",
          "hotline_reportable_3_title",
          "hotline_reportable_3_sub",
          "hotline_reportable_4_title",
          "hotline_reportable_4_sub",
          "hotline_reportable_5_title",
          "hotline_reportable_5_sub",
        ],
      },
      {
        id: "hotline-protection",
        title: "Hotline — Protection",
        description: "Reporter confidentiality and anti-retaliation copy.",
        keys: [
          "hotline_protection_title",
          "hotline_protection_intro",
          "hotline_protection_1_title",
          "hotline_protection_1_sub",
          "hotline_protection_2_title",
          "hotline_protection_2_sub",
        ],
      },
      {
        id: "hotline-guidelines",
        title: "Hotline — Guidelines",
        description: "Reporting guidelines and notes.",
        keys: [
          "hotline_guidelines_title",
          "hotline_guidelines_intro",
          "hotline_guideline_1",
          "hotline_guideline_2",
          "hotline_guideline_3",
          "hotline_guideline_4",
          "hotline_guideline_5",
          "hotline_guideline_6",
          "hotline_guidelines_note",
        ],
      },
      {
        id: "hotline-form",
        title: "Hotline — Form",
        description: "Report form and success messages.",
        keys: [
          "hotline_form_title",
          "hotline_form_intro",
          "hotline_success_title",
          "hotline_success_message",
        ],
      },
    ],
  },
  {
    slug: "newsroom",
    label: "Newsroom Page",
    defaultSectionId: "header",
    sections: [
      {
        id: "header",
        title: "Page header",
        description: "News list page title and subtitle.",
        keys: ["title", "subtitle"],
      },
    ],
  },
  {
    slug: "openings",
    label: "Openings Page",
    defaultSectionId: "header",
    sections: [
      {
        id: "header",
        title: "Page header",
        description: "Careers list page title.",
        keys: ["title"],
      },
    ],
  },
];

const configBySlug = new Map(PAGE_SECTIONS.map((config) => [config.slug, config]));

export function getPageSectionsConfig(slug: string): PageSectionsConfig | undefined {
  return configBySlug.get(slug);
}

export function getPageSection(slug: string, sectionId: string): PageSectionDef | undefined {
  return getPageSectionsConfig(slug)?.sections.find((section) => section.id === sectionId);
}

export function getPageSectionIds(slug: string): string[] {
  return getPageSectionsConfig(slug)?.sections.map((section) => section.id) ?? [];
}

export function getPageSectionAdminHref(pageSlug: string, sectionId: string): string {
  return `/admin/${pageSlug}/${sectionId}`;
}

export function getPageDefaultAdminHref(pageSlug: string): string {
  const config = getPageSectionsConfig(pageSlug);
  if (!config) return `/admin/${pageSlug}`;
  return getPageSectionAdminHref(pageSlug, config.defaultSectionId);
}

export function getNestedCollectionItemHref(
  pageSlug: string,
  sectionId: string,
  itemId: string
): string {
  return `/admin/${pageSlug}/${sectionId}/${encodeURIComponent(itemId)}`;
}

export function isPageSectionId(pageSlug: string, segment: string): boolean {
  return getPageSectionIds(pageSlug).includes(segment);
}

export function getPageNavSections(slug: string): { id: string; title: string; href: string }[] {
  const config = getPageSectionsConfig(slug);
  if (!config) return [];

  return config.sections.map((section) => ({
    id: section.id,
    title: section.title,
    href: getPageSectionAdminHref(slug, section.id),
  }));
}

/** Collections nested under a page section (e.g. roadmap under about). */
export function getNestedCollectionSections(): {
  pageSlug: string;
  sectionId: string;
  collectionSlug: string;
}[] {
  const nested: { pageSlug: string; sectionId: string; collectionSlug: string }[] = [];

  for (const config of PAGE_SECTIONS) {
    for (const section of config.sections) {
      if (section.collectionSlug) {
        nested.push({
          pageSlug: config.slug,
          sectionId: section.id,
          collectionSlug: section.collectionSlug,
        });
      }
    }
  }

  return nested;
}

export function getNestedCollectionBySegment(
  pageSlug: string,
  sectionId: string
): PageSectionDef | undefined {
  const section = getPageSection(pageSlug, sectionId);
  return section?.collectionSlug ? section : undefined;
}

export function isCombinedPageSection(section: PageSectionDef): boolean {
  return Boolean(section.keys?.length && section.collectionSlug);
}

export function isStandaloneCollectionSlug(slug: string): boolean {
  if (slug === "roadmap") return false;
  return !configBySlug.has(slug);
}

export const PAGE_SECTIONS_CONFIG = PAGE_SECTIONS;
