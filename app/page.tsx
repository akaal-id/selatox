import { Hero } from "./home/hero/hero";

/** Root route: "/" is served by app/page.tsx */
export default function RootPage() {
  return (
    <main>
      <Hero />
    </main>
  );
}
