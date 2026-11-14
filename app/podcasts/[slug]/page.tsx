import { podcasts } from "@/lib/content";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function PodcastPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  const podcast = podcasts.find((p) => p.slug === slug);

  if (!podcast) {
    notFound();
  }

  const videoId = podcast.videoUrl.split("v=")[1];

  return (
    <article className="mx-auto w-full max-w-4xl px-6 py-20">
      
      <Link href="/podcasts" className="text-sm font-medium text-accent hover:underline mb-8 inline-block">
        &larr; Back to Podcasts
      </Link>

      <header className="mb-10">
        <span className="text-sm font-medium uppercase tracking-widest text-accent">
          Podcast Episode
        </span>
        <h1 className="mt-4 text-4xl sm:text-5xl font-serif font-semibold text-ink leading-tight">
          {podcast.title}
        </h1>
        <div className="mt-6 flex items-center gap-2 text-sm text-muted">
          <span>{podcast.date}</span>
          <span>&middot;</span>
          <span>{podcast.duration}</span>
        </div>
      </header>

      <div className="relative w-full overflow-hidden rounded-sm border border-line bg-black aspect-video shadow-lg mb-10">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          title={podcast.title}
          className="absolute inset-0 h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      <div className="prose prose-lg prose-stone max-w-none text-ink/90">
        <p className="leading-relaxed">{podcast.description}</p>
      </div>

    </article>
  );
}