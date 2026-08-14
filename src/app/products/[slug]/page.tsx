import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, ShieldCheck, Truck } from "lucide-react";
import { notFound } from "next/navigation";
import { getCategory, getProduct, PRODUCTS } from "@/lib/data";
import { ProductCustomizer } from "@/components/product-customizer";
import { ProductCard } from "@/components/product-card";
import { Badge } from "@/components/ui";

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
  ).slice(0, 3);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <nav className="mb-6 flex flex-wrap items-center gap-1.5 text-sm text-ink-500">
        <Link href="/" className="hover:text-ink-900">
          Home
        </Link>
        <ChevronRight size={14} />
        <Link href="/shop" className="hover:text-ink-900">
          Shop
        </Link>
        <ChevronRight size={14} />
        <Link
          href={`/shop?category=${category?.slug}`}
          className="hover:text-ink-900"
        >
          {category?.name}
        </Link>
        <ChevronRight size={14} />
        <span className="text-ink-900">{product.name}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
        <div>
          <div className="overflow-hidden rounded-3xl border border-ink-200 bg-ink-50">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={product.image}
              alt={product.name}
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            <Badge>
              <Truck size={12} />
              Ships in {product.productionDays[0]}–{product.productionDays[1]} days
            </Badge>
            <Badge>
              <ShieldCheck size={12} />
              Quality checked
            </Badge>
            <Badge>Made to order</Badge>
          </div>
        </div>

        <div>
          <p className="mb-1 text-xs font-semibold tracking-widest text-brand-600 uppercase">
            {category?.name}
          </p>
          <h1 className="text-balance font-display text-3xl font-bold tracking-tight text-ink-950 sm:text-4xl">
            {product.name}
          </h1>
          <p className="mt-2 text-pretty text-lg text-ink-600">
            {product.tagline}
          </p>
          <p className="mt-4 text-pretty text-sm leading-relaxed text-ink-600">
            {product.description}
          </p>

          <ProductCustomizer product={product} />
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-16 border-t border-ink-200 pt-12">
          <h2 className="font-display text-2xl font-bold tracking-tight text-ink-950">
            More in {category?.name}
          </h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}