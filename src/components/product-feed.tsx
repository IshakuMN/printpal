"use client";

import { useMemo, useState } from "react";
import type { Category, Product } from "@/lib/types";
import { ProductCard } from "./product-card";
import { useSearch } from "./search-provider";
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
  const { query, setQuery } = useSearch();
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
    <div className="mx-auto w-full max-w-7xl">
      {showChips && (
        <div className="no-scrollbar mt-3 flex gap-2 overflow-x-auto px-4 pb-1 sm:px-6 lg:flex-wrap">
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
          <p className="text-xl font-bold text-ink-900">
            No ideas found
          </p>
          <p className="mt-1 text-sm text-ink-400">
            Try a different search.
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setCategory("all");
            }}
            className="mt-5 h-12 cursor-pointer rounded-full bg-brand-600 px-6 text-sm font-semibold text-white hover:bg-brand-700"
          >
            Clear search
          </button>
        </div>
      ) : (
        <div className="mt-3 columns-2 gap-3 px-4 sm:columns-3 sm:px-6 lg:columns-4 xl:columns-5 [&>*]:mb-3">
          {results.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
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
        "h-10 shrink-0 cursor-pointer rounded-full px-4 text-sm font-semibold transition-colors",
        active
          ? "bg-ink-900 text-white"
          : "bg-ink-100 text-ink-900 hover:bg-ink-200",
      )}
    >
      {children}
    </button>
  );
}
