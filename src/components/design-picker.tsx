import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PRODUCTS, getCategory } from "@/lib/data";

export function DesignPicker() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <header className="max-w-2xl">
        <p className="mb-2 text-xs font-semibold tracking-widest text-brand-600 uppercase">
          Design studio
        </p>
        <h1 className="text-balance font-display text-4xl font-bold tracking-tight text-ink-950">
          What are you designing?
        </h1>
        <p className="mt-3 text-pretty text-ink-600">
          Pick a product to open the design canvas. Add text, photos and shapes,
          then add it to your cart.
        </p>
      </header>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {PRODUCTS.map((p) => {
          const category = getCategory(p.categoryId);
          return (
            <Link
              key={p.id}
              href={`/design?product=${p.slug}`}
              className="group flex flex-col overflow-hidden rounded-2xl border border-ink-200 bg-white transition-all duration-200 hover:-translate-y-0.5 hover:border-ink-300 hover:shadow-soft"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-ink-50">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.image}
                  alt={p.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute top-3 left-3 rounded-full bg-white/90 px-2.5 py-0.5 text-xs font-medium text-ink-700 backdrop-blur">
                  {category?.shortName}
                </span>
              </div>
              <div className="flex flex-1 items-center justify-between gap-3 p-4">
                <div>
                  <h2 className="font-display text-base font-semibold text-ink-950">
                    {p.name}
                  </h2>
                  <p className="mt-0.5 line-clamp-1 text-sm text-ink-500">
                    {p.tagline}
                  </p>
                </div>
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ink-950 text-white transition-transform group-hover:translate-x-0.5">
                  <ArrowRight size={15} />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
