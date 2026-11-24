"use client";

import { useState } from "react";
import Link from "next/link";

const links = [
  { href: "/articles", label: "Articles" },
  { href: "/podcasts", label: "Podcasts" },
  { href: "/gallery", label: "Gallery" },
  { href: "/team", label: "Team" },
];

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/80 backdrop-blur-sm">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link
          href="/"
          className="font-serif text-xl font-semibold tracking-tight text-ink hover:text-accent transition-colors"
          onClick={() => setIsOpen(false)}
        >
          Campus Diaries
        </Link>

        {/* Desktop Links */}
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

        {/* Mobile Menu Button (Hamburger) */}
        <button
          className="sm:hidden text-ink p-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="sm:hidden border-t border-line bg-paper">
          <ul className="flex flex-col gap-4 px-6 py-4 text-base font-medium">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block text-muted hover:text-accent transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
