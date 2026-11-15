import { supabase } from "@/utils/supabase";
import Link from "next/link";
import { notFound } from "next/navigation";

export const revalidate = 0;

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  const { data: article } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .eq("type", "article")
    .single();

  if (!article) {
    notFound();
  }

  return (
    <article className="mx-auto w-full max-w-3xl px-6 py-20">
      <Link href="/articles" className="text-sm font-medium text-accent hover:underline mb-8 inline-block">
        &larr; Back to Articles
      </Link>

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
          <span>{new Date(article.created_at).toLocaleDateString()}</span>
        </div>
      </header>

      <div className="prose prose-lg prose-stone max-w-none text-ink/90">
        {/* Split content by newlines to render paragraphs cleanly */}
        {article.content.split('\n').map((paragraph: string, index: number) => (
          <p key={index} className="mb-6 leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>
    </article>
  );
}