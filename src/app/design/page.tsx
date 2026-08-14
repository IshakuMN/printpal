import type { Metadata } from "next";
import { getProduct } from "@/lib/data";
import { DesignStudio } from "@/components/design-studio";
import { DesignPicker } from "@/components/design-picker";

export const metadata: Metadata = {
  title: "Design studio",
  description:
    "Design your print in our studio. Add text, photos and shapes, then we print and deliver.",
};

export default async function DesignPage({
  searchParams,
}: {
  searchParams: Promise<{ product?: string; o?: string; qty?: string }>;
}) {
  const params = await searchParams;
  const product = params.product ? getProduct(params.product) : undefined;

  if (!product) {
    // No product chosen yet — let the user pick what to design.
    return <DesignPicker />;
  }

  const defaults = Object.fromEntries(
    product.options.map((g) => [g.id, g.defaultValue]),
  );

  let options = defaults;
  if (params.o) {
    try {
      const parsed = JSON.parse(atob(params.o)) as Record<string, string>;
      const valid: Record<string, string> = {};
      for (const group of product.options) {
        const value = parsed[group.id];
        valid[group.id] = group.choices.some((c) => c.id === value)
          ? value
          : group.defaultValue;
      }
      options = valid;
    } catch {
      options = defaults;
    }
  }

  const rawQty = params.qty ? Number(params.qty) : NaN;
  const quantity = Number.isFinite(rawQty)
    ? Math.max(product.minQty, Math.round(rawQty))
    : product.minQty;

  return (
    <DesignStudio
      product={product}
      initialOptions={options}
      initialQuantity={quantity}
    />
  );
}
