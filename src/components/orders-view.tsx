"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, PackageSearch } from "lucide-react";
import type { Order } from "@/lib/types";
import { ORDER_STAGES } from "@/lib/types";
import { formatDate, formatMoney } from "@/lib/format";
import { readStorage } from "@/lib/store";

export function OrdersView() {
  const [orders, setOrders] = useState<Order[] | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOrders(readStorage<Order[]>("orders", []));
  }, []);

  if (orders === null) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
        <p className="text-sm text-ink-500">Loading orders…</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-md rounded-3xl border border-ink-200 bg-ink-50 px-8 py-14 text-center">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-ink-400 shadow-soft">
            <PackageSearch size={24} />
          </span>
          <h1 className="mt-5 font-display text-2xl font-bold text-ink-950">
            No orders yet
          </h1>
          <p className="mt-2 text-sm text-ink-600">
            Orders you place will appear here so you can track them from print
            to your door.
          </p>
          <Link
            href="/shop"
            className="mt-6 inline-flex h-12 items-center gap-2 rounded-full bg-ink-950 px-6 text-sm font-semibold text-white hover:bg-ink-800"
          >
            Start an order <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <h1 className="font-display text-3xl font-bold tracking-tight text-ink-950">
        Your orders
      </h1>
      <p className="mt-1 text-sm text-ink-600">
        {orders.length} {orders.length === 1 ? "order" : "orders"} on this device
      </p>

      <div className="mt-8 space-y-4">
        {orders.map((order) => {
          const stage = ORDER_STAGES[order.statusIndex];
          return (
            <Link
              key={order.id}
              href={`/orders/${order.id}`}
              className="flex items-center justify-between gap-4 rounded-2xl border border-ink-200 bg-white p-5 transition-colors hover:border-ink-400 hover:shadow-soft"
            >
              <div className="flex items-center gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-ink-950 font-display text-xs font-bold text-white">
                  {order.reference.slice(4)}
                </span>
                <div>
                  <p className="font-display text-sm font-semibold text-ink-950">
                    {order.reference}
                  </p>
                  <p className="text-xs text-ink-500">
                    {formatDate(order.createdAt)}
                  </p>
                  <p className="mt-1 text-xs font-medium text-brand-700">
                    {stage}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="hidden text-sm font-semibold text-ink-950 sm:block">
                  {formatMoney(order.total)}
                </span>
                <ArrowRight size={16} className="text-ink-400" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
