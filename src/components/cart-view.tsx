"use client";

import Link from "next/link";
import { ArrowRight, ShieldCheck, ShoppingBag, Trash2, Truck } from "lucide-react";
import type { CartItem } from "@/lib/types";
import { formatMoney, plural } from "@/lib/format";
import { DesignPreview } from "./design-preview";
import { useCart } from "./cart-provider";
import { Button, QuantityStepper } from "./ui";

export function CartView() {
  const { items, subtotal, updateQuantity, removeItem, isLoaded } = useCart();

  if (!isLoaded) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-20 text-center sm:px-6">
        <p className="text-sm text-ink-500">Loading your cart…</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-md rounded-3xl border border-ink-200 bg-ink-50 px-8 py-14 text-center">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-ink-400 shadow-soft">
            <ShoppingBag size={24} />
          </span>
          <h1 className="mt-5 font-display text-2xl font-bold text-ink-950">
            Your cart is empty
          </h1>
          <p className="mt-2 text-sm text-ink-600">
            Explore the shop and make something yours — stickers, apparel,
            prints and more.
          </p>
          <Link
            href="/shop"
            className="mt-6 inline-flex h-12 items-center gap-2 rounded-full bg-ink-950 px-6 text-sm font-semibold text-white hover:bg-ink-800"
          >
            Browse products <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <h1 className="font-display text-3xl font-bold tracking-tight text-ink-950">
        Your cart
      </h1>
      <p className="mt-1 text-sm text-ink-600">
        {plural(
          items.reduce((n, i) => n + i.quantity, 0),
          "item",
        )}{" "}
        ready to order
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_340px]">
        <div className="space-y-4">
          {items.map((item) => (
            <CartLine
              key={item.id}
              item={item}
              onChange={updateQuantity}
              onRemove={removeItem}
            />
          ))}
          <Link
            href="/shop"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-brand-800"
          >
            Continue shopping <ArrowRight size={15} />
          </Link>
        </div>

        <aside className="h-fit rounded-2xl border border-ink-200 bg-white p-5 shadow-soft">
          <h2 className="font-display text-lg font-bold text-ink-950">
            Order summary
          </h2>
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between text-ink-600">
              <span>Subtotal</span>
              <span className="font-semibold text-ink-950">
                {formatMoney(subtotal)}
              </span>
            </div>
            <div className="flex justify-between text-ink-600">
              <span>Delivery</span>
              <span className="text-ink-500">Calculated at checkout</span>
            </div>
          </div>
          <div className="mt-4 border-t border-ink-100 pt-4">
            <Link href="/checkout">
              <Button size="lg" className="w-full">
                Go to checkout <ArrowRight size={15} />
              </Button>
            </Link>
          </div>
          <div className="mt-4 space-y-2 text-xs text-ink-500">
            <p className="flex items-center gap-2">
              <Truck size={14} className="text-brand-600" />
              Production + delivery confirmed before payment.
            </p>
            <p className="flex items-center gap-2">
              <ShieldCheck size={14} className="text-brand-600" />
              Every order passes a quality check before shipping.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}

function CartLine({
  item,
  onChange,
  onRemove,
}: {
  item: CartItem;
  onChange: (id: string, qty: number) => void;
  onRemove: (id: string) => void;
}) {
  return (
    <div className="flex gap-4 rounded-2xl border border-ink-200 bg-white p-4">
      <Link
        href={`/products/${item.productId}`}
        className="h-24 w-24 shrink-0 overflow-hidden rounded-xl border border-ink-200 bg-white"
      >
        {item.hasDesign ? (
          <DesignPreview
            design={item.design}
            canvasWidth={item.canvasWidth}
            canvasHeight={item.canvasHeight}
            className="h-full w-full"
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.productImage}
            alt={item.productName}
            className="h-full w-full object-cover"
          />
        )}
      </Link>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <Link
              href={`/products/${item.productId}`}
              className="truncate font-display text-sm font-semibold text-ink-950 hover:underline"
            >
              {item.productName}
            </Link>
            {item.optionLabels.length > 0 && (
              <p className="mt-0.5 text-xs text-ink-500">
                {item.optionLabels.map((o) => o.choice).join(" · ")}
              </p>
            )}
            <p className="mt-1 text-xs text-ink-500">
              {formatMoney(item.unitPrice)} / {item.unitLabel}
              {!item.hasDesign && " · no artwork"}
            </p>
          </div>
          <button
            type="button"
            onClick={() => onRemove(item.id)}
            aria-label="Remove item"
            className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-lg text-ink-400 hover:bg-red-50 hover:text-red-600"
          >
            <Trash2 size={15} />
          </button>
        </div>
        <div className="mt-auto flex items-center justify-between pt-2">
          <QuantityStepper
            value={item.quantity}
            onChange={(q) => onChange(item.id, q)}
            min={1}
          />
          <span className="font-display text-base font-bold text-ink-950">
            {formatMoney(item.lineTotal)}
          </span>
        </div>
      </div>
    </div>
  );
}
