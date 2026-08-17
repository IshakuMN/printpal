"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { ShoppingBag } from "lucide-react";
import type { CartItem, Product } from "@/lib/types";
import { getLineUnitPrice, getOptionLabels, getUnitPrice } from "@/lib/data";
import { formatMoney, uid } from "@/lib/format";
import { Button, QuantityStepper, cn } from "./ui";
import { useCart } from "./cart-provider";

export function ProductBuy({ product }: { product: Product }) {
  const router = useRouter();
  const { addItem } = useCart();

  const defaults = Object.fromEntries(
    product.options.map((g) => [g.id, g.defaultValue]),
  );
  const [options, setOptions] = useState<Record<string, string>>(defaults);
  const [quantity, setQuantity] = useState(product.minQty);
  const [adding, setAdding] = useState(false);

  const unitPrice = useMemo(
    () => getLineUnitPrice(product, quantity, options),
    [product, quantity, options],
  );
  const subtotal = Math.round(unitPrice * quantity * 100) / 100;
  const basePrice = getUnitPrice(product, product.minQty);

  const savings = useMemo(() => {
    const bulk = getUnitPrice(product, quantity);
    if (bulk >= basePrice) return 0;
    return Math.round(((basePrice - bulk) / basePrice) * 100);
  }, [product, quantity, basePrice]);

  const setOption = (groupId: string, choiceId: string) =>
    setOptions((prev) => ({ ...prev, [groupId]: choiceId }));

  const addToCart = () => {
    const item: CartItem = {
      id: uid(),
      productId: product.id,
      productName: product.name,
      productImage: product.image,
      unitLabel: product.unitLabel,
      canvasWidth: product.design.canvasWidth,
      canvasHeight: product.design.canvasHeight,
      options,
      optionLabels: getOptionLabels(product, options),
      design: {
        backgroundColor: product.design.defaultBackground,
        elements: [],
      },
      hasDesign: false,
      quantity,
      unitPrice,
      lineTotal: subtotal,
    };
    setAdding(true);
    addItem(item);
    window.setTimeout(() => router.push("/cart"), 250);
  };

  return (
    <div className="mt-6">
      <div className="space-y-6">
        {product.options.map((group) => (
          <div key={group.id}>
            <p className="mb-2 text-sm font-bold text-ink-900">{group.label}</p>
            <div className="flex flex-wrap gap-2">
              {group.choices.map((choice) => {
                const selected = options[group.id] === choice.id;
                return (
                  <button
                    key={choice.id}
                    type="button"
                    onClick={() => setOption(group.id, choice.id)}
                    className={cn(
                      "cursor-pointer rounded-xl border px-3.5 py-2 text-sm font-semibold transition-colors",
                      selected
                        ? "border-ink-950 bg-ink-950 text-white"
                        : "border-ink-200 bg-white text-ink-800 hover:border-ink-400",
                    )}
                  >
                    {choice.label}
                    {choice.price ? (
                      <span
                        className={cn(
                          "ml-1.5 text-xs",
                          selected ? "text-white/70" : "text-ink-500",
                        )}
                      >
                        {choice.price > 0 ? "+" : ""}
                        {formatMoney(choice.price)}
                      </span>
                    ) : null}
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        <div className="flex items-center justify-between rounded-2xl bg-ink-50 p-4">
          <div>
            <p className="text-xs font-medium text-ink-500">Quantity</p>
            <div className="mt-2">
              <QuantityStepper
                value={quantity}
                onChange={setQuantity}
                min={product.minQty}
                step={product.step ?? Math.max(1, product.minQty)}
              />
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-ink-500">
              {formatMoney(unitPrice)} / {product.unitLabel}
            </p>
            <p className="font-display text-xl font-bold text-ink-950">
              {formatMoney(subtotal)}
            </p>
            {savings > 0 && (
              <p className="text-xs font-bold text-brand-600">
                You save {savings}%
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="sticky bottom-24 z-30 mt-6 rounded-2xl border border-ink-100 bg-white/95 px-4 py-3 shadow-lift backdrop-blur">
        <div className="flex items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="text-[11px] text-ink-500">
              {formatMoney(unitPrice)} / {product.unitLabel}
              {savings > 0 && (
                <span className="ml-1 font-bold text-brand-600">
                  Save {savings}%
                </span>
              )}
            </p>
            <p className="truncate font-display text-lg font-bold text-ink-950">
              {formatMoney(subtotal)}
            </p>
          </div>
          <Button
            size="lg"
            className="shrink-0"
            disabled={adding}
            onClick={addToCart}
          >
            <ShoppingBag size={16} />
            {adding ? "Adding…" : "Add to cart"}
          </Button>
        </div>
      </div>
    </div>
  );
}