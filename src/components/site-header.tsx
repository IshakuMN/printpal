"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { CartButton } from "./cart-button";
import { cn } from "./ui";

const NAV = [
  { href: "/shop", label: "Shop" },
  { href: "/design", label: "Design studio" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/orders", label: "Track order" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-ink-200/70 bg-white/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2.5"
          onClick={() => setOpen(false)}
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-ink-950">
            <span className="h-3 w-3 rounded-full bg-brand-500" />
          </span>
          <span className="font-display text-lg font-bold tracking-tight text-ink-950">
            inksmith
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => {
            const active =
              pathname === item.href ||
              (item.href === "/shop" && pathname.startsWith("/shop"));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                  active
                    ? "bg-ink-100 text-ink-950"
                    : "text-ink-600 hover:bg-ink-100 hover:text-ink-950",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-1">
          <Link
            href="/shop"
            className="hidden items-center rounded-full bg-ink-950 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-ink-800 lg:inline-flex"
          >
            Start designing
          </Link>
          <CartButton />
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setOpen((o) => !o)}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-ink-800 transition-colors hover:bg-ink-100 md:hidden"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-ink-200/70 bg-white px-4 pt-2 pb-4 md:hidden">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={cn(
                "block rounded-lg px-3 py-2.5 text-sm font-medium",
                pathname === item.href
                  ? "bg-ink-100 text-ink-950"
                  : "text-ink-700",
              )}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/shop"
            onClick={() => setOpen(false)}
            className="mt-2 block rounded-full bg-ink-950 px-4 py-2.5 text-center text-sm font-medium text-white"
          >
            Start designing
          </Link>
        </nav>
      )}
    </header>
  );
}