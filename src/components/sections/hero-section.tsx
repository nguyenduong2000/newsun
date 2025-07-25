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
import { Banner } from "@/types";

interface HeroSectionProps {
    banners: Banner[];
}

export function HeroSection({ banners }: HeroSectionProps) {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  return (
    <section className="relative">
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
          {banners.map((banner, index) => (
            <CarouselItem key={index}>
              <div className="w-full aspect-[12/3] relative">
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
        <CarouselPrevious className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2" />
        <CarouselNext className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2" />
      </Carousel>
    </section>
  );
}
