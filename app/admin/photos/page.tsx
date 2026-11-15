"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/utils/supabase";
import Link from "next/link";

type Photo = {
  id: string;
  url: string;
  caption: string;
  alt: string;
};

export default function AdminPhotosPage() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [uploading, setUploading] = useState(false);
  const [caption, setCaption] = useState("");
  const [alt, setAlt] = useState("");
  const [file, setFile] = useState<File | null>(null);

  // Fetch existing photos on load
  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    const { data } = await supabase.from("photos").select("*").order("created_at", { ascending: false });
    if (data) setPhotos(data);
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return alert("Please select a file");

    setUploading(true);

    // 1. Upload the file to Supabase Storage
    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("gallery")
      .upload(filePath, file);

    if (uploadError) {
      alert("Error uploading image: " + uploadError.message);
      setUploading(false);
      return;
    }

    // 2. Get the public URL of the uploaded image
    const { data: { publicUrl } } = supabase.storage.from("gallery").getPublicUrl(filePath);

    // 3. Save the record to the database
    const { error: dbError } = await supabase.from("photos").insert({
      url: publicUrl,
      caption: caption,
      alt: alt,
    });

    if (dbError) {
      alert("Error saving to database: " + dbError.message);
    } else {
      setCaption("");
      setAlt("");
      setFile(null);
      fetchPhotos();
    }
    
    setUploading(false);
  };

  const handleDelete = async (id: string, url: string) => {
    if (!confirm("Are you sure you want to delete this photo?")) return;

    // Delete from DB
    await supabase.from("photos").delete().eq("id", id);
    
    // Extract the file name from the URL to delete from storage
    const fileName = url.split("/").pop();
    if (fileName) {
      await supabase.storage.from("gallery").remove([fileName]);
    }

    fetchPhotos();
  };

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-20">
      <Link href="/admin" className="text-sm font-medium text-accent hover:underline mb-8 inline-block">
        &larr; Back to Dashboard
      </Link>
      
      <h1 className="text-4xl font-serif text-ink mb-8">Manage Gallery</h1>

      {/* Upload Form */}
      <form onSubmit={handleUpload} className="mb-12 rounded-sm border border-line bg-paper-deep p-6 max-w-2xl">
        <h2 className="text-xl font-serif mb-4">Upload New Photo</h2>
        <div className="flex flex-col gap-4">
          <input 
            type="file" 
            accept="image/*" 
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="text-sm text-ink file:mr-4 file:rounded-sm file:border-0 file:bg-accent file:px-4 file:py-2 file:text-sm file:font-semibold file:text-paper hover:file:bg-accent-soft"
          />
          <input 
            type="text" 
            placeholder="Caption (e.g. The 9 AM lecture)" 
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="rounded-sm border border-line bg-white px-4 py-2 text-ink focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
          />
          <input 
            type="text" 
            placeholder="Alt Text (for accessibility)" 
            value={alt}
            onChange={(e) => setAlt(e.target.value)}
            className="rounded-sm border border-line bg-white px-4 py-2 text-ink focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
          />
          <button 
            type="submit" 
            disabled={uploading}
            className="mt-2 w-full rounded-sm bg-accent px-6 py-3 text-sm font-bold uppercase tracking-wider text-paper transition-colors hover:bg-accent-soft disabled:opacity-50"
          >
            {uploading ? "Uploading..." : "Upload Photo"}
          </button>
        </div>
      </form>

      {/* Photo List */}
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {photos.map((photo) => (
          <div key={photo.id} className="group relative overflow-hidden rounded-sm border border-line bg-paper">
            <img src={photo.url} alt={photo.alt} className="w-full h-48 object-cover" />
            <div className="p-4 flex justify-between items-center">
              <p className="text-sm text-ink truncate pr-4">{photo.caption || "No caption"}</p>
              <button 
                onClick={() => handleDelete(photo.id, photo.url)}
                className="text-xs font-bold text-red-500 hover:text-red-700 uppercase tracking-wider"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        {photos.length === 0 && (
          <p className="text-muted col-span-3">No photos uploaded yet.</p>
        )}
      </div>
    </div>
  );
}