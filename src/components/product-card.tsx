"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart } from "lucide-react";
import type { Product } from "@/lib/types";
import { getCategory, getUnitPrice } from "@/lib/data";
import { formatMoney } from "@/lib/format";
import { cn } from "./ui";

export function ProductCard({ product }: { product: Product }) {
  const category = getCategory(product.categoryId);
  const from = getUnitPrice(product, product.minQty);
  const [saved, setSaved] = useState(false);

  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <div className="relative overflow-hidden rounded-2xl bg-ink-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="aspect-[4/5] w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {category && (
          <span className="absolute top-2 left-2 rounded-full bg-white/90 px-2 py-0.5 text-[11px] font-bold text-ink-800 backdrop-blur">
            {category.shortName}
          </span>
        )}

        <button
          type="button"
          aria-label={saved ? "Remove from saved" : "Save product"}
          onClick={(e) => {
            e.preventDefault();
            setSaved((s) => !s);
          }}
          className="absolute top-2 right-2 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white/90 text-ink-700 backdrop-blur transition-colors hover:text-brand-600"
        >
          <Heart
            size={16}
            className={cn(saved && "fill-brand-600 text-brand-600")}
          />
        </button>

        <span className="absolute bottom-2 left-2 rounded-lg bg-ink-950/90 px-2 py-1 text-sm font-bold text-white backdrop-blur">
          from {formatMoney(from)}
        </span>

        {product.popular && (
          <span className="absolute bottom-2 right-2 rounded-full bg-brand-600 px-2 py-1 text-[11px] font-bold text-white">
            Bestseller
          </span>
        )}
      </div>

      <div className="mt-2 px-0.5">
        <h3 className="line-clamp-1 text-sm font-semibold text-ink-950">
          {product.name}
        </h3>
        <p className="mt-0.5 line-clamp-1 text-xs text-ink-500">
          {product.tagline}
        </p>
      </div>
    </Link>
  );
}