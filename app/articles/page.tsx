"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "@/utils/supabase";

type Article = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  author: string;
  category: string;
  created_at: string;
};

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      const { data } = await supabase
        .from("posts")
        .select("*")
        .eq("type", "article")
        .eq("status", "published") // <-- Only show published
        .order("created_at", { ascending: false });
      
      if (data) setArticles(data);
      setLoading(false);
    };
    fetchArticles();
  }, []);

  // Filter articles based on the search query
  const filteredArticles = articles.filter((article) => 
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-20">
      <div className="mb-12 border-b border-line pb-8">
        <h1 className="text-5xl font-serif text-ink">Articles</h1>
        <p className="mt-4 text-lg text-muted">
          Essays, opinions, and stories from the student body.
        </p>
        
        {/* Search Bar */}
        <div className="mt-8 max-w-md">
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-sm border border-line bg-white px-4 py-3 text-ink focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
          />
        </div>
      </div>

      {loading ? (
        <p className="text-muted">Loading articles...</p>
      ) : filteredArticles.length === 0 ? (
        <p className="text-muted italic text-center py-12">No articles found matching your search.</p>
      ) : (
        <div className="grid gap-x-12 gap-y-16 sm:grid-cols-2">
          {filteredArticles.map((article) => (
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