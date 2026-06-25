import { Hero } from "./home/hero/hero";
import { Introsection } from "./home/introsection/introsection";
import { Valuesection } from "./home/valuesection/valuesection";
import { FeaturedProduct } from "./home/featured-product/featured-product";
import { Business } from "./home/business/business";
import { ManufacturingPlan } from "./home/manufacturing-plan/manufacturing-plan";
import { RndCenter } from "./home/rnd-center/rnd-center";
import { Newsroom } from "./home/newsroom/newsroom";
import { CareerSection } from "./home/career/career";
import { getHomePageContent } from "@/lib/cms/home-page-data";

/** Revalidate home page content from Supabase periodically. */
export const revalidate = 30;

/** Single home page at "/". Section order: Hero → Intro → Values → Featured Product → Business → Manufacturing → R&D → Career → Newsroom. */
export default async function HomePage() {
  const content = await getHomePageContent();

  return (
    <main>
      <Hero content={content.hero} />
      <Introsection content={content.intro} />
      <Valuesection content={content.values} />
      <FeaturedProduct product={content.featuredProduct} />
      <Business content={content.business} />
      <ManufacturingPlan content={content.manufacturing} />
      <RndCenter content={content.rnd} />
      <CareerSection content={content.careers} />
      <Newsroom content={content.newsroom} />
    </main>
  );
}
