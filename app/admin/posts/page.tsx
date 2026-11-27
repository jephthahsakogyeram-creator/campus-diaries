"use client";

import RichTextEditor from "@/components/RichTextEditor";
import { useState, useEffect } from "react";
import { supabase } from "@/utils/supabase";
import Link from "next/link";

type Post = {
  id: string;
  title: string;
  slug: string;
  type: "article" | "podcast";
  status: "draft" | "published";
  created_at: string;
};

export default function AdminPostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  // Form State
  const [title, setTitle] = useState("");
  const [type, setType] = useState<"article" | "podcast">("article");
  const [status, setStatus] = useState<"draft" | "published">("published");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [duration, setDuration] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const { data } = await supabase.from("posts").select("*").order("created_at", { ascending: false });
    if (data) setPosts(data);
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");

    const { error } = await supabase.from("posts").insert({
      title,
      slug,
      type,
      status,
      excerpt,
      content,
      author,
      category,
      video_url: videoUrl || null,
      duration: duration || null,
    });

    if (error) {
      alert("Error saving post: " + error.message);
    } else {
      setTitle("");
      setExcerpt("");
      setContent("");
      setAuthor("");
      setCategory("");
      setVideoUrl("");
      setDuration("");
      setStatus("published");
      fetchPosts();
    }
    setSubmitting(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return;
    await supabase.from("posts").delete().eq("id", id);
    fetchPosts();
  };

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-20">
      <Link href="/admin" className="text-sm font-medium text-accent hover:underline mb-8 inline-block">
        &larr; Back to Dashboard
      </Link>
      
      <h1 className="text-4xl font-serif text-ink mb-8">Manage Content</h1>

      {/* Create Form */}
      <form onSubmit={handleSubmit} className="mb-12 rounded-sm border border-line bg-paper-deep p-6">
        <h2 className="text-xl font-serif mb-4">Create New Post</h2>
        
        <div className="grid gap-4 sm:grid-cols-2">
          <input 
            type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required
            className="rounded-sm border border-line bg-white px-4 py-2 text-ink focus:border-accent focus:outline-none"
          />
          <select 
            value={type} onChange={(e) => setType(e.target.value as "article" | "podcast")}
            className="rounded-sm border border-line bg-white px-4 py-2 text-ink focus:border-accent focus:outline-none"
          >
            <option value="article">Article</option>
            <option value="podcast">Podcast</option>
          </select>
          
          <input 
            type="text" placeholder="Author (e.g. Isabella)" value={author} onChange={(e) => setAuthor(e.target.value)}
            className="rounded-sm border border-line bg-white px-4 py-2 text-ink focus:border-accent focus:outline-none"
          />
          <input 
            type="text" placeholder="Category (e.g. Campus Life)" value={category} onChange={(e) => setCategory(e.target.value)}
            className="rounded-sm border border-line bg-white px-4 py-2 text-ink focus:border-accent focus:outline-none"
          />

          <textarea 
            placeholder="Excerpt (Short description for the homepage card)" value={excerpt} onChange={(e) => setExcerpt(e.target.value)} required rows={2}
            className="sm:col-span-2 rounded-sm border border-line bg-white px-4 py-2 text-ink focus:border-accent focus:outline-none"
          />

          {type === "podcast" ? (
            <>
              <input 
                type="url" placeholder="YouTube Video URL" value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} required
                className="rounded-sm border border-line bg-white px-4 py-2 text-ink focus:border-accent focus:outline-none"
              />
              <input 
                type="text" placeholder="Duration (e.g. 34 min)" value={duration} onChange={(e) => setDuration(e.target.value)} required
                className="rounded-sm border border-line bg-white px-4 py-2 text-ink focus:border-accent focus:outline-none"
              />
            </>
          ) : (
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-ink mb-2">Article Content</label>
              <RichTextEditor content={content} onChange={setContent} />
            </div>
          )}
        </div>

        {/* Status Dropdown */}
        <div className="mt-4">
          <label className="block text-sm font-medium text-ink mb-2">Publishing Status</label>
          <select 
            value={status} onChange={(e) => setStatus(e.target.value as "draft" | "published")}
            className="w-full sm:w-1/2 rounded-sm border border-line bg-white px-4 py-2 text-ink focus:border-accent focus:outline-none"
          >
            <option value="published">Publish Immediately</option>
            <option value="draft">Save as Draft</option>
          </select>
        </div>

        <button 
          type="submit" disabled={submitting}
          className="mt-6 w-full rounded-sm bg-accent px-6 py-3 text-sm font-bold uppercase tracking-wider text-paper transition-colors hover:bg-accent-soft disabled:opacity-50"
        >
          {submitting ? "Saving..." : "Save Post"}
        </button>
      </form>

      {/* Post List */}
      <div className="flex flex-col gap-4">
        {posts.map((post) => (
          <div key={post.id} className="flex flex-col sm:flex-row sm:items-center justify-between rounded-sm border border-line bg-paper p-4">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <span className="text-xs font-bold uppercase tracking-wider text-accent">{post.type}</span>
                <span className={`text-xs font-bold uppercase tracking-wider ${post.status === 'draft' ? 'text-yellow-600' : 'text-green-600'}`}>
                  {post.status}
                </span>
              </div>
              <h3 className="text-xl font-serif text-ink">{post.title}</h3>
              <p className="text-sm text-muted">{new Date(post.created_at).toLocaleDateString()}</p>
            </div>
            <button 
              onClick={() => handleDelete(post.id)}
              className="mt-4 sm:mt-0 text-xs font-bold text-red-500 hover:text-red-700 uppercase tracking-wider"
            >
              Delete
            </button>
          </div>
        ))}
        {!loading && posts.length === 0 && (
          <p className="text-muted">No posts created yet.</p>
        )}
      </div>
    </div>
  );
}