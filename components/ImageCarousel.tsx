"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

export default function ImageCarousel() {
  // We add a small stopOnInteraction: false so it keeps sliding even if they swipe
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 4000, stopOnInteraction: false }),
  ]);

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
    <div className="relative w-full overflow-hidden rounded-sm">
      {/* Added touch-pan-y to ensure smooth vertical scrolling while swiping horizontally */}
      <div className="overflow-hidden touch-pan-y" ref={emblaRef}>
        <div className="flex">
          {images.map((image, index) => (
            <div className="relative min-w-0 flex-[0_0_100%]" key={index}>
              <div className="relative aspect-[4/3] w-full sm:aspect-[2.4/1]">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Dots - made bigger for mobile tapping */}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-3">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => emblaApi?.scrollTo(index)}
            className={`h-2.5 w-2.5 rounded-full transition-colors ${
              index === selectedIndex ? "bg-accent" : "bg-paper/50 hover:bg-paper"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}