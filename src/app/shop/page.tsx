import type { Metadata } from "next";
import { CATEGORIES, PRODUCTS } from "@/lib/data";
import { ShopBrowser } from "@/components/shop-browser";

export const metadata: Metadata = {
  title: "Shop all products",
  description:
    "Browse stickers, apparel, photo prints, wall art, banners and gifts. Every product is fully customisable.",
};

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; q?: string }>;
}) {
  const params = await searchParams;
  const initialCategory =
    CATEGORIES.find((c) => c.slug === params.category)?.slug ?? "all";
  const initialQuery = params.q ?? "";

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <header className="max-w-2xl">
        <p className="mb-2 text-xs font-semibold tracking-widest text-brand-600 uppercase">
          The shop
        </p>
        <h1 className="text-balance font-display text-4xl font-bold tracking-tight text-ink-950">
          Everything we print
        </h1>
        <p className="mt-3 text-pretty text-ink-600">
          {PRODUCTS.length} products. Every one of them fully customisable — pick
          your product, design it your way, and we&apos;ll handle the rest.
        </p>
      </header>

      <ShopBrowser
        products={PRODUCTS}
        categories={CATEGORIES}
        initialCategory={initialCategory}
        initialQuery={initialQuery}
      />
    </div>
  );
}
