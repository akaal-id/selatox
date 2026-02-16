import { Hero } from "./home/hero/hero";
import { Prodsection } from "./home/prodlist/prodsection/prodsection";
import { featuredProducts } from "@/lib/prod-data";

/** Single home page at "/" */
export default function HomePage() {
  return (
    <main>
      <Hero />
      <Prodsection products={featuredProducts} />
    </main>
  );
}
