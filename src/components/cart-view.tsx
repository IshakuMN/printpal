"use client";

import Link from "next/link";
import { ArrowRight, ShoppingBag, Trash2 } from "lucide-react";
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
      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
        <div className="mx-auto max-w-md px-8 py-10 text-center">
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-ink-100 text-ink-400">
            <ShoppingBag size={26} />
          </span>
          <h1 className="mt-5 text-2xl font-bold text-ink-950 sm:text-3xl">
            Your cart is empty
          </h1>
          <p className="mt-2 text-sm text-ink-400">
            Save ideas and they will show up here.
          </p>
          <Link
            href="/"
            className="mt-6 inline-flex h-12 items-center gap-2 rounded-full bg-brand-600 px-6 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
          >
            Explore ideas <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    );
  }

  const count = items.reduce((n, i) => n + i.quantity, 0);

  return (
    <div className="mx-auto w-full max-w-7xl px-4 pt-6 pb-6 sm:px-6 lg:py-10">
      <h1 className="text-2xl font-bold tracking-tight text-ink-950 sm:text-3xl">
        Cart
      </h1>
      <p className="mt-0.5 text-sm text-ink-400">
        {plural(count, "item")}
      </p>

      <div className="mt-6 grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_380px]">
        <div className="space-y-3">
          {items.map((item) => (
            <CartLine
              key={item.id}
              item={item}
              onChange={updateQuantity}
              onRemove={removeItem}
            />
          ))}
        </div>

        <div className="rounded-3xl border border-ink-100 bg-white p-5 shadow-lift lg:sticky lg:top-28">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-ink-700">
              <span>Subtotal</span>
              <span className="font-bold text-ink-950">
                {formatMoney(subtotal)}
              </span>
            </div>
            <div className="flex justify-between text-ink-700">
              <span>Delivery</span>
              <span className="text-ink-400">At checkout</span>
            </div>
          </div>
          <div className="mt-4">
            <Link href="/checkout">
              <Button size="lg" className="w-full">
                Checkout <ArrowRight size={15} />
              </Button>
            </Link>
          </div>
          <Link
            href="/"
            className="mt-3 block text-center text-sm font-medium text-ink-500 hover:text-ink-900"
          >
            Continue shopping
          </Link>
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
    <div className="flex gap-3 rounded-3xl border border-ink-100 bg-white p-2.5 sm:gap-4 sm:p-4">
      <Link
        href={`/products/${item.productId}`}
        className="h-24 w-24 shrink-0 overflow-hidden rounded-2xl bg-ink-100 sm:h-28 sm:w-28"
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
              className="line-clamp-1 font-display text-sm font-semibold text-ink-950 sm:text-base"
            >
              {item.productName}
            </Link>
            {item.optionLabels.length > 0 && (
              <p className="mt-0.5 line-clamp-1 text-xs text-ink-500 sm:text-sm">
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
          <span className="font-display text-base font-bold text-ink-950 sm:text-lg">
            {formatMoney(item.lineTotal)}
          </span>
        </div>
      </div>
    </div>
  );
}
