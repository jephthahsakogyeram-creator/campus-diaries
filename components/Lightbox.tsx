"use client"; // Required for interactivity (useState/useEffect)

import { useEffect } from "react";

type Photo = {
  id: string;
  url: string;
  alt: string;
  caption: string;
};

type LightboxProps = {
  photos: Photo[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
};

export default function Lightbox({
  photos,
  currentIndex,
  onClose,
  onPrev,
  onNext,
}: LightboxProps) {
  // Lock body scroll when lightbox is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, onPrev, onNext]);

  const currentPhoto = photos[currentIndex];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/95 backdrop-blur-sm transition-opacity duration-300"
      onClick={onClose} // Click outside to close
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute right-6 top-6 z-50 text-paper/70 hover:text-paper transition-colors"
        aria-label="Close lightbox"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-10 h-10">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Prev Button */}
      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-2 text-paper/50 hover:text-paper bg-ink/50 hover:bg-ink/80 rounded-full transition-all"
        aria-label="Previous photo"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Next Button */}
      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-2 text-paper/50 hover:text-paper bg-ink/50 hover:bg-ink/80 rounded-full transition-all"
        aria-label="Next photo"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Image Container (stopPropagation so clicking image doesn't close) */}
      <div
        className="relative flex max-h-[90vh] max-w-6xl flex-col items-center px-4 animate-in fade-in zoom-in duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={currentPhoto.url}
          alt={currentPhoto.alt}
          className="max-h-[80vh] w-auto object-contain shadow-2xl"
        />
        <p className="mt-4 text-center text-lg font-serif text-paper">
          {currentPhoto.caption}
        </p>
      </div>
    </div>
  );
}