"use client";

import { useRouter } from "next/navigation";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback } from "react";
import { Button } from "@/components/ui/Button";
import { Prodcard } from "../prodcard/prodcard";
import styles from "./prodsection.module.css";

export type FeaturedProduct = {
  title: string;
  description?: string;
  imageSrc?: string;
  imageAlt?: string;
  href?: string;
};

export type ProdsectionProps = {
  title?: string;
  products: FeaturedProduct[];
};

export function Prodsection({
  title = "Featured products",
  products,
}: ProdsectionProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: true,
    skipSnaps: false,
    dragFree: false,
    containScroll: "trimSnaps",
    slidesToScroll: 1,
  });

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  const router = useRouter();

  return (
    <section id="prodsection" className={styles.section} aria-labelledby="featured-products-heading" data-navbar="default">
      {/* Navbar variant: default (solid bg, dark text) while this section is in view */}
      <div className={styles.container}>
        <div className={styles.topSection}>
          <h2 id="featured-products-heading" className={styles.eyebrow}>
            {title}
          </h2>
          <div className={styles.arrowGroup} aria-label="Carousel navigation">
            <span className={styles.buttonWrapper}>
              <Button
                variant="border"
                showIcon={false}
                color="var(--neutral-160)"
                backgroundColor="var(--neutral-20)"
                
                iconColor="var(--blue-100)"
                borderColor="var(--neutral-60)"
                size="md"
                onClick={() => router.push("/products")}
              >
                All products
              </Button>
            </span>
            <button
              type="button"
              className={styles.arrowBtn}
              onClick={scrollPrev}
              aria-label="Previous products"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              type="button"
              className={styles.arrowBtn}
              onClick={scrollNext}
              aria-label="Next products"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        <div className={styles.viewport} ref={emblaRef} data-lenis-prevent>
          <div className={styles.carousel}>
            {products.map((product) => (
              <div key={product.title} className={styles.slide}>
                <Prodcard
                  title={product.title}
                  description={product.description}
                  imageSrc={product.imageSrc}
                  imageAlt={product.imageAlt}
                  href={product.href}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
