export type HomePageRow = {
  id: number;
  hero_video: string;
  hero_headline: string;
  hero_sub: string;
  hero_button_1_label: string;
  hero_button_1_link: string;
  hero_button_2_label: string;
  hero_button_2_link: string;
  intro_eyebrow: string;
  intro_headline: string;
  intro_sub: string;
  intro_image_src: string;
  intro_image_alt: string;
  intro_partners_stat: string;
  intro_partners_copy: string;
  intro_gmp_stat: string;
  intro_gmp_copy: string;
  intro_halal_stat: string;
  intro_halal_copy: string;
  intro_global_stat: string;
  intro_global_copy: string;
  value_vision_headline: string;
  value_vision_sub: string;
  value_mission_headline: string;
  value_mission_sub: string;
  value_core_headline: string;
  value_core_sub: string;
  value_cta_label: string;
  value_cta_link: string;
  our_business_bg_image: string;
  our_business_eyebrow: string;
  our_business_headline: string;
  our_business_sub: string;
  our_business_cta_label: string;
  our_business_cta_link: string;
  manufacturing_video: string;
  manufacturing_eyebrow: string;
  manufacturing_headline: string;
  manufacturing_sub: string;
  manufacturing_pillar_architecture_headline: string;
  manufacturing_pillar_architecture_sub: string;
  manufacturing_pillar_equipment_headline: string;
  manufacturing_pillar_equipment_sub: string;
  manufacturing_pillar_capacity_headline: string;
  manufacturing_pillar_capacity_sub: string;
  rnd_eyebrow: string;
  rnd_headline: string;
  rnd_sub: string;
  careers_eyebrow: string;
  careers_headline: string;
  careers_sub: string;
  newsroom_headline: string;
  is_published: boolean;
  created_at?: string;
  updated_at?: string;
};

export type HomePageInput = Omit<
  HomePageRow,
  "id" | "created_at" | "updated_at"
>;

export type CmsFieldType = "text" | "textarea" | "richtext" | "url" | "image" | "video";

export type CmsFieldDef = {
  key: keyof HomePageInput;
  label: string;
  type: CmsFieldType;
  hint?: string;
  placeholder?: string;
};

export type CmsStatPairDef = {
  statKey: keyof HomePageInput;
  copyKey: keyof HomePageInput;
  label: string;
};

export type CmsPillarDef = {
  headlineKey: keyof HomePageInput;
  subKey: keyof HomePageInput;
  label: string;
};

export type CmsLinkedModule = {
  menuLabel: string;
  href: string;
  body: string;
};

export type CmsSectionDef = {
  id: string;
  title: string;
  description: string;
  fields?: CmsFieldDef[];
  stats?: CmsStatPairDef[];
  pillars?: CmsPillarDef[];
  linkedModule?: CmsLinkedModule;
  pillarsFirst?: boolean;
};

export const HOME_CMS_SECTIONS: CmsSectionDef[] = [
  {
    id: "hero",
    title: "Hero",
    description: "Full-width video hero with headline and primary actions.",
    fields: [
      {
        key: "hero_video",
        label: "Background video",
        type: "video",
        placeholder: "/videos/hero.mp4",
        hint: "Upload an MP4/WebM or paste a URL (local path or Supabase Storage).",
      },
      { key: "hero_headline", label: "Headline", type: "textarea", hint: "Use a new line for a second line." },
      { key: "hero_sub", label: "Subheadline", type: "textarea" },
      { key: "hero_button_1_label", label: "Button 1 label", type: "text" },
      { key: "hero_button_1_link", label: "Button 1 link", type: "url" },
      { key: "hero_button_2_label", label: "Button 2 label", type: "text" },
      { key: "hero_button_2_link", label: "Button 2 link", type: "url" },
    ],
  },
  {
    id: "intro",
    title: "Intro",
    description: "Company overview with image and trust stats.",
    fields: [
      { key: "intro_eyebrow", label: "Eyebrow", type: "text" },
      {
        key: "intro_headline",
        label: "Headline",
        type: "richtext",
        hint: "Use italic for accent phrases. Press Enter for a new line.",
      },
      {
        key: "intro_sub",
        label: "Body",
        type: "richtext",
        hint: "HTML allowed: p, em, strong, a, lists.",
      },
      {
        key: "intro_image_src",
        label: "Side image",
        type: "image",
        hint: "Upload an image or paste a URL.",
      },
      { key: "intro_image_alt", label: "Side image alt text", type: "text" },
    ],
    stats: [
      { statKey: "intro_partners_stat", copyKey: "intro_partners_copy", label: "Partners" },
      { statKey: "intro_gmp_stat", copyKey: "intro_gmp_copy", label: "GMP" },
      { statKey: "intro_halal_stat", copyKey: "intro_halal_copy", label: "Halal" },
      { statKey: "intro_global_stat", copyKey: "intro_global_copy", label: "Global" },
    ],
  },
  {
    id: "values",
    title: "Values",
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
      {
        headlineKey: "value_core_headline",
        subKey: "value_core_sub",
        label: "Values",
      },
    ],
    fields: [
      { key: "value_cta_label", label: "CTA label", type: "text" },
      { key: "value_cta_link", label: "CTA link", type: "url" },
    ],
  },
  {
    id: "our-business",
    title: "Our Business",
    description: "Background image section linking to our business page.",
    fields: [
      {
        key: "our_business_bg_image",
        label: "Background image",
        type: "image",
        hint: "Upload an image or paste a URL.",
      },
      { key: "our_business_eyebrow", label: "Eyebrow", type: "text" },
      {
        key: "our_business_headline",
        label: "Headline",
        type: "richtext",
        hint: "Use italic for accent phrases. Press Enter for a new line.",
      },
      {
        key: "our_business_sub",
        label: "Subheadline",
        type: "richtext",
      },
      { key: "our_business_cta_label", label: "CTA label", type: "text" },
      { key: "our_business_cta_link", label: "CTA link", type: "url" },
    ],
  },
  {
    id: "manufacturing",
    title: "Manufacturing",
    description: "Facility video, copy, and three pillar cards.",
    fields: [
      {
        key: "manufacturing_video",
        label: "Facility video",
        type: "video",
        hint: "Upload an MP4/WebM or paste a URL.",
      },
      { key: "manufacturing_eyebrow", label: "Eyebrow", type: "text" },
      {
        key: "manufacturing_headline",
        label: "Headline",
        type: "richtext",
        hint: "Use italic for accent phrases. Press Enter for a new line.",
      },
      {
        key: "manufacturing_sub",
        label: "Subheadline",
        type: "richtext",
      },
    ],
    pillars: [
      {
        headlineKey: "manufacturing_pillar_architecture_headline",
        subKey: "manufacturing_pillar_architecture_sub",
        label: "Architecture",
      },
      {
        headlineKey: "manufacturing_pillar_equipment_headline",
        subKey: "manufacturing_pillar_equipment_sub",
        label: "Equipment",
      },
      {
        headlineKey: "manufacturing_pillar_capacity_headline",
        subKey: "manufacturing_pillar_capacity_sub",
        label: "Capacity",
      },
    ],
  },
  {
    id: "rnd",
    title: "R&D Center",
    description: "Section header and intro copy for the R&D block on the homepage.",
    linkedModule: {
      menuLabel: "R&D Pipeline",
      href: "/admin/rnd",
      body: "The pipeline cards displayed in this section are configured in",
    },
    fields: [
      { key: "rnd_eyebrow", label: "Eyebrow", type: "text" },
      {
        key: "rnd_headline",
        label: "Headline",
        type: "richtext",
        hint: "Use italic for accent phrases.",
      },
      {
        key: "rnd_sub",
        label: "Subheadline",
        type: "richtext",
      },
    ],
  },
  {
    id: "careers",
    title: "Careers",
    description: "Section header and intro copy for the careers block on the homepage.",
    linkedModule: {
      menuLabel: "Careers",
      href: "/admin/careers",
      body: "The job cards displayed in this section are configured in",
    },
    fields: [
      { key: "careers_eyebrow", label: "Eyebrow", type: "text" },
      {
        key: "careers_headline",
        label: "Headline",
        type: "richtext",
        hint: "Use italic for accent phrases.",
      },
      {
        key: "careers_sub",
        label: "Subheadline",
        type: "richtext",
      },
    ],
  },
  {
    id: "newsroom",
    title: "Newsroom",
    description: "Section headline for the latest news block on the homepage.",
    linkedModule: {
      menuLabel: "News",
      href: "/admin/news",
      body: "The news cards displayed in this section are configured in",
    },
    fields: [
      {
        key: "newsroom_headline",
        label: "Headline",
        type: "richtext",
        hint: "Use italic for accent phrases.",
      },
    ],
  },
];

export function getHomeCmsSection(sectionId: string): CmsSectionDef | undefined {
  return HOME_CMS_SECTIONS.find((section) => section.id === sectionId);
}

export const HOME_CMS_SECTION_IDS = HOME_CMS_SECTIONS.map((section) => section.id);

export function getHomeSectionAdminHref(sectionId: string): string {
  return `/admin/home/${sectionId}`;
}

export const HOME_ADMIN_HREF = "/admin/home/hero";
