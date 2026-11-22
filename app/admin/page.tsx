import Link from "next/link";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import LogoutButton from "@/components/LogoutButton";

export default async function AdminDashboard() {
  const cookieStore = await cookies();
  
  // Initialize Supabase with proper server-side cookie handling
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // Ignore if called from a Server Component
          }
        },
      },
    }
  );

  // Get the logged-in user
  const { data: { user } } = await supabase.auth.getUser();

  // If not logged in, kick them back to the login page
  if (!user) {
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
          <p className="mt-2 text-muted">Welcome back, {user.email}</p>
        </div>
        <LogoutButton />
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