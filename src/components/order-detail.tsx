"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronRight,
  PackageSearch,
} from "lucide-react";
import type { Order } from "@/lib/types";
import { ORDER_STAGES } from "@/lib/types";
import { formatDate, formatMoney, plural } from "@/lib/format";
import { readStorage, writeStorage } from "@/lib/store";
import { DesignPreview } from "./design-preview";
import { Button, cn } from "./ui";

export function OrderDetail({ orderId }: { orderId: string }) {
  const router = useRouter();
  const [order, setOrder] = useState<Order | null | undefined>(undefined);

  useEffect(() => {
    const all = readStorage<Order[]>("orders", []);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOrder(all.find((o) => o.id === orderId));
  }, [orderId]);

  const advance = () => {
    if (!order) return;
    const all = readStorage<Order[]>("orders", []);
    const updated: Order = {
      ...order,
      statusIndex: Math.min(ORDER_STAGES.length - 1, order.statusIndex + 1),
    };
    writeStorage(
      "orders",
      all.map((o) => (o.id === order.id ? updated : o)),
    );
    setOrder(updated);
  };

  if (order === undefined) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
        <p className="text-sm text-ink-500">Loading…</p>
      </div>
    );
  }

  if (order === null) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-md rounded-3xl border border-ink-200 bg-ink-50 px-8 py-14 text-center">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-ink-400 shadow-soft">
            <PackageSearch size={24} />
          </span>
          <h1 className="mt-5 font-display text-2xl font-bold text-ink-950">
            Order not found
          </h1>
          <p className="mt-2 text-sm text-ink-600">
            We couldn&apos;t find that order on this device.
          </p>
          <Link
            href="/orders"
            className="mt-6 inline-flex h-12 items-center gap-2 rounded-full bg-ink-950 px-6 text-sm font-semibold text-white hover:bg-ink-800"
          >
            View my orders <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    );
  }

  const delivered = order.statusIndex === ORDER_STAGES.length - 1;

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <Link
        href="/orders"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-500 hover:text-ink-900"
      >
        <ArrowLeft size={14} /> All orders
      </Link>

      <div className="mt-4 rounded-3xl border border-ink-200 bg-white p-6 sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold tracking-widest text-brand-600 uppercase">
              Order placed
            </p>
            <h1 className="mt-1 font-display text-3xl font-bold tracking-tight text-ink-950">
              {order.reference}
            </h1>
            <p className="mt-1 text-sm text-ink-600">
              {formatDate(order.createdAt)} ·{" "}
              {plural(
                order.items.reduce((n, i) => n + i.quantity, 0),
                "item",
              )}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-ink-500">Total paid</p>
            <p className="font-display text-2xl font-bold text-ink-950">
              {formatMoney(order.total)}
            </p>
            {delivered ? (
              <p className="mt-1 inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
                <Check size={12} /> Delivered
              </p>
            ) : (
              <p className="mt-1 text-xs text-ink-500">
                ETA: {order.delivery.eta}
              </p>
            )}
          </div>
        </div>

        {/* Timeline */}
        <div className="mt-8">
          <ol className="grid grid-cols-2 gap-y-4 sm:grid-cols-3">
            {ORDER_STAGES.map((stage, i) => {
              const reached = i <= order.statusIndex;
              const current = i === order.statusIndex;
              return (
                <li key={stage} className="relative flex gap-3 pr-4">
                  <span
                    className={cn(
                      "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold",
                      reached
                        ? "bg-brand-600 text-white"
                        : "border border-ink-300 text-ink-400",
                    )}
                  >
                    {reached ? <Check size={13} /> : i + 1}
                  </span>
                  <span>
                    <span
                      className={cn(
                        "block text-sm font-semibold",
                        reached ? "text-ink-950" : "text-ink-400",
                        current && "text-brand-700",
                      )}
                    >
                      {stage}
                    </span>
                    {current && !delivered && (
                      <span className="mt-0.5 block text-xs text-brand-600">
                        In progress
                      </span>
                    )}
                  </span>
                </li>
              );
            })}
          </ol>
        </div>

        {!delivered && (
          <div className="mt-6 rounded-2xl bg-ink-50 p-4">
            <p className="text-xs text-ink-600">
              This is a demo of order tracking. In production the status would
              update automatically from our production system.
            </p>
            <Button variant="secondary" size="sm" className="mt-3" onClick={advance}>
              Simulate next stage <ChevronRight size={14} />
            </Button>
          </div>
        )}
      </div>

      {/* Items */}
      <div className="mt-6 rounded-3xl border border-ink-200 bg-white p-6 sm:p-8">
        <h2 className="font-display text-lg font-bold text-ink-950">
          Items in this order
        </h2>
        <ul className="mt-4 space-y-4">
          {order.items.map((item) => (
            <li key={item.id} className="flex gap-4 border-t border-ink-100 pt-4 first:border-0 first:pt-0">
              <Link
                href={`/products/${item.productId}`}
                className="h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-ink-200 bg-white"
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
                  <div>
                    <p className="font-display text-sm font-semibold text-ink-950">
                      {item.productName}
                    </p>
                    {item.optionLabels.length > 0 && (
                      <p className="mt-0.5 text-xs text-ink-500">
                        {item.optionLabels.map((o) => o.choice).join(" · ")}
                      </p>
                    )}
                    <p className="mt-0.5 text-xs text-ink-500">
                      {formatMoney(item.unitPrice)} × {item.quantity}
                    </p>
                  </div>
                  <span className="text-sm font-semibold text-ink-950">
                    {formatMoney(item.lineTotal)}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-5 space-y-1.5 border-t border-ink-100 pt-4 text-sm">
          <div className="flex justify-between text-ink-600">
            <span>Subtotal</span>
            <span className="font-semibold text-ink-950">
              {formatMoney(order.subtotal)}
            </span>
          </div>
          <div className="flex justify-between text-ink-600">
            <span>Delivery</span>
            <span className="font-semibold text-ink-950">
              {order.delivery.fee === 0 ? "Free" : formatMoney(order.delivery.fee)}
            </span>
          </div>
          <div className="flex justify-between pt-1 text-base font-semibold text-ink-950">
            <span>Total</span>
            <span>{formatMoney(order.total)}</span>
          </div>
        </div>
      </div>

      {/* Delivery */}
      <div className="mt-6 rounded-3xl border border-ink-200 bg-white p-6 sm:p-8">
        <h2 className="font-display text-lg font-bold text-ink-950">
          Delivery to
        </h2>
        <div className="mt-3 grid gap-6 sm:grid-cols-2">
          <div>
            <p className="text-xs font-semibold tracking-widest text-ink-400 uppercase">
              Address
            </p>
            <address className="mt-1.5 text-sm not-italic leading-relaxed text-ink-800">
              {order.contact.name}
              <br />
              {order.delivery.address.line1}
              {order.delivery.address.line2 && (
                <>
                  <br />
                  {order.delivery.address.line2}
                </>
              )}
              <br />
              {order.delivery.address.city}
              {order.delivery.address.region
                ? `, ${order.delivery.address.region}`
                : ""}{" "}
              {order.delivery.address.postalCode}
              <br />
              {order.delivery.address.country}
            </address>
          </div>
          <div>
            <p className="text-xs font-semibold tracking-widest text-ink-400 uppercase">
              Contact
            </p>
            <p className="mt-1.5 text-sm text-ink-800">
              {order.contact.email}
              <br />
              {order.contact.phone}
            </p>
            <p className="mt-3 text-xs font-semibold tracking-widest text-ink-400 uppercase">
              Delivery
            </p>
            <p className="mt-1.5 text-sm text-ink-800">
              {order.delivery.eta}
              {order.delivery.notes && (
                <span className="mt-1 block text-xs text-ink-500">
                  Note: {order.delivery.notes}
                </span>
              )}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <Button variant="outline" onClick={() => router.push("/")}>
          Make another order <ArrowRight size={15} />
        </Button>
      </div>
    </div>
  );
}
