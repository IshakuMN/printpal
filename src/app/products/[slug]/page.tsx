import type { Metadata } from "next";
import Link from "next/link";
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
      <div className="px-4 pt-1">
        <div className="overflow-hidden rounded-3xl bg-ink-100">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.image}
            alt={product.name}
            className="aspect-[4/5] w-full object-cover"
          />
        </div>
      </div>

      <div className="px-4 pt-5 pb-10">
        {category && (
          <Link
            href={`/categories/${category.slug}`}
            className="text-sm font-semibold text-ink-400 hover:text-ink-900 hover:underline"
          >
            {category.name}
          </Link>
        )}
        <h1 className="mt-1 text-balance text-2xl font-bold tracking-tight text-ink-950">
          {product.name}
        </h1>
        <p className="mt-1 text-sm text-ink-400">
          {product.tagline}
        </p>

        <p className="mt-3 text-2xl font-bold text-ink-950">
          {formatMoney(getUnitPrice(product, product.minQty))}
        </p>
        <p className="text-xs text-ink-400">per {product.unitLabel} · from price</p>

        <p className="mt-4 text-sm leading-relaxed text-ink-700">
          {product.description}
        </p>

        <p className="mt-3 text-xs text-ink-400">
          Ships in {product.productionDays[0]}–{product.productionDays[1]} days · Quality checked
        </p>

        <ProductBuy product={product} />

        {related.length > 0 && (
          <section className="mt-10">
            <h2 className="text-xl font-bold tracking-tight text-ink-950">
              More to explore
            </h2>
            <div className="mt-4 columns-2 gap-3 [&>*]:mb-3">
              {related.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
