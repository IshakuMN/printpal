"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import type { Category, Product } from "@/lib/types";
import { getUnitPrice } from "@/lib/data";
import { ProductCard } from "./product-card";
import { cn } from "./ui";

type Sort = "featured" | "price-asc" | "price-desc" | "name";

const SORTS: { id: Sort; label: string }[] = [
  { id: "featured", label: "Featured" },
  { id: "price-asc", label: "Price: low → high" },
  { id: "price-desc", label: "Price: high → low" },
  { id: "name", label: "Name A–Z" },
];

export function ShopBrowser({
  products,
  categories,
  initialCategory,
  initialQuery,
}: {
  products: Product[];
  categories: Category[];
  initialCategory: string;
  initialQuery: string;
}) {
  const router = useRouter();
  const [category, setCategory] = useState(initialCategory);
  const [query, setQuery] = useState(initialQuery);
  const [sort, setSort] = useState<Sort>("featured");

  const syncUrl = (cat: string, q: string) => {
    const params = new URLSearchParams();
    if (cat !== "all") params.set("category", cat);
    if (q.trim()) params.set("q", q.trim());
    router.replace(`/shop${params.toString() ? `?${params}` : ""}`, {
      scroll: false,
    });
  };

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = products.filter((p) => {
      const matchCategory = category === "all" || p.categoryId === category;
      const matchQuery =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q);
      return matchCategory && matchQuery;
    });

    switch (sort) {
      case "price-asc":
        list = [...list].sort(
          (a, b) =>
            getUnitPrice(a, a.minQty) - getUnitPrice(b, b.minQty),
        );
        break;
      case "price-desc":
        list = [...list].sort(
          (a, b) =>
            getUnitPrice(b, b.minQty) - getUnitPrice(a, a.minQty),
        );
        break;
      case "name":
        list = [...list].sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        list = [...list].sort((a, b) =>
          a.popular === b.popular ? 0 : a.popular ? -1 : 1,
        );
    }
    return list;
  }, [products, category, query, sort]);

  const setCategorySafe = (cat: string) => {
    setCategory(cat);
    syncUrl(cat, query);
  };

  const setQuerySafe = (q: string) => {
    setQuery(q);
  };

  return (
    <div className="mt-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setCategorySafe("all")}
            className={cn(
              "h-9 cursor-pointer rounded-full border px-4 text-sm font-medium transition-colors",
              category === "all"
                ? "border-ink-950 bg-ink-950 text-white"
                : "border-ink-300 bg-white text-ink-700 hover:border-ink-500",
            )}
          >
            All
          </button>
          {categories.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setCategorySafe(c.slug)}
              className={cn(
                "h-9 cursor-pointer rounded-full border px-4 text-sm font-medium transition-colors",
                category === c.slug
                  ? "border-ink-950 bg-ink-950 text-white"
                  : "border-ink-300 bg-white text-ink-700 hover:border-ink-500",
              )}
            >
              {c.shortName}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <label className="relative flex-1 lg:w-64">
            <Search
              size={16}
              className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-ink-400"
            />
            <input
              value={query}
              onChange={(e) => setQuerySafe(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && syncUrl(category, query)}
              placeholder="Search products…"
              className="h-10 w-full rounded-full border border-ink-300 bg-white pr-4 pl-10 text-sm text-ink-900 placeholder:text-ink-400 focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-600/20"
            />
          </label>
          <label className="flex items-center gap-2">
            <SlidersHorizontal size={15} className="hidden text-ink-400 sm:block" />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              className="h-10 cursor-pointer rounded-full border border-ink-300 bg-white px-3.5 text-sm text-ink-800 focus:border-brand-600 focus:outline-none"
            >
              {SORTS.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <p className="mt-6 text-sm text-ink-500">
        Showing {results.length} {results.length === 1 ? "product" : "products"}
        {category !== "all" &&
          ` in ${
            categories.find((c) => c.slug === category)?.name ?? ""
          }`}
      </p>

      {results.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-dashed border-ink-300 bg-ink-50 px-6 py-16 text-center">
          <p className="font-display text-lg font-semibold text-ink-800">
            Nothing matches that search
          </p>
          <p className="mt-1 text-sm text-ink-500">
            Try a different keyword or browse the full catalogue.
          </p>
          <button
            type="button"
            onClick={() => {
              setQuerySafe("");
              setCategorySafe("all");
            }}
            className="mt-5 cursor-pointer rounded-full border border-ink-300 bg-white px-5 py-2.5 text-sm font-medium text-ink-900 hover:border-ink-500"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}