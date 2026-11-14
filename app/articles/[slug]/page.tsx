import { articles } from "@/lib/content";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  // In Next.js 15+, params is a Promise and must be awaited
  const { slug } = await params;
  
  // Find the specific article from our sample data
  const article = articles.find((a) => a.slug === slug);

  // If the article doesn't exist, show a 404 page
  if (!article) {
    notFound();
  }

  return (
    <article className="mx-auto w-full max-w-3xl px-6 py-20">
      
      {/* Back Link */}
      <Link href="/articles" className="text-sm font-medium text-accent hover:underline mb-8 inline-block">
        &larr; Back to Articles
      </Link>

      {/* Article Header */}
      <header className="mb-12">
        <span className="text-sm font-medium uppercase tracking-widest text-muted">
          {article.category}
        </span>
        <h1 className="mt-4 text-4xl sm:text-5xl font-serif font-semibold text-ink leading-tight">
          {article.title}
        </h1>
        <div className="mt-6 flex items-center gap-2 text-sm text-muted">
          <span>By {article.author}</span>
          <span>&middot;</span>
          <span>{article.date}</span>
        </div>
      </header>

      {/* Article Content */}
      <div className="prose prose-lg prose-stone max-w-none text-ink/90">
        {/* We split by newlines to render paragraphs cleanly */}
        {article.content.split('\n').map((paragraph, index) => (
          <p key={index} className="mb-6 leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>

    </article>
  );
}