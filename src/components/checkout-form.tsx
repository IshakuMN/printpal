"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import type { Order } from "@/lib/types";
import { DELIVERY_METHODS, FREE_DELIVERY_THRESHOLD } from "@/lib/data";
import { formatMoney, makeOrderReference, uid } from "@/lib/format";
import { readStorage, writeStorage } from "@/lib/store";
import { useCart } from "./cart-provider";
import { DesignPreview } from "./design-preview";
import { Button, Field, Input, Textarea, cn } from "./ui";

const COUNTRIES = [
  "United States",
  "United Kingdom",
  "Canada",
  "Australia",
  "Germany",
  "France",
  "Netherlands",
  "India",
  "Nigeria",
  "United Arab Emirates",
];

type Errors = Record<string, string>;

export function CheckoutForm() {
  const router = useRouter();
  const { items, subtotal, clearCart, isLoaded } = useCart();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    line1: "",
    line2: "",
    city: "",
    region: "",
    postalCode: "",
    country: "United States",
    notes: "",
  });
  const [methodId, setMethodId] = useState<string>("standard");
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);

  const set = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const freeDelivery = subtotal >= FREE_DELIVERY_THRESHOLD;
  const method = DELIVERY_METHODS.find((m) => m.id === methodId) ?? DELIVERY_METHODS[0];
  const fee = method.price;
  const total = Math.round((subtotal + fee) * 100) / 100;

  const validate = (): boolean => {
    const errs: Errors = {};
    if (!form.name.trim()) errs.name = "Please enter your full name.";
    if (!form.email.trim()) errs.email = "Please enter your email.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = "Enter a valid email address.";
    if (!form.phone.trim()) errs.phone = "Please enter a phone number.";
    if (!form.line1.trim()) errs.line1 = "Street address is required.";
    if (!form.city.trim()) errs.city = "City is required.";
    if (!form.postalCode.trim()) errs.postalCode = "Postal code is required.";
    if (!form.country.trim()) errs.country = "Select a country.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const submit = () => {
    if (!validate()) return;
    setSubmitting(true);

    const order: Order = {
      id: uid(),
      reference: makeOrderReference(),
      // eslint-disable-next-line react-hooks/purity
      createdAt: Date.now(),
      statusIndex: 0,
      contact: {
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
      },
      delivery: {
        methodId: method.id,
        eta: method.eta,
        fee,
        address: {
          line1: form.line1.trim(),
          line2: form.line2.trim() || undefined,
          city: form.city.trim(),
          region: form.region.trim(),
          postalCode: form.postalCode.trim(),
          country: form.country,
        },
        notes: form.notes.trim() || undefined,
      },
      items,
      subtotal,
      total,
    };

    const orders = readStorage<Order[]>("orders", []);
    writeStorage("orders", [order, ...orders]);
    clearCart();
    router.push(`/orders/${order.id}`);
  };

  if (!isLoaded) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
        <p className="text-sm text-ink-500">Loading…</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
        <div className="mx-auto max-w-md rounded-3xl border border-ink-200 bg-ink-50 px-8 py-14">
          <h1 className="font-display text-2xl font-bold text-ink-950">
            Nothing to check out yet
          </h1>
          <p className="mt-2 text-sm text-ink-600">
            Your cart is empty. Add something to print first.
          </p>
          <Link
            href="/"
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
      <Link
        href="/cart"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-500 hover:text-ink-900"
      >
        <ArrowLeft size={14} /> Back to cart
      </Link>
      <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink-950">
        Checkout
      </h1>
      <p className="mt-1 text-sm text-ink-600">
        We&apos;ll produce your order and ship it to the address below.
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="space-y-8">
          <section>
            <h2 className="font-display text-lg font-bold text-ink-950">
              1 · Contact details
            </h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <Field label="Full name" required error={errors.name}>
                  <Input
                    value={form.name}
                    onChange={(e) => set("name", e.target.value)}
                    placeholder="Jane Doe"
                  />
                </Field>
              </div>
              <Field label="Email" required error={errors.email}>
                <Input
                  type="email"
                  value={form.email}
                  onChange={(e) => set("email", e.target.value)}
                  placeholder="jane@example.com"
                />
              </Field>
              <Field label="Phone" required error={errors.phone}>
                <Input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => set("phone", e.target.value)}
                  placeholder="+1 555 000 1234"
                />
              </Field>
            </div>
          </section>

          <section>
            <h2 className="font-display text-lg font-bold text-ink-950">
              2 · Delivery address
            </h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <Field label="Street address" required error={errors.line1}>
                  <Input
                    value={form.line1}
                    onChange={(e) => set("line1", e.target.value)}
                    placeholder="123 Print Street"
                  />
                </Field>
              </div>
              <div className="sm:col-span-2">
                <Field label="Apartment / suite (optional)">
                  <Input
                    value={form.line2}
                    onChange={(e) => set("line2", e.target.value)}
                    placeholder="Apt 4B"
                  />
                </Field>
              </div>
              <Field label="City" required error={errors.city}>
                <Input
                  value={form.city}
                  onChange={(e) => set("city", e.target.value)}
                  placeholder="Austin"
                />
              </Field>
              <Field label="Region / state" error={errors.region}>
                <Input
                  value={form.region}
                  onChange={(e) => set("region", e.target.value)}
                  placeholder="TX"
                />
              </Field>
              <Field label="Postal code" required error={errors.postalCode}>
                <Input
                  value={form.postalCode}
                  onChange={(e) => set("postalCode", e.target.value)}
                  placeholder="78701"
                />
              </Field>
              <Field label="Country" required error={errors.country}>
                <select
                  value={form.country}
                  onChange={(e) => set("country", e.target.value)}
                  className="h-11 w-full cursor-pointer rounded-xl border border-ink-300 bg-white px-3.5 text-sm focus:border-brand-600 focus:outline-none"
                >
                  {COUNTRIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </Field>
              <div className="sm:col-span-2">
                <Field label="Order notes (optional)">
                  <Textarea
                    rows={2}
                    value={form.notes}
                    onChange={(e) => set("notes", e.target.value)}
                    placeholder="Anything we should know for production or delivery?"
                  />
                </Field>
              </div>
            </div>
          </section>

          <section>
            <h2 className="font-display text-lg font-bold text-ink-950">
              3 · Delivery speed
            </h2>
            <div className="mt-4 space-y-3">
              {DELIVERY_METHODS.map((m) => {
                const isFree = m.id === "standard" && freeDelivery;
                const selected = methodId === m.id;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setMethodId(m.id)}
                    className={cn(
                      "flex w-full cursor-pointer items-center justify-between gap-4 rounded-2xl border p-4 text-left transition-colors",
                      selected
                        ? "border-brand-600 bg-brand-50"
                        : "border-ink-200 bg-white hover:border-ink-400",
                    )}
                  >
                    <span className="flex items-center gap-3">
                      <span
                        className={cn(
                          "flex h-5 w-5 items-center justify-center rounded-full border",
                          selected
                            ? "border-brand-600 bg-brand-600 text-white"
                            : "border-ink-300",
                        )}
                      >
                        {selected && <Check size={12} />}
                      </span>
                      <span>
                        <span className="block text-sm font-semibold text-ink-950">
                          {m.label}
                        </span>
                        <span className="block text-xs text-ink-500">
                          Arrives in {m.eta}
                        </span>
                      </span>
                    </span>
                    <span className="text-sm font-semibold text-ink-950">
                      {isFree ? (
                        <span className="text-brand-700">Free</span>
                      ) : (
                        formatMoney(m.price)
                      )}
                    </span>
                  </button>
                );
              })}
            </div>
            {freeDelivery && (
              <p className="mt-3 text-xs font-medium text-brand-700">
                Free standard delivery unlocked — order is over{" "}
                {formatMoney(FREE_DELIVERY_THRESHOLD)}.
              </p>
            )}
          </section>
        </div>

        <aside className="h-fit rounded-2xl border border-ink-200 bg-white p-5 shadow-soft">
          <h2 className="font-display text-lg font-bold text-ink-950">
            Your order
          </h2>
          <ul className="mt-4 space-y-3">
            {items.map((item) => (
              <li key={item.id} className="flex items-center gap-3">
                <span className="h-12 w-12 shrink-0 overflow-hidden rounded-lg border border-ink-200">
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
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  )}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium text-ink-950">
                    {item.productName}
                  </span>
                  <span className="block text-xs text-ink-500">
                    ×{item.quantity}
                  </span>
                </span>
                <span className="text-sm font-semibold text-ink-900">
                  {formatMoney(item.lineTotal)}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-4 space-y-2 border-t border-ink-100 pt-4 text-sm">
            <div className="flex justify-between text-ink-600">
              <span>Subtotal</span>
              <span className="font-semibold text-ink-950">
                {formatMoney(subtotal)}
              </span>
            </div>
            <div className="flex justify-between text-ink-600">
              <span>Delivery ({method.label.toLowerCase()})</span>
              <span className="font-semibold text-ink-950">
                {fee === 0 ? "Free" : formatMoney(fee)}
              </span>
            </div>
            <div className="flex justify-between border-t border-ink-100 pt-3 text-base">
              <span className="font-semibold text-ink-950">Total</span>
              <span className="font-display text-xl font-bold text-ink-950">
                {formatMoney(total)}
              </span>
            </div>
          </div>

          <Button
            size="lg"
            className="mt-5 w-full"
            disabled={submitting}
            onClick={submit}
          >
            {submitting ? "Placing order…" : `Place order — ${formatMoney(total)}`}
          </Button>
          <p className="mt-2.5 text-center text-xs text-ink-500">
            Demo checkout — no payment is taken. Your order is saved on this
            device.
          </p>
        </aside>
      </div>
    </div>
  );
}
