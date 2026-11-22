import ImageCarousel from "@/components/ImageCarousel";
import Link from "next/link";
import { supabase } from "@/utils/supabase";

export const revalidate = 0; // Always fetch fresh data

export default async function Home() {
  // Fetch latest data from Supabase
  const { data: posts } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });

  const articles = posts?.filter((p) => p.type === "article").slice(0, 2) || [];
  const podcasts = posts?.filter((p) => p.type === "podcast") || [];
  const featuredPodcast = podcasts[0];

  return (
    <div className="flex flex-col">
      {/* 1. HERO SECTION */}
      <section className="mx-auto w-full max-w-6xl px-6 pt-16 pb-20 sm:pt-24 sm:pb-32">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between border-b border-line pb-8 mb-16">
          <div>
            <h1 className="text-4xl sm:text-5xl font-serif font-bold text-ink leading-tight">
              Campus<br/>Diaries
            </h1>
          </div>
          <div className="mt-6 sm:mt-0">
            <p className="text-sm font-bold uppercase tracking-widest text-accent">
              Beyond the<br/>lecture halls.
            </p>
          </div>
        </div>

        <div className="flex flex-col items-start gap-6 sm:w-4/5">
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-bold text-ink leading-[1.05] tracking-tight">
            Life happens beyond the lecture halls.
          </h2>
          <p className="max-w-2xl text-lg sm:text-xl text-muted leading-relaxed">
            Stories, conversations, culture and experiences that capture the real essence of student life.
          </p>
          <p className="max-w-2xl text-lg sm:text-xl text-muted leading-relaxed">
            We want to tell the stories that often go unnoticed, highlight interesting people and experiences, and create a space where student voices and creativity can shine.
          </p>
          <div className="mt-4 flex flex-wrap gap-4">
            <Link href="/articles" className="rounded-md bg-accent px-8 py-4 text-sm font-bold uppercase tracking-wider text-paper transition-colors hover:bg-accent-soft">
              Explore Stories &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* 2. CINEMATIC PHOTO SECTION (Carousel) */}
      <section className="w-full px-6 mb-20">
        <div className="mx-auto max-w-6xl">
          <ImageCarousel />
        </div>
      </section>

      {/* 3. LATEST ARTICLES */}
      <section className="border-t border-line bg-paper py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex items-end justify-between mb-10">
            <h2 className="text-3xl font-serif text-ink">Latest Articles</h2>
            <Link href="/articles" className="text-sm font-bold text-accent hover:underline uppercase tracking-wide">
              View all &rarr;
            </Link>
          </div>
          <div className="grid gap-12 sm:grid-cols-2">
            {articles.map((article) => (
              <div key={article.id} className="group flex flex-col gap-3">
                <span className="text-xs font-medium uppercase tracking-wider text-muted">{article.category}</span>
                <Link href={`/articles/${article.slug}`}>
                  <h3 className="text-2xl font-serif text-ink group-hover:text-accent transition-colors">{article.title}</h3>
                </Link>
                <p className="text-muted leading-relaxed">{article.excerpt}</p>
                <div className="mt-2 text-sm text-muted">By {article.author} on {new Date(article.created_at).toLocaleDateString()}</div>
              </div>
            ))}
          </div>
          {articles.length === 0 && <p className="text-muted">No articles published yet.</p>}
        </div>
      </section>


      {/* 5. FEATURED PODCAST */}
      {featuredPodcast && (
        <section className="border-t border-line bg-paper py-20">
          <div className="mx-auto max-w-6xl px-6">
            <div className="flex items-end justify-between mb-10">
              <h2 className="text-3xl font-serif text-ink">Latest Podcast</h2>
              <Link href="/podcasts" className="text-sm font-bold text-accent hover:underline uppercase tracking-wide">
                View all &rarr;
              </Link>
            </div>
            <div className="flex flex-col gap-8 sm:flex-row sm:items-center bg-paper-deep p-8 border border-line rounded-sm">
              <div className="flex-1">
                <span className="text-xs font-bold uppercase tracking-wider text-accent">Featured Episode</span>
                <h3 className="mt-2 text-3xl font-serif text-ink">{featuredPodcast.title}</h3>
                <p className="mt-4 text-muted text-lg leading-relaxed">{featuredPodcast.excerpt}</p>
                <div className="mt-6 text-sm font-medium text-muted">{new Date(featuredPodcast.created_at).toLocaleDateString()} &middot; {featuredPodcast.duration}</div>
              </div>
              <div className="flex-shrink-0">
                <Link href={`/podcasts/${featuredPodcast.slug}`} className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-accent text-paper transition-transform hover:scale-105" aria-label="Play podcast">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 ml-1"><path d="M8 5v14l11-7z" /></svg>
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 6. ABOUT US / VISION / MISSION (Keep existing hardcoded text) */}
      <section className="border-t border-line bg-paper-deep py-24">
        <div className="mx-auto max-w-6xl px-6 grid gap-16 md:grid-cols-3">
          <div>
            <h2 className="text-2xl font-serif text-ink mb-4">About Us</h2>
            <p className="text-muted leading-relaxed text-sm sm:text-base">Campus Diaries is a student-led media and creative platform that tells the stories of student life beyond academics.<br/><br/>We explore campus experiences, student stories, entertainment, lifestyle, culture and creativity through articles, interviews, podcasts, videos and other forms of storytelling.<br/><br/>We want to create a space where students can express themselves, share their experiences and have their voices heard.</p>
          </div>
          <div>
            <h2 className="text-2xl font-serif text-ink mb-4">Our Vision</h2>
            <p className="text-muted leading-relaxed text-sm sm:text-base">To become a platform that celebrates student voices, creativity and the experiences that make campus life unique.</p>
          </div>
          <div>
            <h2 className="text-2xl font-serif text-ink mb-4">Our Mission</h2>
            <p className="text-muted leading-relaxed text-sm sm:text-base">To give students a platform to share their stories, express their ideas, showcase their talents and connect with others through media and creative expression.</p>
          </div>
        </div>
      </section>

      {/* 7. FIND US & GET INVOLVED (Keep existing) */}
      <section className="border-t border-line bg-ink py-20 text-paper">
        <div className="mx-auto max-w-6xl px-6 flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="text-center md:text-left">
            <h2 className="text-4xl font-serif mb-4">Get Involved</h2>
            <p className="text-paper/70 max-w-md text-lg">Want to share a story, join the podcast, or showcase your photography? We are always looking for new voices.</p>
            <a href="mailto:hello@campusdiaries.com" className="inline-block mt-6 border-b border-accent text-accent font-bold pb-1 hover:text-paper hover:border-paper transition-colors">hello@campusdiaries.com</a>
          </div>
           <div className="text-center md:text-right">
            <h3 className="text-sm font-bold uppercase tracking-widest text-paper/50 mb-6">Find us online</h3>
            <ul className="flex flex-wrap gap-6 justify-center md:justify-end">
              <li>
                <a href="https://www.instagram.com/campusdiaries.hq" target="_blank" rel="noopener noreferrer" className="text-lg hover:text-accent transition-colors">
                  Instagram
                </a>
              </li>
              <li>
                <a href="https://www.tiktok.com/@campusdiaries..hq" target="_blank" rel="noopener noreferrer" className="text-lg hover:text-accent transition-colors">
                  TikTok
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}