import { CATEGORIES, PRODUCTS } from "@/lib/data";
import { ProductFeed } from "@/components/product-feed";
import Link from "next/link";

export default function HomePage() {
  return (
    <div>
      <ProductFeed products={PRODUCTS} categories={CATEGORIES} />
    </div>
  );
}
