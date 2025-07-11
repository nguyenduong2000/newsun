"use client";

import * as React from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const heroBanners = [
  {
    src: "https://placehold.co/1200x500.png",
    alt: "Banner 1",
    aiHint: "kitchen equipment",
  },
  {
    src: "https://placehold.co/1200x500.png",
    alt: "Banner 2",
    aiHint: "food processing",
  },
  {
    src: "https://placehold.co/1200x500.png",
    alt: "Banner 3",
    aiHint: "industrial appliances",
  },
];

export function HeroSection() {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  return (
    <section className="-mx-4 sm:-mx-6 lg:-mx-8 -mt-8">
      <Carousel
        plugins={[plugin.current]}
        className="w-full"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
        opts={{
          loop: true,
        }}
      >
        <CarouselContent>
          {heroBanners.map((banner, index) => (
            <CarouselItem key={index}>
              <div className="w-full aspect-[12/5] relative">
                <Image
                  src={banner.src}
                  alt={banner.alt}
                  fill
                  priority={index === 0}
                  className="object-cover"
                  data-ai-hint={banner.aiHint}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2" />
        <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2" />
      </Carousel>
    </section>
  );
}
