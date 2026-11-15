import Link from "next/link";
import { supabase } from "@/utils/supabase";
import { redirect } from "next/navigation";

export default async function AdminDashboard() {
  // Check if the user is logged in
  const { data: { session } } = await supabase.auth.getSession();

  // If not logged in, kick them back to the login page
  if (!session) {
    redirect("/admin/login");
  }

  // Fetch some quick stats from our database
  const { count: postsCount } = await supabase.from("posts").select("*", { count: "exact", head: true });
  const { count: photosCount } = await supabase.from("photos").select("*", { count: "exact", head: true });

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-20">
      <div className="mb-12 flex items-center justify-between border-b border-line pb-8">
        <div>
          <h1 className="text-4xl font-serif text-ink">Admin Dashboard</h1>
          <p className="mt-2 text-muted">Welcome back, {session.user.email}</p>
        </div>
        <form action={async () => {
          "use server";
          await supabase.auth.signOut();
          redirect("/");
        }}>
          <button className="text-sm font-medium text-muted hover:text-accent underline underline-offset-4">
            Log Out
          </button>
        </form>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Posts Card */}
        <Link href="/admin/posts" className="group rounded-sm border border-line bg-paper p-8 transition-colors hover:bg-paper-deep">
          <h2 className="text-2xl font-serif text-ink group-hover:text-accent">Manage Content</h2>
          <p className="mt-2 text-muted">Add, edit, or delete articles and podcast episodes.</p>
          <p className="mt-6 text-3xl font-serif text-accent">{postsCount || 0} <span className="text-sm font-sans text-muted">Posts</span></p>
        </Link>

        {/* Photos Card */}
        <Link href="/admin/photos" className="group rounded-sm border border-line bg-paper p-8 transition-colors hover:bg-paper-deep">
          <h2 className="text-2xl font-serif text-ink group-hover:text-accent">Manage Gallery</h2>
          <p className="mt-2 text-muted">Upload and organize photos for the public gallery.</p>
          <p className="mt-6 text-3xl font-serif text-accent">{photosCount || 0} <span className="text-sm font-sans text-muted">Photos</span></p>
        </Link>
      </div>
    </div>
  );
}