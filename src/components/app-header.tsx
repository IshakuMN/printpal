"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import { CartButton } from "./cart-button";
import { useSearch } from "./search-provider";
import { cn } from "./ui";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/categories", label: "Shop" },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}

const FEED_PREFIXES = ["/categories"];

function isFeedPage(pathname: string) {
  if (pathname === "/") return true;
  return FEED_PREFIXES.some((p) => pathname.startsWith(p));
}

export function AppHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const { query, setQuery } = useSearch();

  return (
    <header className="sticky top-0 z-40 border-b border-ink-100 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center gap-2 px-4 sm:gap-3 sm:px-6">
        <Link href="/" aria-label="Home" className="flex shrink-0 items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-600 text-lg font-black text-white">
            P
          </span>
          <span className="hidden text-[17px] font-extrabold tracking-tight text-ink-900 sm:block">
            PrintPal
          </span>
        </Link>

        <nav className="ml-2 hidden items-center gap-1 md:flex">
          {NAV.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex h-10 items-center rounded-full px-4 text-sm font-semibold transition-colors",
                  active
                    ? "bg-ink-900 text-white"
                    : "text-ink-700 hover:bg-ink-100 hover:text-ink-900",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="min-w-0 flex-1 px-1 sm:px-2">
          <label className="relative block">
            <Search
              size={16}
              className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-ink-400"
            />
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                if (!isFeedPage(pathname)) router.push("/");
              }}
              placeholder="Search ideas"
              aria-label="Search products"
              className="h-10 w-full rounded-full border-0 bg-ink-100 pr-9 pl-10 text-sm text-ink-900 placeholder:text-ink-400 hover:bg-ink-200/70 focus:bg-white focus:ring-2 focus:ring-brand-600/40 focus:outline-none"
            />
            {query && (
              <button
                type="button"
                aria-label="Clear search"
                onClick={() => setQuery("")}
                className="absolute top-1/2 right-2 flex h-6 w-6 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full text-ink-400 hover:bg-ink-200 hover:text-ink-900"
              >
                <X size={14} />
              </button>
            )}
          </label>
        </div>

        <CartButton />
        <Link
          href="/profile"
          aria-label="Profile"
          className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold transition-colors",
            pathname === "/profile"
              ? "bg-ink-900 text-white"
              : "bg-ink-100 text-ink-600 hover:bg-ink-200 hover:text-ink-900",
          )}
        >
          G
        </Link>
      </div>
    </header>
  );
}
