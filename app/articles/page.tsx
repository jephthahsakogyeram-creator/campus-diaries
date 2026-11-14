import { articles } from "@/lib/content";
import ArticleCard from "@/components/ArticleCard";

export default function ArticlesPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-20">
      <div className="mb-12 border-b border-line pb-8">
        <h1 className="text-5xl font-serif text-ink">Articles</h1>
        <p className="mt-4 text-lg text-muted">
          Essays, opinions, and stories from the student body.
        </p>
      </div>

      <div className="grid gap-x-12 gap-y-16 sm:grid-cols-2">
        {articles.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
    </div>
  );
}