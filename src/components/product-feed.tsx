"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import type { Category, Product } from "@/lib/types";
import { ProductCard } from "./product-card";
import { cn } from "./ui";

export function ProductFeed({
  products,
  categories,
  initialCategory = "all",
  lockedCategory = false,
}: {
  products: Product[];
  categories: Category[];
  initialCategory?: string;
  lockedCategory?: boolean;
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(initialCategory);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = products.filter((p) => {
      const matchCategory = category === "all" || p.categoryId === category;
      const matchQuery =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.categoryId.toLowerCase().includes(q);
      return matchCategory && matchQuery;
    });
    return [...list].sort((a, b) =>
      a.popular === b.popular ? 0 : a.popular ? -1 : 1,
    );
  }, [products, category, query]);

  const showChips = !lockedCategory || category === "all";

  return (
    <div>
      {!lockedCategory && (
        <div className="px-4 pt-4">
          <label className="relative block">
            <Search
              size={17}
              className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-ink-400"
            />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search stickers, prints, tees…"
              className="h-11 w-full rounded-full border-0 bg-ink-100 pl-11 pr-4 text-sm text-ink-900 placeholder:text-ink-400 focus:bg-white focus:ring-2 focus:ring-brand-600/30 focus:outline-none"
            />
          </label>
        </div>
      )}

      {showChips && (
        <div className="no-scrollbar mt-3 flex gap-2 overflow-x-auto px-4">
          <Chip
            active={category === "all"}
            onClick={() => setCategory("all")}
          >
            All
          </Chip>
          {categories.map((c) => (
            <Chip
              key={c.id}
              active={category === c.slug}
              onClick={() => setCategory(c.slug)}
            >
              {c.shortName}
            </Chip>
          ))}
        </div>
      )}

      {results.length === 0 ? (
        <div className="px-8 py-16 text-center">
          <p className="font-display text-base font-bold text-ink-900">
            Nothing matches
          </p>
          <p className="mt-1 text-sm text-ink-500">
            Try a different word or category.
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setCategory("all");
            }}
            className="mt-4 cursor-pointer rounded-full bg-ink-950 px-5 py-2.5 text-sm font-semibold text-white"
          >
            Clear search
          </button>
        </div>
      ) : (
        <div className="mt-4 grid grid-cols-2 gap-x-3 gap-y-5 px-4">
          {results.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "h-9 shrink-0 cursor-pointer rounded-full px-4 text-sm font-semibold transition-colors",
        active
          ? "bg-ink-950 text-white"
          : "bg-ink-100 text-ink-700 hover:bg-ink-200",
      )}
    >
      {children}
    </button>
  );
}