import Link from "next/link";

const links = [
  { href: "/articles", label: "Articles" },
  { href: "/podcasts", label: "Podcasts" },
  { href: "/gallery", label: "Gallery" },
];

export default function Nav() {
  return (
    <header className="border-b border-line bg-paper/80 backdrop-blur-sm sticky top-0 z-40">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link
          href="/"
          className="font-serif text-xl font-semibold tracking-tight text-ink hover:text-accent transition-colors"
        >
          Campus Diaries
        </Link>
        <ul className="hidden gap-8 text-sm font-medium sm:flex">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-muted hover:text-accent transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}