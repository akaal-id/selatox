import { facilities } from "@/constants/facilities";
import { homeValues } from "@/constants/home";
import { jobListings } from "@/constants/opportunities";
import { newsArticles } from "@/constants/news";
import { products, type Product } from "@/constants/products";
import { researchFields } from "@/constants/researchfields";
import type { JobListing } from "@/constants/opportunities";
import type { NewsArticle } from "@/constants/news";
import type { HomePageRow } from "@/lib/cms/home";
import { normalizeMediaSrc } from "@/lib/cms/media-url";
import { mapCareerRow, mapNewsRow, mapProductRow } from "@/lib/cms/mappers";
import { createPublicClient } from "@/lib/supabase/public";

export type HeroContent = {
  video: string;
  headline: string;
  sub: string;
  button1: { label: string; href: string };
  button2: { label: string; href: string };
};

export type IntroStatContent = {
  value: string;
  label: string;
  accent: "green" | "blue";
};

export type IntroContent = {
  eyebrow: string;
  headline: string;
  sub: string;
  imageSrc: string;
  imageAlt: string;
  stats: IntroStatContent[];
};

export type ValueCardContent = {
  id: string;
  index: string;
  category: string;
  title: string;
  description: string;
};

export type ValuesContent = {
  cards: ValueCardContent[];
  cta: { label: string; href: string };
};

export type BusinessContent = {
  backgroundImage: string;
  eyebrow: string;
  headline: string;
  sub: string;
  cta: { label: string; href: string };
};

export type ManufacturingPillarContent = {
  meta: string;
  title: string;
  body: string;
};

export type ManufacturingContent = {
  video: string;
  eyebrow: string;
  headline: string;
  sub: string;
  pillars: ManufacturingPillarContent[];
};

export type RndProgramContent = {
  title: string;
  regimen: string;
  phase: string;
  targetLaunch: string;
};

export type RndContent = {
  eyebrow: string;
  headline: string;
  sub: string;
  programs: RndProgramContent[];
};

export type CareersContent = {
  eyebrow: string;
  headline: string;
  sub: string;
  jobs: JobListing[];
};

export type NewsroomContent = {
  headline: string;
  articles: NewsArticle[];
};

export type HomePageContent = {
  hero: HeroContent;
  intro: IntroContent;
  values: ValuesContent;
  featuredProduct: Product;
  business: BusinessContent;
  manufacturing: ManufacturingContent;
  rnd: RndContent;
  careers: CareersContent;
  newsroom: NewsroomContent;
};

const JOB_STATUS_SORT_ORDER = {
  Open: 0,
  "Closing Soon": 1,
  Closed: 2,
} as const;

const INTRO_STAT_ACCENTS: IntroStatContent["accent"][] = ["blue", "green", "blue", "green"];
const PILLAR_META = ["Architecture", "Equipment", "Capacity"] as const;

function buildFallbackContent(): HomePageContent {
  const [visionLead, ...visionRest] = homeValues.vision.split("—");
  const [missionLead, ...missionRest] = homeValues.mission.split("—");

  return {
    hero: {
      video: "/videos/hero.mp4",
      headline: "Created by Science.\nInspired by Beauty.",
      sub: "Advancing the future of aesthetic medicine through innovative biotechnology, world-class manufacturing, and global partnerships.",
      button1: { label: "Explore Products", href: `/products/${products[0]?.slug ?? "selatoxin"}` },
      button2: { label: "About Us", href: "/about" },
    },
    intro: {
      eyebrow: "A Foundation of Absolute Precision",
      headline: "Pioneering the Future of\nAesthetic Bioscience",
      sub: `<p>We believe true aesthetic innovation begins with <em>uncompromising quality</em>. By combining state-of-the-art research with rigorous global standards, Selatox is creating a safer, more precise foundation for modern beauty and wellness. As <em>Indonesia's first specialized biopharmaceutical center</em>, we are redefining what is possible in aesthetic medicine.</p>`,
      imageSrc: "/images/products/selatoxin.png",
      imageAlt: "SELATOXIN 100 Units Botulinum Toxin Type A vial",
      stats: [
        { value: "40+", label: "Partner Countries", accent: "blue" },
        { value: "GMP", label: "Certified Facility", accent: "green" },
        { value: "Halal", label: "Certified", accent: "blue" },
        { value: "Global", label: "Safety Standards", accent: "green" },
      ],
    },
    values: {
      cards: [
        {
          id: "vision",
          index: "01",
          category: "Vision",
          title: visionLead.trim(),
          description: visionRest.join("—").trim(),
        },
        {
          id: "mission",
          index: "02",
          category: "Mission",
          title: missionLead.trim(),
          description: missionRest.join("—").trim(),
        },
        {
          id: "core-value",
          index: "03",
          category: "Core Value",
          title: "Uncompromising Integrity",
          description:
            "True innovation requires honesty—complete transparency, strict clinical safety, and absolute trust in every vial we produce.",
        },
      ],
      cta: { label: "More About Selatox", href: "/about" },
    },
    featuredProduct: products[0],
    business: {
      backgroundImage: "/images/hero-3.webp",
      eyebrow: "Our Business",
      headline: "Clinical Science,\nBuilt For Global Aesthetics.",
      sub: "We develop precision toxin formulations and partner with leading clinics worldwide to bring trusted, scalable aesthetic solutions to every market we serve.",
      cta: { label: "Explore Our Research", href: "/our-business" },
    },
    manufacturing: {
      video: facilities.video,
      eyebrow: facilities.eyebrow,
      headline: facilities.headline,
      sub: facilities.sub,
      pillars: facilities.pillars.map((pillar) => ({
        meta: pillar.meta,
        title: pillar.title,
        body: pillar.body,
      })),
    },
    rnd: {
      eyebrow: "R&D Center",
      headline: 'Advancing our <em class="headline-accent">clinical pipeline.</em>',
      sub: "Core research programs across formulation, process development, and clinical readiness.",
      programs: researchFields.map((field) => ({
        title: field.title,
        regimen: field.regimen,
        phase: field.phase,
        targetLaunch: field.targetLaunch,
      })),
    },
    careers: {
      eyebrow: "Careers",
      headline: 'Build what\'s next, <em class="headline-accent">with us.</em>',
      sub: "We're assembling a team of scientists, strategists, and operators who believe the next era of bio-aesthetics will be engineered in Indonesia — and shared with the world.",
      jobs: jobListings
        .filter((job) => job.status !== "Closed")
        .sort((a, b) => JOB_STATUS_SORT_ORDER[a.status] - JOB_STATUS_SORT_ORDER[b.status])
        .slice(0, 3),
    },
    newsroom: {
      headline: "Latest Updates & Insights.",
      articles: newsArticles.slice(0, 5),
    },
  };
}

function mapHomeRow(row: HomePageRow, fallback: HomePageContent): HomePageContent {
  return {
    hero: {
      video: row.hero_video || fallback.hero.video,
      headline: row.hero_headline || fallback.hero.headline,
      sub: row.hero_sub || fallback.hero.sub,
      button1: {
        label: row.hero_button_1_label || fallback.hero.button1.label,
        href: row.hero_button_1_link || fallback.hero.button1.href,
      },
      button2: {
        label: row.hero_button_2_label || fallback.hero.button2.label,
        href: row.hero_button_2_link || fallback.hero.button2.href,
      },
    },
    intro: {
      eyebrow: row.intro_eyebrow || fallback.intro.eyebrow,
      headline: row.intro_headline || fallback.intro.headline,
      sub: row.intro_sub || fallback.intro.sub,
      imageSrc:
        normalizeMediaSrc(row.intro_image_src) || fallback.intro.imageSrc,
      imageAlt: row.intro_image_alt || fallback.intro.imageAlt,
      stats: [
        {
          value: row.intro_partners_stat || fallback.intro.stats[0].value,
          label: row.intro_partners_copy || fallback.intro.stats[0].label,
          accent: INTRO_STAT_ACCENTS[0],
        },
        {
          value: row.intro_gmp_stat || fallback.intro.stats[1].value,
          label: row.intro_gmp_copy || fallback.intro.stats[1].label,
          accent: INTRO_STAT_ACCENTS[1],
        },
        {
          value: row.intro_halal_stat || fallback.intro.stats[2].value,
          label: row.intro_halal_copy || fallback.intro.stats[2].label,
          accent: INTRO_STAT_ACCENTS[2],
        },
        {
          value: row.intro_global_stat || fallback.intro.stats[3].value,
          label: row.intro_global_copy || fallback.intro.stats[3].label,
          accent: INTRO_STAT_ACCENTS[3],
        },
      ],
    },
    values: {
      cards: [
        {
          id: "vision",
          index: "01",
          category: "Vision",
          title: row.value_vision_headline || fallback.values.cards[0].title,
          description: row.value_vision_sub || fallback.values.cards[0].description,
        },
        {
          id: "mission",
          index: "02",
          category: "Mission",
          title: row.value_mission_headline || fallback.values.cards[1].title,
          description: row.value_mission_sub || fallback.values.cards[1].description,
        },
        {
          id: "core-value",
          index: "03",
          category: "Core Value",
          title: row.value_core_headline || fallback.values.cards[2].title,
          description: row.value_core_sub || fallback.values.cards[2].description,
        },
      ],
      cta: {
        label: row.value_cta_label || fallback.values.cta.label,
        href: row.value_cta_link || fallback.values.cta.href,
      },
    },
    featuredProduct: fallback.featuredProduct,
    business: {
      backgroundImage:
        normalizeMediaSrc(row.our_business_bg_image) || fallback.business.backgroundImage,
      eyebrow: row.our_business_eyebrow || fallback.business.eyebrow,
      headline: row.our_business_headline || fallback.business.headline,
      sub: row.our_business_sub || fallback.business.sub,
      cta: {
        label: row.our_business_cta_label || fallback.business.cta.label,
        href: row.our_business_cta_link || fallback.business.cta.href,
      },
    },
    manufacturing: {
      video: row.manufacturing_video || fallback.manufacturing.video,
      eyebrow: row.manufacturing_eyebrow || fallback.manufacturing.eyebrow,
      headline: row.manufacturing_headline || fallback.manufacturing.headline,
      sub: row.manufacturing_sub || fallback.manufacturing.sub,
      pillars: [
        {
          meta: PILLAR_META[0],
          title:
            row.manufacturing_pillar_architecture_headline ||
            fallback.manufacturing.pillars[0].title,
          body:
            row.manufacturing_pillar_architecture_sub ||
            fallback.manufacturing.pillars[0].body,
        },
        {
          meta: PILLAR_META[1],
          title:
            row.manufacturing_pillar_equipment_headline ||
            fallback.manufacturing.pillars[1].title,
          body:
            row.manufacturing_pillar_equipment_sub ||
            fallback.manufacturing.pillars[1].body,
        },
        {
          meta: PILLAR_META[2],
          title:
            row.manufacturing_pillar_capacity_headline ||
            fallback.manufacturing.pillars[2].title,
          body:
            row.manufacturing_pillar_capacity_sub ||
            fallback.manufacturing.pillars[2].body,
        },
      ],
    },
    rnd: {
      eyebrow: row.rnd_eyebrow || fallback.rnd.eyebrow,
      headline: row.rnd_headline || fallback.rnd.headline,
      sub: row.rnd_sub || fallback.rnd.sub,
      programs: fallback.rnd.programs,
    },
    careers: {
      eyebrow: row.careers_eyebrow || fallback.careers.eyebrow,
      headline: row.careers_headline || fallback.careers.headline,
      sub: row.careers_sub || fallback.careers.sub,
      jobs: fallback.careers.jobs,
    },
    newsroom: {
      headline: row.newsroom_headline || fallback.newsroom.headline,
      articles: fallback.newsroom.articles,
    },
  };
}

export async function getHomePageContent(): Promise<HomePageContent> {
  const fallback = buildFallbackContent();
  const client = createPublicClient();

  if (!client) {
    return fallback;
  }

  const [homeResult, productsResult, careersResult, newsResult, rndResult] =
    await Promise.all([
      client.from("home").select("*").eq("id", 1).maybeSingle(),
      client
        .from("products")
        .select("*")
        .eq("is_published", true)
        .order("sort_order", { ascending: true })
        .limit(1),
      client.from("careers").select("*").order("sort_order", { ascending: true }),
      client
        .from("news")
        .select("*")
        .eq("status", "published")
        .order("published_at", { ascending: false })
        .limit(5),
      client
        .from("rnd")
        .select("*")
        .eq("is_published", true)
        .order("sort_order", { ascending: true }),
    ]);

  const homeRow = homeResult.data as HomePageRow | null;
  const content = homeRow ? mapHomeRow(homeRow, fallback) : { ...fallback };

  if (productsResult.data?.[0]) {
    content.featuredProduct = mapProductRow(productsResult.data[0]);
    if (!homeRow) {
      content.hero.button1.href = `/products/${content.featuredProduct.slug}`;
    }
  }

  if (careersResult.data?.length) {
    content.careers.jobs = careersResult.data
      .map(mapCareerRow)
      .filter((job) => job.status !== "Closed")
      .sort((a, b) => JOB_STATUS_SORT_ORDER[a.status] - JOB_STATUS_SORT_ORDER[b.status])
      .slice(0, 3);
  }

  if (newsResult.data?.length) {
    content.newsroom.articles = newsResult.data.map(mapNewsRow);
  }

  if (rndResult.data?.length) {
    content.rnd.programs = rndResult.data.map((row) => ({
      title: String(row.title),
      regimen: String(row.regimen ?? ""),
      phase: String(row.phase ?? ""),
      targetLaunch: String(row.target_launch ?? ""),
    }));
  }

  return content;
}
