import { CATEGORIES, PRODUCTS } from "@/lib/data";
import { ProductFeed } from "@/components/product-feed";

export default function HomePage() {
  return (
    <div>
      <ProductFeed products={PRODUCTS} categories={CATEGORIES} />
    </div>
  );
}
