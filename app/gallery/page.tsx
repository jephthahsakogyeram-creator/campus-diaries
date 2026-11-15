"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/utils/supabase";
import Lightbox from "@/components/Lightbox";

type Photo = {
  id: string;
  url: string;
  alt: string;
  caption: string;
};

export default function GalleryPage() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch photos from Supabase when the page loads
  useEffect(() => {
    const fetchPhotos = async () => {
      const { data, error } = await supabase
        .from("photos")
        .select("*")
        .order("created_at", { ascending: false });

      if (data) setPhotos(data);
      setLoading(false);
    };

    fetchPhotos();
  }, []);

  const handlePrev = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev === 0 ? photos.length - 1 : prev! - 1));
  };

  const handleNext = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev === photos.length - 1 ? 0 : prev! + 1));
  };

  if (loading) {
    return <div className="flex h-[50vh] items-center justify-center text-muted">Loading gallery...</div>;
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-20">
      <div className="mb-12 border-b border-line pb-8">
        <h1 className="text-5xl font-serif text-ink">Gallery</h1>
        <p className="mt-4 text-lg text-muted">
          Campus events, behind-the-scenes, and creative projects.
        </p>
      </div>

      {photos.length === 0 ? (
        <p className="text-muted italic text-center py-12">No photos uploaded yet. Check back soon!</p>
      ) : (
        <div className="columns-1 gap-6 sm:columns-2 md:columns-3">
          {photos.map((photo, index) => (
            <div key={photo.id} className="mb-6 break-inside-avoid group relative overflow-hidden rounded-sm bg-paper-deep cursor-pointer">
              <div onClick={() => setLightboxIndex(index)}>
                <img
                  src={photo.url}
                  alt={photo.alt || photo.caption}
                  className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-ink/0 transition-colors duration-300 group-hover:bg-ink/40 flex items-end p-6">
                  <p className="text-paper font-medium opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    {photo.caption}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {lightboxIndex !== null && (
        <Lightbox
          photos={photos}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      )}
    </div>
  );
}