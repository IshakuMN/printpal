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
    <div className="px-4 pt-4 pb-2">
      <h1 className="text-2xl font-bold tracking-tight text-ink-950">
        Shop ideas
      </h1>
      <p className="mt-1 text-sm text-ink-400">
        Pick a board to explore.
      </p>

      <div className="mt-4 columns-2 gap-3 [&>*]:mb-4">
        {CATEGORIES.map((c, i) => {
          const count = getProductsByCategory(c.id).length;
          return (
            <Link
              key={c.id}
              href={`/categories/${c.slug}`}
              className="group block break-inside-avoid"
            >
              <div className="overflow-hidden rounded-3xl bg-ink-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={c.image}
                  alt={c.name}
                  loading="lazy"
                  className={`w-full object-cover transition-transform duration-300 group-hover:scale-[1.03] ${i % 2 === 0 ? "aspect-[3/4]" : "aspect-square"}`}
                />
              </div>
              <div className="mt-2 px-1.5">
                <h2 className="text-sm font-bold text-ink-900">
                  {c.name}
                </h2>
                <p className="text-xs text-ink-400">
                  {count} ideas
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
