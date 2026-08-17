import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  Factory,
  PackageCheck,
  PenTool,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { CATEGORIES } from "@/lib/data";
import { SectionHeading } from "@/components/ui";

export const metadata: Metadata = {
  title: "How it works",
  description:
    "Design your product, we produce it and deliver it to your door. See how Inksmith works.",
};

const STEPS = [
  {
    icon: PenTool,
    title: "Design your product",
    body: "Pick a product and open the design studio. Add text, upload a photo or use a ready-made template. You can even order blank if you prefer.",
  },
  {
    icon: Factory,
    title: "We produce it",
    body: "Once ordered, we source the right printer, materials and finishes for your product — stickers, apparel, prints, banners and more — and quality-check every piece.",
  },
  {
    icon: Truck,
    title: "Delivered to your door",
    body: "Your order is packed and shipped to the address you give us. Follow every step from production to delivery in your order tracker.",
  },
];

const FAQS = [
  {
    q: "Do I need design skills?",
    a: "No. Start from a template, add your own text, or upload any photo. Our studio handles print-safe sizing automatically.",
  },
  {
    q: "What files can I upload?",
    a: "PNG and JPG work best. We accept any image and will adjust it for the print size you choose.",
  },
  {
    q: "How long does it take?",
    a: "Production is typically 2–7 working days depending on the product, plus delivery time. Your exact ETA is shown at checkout.",
  },
  {
    q: "Can I order without artwork?",
    a: "Yes — you can order blank products. But where's the fun in that?",
  },
  {
    q: "Do you deliver anywhere?",
    a: "We currently deliver across the countries listed at checkout. International shipping is calculated per order.",
  },
];

export default function HowItWorksPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <header className="mx-auto max-w-2xl text-center">
        <p className="mb-2 text-xs font-semibold tracking-widest text-brand-600 uppercase">
          Design → Print → Deliver
        </p>
        <h1 className="text-balance font-display text-4xl font-bold tracking-tight text-ink-950 sm:text-5xl">
          You design. We do the rest.
        </h1>
        <p className="mt-4 text-pretty text-lg text-ink-600">
          Inksmith is your one-stop custom print platform. We find the best way
          to produce your order and get it to your address — you just make it
          yours.
        </p>
      </header>

      <div className="mt-12 grid gap-6 sm:grid-cols-3">
        {STEPS.map((s) => (
          <div
            key={s.title}
            className="rounded-2xl border border-ink-200 bg-white p-6"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
              <s.icon size={20} />
            </span>
            <h2 className="mt-4 font-display text-lg font-semibold text-ink-950">
              {s.title}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-600">{s.body}</p>
          </div>
        ))}
      </div>

      <section className="mt-20">
        <SectionHeading
          align="center"
          eyebrow="What we handle"
          title="Your only job is the design"
        />
        <div className="mx-auto mt-8 grid max-w-4xl gap-x-10 gap-y-4 sm:grid-cols-2">
          {[
            "Matching your product to the right printing process",
            "Sourcing materials — vinyl, cotton, canvas, aluminium and more",
            "Print-ready file checks and colour correction",
            "Proof approval before production",
            "Production and packing",
            "Tracked shipping to your address",
            "Quality checks on every order",
            "Support from order to delivery",
          ].map((item) => (
            <p key={item} className="flex items-start gap-2.5 text-sm text-ink-700">
              <Check size={16} className="mt-0.5 shrink-0 text-brand-600" />
              {item}
            </p>
          ))}
        </div>
      </section>

      <section className="mt-20">
        <SectionHeading
          align="center"
          eyebrow="Timelines"
          title="How long until it's in your hands?"
        />
        <div className="mx-auto mt-8 max-w-3xl overflow-hidden rounded-2xl border border-ink-200 bg-white">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-ink-200 bg-ink-50 text-xs tracking-widest text-ink-500 uppercase">
              <tr>
                <th className="px-5 py-3 font-semibold">Category</th>
                <th className="px-5 py-3 font-semibold">Production</th>
                <th className="px-5 py-3 font-semibold">Delivery</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100">
              <tr>
                <td className="px-5 py-3.5">Stickers &amp; stationery</td>
                <td className="px-5 py-3.5">2–5 days</td>
                <td className="px-5 py-3.5">5–9 days (standard)</td>
              </tr>
              <tr>
                <td className="px-5 py-3.5">Photo prints &amp; wall art</td>
                <td className="px-5 py-3.5">2–8 days</td>
                <td className="px-5 py-3.5">5–9 days (standard)</td>
              </tr>
              <tr>
                <td className="px-5 py-3.5">Apparel &amp; gifts</td>
                <td className="px-5 py-3.5">3–8 days</td>
                <td className="px-5 py-3.5">5–9 days (standard)</td>
              </tr>
              <tr>
                <td className="px-5 py-3.5">Banners &amp; signage</td>
                <td className="px-5 py-3.5">3–6 days</td>
                <td className="px-5 py-3.5">5–9 days (standard)</td>
              </tr>
            </tbody>
          </table>
          <div className="flex items-center justify-between gap-3 border-t border-ink-200 bg-brand-50 px-5 py-4 text-sm">
            <span className="flex items-center gap-2 font-medium text-brand-800">
              <PackageCheck size={16} />
              Every order is quality checked before it ships.
            </span>
            <span className="hidden items-center gap-2 font-medium text-brand-800 sm:flex">
              <ShieldCheck size={16} />
              14-day easy returns.
            </span>
          </div>
        </div>
      </section>

      <section id="faq" className="mt-20 scroll-mt-24">
        <SectionHeading align="center" eyebrow="FAQs" title="Common questions" />
        <div className="mx-auto mt-8 max-w-3xl space-y-3">
          {FAQS.map((f) => (
            <details
              key={f.q}
              className="group rounded-2xl border border-ink-200 bg-white px-5 py-4"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-semibold text-ink-950 [&::-webkit-details-marker]:hidden">
                {f.q}
                <span className="text-ink-400 transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-ink-600">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-20 max-w-3xl">
        <div className="rounded-3xl bg-ink-950 px-6 py-12 text-center">
          <h2 className="text-balance font-display text-2xl font-bold text-white sm:text-3xl">
            Ready to make something?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-ink-300">
            Browse {CATEGORIES.length} categories and start designing in minutes.
          </p>
          <Link
            href="/categories"
            className="mt-6 inline-flex h-12 items-center gap-2 rounded-full bg-brand-600 px-6 text-sm font-semibold text-white transition-colors hover:bg-brand-500"
          >
            Browse the shop <ArrowRight size={15} />
          </Link>
        </div>
      </section>
    </div>
  );
}
