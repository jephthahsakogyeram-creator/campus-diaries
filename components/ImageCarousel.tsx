"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

export default function ImageCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start" }, 
    [Autoplay({ delay: 4000, stopOnInteraction: false })]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  const images = [
    { src: "/hero.jpg", alt: "Campus Diaries team" },
    { src: "/hero2.jpeg", alt: "Students working together" }, 
  ];

  return (
    <div className="relative w-full overflow-hidden rounded-sm z-0">
      <div className="overflow-hidden cursor-grab active:cursor-grabbing touch-pan-y" ref={emblaRef}>
        <div className="flex">
          {images.map((image, index) => (
            <div className="relative min-w-0 flex-[0_0_100%]" key={index}>
              <div className="relative aspect-[4/3] w-full sm:aspect-[2.4/1]">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="absolute inset-0 h-full w-full object-cover pointer-events-none select-none"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => emblaApi?.scrollTo(index)}
            className={`h-3 w-3 rounded-full transition-colors ${
              index === selectedIndex ? "bg-accent" : "bg-paper/70 hover:bg-paper"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
