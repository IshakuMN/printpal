"use client";

import Link from "next/link";
import { ArrowRight, ShieldCheck, ShoppingBag, Trash2, Truck } from "lucide-react";
import type { CartItem } from "@/lib/types";
import { formatMoney, plural } from "@/lib/format";
import { useCart } from "./cart-provider";
import { Button, QuantityStepper } from "./ui";

export function CartView() {
  const { items, subtotal, updateQuantity, removeItem, isLoaded } = useCart();

  if (!isLoaded) {
    return (
      <div className="px-4 py-20 text-center">
        <p className="text-sm text-ink-500">Loading your cart…</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="px-8 py-24 text-center">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-ink-100 text-ink-400">
          <ShoppingBag size={26} />
        </span>
        <h1 className="mt-5 font-display text-2xl font-bold text-ink-950">
          Your cart is empty
        </h1>
        <p className="mt-2 text-sm text-ink-600">
          Stickers, apparel, prints and more — all made to order.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex h-12 items-center gap-2 rounded-full bg-ink-950 px-6 text-sm font-semibold text-white transition-colors hover:bg-ink-800"
        >
          Start shopping <ArrowRight size={15} />
        </Link>
      </div>
    );
  }

  const count = items.reduce((n, i) => n + i.quantity, 0);

  return (
    <div className="px-4 pt-5 pb-4">
      <h1 className="font-display text-2xl font-bold tracking-tight text-ink-950">
        My cart
      </h1>
      <p className="mt-1 text-sm text-ink-600">
        {plural(count, "item")} ready to order
      </p>

      <div className="mt-5 space-y-3">
        {items.map((item) => (
          <CartLine
            key={item.id}
            item={item}
            onChange={updateQuantity}
            onRemove={removeItem}
          />
        ))}
      </div>

      <div className="sticky bottom-24 z-30 mt-6 rounded-2xl border border-ink-100 bg-white p-4 shadow-lift">
        <div className="space-y-2 text-sm">
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
        <div className="mt-4">
          <Link href="/checkout">
            <Button size="lg" className="w-full">
              Go to checkout <ArrowRight size={15} />
            </Button>
          </Link>
        </div>
        <div className="mt-3 space-y-1.5 text-xs text-ink-500">
          <p className="flex items-center gap-2">
            <Truck size={14} className="text-brand-600" />
            Production + delivery confirmed before payment.
          </p>
          <p className="flex items-center gap-2">
            <ShieldCheck size={14} className="text-brand-600" />
            Every order passes a quality check before shipping.
          </p>
        </div>
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
    <div className="flex gap-3 rounded-2xl border border-ink-100 bg-white p-3 shadow-soft">
      <Link
        href={`/products/${item.productId}`}
        className="h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-ink-100"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.productImage}
          alt={item.productName}
          className="h-full w-full object-cover"
        />
      </Link>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <Link
              href={`/products/${item.productId}`}
              className="line-clamp-1 font-display text-sm font-semibold text-ink-950"
            >
              {item.productName}
            </Link>
            {item.optionLabels.length > 0 && (
              <p className="mt-0.5 line-clamp-1 text-xs text-ink-500">
                {item.optionLabels.map((o) => o.choice).join(" · ")}
              </p>
            )}
            <p className="mt-1 text-xs text-ink-500">
              {formatMoney(item.unitPrice)} / {item.unitLabel}
            </p>
          </div>
          <button
            type="button"
            onClick={() => onRemove(item.id)}
            aria-label="Remove item"
            className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-lg text-ink-400 hover:bg-red-50 hover:text-brand-600"
          >
            <Trash2 size={15} />
          </button>
        </div>

        <div className="mt-auto flex items-center justify-between gap-2 pt-2">
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