import Link from "next/link";
import { supabase } from "@/utils/supabase";

export const revalidate = 0; // Always fetch fresh data

export default async function ArticlesPage() {
  const { data: articles } = await supabase
    .from("posts")
    .select("*")
    .eq("type", "article")
    .order("created_at", { ascending: false });

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-20">
      <div className="mb-12 border-b border-line pb-8">
        <h1 className="text-5xl font-serif text-ink">Articles</h1>
        <p className="mt-4 text-lg text-muted">
          Essays, opinions, and stories from the student body.
        </p>
      </div>

      {!articles || articles.length === 0 ? (
        <p className="text-muted italic text-center py-12">No articles published yet. Check back soon!</p>
      ) : (
        <div className="grid gap-x-12 gap-y-16 sm:grid-cols-2">
          {articles.map((article) => (
            <div key={article.id} className="group flex flex-col gap-3">
              <span className="text-xs font-medium uppercase tracking-wider text-muted">
                {article.category}
              </span>
              <Link href={`/articles/${article.slug}`}>
                <h3 className="text-2xl font-serif text-ink group-hover:text-accent transition-colors">
                  {article.title}
                </h3>
              </Link>
              <p className="text-muted leading-relaxed">
                {article.excerpt}
              </p>
              <div className="mt-2 text-sm text-muted">
                By {article.author} on {new Date(article.created_at).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}