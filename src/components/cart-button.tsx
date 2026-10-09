"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useCart } from "./cart-provider";

export function CartButton() {
  const { itemCount, isLoaded } = useCart();
  const count = isLoaded ? itemCount : 0;

  return (
    <Link
      href="/cart"
      aria-label={`Cart, ${count} ${count === 1 ? "item" : "items"}`}
      className="relative flex h-11 w-11 cursor-pointer items-center justify-center rounded-full text-ink-900 transition-colors hover:bg-ink-100"
    >
      <ShoppingBag size={21} strokeWidth={2.2} />
      {count > 0 && (
        <span className="absolute top-0.5 right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand-600 px-1 text-[10px] font-bold text-white">
          {count > 99 ? "99+" : count}
        </span>
      )}
    </Link>
  );
}