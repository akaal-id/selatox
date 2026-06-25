import { readFileSync, writeFileSync } from "fs";
import { aboutHero, aboutValues, aboutExecutive, aboutRoadmap, aboutContact } from "../src/constants/about";
import {
  careerJourneyHero,
  careerJourneyIntro,
  whySelatox,
  valueChain,
  careerPaths,
  openPositionsSection,
  talentNetwork,
} from "../src/constants/career-journey";
import { ethicsHero, ethicsCommitment, ethicsLeadership, ethicsHotline } from "../src/constants/ethics";
import { ourBusinessManufacturing } from "../src/constants/our-business";
import { researchFields } from "../src/constants/researchfields";
import { newsPage } from "../src/constants/news";
import { opportunitiesPage } from "../src/constants/opportunities";

function sqlEscape(value: string): string {
  return String(value).replace(/'/g, "''");
}

function sqlString(value: string): string {
  return `'${sqlEscape(value)}'`;
}

function dollarHtml(value: string): string {
  return `$html$${value}$html$`;
}

function splitStatement(text: string): { lead: string; body: string } {
  const [lead, ...rest] = text.split("—");
  return { lead: lead.trim(), body: rest.join("—").trim() };
}

function executiveQuoteHtml(): string {
  return aboutExecutive.quote.blocks
    .map((block) => {
      const inner = block.segments
        .map((seg) => {
          if ("emphasis" in seg && seg.emphasis === "em") return `<em>${seg.t}</em>`;
          return seg.t;
        })
        .join("");
      return `<p>${inner}</p>`;
    })
    .join("\n");
}

function ethicsLeadershipQuoteHtml(): string {
  return ethicsLeadership.quote.blocks
    .map((block) => {
      const inner = block.segments
        .map((seg) => {
          if ("emphasis" in seg && seg.emphasis === "em") return `<em>${seg.t}</em>`;
          return seg.t;
        })
        .join("");
      return `<p>${inner}</p>`;
    })
    .join("\n");
}

const vision = splitStatement(aboutValues.vision);
const mission = splitStatement(aboutValues.mission);

const PAGE_FILES: Record<string, string> = {
  "sql/rnd.sql": `-- R&D pipeline programs
-- Maps to: src/constants/researchfields.ts
-- Run after products.sql

CREATE TABLE public.rnd (
  id text PRIMARY KEY,
  title text NOT NULL,
  regimen text NOT NULL DEFAULT '',
  description text NOT NULL DEFAULT '',
  phase text NOT NULL DEFAULT '',
  target_launch text NOT NULL DEFAULT '',
  tags text[] NOT NULL DEFAULT '{}',
  featured boolean NOT NULL DEFAULT false,
  sort_order integer NOT NULL DEFAULT 0,
  is_published boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX rnd_sort_order_idx ON public.rnd (sort_order);
CREATE INDEX rnd_featured_idx ON public.rnd (featured);

ALTER TABLE public.rnd ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read published rnd"
  ON public.rnd FOR SELECT TO anon, authenticated
  USING (is_published = true);

CREATE POLICY "Authenticated users can manage rnd"
  ON public.rnd FOR ALL TO authenticated
  USING (true) WITH CHECK (true);

-- Seed: src/constants/researchfields.ts
${researchFields
  .map((field, i) => {
    const id = field.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    const tags = `ARRAY[${field.tags.map((t) => sqlString(t)).join(", ")}]`;
    return `INSERT INTO public.rnd (
  id, title, regimen, description, phase, target_launch, tags, featured, sort_order, is_published
) VALUES (
  ${sqlString(id)},
  ${sqlString(field.title)},
  ${sqlString(field.regimen)},
  ${sqlString(field.description)},
  ${sqlString(field.phase)},
  ${sqlString(field.targetLaunch)},
  ${tags},
  ${field.featured},
  ${i},
  true
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  regimen = EXCLUDED.regimen,
  description = EXCLUDED.description,
  phase = EXCLUDED.phase,
  target_launch = EXCLUDED.target_launch,
  tags = EXCLUDED.tags,
  featured = EXCLUDED.featured,
  sort_order = EXCLUDED.sort_order;`;
  })
  .join("\n\n")}
`,

  "sql/roadmap.sql": `-- Company roadmap milestones
-- Maps to: src/constants/about.ts (aboutRoadmap.milestones)
-- Run after products.sql

CREATE TABLE public.roadmap (
  id text PRIMARY KEY,
  year text NOT NULL,
  title text NOT NULL,
  section text NOT NULL CHECK (section IN ('history', 'milestone')),
  status text NOT NULL CHECK (
    status IN ('completed', 'active', 'upcoming', 'vision')
  ),
  image text NOT NULL DEFAULT '',
  image_bg text,
  items jsonb NOT NULL DEFAULT '[]'::jsonb,
  sort_order integer NOT NULL DEFAULT 0,
  is_published boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX roadmap_sort_order_idx ON public.roadmap (sort_order);
CREATE INDEX roadmap_section_idx ON public.roadmap (section);

ALTER TABLE public.roadmap ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read published roadmap"
  ON public.roadmap FOR SELECT TO anon, authenticated
  USING (is_published = true);

CREATE POLICY "Authenticated users can manage roadmap"
  ON public.roadmap FOR ALL TO authenticated
  USING (true) WITH CHECK (true);

COMMENT ON COLUMN public.roadmap.items IS 'JSON array: [{ "month"?: string, "text": string }]';

-- Seed: src/constants/about.ts
${aboutRoadmap.milestones
  .map((m, i) => {
    const id = `milestone-${m.year}`;
    const items = JSON.stringify(m.items);
    const imageBg =
      "imageBg" in m && typeof m.imageBg === "string"
        ? sqlString(m.imageBg)
        : "NULL";
    return `INSERT INTO public.roadmap (
  id, year, title, section, status, image, image_bg, items, sort_order, is_published
) VALUES (
  ${sqlString(id)},
  ${sqlString(m.year)},
  ${sqlString(m.title)},
  ${sqlString(m.section)},
  ${sqlString(m.status)},
  ${sqlString(m.image)},
  ${imageBg},
  ${sqlString(items)}::jsonb,
  ${i},
  true
) ON CONFLICT (id) DO UPDATE SET
  year = EXCLUDED.year,
  title = EXCLUDED.title,
  section = EXCLUDED.section,
  status = EXCLUDED.status,
  image = EXCLUDED.image,
  image_bg = EXCLUDED.image_bg,
  items = EXCLUDED.items,
  sort_order = EXCLUDED.sort_order;`;
  })
  .join("\n\n")}
`,

  "sql/about.sql": `-- About page CMS (singleton)
-- Maps to: app/about/page.tsx
-- Run after products.sql
-- Roadmap rows → roadmap table

CREATE TABLE public.about (
  id integer PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  header_headline text NOT NULL DEFAULT '',
  header_sub text NOT NULL DEFAULT '',
  header_bg_image text NOT NULL DEFAULT '',
  values_title text NOT NULL DEFAULT '',
  value_vision_headline text NOT NULL DEFAULT '',
  value_vision_sub text NOT NULL DEFAULT '',
  value_mission_headline text NOT NULL DEFAULT '',
  value_mission_sub text NOT NULL DEFAULT '',
  core_value_1_name text NOT NULL DEFAULT '',
  core_value_1_sub text NOT NULL DEFAULT '',
  core_value_2_name text NOT NULL DEFAULT '',
  core_value_2_sub text NOT NULL DEFAULT '',
  core_value_3_name text NOT NULL DEFAULT '',
  core_value_3_sub text NOT NULL DEFAULT '',
  core_value_4_name text NOT NULL DEFAULT '',
  core_value_4_sub text NOT NULL DEFAULT '',
  executive_name text NOT NULL DEFAULT '',
  executive_title text NOT NULL DEFAULT '',
  executive_portrait text NOT NULL DEFAULT '',
  executive_quote text NOT NULL DEFAULT '',
  roadmap_history_title text NOT NULL DEFAULT '',
  roadmap_milestones_title text NOT NULL DEFAULT '',
  is_published boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.about ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read published about" ON public.about
  FOR SELECT TO anon, authenticated USING (is_published = true);
CREATE POLICY "Authenticated users can manage about" ON public.about
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

COMMENT ON COLUMN public.about.executive_quote IS 'Rich text (HTML). Sanitize with sanitize-html.';

INSERT INTO public.about (
  id, header_headline, header_sub, header_bg_image,
  values_title, value_vision_headline, value_vision_sub,
  value_mission_headline, value_mission_sub,
  core_value_1_name, core_value_1_sub,
  core_value_2_name, core_value_2_sub,
  core_value_3_name, core_value_3_sub,
  core_value_4_name, core_value_4_sub,
  executive_name, executive_title, executive_portrait, executive_quote,
  roadmap_history_title, roadmap_milestones_title, is_published
) VALUES (
  1,
  ${sqlString(aboutHero.headline)},
  ${sqlString(aboutHero.subheadline)},
  ${sqlString(aboutHero.backgroundImage)},
  ${sqlString(aboutValues.title)},
  ${sqlString(vision.lead)},
  ${sqlString(vision.body)},
  ${sqlString(mission.lead)},
  ${sqlString(mission.body)},
  ${sqlString(aboutValues.coreValues[0].name)},
  ${sqlString(aboutValues.coreValues[0].description)},
  ${sqlString(aboutValues.coreValues[1].name)},
  ${sqlString(aboutValues.coreValues[1].description)},
  ${sqlString(aboutValues.coreValues[2].name)},
  ${sqlString(aboutValues.coreValues[2].description)},
  ${sqlString(aboutValues.coreValues[3].name)},
  ${sqlString(aboutValues.coreValues[3].description)},
  ${sqlString(aboutExecutive.name)},
  ${sqlString(aboutExecutive.title)},
  ${sqlString(aboutExecutive.portrait)},
  ${dollarHtml(executiveQuoteHtml())},
  ${sqlString(aboutRoadmap.historyTitle)},
  ${sqlString(aboutRoadmap.milestonesTitle)},
  true
) ON CONFLICT (id) DO UPDATE SET
  header_headline = EXCLUDED.header_headline,
  header_sub = EXCLUDED.header_sub,
  header_bg_image = EXCLUDED.header_bg_image,
  values_title = EXCLUDED.values_title,
  value_vision_headline = EXCLUDED.value_vision_headline,
  value_vision_sub = EXCLUDED.value_vision_sub,
  value_mission_headline = EXCLUDED.value_mission_headline,
  value_mission_sub = EXCLUDED.value_mission_sub,
  core_value_1_name = EXCLUDED.core_value_1_name,
  core_value_1_sub = EXCLUDED.core_value_1_sub,
  core_value_2_name = EXCLUDED.core_value_2_name,
  core_value_2_sub = EXCLUDED.core_value_2_sub,
  core_value_3_name = EXCLUDED.core_value_3_name,
  core_value_3_sub = EXCLUDED.core_value_3_sub,
  core_value_4_name = EXCLUDED.core_value_4_name,
  core_value_4_sub = EXCLUDED.core_value_4_sub,
  executive_name = EXCLUDED.executive_name,
  executive_title = EXCLUDED.executive_title,
  executive_portrait = EXCLUDED.executive_portrait,
  executive_quote = EXCLUDED.executive_quote,
  roadmap_history_title = EXCLUDED.roadmap_history_title,
  roadmap_milestones_title = EXCLUDED.roadmap_milestones_title,
  is_published = EXCLUDED.is_published;
`,

  "sql/contact.sql": `-- Contact page CMS (singleton)
-- Maps to: app/contact/page.tsx

CREATE TABLE public.contact (
  id integer PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  title text NOT NULL DEFAULT '',
  page_lead text NOT NULL DEFAULT '',
  channel_1_label text NOT NULL DEFAULT '',
  channel_1_email text NOT NULL DEFAULT '',
  channel_2_label text NOT NULL DEFAULT '',
  channel_2_email text NOT NULL DEFAULT '',
  channel_3_label text NOT NULL DEFAULT '',
  channel_3_email text NOT NULL DEFAULT '',
  channel_4_label text NOT NULL DEFAULT '',
  channel_4_email text NOT NULL DEFAULT '',
  location_depok_name text NOT NULL DEFAULT '',
  location_depok_address text NOT NULL DEFAULT '',
  location_depok_role text NOT NULL DEFAULT '',
  location_depok_map_query text NOT NULL DEFAULT '',
  location_cikarang_name text NOT NULL DEFAULT '',
  location_cikarang_address text NOT NULL DEFAULT '',
  location_cikarang_role text NOT NULL DEFAULT '',
  location_cikarang_map_query text NOT NULL DEFAULT '',
  is_published boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.contact ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read published contact" ON public.contact
  FOR SELECT TO anon, authenticated USING (is_published = true);
CREATE POLICY "Authenticated users can manage contact" ON public.contact
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

INSERT INTO public.contact (
  id, title, page_lead,
  channel_1_label, channel_1_email,
  channel_2_label, channel_2_email,
  channel_3_label, channel_3_email,
  channel_4_label, channel_4_email,
  location_depok_name, location_depok_address, location_depok_role, location_depok_map_query,
  location_cikarang_name, location_cikarang_address, location_cikarang_role, location_cikarang_map_query,
  is_published
) VALUES (
  1,
  ${sqlString(aboutContact.title)},
  'Reach the right team directly, or visit us at one of our two sites across West Java, Indonesia.',
  ${sqlString(aboutContact.channels[0].label)},
  ${sqlString(aboutContact.channels[0].email)},
  ${sqlString(aboutContact.channels[1].label)},
  ${sqlString(aboutContact.channels[1].email)},
  ${sqlString(aboutContact.channels[2].label)},
  ${sqlString(aboutContact.channels[2].email)},
  ${sqlString(aboutContact.channels[3].label)},
  ${sqlString(aboutContact.channels[3].email)},
  ${sqlString(aboutContact.locations[0].name)},
  ${sqlString(aboutContact.locations[0].location)},
  ${sqlString(aboutContact.locations[0].role)},
  ${sqlString(aboutContact.locations[0].mapQuery)},
  ${sqlString(aboutContact.locations[1].name)},
  ${sqlString(aboutContact.locations[1].location)},
  ${sqlString(aboutContact.locations[1].role)},
  ${sqlString(aboutContact.locations[1].mapQuery)},
  true
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  page_lead = EXCLUDED.page_lead,
  channel_1_label = EXCLUDED.channel_1_label,
  channel_1_email = EXCLUDED.channel_1_email,
  channel_2_label = EXCLUDED.channel_2_label,
  channel_2_email = EXCLUDED.channel_2_email,
  channel_3_label = EXCLUDED.channel_3_label,
  channel_3_email = EXCLUDED.channel_3_email,
  channel_4_label = EXCLUDED.channel_4_label,
  channel_4_email = EXCLUDED.channel_4_email,
  location_depok_name = EXCLUDED.location_depok_name,
  location_depok_address = EXCLUDED.location_depok_address,
  location_depok_role = EXCLUDED.location_depok_role,
  location_depok_map_query = EXCLUDED.location_depok_map_query,
  location_cikarang_name = EXCLUDED.location_cikarang_name,
  location_cikarang_address = EXCLUDED.location_cikarang_address,
  location_cikarang_role = EXCLUDED.location_cikarang_role,
  location_cikarang_map_query = EXCLUDED.location_cikarang_map_query,
  is_published = EXCLUDED.is_published;
`,

  "sql/newsroom.sql": `-- Newsroom list page CMS (singleton)
-- Maps to: app/news/page.tsx

CREATE TABLE public.newsroom (
  id integer PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  title text NOT NULL DEFAULT '',
  subtitle text NOT NULL DEFAULT '',
  is_published boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.newsroom ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read published newsroom" ON public.newsroom
  FOR SELECT TO anon, authenticated USING (is_published = true);
CREATE POLICY "Authenticated users can manage newsroom" ON public.newsroom
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

INSERT INTO public.newsroom (id, title, subtitle, is_published) VALUES (
  1,
  ${sqlString(newsPage.title)},
  ${sqlString(newsPage.subtitle)},
  true
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  subtitle = EXCLUDED.subtitle,
  is_published = EXCLUDED.is_published;
`,

  "sql/openings.sql": `-- Openings list page CMS (singleton)
-- Maps to: app/openings/page.tsx

CREATE TABLE public.openings (
  id integer PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  title text NOT NULL DEFAULT '',
  is_published boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.openings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read published openings" ON public.openings
  FOR SELECT TO anon, authenticated USING (is_published = true);
CREATE POLICY "Authenticated users can manage openings" ON public.openings
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

INSERT INTO public.openings (id, title, is_published) VALUES (
  1,
  ${sqlString(opportunitiesPage.title)},
  true
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  is_published = EXCLUDED.is_published;
`,
};

// Hand-authored page SQL (large static content from components)
PAGE_FILES["sql/our_business.sql"] = readFileSync("scripts/page-sql/our_business.sql.template", "utf8");
PAGE_FILES["sql/manufacturing.sql"] = readFileSync("scripts/page-sql/manufacturing.sql.template", "utf8");
PAGE_FILES["sql/journey.sql"] = readFileSync("scripts/page-sql/journey.sql.template", "utf8");
PAGE_FILES["sql/ethics.sql"] = readFileSync("scripts/page-sql/ethics.sql.template", "utf8");

for (const [file, content] of Object.entries(PAGE_FILES)) {
  writeFileSync(file, content);
}

console.log(`Generated ${Object.keys(PAGE_FILES).length} page SQL files`);
