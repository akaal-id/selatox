import { readFileSync, writeFileSync } from "fs";
import { products } from "../src/constants/products";
import { newsArticles } from "../src/constants/news";
import { jobListings } from "../src/constants/opportunities";

function sqlEscape(value: string): string {
  return String(value).replace(/'/g, "''");
}

function sqlString(value: string): string {
  return `'${sqlEscape(value)}'`;
}

function sqlTextArray(values: string[]): string {
  if (!values.length) return "ARRAY[]::text[]";
  return `ARRAY[${values.map((v) => sqlString(v)).join(", ")}]`;
}

const productInserts = products.map((p, i) => {
  const chips = JSON.stringify(p.valueChips);
  const specs = JSON.stringify(p.specs);
  return `INSERT INTO public.products (
  slug, title, brand, eyebrow, tagline, short_description, description,
  spec_headline, spec_eyebrow, image_src, image_alt, category,
  value_chips, regulatory_tags, specs, sort_order, is_published
) VALUES (
  ${sqlString(p.slug)},
  ${sqlString(p.title)},
  ${sqlString(p.brand)},
  ${sqlString(p.eyebrow)},
  ${sqlString(p.tagline)},
  ${sqlString(p.shortDescription)},
  ${sqlString(p.description)},
  ${sqlString(p.specHeadline)},
  ${sqlString(p.specEyebrow)},
  ${sqlString(p.imageSrc)},
  ${sqlString(p.imageAlt)},
  ${sqlString(p.category)},
  ${sqlString(chips)}::jsonb,
  ${sqlTextArray(p.regulatoryTags)},
  ${sqlString(specs)}::jsonb,
  ${i},
  true
)
ON CONFLICT (slug) DO NOTHING;`;
});

const newsInserts = newsArticles.map((a) => {
  return `INSERT INTO public.news (
  legacy_id, slug, category, display_date, published_year, title,
  image_src, image_alt, body_html, status, published_at
) VALUES (
  ${a.id},
  ${sqlString(a.slug)},
  ${sqlString(a.category)},
  ${sqlString(a.date)},
  ${a.publishedYear},
  ${sqlString(a.title)},
  ${sqlString(a.imageSrc)},
  ${sqlString(a.imageAlt)},
  ${sqlString(a.bodyHtml.trim())},
  'published',
  now()
)
ON CONFLICT (slug) DO NOTHING;`;
});

const careerInserts = jobListings.map((job, i) => {
  return `INSERT INTO public.careers (
  id, slug, status, title, location, category,
  experience_level, apply_deadline, description, sort_order
) VALUES (
  ${sqlString(job.id)},
  ${sqlString(job.slug)},
  ${sqlString(job.status)},
  ${sqlString(job.title)},
  ${sqlString(job.location)},
  ${sqlString(job.category)},
  ${sqlString(job.experienceLevel)},
  ${sqlString(job.applyDeadline)},
  ${sqlString(job.description)},
  ${i}
)
ON CONFLICT (id) DO NOTHING;`;
});

const seedBlocks: Record<string, string> = {
  "sql/products.sql": `-- Seed: src/constants/products.ts\n\n${productInserts.join("\n\n")}\n`,
  "sql/news.sql": `-- Seed: src/constants/news.ts\n\n${newsInserts.join("\n\n")}\n`,
  "sql/careers.sql": `-- Seed: src/constants/opportunities.ts\n\n${careerInserts.join("\n\n")}\n`,
};

for (const [file, seed] of Object.entries(seedBlocks)) {
  const content = readFileSync(file, "utf8");
  const marker = "-- Seed:";
  const schema = content.includes(marker)
    ? content.slice(0, content.indexOf(marker)).trimEnd()
    : content.trimEnd();
  writeFileSync(file, `${schema}\n\n${seed}`);
}

console.log(
  `Updated seeds: ${productInserts.length} products, ${newsInserts.length} news, ${careerInserts.length} careers`
);
