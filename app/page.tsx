import { Hero } from "./home/hero/hero";
import { Introsection } from "./home/introsection/introsection";
import { Prodsection } from "./home/prodlist/prodsection/prodsection";
import { featuredProducts } from "@/lib/prod-data";

/** Single home page at "/". Section order: Home (hero) → Product → Intro. */
export default function HomePage() {
  return (
    <main>
      <Hero />
      <Prodsection products={featuredProducts} />
      <Introsection />
    </main>
  );
}
