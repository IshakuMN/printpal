"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { CartButton } from "./cart-button";
import { cn } from "./ui";

const ROOT = new Set(["/", "/categories", "/cart", "/profile"]);

export function AppHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const isRoot = ROOT.has(pathname) || pathname === "/";
  const onHome = pathname === "/";
  const onBrowse = pathname.startsWith("/categories");

  return (
    <header className="sticky top-0 z-40 bg-white">
      <div className="flex h-16 items-center gap-1 px-3">
        {!isRoot ? (
          <button
            type="button"
            aria-label="Go back"
            onClick={() => {
              if (typeof window !== "undefined" && window.history.length > 1) {
                router.back();
              } else {
                router.push("/");
              }
            }}
            className="flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full text-ink-900 hover:bg-ink-100"
          >
            <ChevronLeft size={22} strokeWidth={2.5} />
          </button>
        ) : null}

        <Link href="/" aria-label="Home" className="flex shrink-0 items-center gap-2 rounded-full p-2 hover:bg-ink-100">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-600 text-lg font-black text-white">
            P
          </span>
        </Link>

        <nav className="flex items-center gap-1">
          <Link
            href="/"
            className={cn(
              "flex h-11 items-center rounded-full px-4 text-sm font-semibold transition-colors",
              onHome ? "bg-ink-900 text-white" : "text-ink-900 hover:bg-ink-100",
            )}
          >
            Home
          </Link>
          <Link
            href="/categories"
            className={cn(
              "hidden h-11 items-center rounded-full px-4 text-sm font-semibold transition-colors sm:flex",
              onBrowse ? "bg-ink-900 text-white" : "text-ink-900 hover:bg-ink-100",
            )}
          >
            Shop
          </Link>
        </nav>

        <div className="flex-1" />

        <CartButton />
        <Link
          href="/profile"
          aria-label="Profile"
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold transition-colors",
            pathname === "/profile"
              ? "bg-ink-100 text-ink-900 ring-2 ring-ink-900"
              : "bg-ink-100 text-ink-600 hover:bg-ink-200",
          )}
        >
          G
        </Link>
      </div>
    </header>
  );
}
