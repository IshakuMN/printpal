import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Truck } from "lucide-react";
import { notFound } from "next/navigation";
import { getCategory, getProduct, getUnitPrice, PRODUCTS } from "@/lib/data";
import { formatMoney } from "@/lib/format";
import { ProductBuy } from "@/components/product-buy";
import { ProductCard } from "@/components/product-card";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.tagline,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const category = getCategory(product.categoryId);
  const related = PRODUCTS.filter(
    (p) => p.categoryId === product.categoryId && p.id !== product.id,
  ).slice(0, 4);

  return (
    <div>
      <div className="relative bg-ink-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.image}
          alt={product.name}
          className="aspect-[4/5] w-full object-cover"
        />
        {category && (
          <span className="absolute top-3 left-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-bold text-ink-800 backdrop-blur">
            {category.shortName}
          </span>
        )}
      </div>

      <div className="px-4 pt-5 pb-10">
        {category && (
          <Link
            href={`/categories/${category.slug}`}
            className="text-xs font-bold tracking-widest text-brand-600 uppercase"
          >
            {category.name}
          </Link>
        )}
        <h1 className="mt-1 text-balance font-display text-2xl font-bold tracking-tight text-ink-950">
          {product.name}
        </h1>
        <p className="mt-1.5 text-pretty text-sm text-ink-600">
          {product.tagline}
        </p>

        <p className="mt-4 font-display text-2xl font-bold text-brand-600">
          from <span className="text-ink-950">{formatMoney(getUnitPrice(product, product.minQty))}</span>
        </p>
        <p className="text-xs text-ink-500">per {product.unitLabel}</p>

        <p className="mt-4 text-sm leading-relaxed text-ink-600">
          {product.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-ink-100 px-3 py-1 text-xs font-semibold text-ink-700">
            <Truck size={13} className="text-brand-600" />
            Ships in {product.productionDays[0]}–{product.productionDays[1]} days
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-ink-100 px-3 py-1 text-xs font-semibold text-ink-700">
            <ShieldCheck size={13} className="text-brand-600" />
            Quality checked
          </span>
        </div>

        <ProductBuy product={product} />

        {related.length > 0 && (
          <section className="mt-8 border-t border-ink-100 pt-6">
            <h2 className="font-display text-xl font-bold tracking-tight text-ink-950">
              More {category ? `in ${category.name}` : "you might like"}
            </h2>
            <div className="mt-4 grid grid-cols-2 gap-x-3 gap-y-5">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}