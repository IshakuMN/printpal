"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { Sparkles } from "lucide-react";
import type { Product } from "@/lib/types";
import {
  getLineUnitPrice,
  getOptionModifiers,
  getUnitPrice,
} from "@/lib/data";
import { formatMoney } from "@/lib/format";
import { Button, QuantityStepper, cn } from "./ui";

export function ProductCustomizer({ product }: { product: Product }) {
  const router = useRouter();
  const defaults = Object.fromEntries(
    product.options.map((g) => [g.id, g.defaultValue]),
  );
  const [options, setOptions] = useState<Record<string, string>>(defaults);
  const [quantity, setQuantity] = useState(product.minQty);

  const unitPrice = useMemo(
    () => getLineUnitPrice(product, quantity, options),
    [product, quantity, options],
  );
  const basePrice = getUnitPrice(product, product.minQty);
  const modifiers = getOptionModifiers(product, options);

  const savings = useMemo(() => {
    const bulk = getUnitPrice(product, quantity);
    if (bulk >= basePrice) return 0;
    return Math.round(((basePrice - bulk) / basePrice) * 100);
  }, [product, quantity, basePrice]);

  const goCustomize = () => {
    const params = new URLSearchParams({
      product: product.slug,
      o: btoa(JSON.stringify(options)),
      qty: String(quantity),
    });
    router.push(`/design?${params.toString()}`);
  };

  const setOption = (groupId: string, choiceId: string) =>
    setOptions((prev) => ({ ...prev, [groupId]: choiceId }));

  return (
    <div className="mt-7">
      <div className="space-y-5">
        {product.options.map((group) => (
          <div key={group.id}>
            <p className="mb-2 text-sm font-semibold text-ink-900">
              {group.label}
            </p>
            <div className="flex flex-wrap gap-2">
              {group.choices.map((choice) => {
                const selected = options[group.id] === choice.id;
                return (
                  <button
                    key={choice.id}
                    type="button"
                    onClick={() => setOption(group.id, choice.id)}
                    className={cn(
                      "cursor-pointer rounded-xl border px-3.5 py-2 text-sm font-medium transition-colors",
                      selected
                        ? "border-ink-950 bg-ink-950 text-white"
                        : "border-ink-300 bg-white text-ink-700 hover:border-ink-500",
                    )}
                  >
                    {choice.label}
                    {choice.price ? (
                      <span className={cn("ml-1.5 text-xs", selected ? "text-white/70" : "text-ink-500")}>
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

        <div className="flex flex-wrap items-center gap-4">
          <div>
            <p className="mb-2 text-sm font-semibold text-ink-900">Quantity</p>
            <QuantityStepper
              value={quantity}
              onChange={setQuantity}
              min={product.minQty}
              step={product.step ?? Math.max(1, product.minQty)}
            />
          </div>
          <div className="min-w-[10rem] rounded-xl bg-ink-50 px-4 py-3">
            <p className="text-xs text-ink-500">
              Unit price{quantity > product.minQty ? " (bulk)" : ""}
            </p>
            <p className="font-display text-lg font-semibold text-ink-950">
              {formatMoney(unitPrice)}
              <span className="ml-1 text-xs font-normal text-ink-500">
                / {product.unitLabel}
              </span>
            </p>
            {savings > 0 && (
              <p className="text-xs font-medium text-brand-700">
                You save {savings}%
              </p>
            )}
          </div>
        </div>

        <div className="rounded-2xl border border-ink-200 bg-white p-4">
          <div className="flex items-baseline justify-between text-sm">
            <span className="text-ink-600">Subtotal</span>
            <span className="font-display text-2xl font-bold text-ink-950">
              {formatMoney(unitPrice * quantity)}
            </span>
          </div>
          <p className="mt-1 text-xs text-ink-500">
            Delivery is calculated at checkout. {modifiers > 0
              ? `Includes ${formatMoney(modifiers)} of upgrades per unit.`
              : "No upgrade fees selected."}
          </p>
          <Button
            size="lg"
            onClick={goCustomize}
            className="mt-4 w-full"
          >
            <Sparkles size={16} />
            Customize &amp; add to cart
          </Button>
          <p className="mt-2.5 text-center text-xs text-ink-500">
            Opens our design studio — no design skills needed.
          </p>
        </div>
      </div>
    </div>
  );
}
