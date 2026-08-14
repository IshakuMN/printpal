import Link from "next/link";
import {
  ArrowRight,
  Package,
  Palette,
  PenTool,
  ShieldCheck,
  Sparkles,
  Truck,
} from "lucide-react";
import { CATEGORIES, getFeaturedProducts, getProduct } from "@/lib/data";
import { TEMPLATES } from "@/lib/design";
import { DesignPreview } from "@/components/design-preview";
import { ProductCard } from "@/components/product-card";
import { CategoryCard } from "@/components/category-card";
import { SectionHeading } from "@/components/ui";

const STEPS = [
  {
    icon: PenTool,
    title: "1. Design it",
    body: "Start from a template or upload your own artwork in our design studio. Add text, photos and colours in minutes.",
  },
  {
    icon: Package,
    title: "2. We print it",
    body: "Pick your product, size and finish. Our print team quality-checks every order before it ships.",
  },
  {
    icon: Truck,
    title: "3. Delivered to you",
    body: "Track your order from our studio to your doorstep — no surprises, just great prints.",
  },
];

export default function HomePage() {
  const featured = getFeaturedProducts();
  const samples = [
    { slug: "die-cut-stickers", template: "bold" },
    { slug: "t-shirts", template: "bold" },
    { slug: "business-cards", template: "business" },
    { slug: "ceramic-mugs", template: "centered" },
  ]
    .map((s) => {
      const product = getProduct(s.slug);
      if (!product) return null;
      const template = TEMPLATES.find((t) => t.id === s.template) ?? TEMPLATES[0];
      return { product, design: template.build(product) };
    })
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 pt-14 pb-16 sm:px-6 lg:grid-cols-2 lg:items-center lg:pt-20 lg:pb-24">
          <div className="animate-fade-up">
            <p className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-semibold tracking-wide text-brand-700">
              <Sparkles size={13} />
              Design → Print → Deliver
            </p>
            <h1 className="mt-5 text-balance font-display text-5xl font-bold tracking-tight text-ink-950 sm:text-6xl">
              Make anything
              <span className="block text-brand-600">yours.</span>
            </h1>
            <p className="mt-5 max-w-md text-pretty text-lg leading-relaxed text-ink-600">
              Stickers, apparel, photo prints, wall art and more. Design it your
              way, and we&apos;ll print, pack and deliver it to your door.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/design"
                className="inline-flex h-12 items-center gap-2 rounded-full bg-ink-950 px-6 text-sm font-semibold text-white transition-colors hover:bg-ink-800"
              >
                Start designing
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/shop"
                className="inline-flex h-12 items-center rounded-full border border-ink-300 bg-white px-6 text-sm font-semibold text-ink-900 transition-colors hover:border-ink-500"
              >
                Browse the shop
              </Link>
            </div>
            <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-sm text-ink-600">
              <span className="inline-flex items-center gap-2">
                <ShieldCheck size={16} className="text-brand-600" />
                Quality checked before shipping
              </span>
              <span className="inline-flex items-center gap-2">
                <Truck size={16} className="text-brand-600" />
                Tracked delivery
              </span>
            </div>
          </div>

          <div className="animate-fade-up relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="grid grid-cols-2 gap-3 [animation-delay:120ms]">
              {samples.map(({ product, design }, i) => (
                <div
                  key={product.slug}
                  className={`rounded-2xl border border-ink-200 bg-white p-2 shadow-soft ${
                    i % 2 === 1 ? "translate-y-6" : ""
                  }`}
                >
                  <DesignPreview
                    design={design}
                    canvasWidth={product.design.canvasWidth}
                    canvasHeight={product.design.canvasHeight}
                    className="rounded-xl"
                  />
                  <p className="px-1 pt-2 pb-0.5 text-center text-xs font-medium text-ink-500">
                    {product.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-y border-ink-200 bg-ink-50">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <SectionHeading
            eyebrow="How it works"
            title="Three steps to printed."
            description="No design skills needed — start from a template or bring your own artwork."
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {STEPS.map((step) => (
              <div
                key={step.title}
                className="rounded-2xl border border-ink-200 bg-white p-6"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                  <step.icon size={20} />
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold text-ink-950">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            eyebrow="Browse by category"
            title="What will you make?"
          />
          <Link
            href="/shop"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 transition-colors hover:text-brand-800"
          >
            View all products <ArrowRight size={15} />
          </Link>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES.map((c) => (
            <CategoryCard key={c.id} category={c} />
          ))}
          <Link
            href="/shop"
            className="group flex aspect-[4/3] flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-ink-300 bg-ink-50 text-center transition-colors hover:border-brand-400 hover:bg-brand-50"
          >
            <Palette size={22} className="text-brand-600" />
            <span className="text-sm font-semibold text-ink-800">
              Something else?
            </span>
            <span className="text-xs text-ink-500">
              We print almost anything — ask us.
            </span>
          </Link>
        </div>
      </section>

      {/* Featured products */}
      <section className="border-t border-ink-200 bg-ink-50">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              eyebrow="Popular right now"
              title="The most-loved prints"
            />
            <Link
              href="/shop"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 transition-colors hover:text-brand-800"
            >
              Shop everything <ArrowRight size={15} />
            </Link>
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Studio CTA */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl bg-ink-950 px-6 py-14 text-center sm:px-12">
          <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-brand-600/30 blur-3xl" />
          <div className="relative">
            <h2 className="text-balance font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Have a photo? We&apos;ll make it print-ready.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-pretty text-ink-300">
              Open the design studio, pick a product and drop in your artwork.
              Our team handles production, quality and delivery.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/design"
                className="inline-flex h-12 items-center gap-2 rounded-full bg-brand-600 px-6 text-sm font-semibold text-white transition-colors hover:bg-brand-500"
              >
                Open the design studio <ArrowRight size={16} />
              </Link>
              <Link
                href="/shop"
                className="inline-flex h-12 items-center rounded-full border border-white/20 px-6 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                Pick a product
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
