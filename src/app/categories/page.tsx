import type { Metadata } from "next";
import Link from "next/link";
import { CATEGORIES, getProductsByCategory } from "@/lib/data";

export const metadata: Metadata = {
  title: "Categories",
  description:
    "Browse every category we print — stickers, apparel, photo prints, wall art, banners and gifts.",
};

export default function CategoriesPage() {
  return (
    <div className="px-4 pt-5 pb-2">
      <p className="text-xs font-bold tracking-widest text-brand-600 uppercase">
        Browse the store
      </p>
      <h1 className="mt-1 font-display text-2xl font-bold tracking-tight text-ink-950">
        Categories
      </h1>
      <p className="mt-1 text-sm text-ink-500">
        Pick a category and start exploring.
      </p>

      <div className="mt-5 grid grid-cols-2 gap-3">
        {CATEGORIES.map((c) => {
          const count = getProductsByCategory(c.id).length;
          return (
            <Link
              key={c.id}
              href={`/categories/${c.slug}`}
              className="group relative block overflow-hidden rounded-2xl bg-ink-950"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={c.image}
                alt={c.name}
                loading="lazy"
                className="aspect-[4/5] w-full object-cover opacity-95 transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent p-3 pt-12">
                <h2 className="font-display text-base font-bold text-white">
                  {c.name}
                </h2>
                <p className="mt-0.5 text-xs font-medium text-white/70">
                  {count} products
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}