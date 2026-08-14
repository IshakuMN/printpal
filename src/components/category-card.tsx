import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Category } from "@/lib/types";
import { getProductsByCategory } from "@/lib/data";

export function CategoryCard({ category }: { category: Category }) {
  const count = getProductsByCategory(category.id).length;
  return (
    <Link
      href={`/shop?category=${category.slug}`}
      className="group relative block overflow-hidden rounded-2xl border border-ink-200 bg-ink-950"
    >
      <div className="aspect-[4/3] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={category.image}
          alt={category.name}
          loading="lazy"
          className="h-full w-full object-cover opacity-90 transition-all duration-500 group-hover:scale-105 group-hover:opacity-75"
        />
      </div>
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 pt-12">
        <h3 className="font-display text-lg font-semibold text-white">
          {category.name}
        </h3>
        <p className="mt-0.5 flex items-center gap-1.5 text-sm text-white/70">
          <span>{count} products</span>
          <ArrowRight
            size={14}
            className="transition-transform group-hover:translate-x-1"
          />
        </p>
      </div>
    </Link>
  );
}
