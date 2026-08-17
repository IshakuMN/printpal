import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CATEGORIES, getCategory, getProductsByCategory } from "@/lib/data";
import { ProductFeed } from "@/components/product-feed";

export async function generateStaticParams() {
  return CATEGORIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug);
  return {
    title: category?.name ?? "Category",
    description: category?.description,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  const products = getProductsByCategory(category.id);

  return (
    <div className="pt-5">
      <div className="px-4">
        <p className="text-xs font-bold tracking-widest text-brand-600 uppercase">
          {products.length} products
        </p>
        <h1 className="mt-1 font-display text-2xl font-bold tracking-tight text-ink-950">
          {category.name}
        </h1>
        <p className="mt-1 text-sm text-ink-500">{category.description}</p>
      </div>

      <ProductFeed
        products={products}
        categories={CATEGORIES}
        initialCategory={category.slug}
        lockedCategory
      />
    </div>
  );
}