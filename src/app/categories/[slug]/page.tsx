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
    <div className="mx-auto w-full max-w-7xl pt-4 sm:px-2">
      <div className="px-4 sm:px-4">
        <h1 className="text-2xl font-bold tracking-tight text-ink-950 sm:text-3xl">
          {category.name}
        </h1>
        <p className="mt-1 max-w-2xl text-sm text-ink-400 sm:text-base">{category.description}</p>
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
