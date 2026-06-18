import { Hero } from "./home/hero/hero";
import { Introsection } from "./home/introsection/introsection";
import { Valuesection } from "./home/valuesection/valuesection";
import { FeaturedProduct } from "./home/featured-product/featured-product";
import { Business } from "./home/business/business";
import { ManufacturingPlan } from "./home/manufacturing-plan/manufacturing-plan";
import { RndCenter } from "./home/rnd-center/rnd-center";
import { Newsroom } from "./home/newsroom/newsroom";
import { CareerSection } from "./home/career/career";

/** Single home page at "/". Section order: Hero → Intro → Values → Featured Product → Business → Manufacturing → R&D → Career → Newsroom. */
export default function HomePage() {
  return (
    <main>
      <Hero />
      <Introsection />
      <Valuesection />
      <FeaturedProduct />
      <Business />
      <ManufacturingPlan />
      <RndCenter />
      <CareerSection />
      <Newsroom />
    </main>
  );
}
