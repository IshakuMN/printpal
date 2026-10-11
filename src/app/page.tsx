import { CATEGORIES, PRODUCTS } from "@/lib/data";
import { ProductFeed } from "@/components/product-feed";

export default function HomePage() {
  return (
    <div className="py-2 sm:py-6">
      <ProductFeed products={PRODUCTS} categories={CATEGORIES} />
    </div>
  );
}
