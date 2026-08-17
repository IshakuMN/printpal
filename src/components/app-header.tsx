"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ArrowLeft, Search } from "lucide-react";
import { CartButton } from "./cart-button";

const ROOT = new Set(["/", "/categories", "/cart", "/profile"]);

export function AppHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const isRoot = ROOT.has(pathname);

  const goBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };

  return (
    <header className="sticky top-0 z-40 border-b border-ink-100 bg-white/90 backdrop-blur-md">
      <div className="flex h-14 items-center gap-3 px-4">
        {isRoot ? (
          <Link
            href="/"
            className="flex min-w-0 items-center gap-2"
            aria-label="Inksmith home"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-ink-950">
              <span className="h-2.5 w-2.5 rounded-full bg-brand-500" />
            </span>
            <span className="truncate font-display text-lg font-bold tracking-tight text-ink-950">
              inksmith
            </span>
          </Link>
        ) : (
          <button
            type="button"
            onClick={goBack}
            aria-label="Go back"
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-ink-700 transition-colors hover:bg-ink-100 active:bg-ink-200"
          >
            <ArrowLeft size={20} />
          </button>
        )}

        <div className="ml-auto flex items-center gap-1">
          {pathname !== "/" && (
            <Link
              href="/"
              aria-label="Search products"
              className="flex h-10 w-10 items-center justify-center rounded-full text-ink-700 transition-colors hover:bg-ink-100"
            >
              <Search size={19} />
            </Link>
          )}
          <CartButton />
        </div>
      </div>
    </header>
  );
}