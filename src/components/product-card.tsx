"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import Link from "next/link";
import type { Product } from "@/lib/types";
import { getUnitPrice } from "@/lib/data";
import { formatMoney } from "@/lib/format";
import { cn } from "./ui";

const RATIOS = ["aspect-[3/4]", "aspect-[1/1]", "aspect-[4/5]", "aspect-[3/4]", "aspect-[1/1]"];

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const from = getUnitPrice(product, product.minQty);
  const [saved, setSaved] = useState(false);
  const ratio = RATIOS[index % RATIOS.length];

  return (
    <Link href={`/products/${product.slug}`} className="group mb-4 block break-inside-avoid">
      <div className="relative overflow-hidden rounded-3xl bg-ink-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className={cn("w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]", ratio)}
        />

        <button
          type="button"
          aria-label={saved ? "Remove from saved" : "Save product"}
          onClick={(e) => {
            e.preventDefault();
            setSaved((s) => !s);
          }}
          className={cn(
            "absolute top-2.5 right-2.5 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full transition-colors",
            saved ? "bg-brand-600 text-white" : "bg-white text-ink-900 hover:bg-ink-100",
          )}
        >
          <Heart size={17} strokeWidth={2.4} className={cn(saved && "fill-current")} />
        </button>
      </div>

      <div className="mt-2 px-1.5 pb-1">
        <h3 className="line-clamp-1 text-sm font-bold text-ink-900">
          {product.name}
        </h3>
        <p className="mt-0.5 text-sm font-medium text-ink-900">
          {formatMoney(from)}
        </p>
      </div>
    </Link>
  );
}
