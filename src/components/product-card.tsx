import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Product } from "@/lib/types";
import { getCategory, getUnitPrice } from "@/lib/data";
import { formatMoney } from "@/lib/format";
import { Badge } from "./ui";

export function ProductCard({ product }: { product: Product }) {
  const category = getCategory(product.categoryId);
  const from = getUnitPrice(product, product.minQty);
  const href = `/products/${product.slug}`;

  return (
    <Link
      href={href}
      className="group flex flex-col overflow-hidden rounded-2xl border border-ink-200 bg-white transition-all duration-200 hover:-translate-y-0.5 hover:border-ink-300 hover:shadow-soft"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-ink-50">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute top-3 left-3">
          <Badge className="bg-white/90 backdrop-blur">{category?.shortName}</Badge>
        </span>
        {product.popular && (
          <span className="absolute top-3 right-3">
            <Badge className="bg-brand-600 text-white">Popular</Badge>
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-display text-base font-semibold text-ink-950">
              {product.name}
            </h3>
            <p className="mt-0.5 line-clamp-1 text-sm text-ink-500">
              {product.tagline}
            </p>
          </div>
          <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-ink-200 text-ink-500 transition-all group-hover:border-brand-600 group-hover:bg-brand-600 group-hover:text-white">
            <ArrowUpRight size={14} />
          </span>
        </div>
        <div className="mt-3 flex items-baseline justify-between text-sm">
          <span className="text-ink-600">
            from{" "}
            <span className="font-semibold text-ink-950">
              {formatMoney(from)}
            </span>
            <span className="text-ink-500"> / {product.unitLabel}</span>
          </span>
        </div>
      </div>
    </Link>
  );
}
