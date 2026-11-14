import Link from "next/link";
import type { Article } from "@/lib/content";

export default function ArticleCard({ article }: { article: Article }) {
  return (
    <div className="group flex flex-col gap-3">
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
        By {article.author} on {article.date}
      </div>
    </div>
  );
}