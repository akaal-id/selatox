import { Hero } from "./home/hero/hero";
import { Introsection } from "./home/introsection/introsection";
import { Prodsection } from "./home/prodlist/prodsection/prodsection";
import { Valuesection } from "./home/valuesection/valuesection";
import { FeaturedProduct } from "./home/featured-product/featured-product";
import { Business } from "./home/business/business";
import { featuredProducts } from "@/lib/prod-data";

/** Single home page at "/". Section order: Hero → Intro → Values → Featured Product → Business → Prodsection. */
export default function HomePage() {
  return (
    <main>
      <Hero />
      <Introsection />
      <Valuesection />
      <FeaturedProduct />
      <Business />
      <Prodsection products={featuredProducts} />
      
      
    </main>
  );
}
