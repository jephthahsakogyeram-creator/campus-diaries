import { supabase } from "@/utils/supabase";
import Link from "next/link";

export const revalidate = 0;

export default async function PodcastsPage() {
  const { data: podcasts } = await supabase
    .from("posts")
    .select("*")
    .eq("type", "podcast")
    .eq("status", "published") 
    .order("created_at", { ascending: false });
  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-20">
      <div className="mb-12 border-b border-line pb-8">
        <h1 className="text-5xl font-serif text-ink">Podcasts</h1>
        <p className="mt-4 text-lg text-muted">
          Conversations, stories, and voices from the campus community.
        </p>
      </div>

      {!podcasts || podcasts.length === 0 ? (
        <p className="text-muted italic text-center py-12">No podcast episodes published yet.</p>
      ) : (
        <div className="flex flex-col gap-8">
          {podcasts.map((podcast) => (
            <div key={podcast.id} className="group flex flex-col gap-6 rounded-sm border border-line bg-paper p-8 sm:flex-row sm:items-center transition-colors hover:bg-paper-deep">
              <div className="flex-1">
                <span className="text-xs font-medium uppercase tracking-wider text-accent">
                  Podcast Episode
                </span>
                <h2 className="mt-2 text-2xl font-serif text-ink group-hover:text-accent transition-colors">
                  <Link href={`/podcasts/${podcast.slug}`}>
                    {podcast.title}
                  </Link>
                </h2>
                <p className="mt-3 text-muted leading-relaxed">
                  {podcast.excerpt}
                </p>
                <div className="mt-4 text-sm text-muted">
                  {new Date(podcast.created_at).toLocaleDateString()} &middot; {podcast.duration}
                </div>
              </div>
              
              <div className="flex-shrink-0">
                <Link
                  href={`/podcasts/${podcast.slug}`}
                  className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-accent text-paper transition-transform hover:scale-105"
                  aria-label={`Listen to ${podcast.title}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 ml-1">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}