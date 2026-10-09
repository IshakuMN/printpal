import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PRODUCTS, getCategory } from "@/lib/data";

export function DesignPicker() {
  return (
    <div className="px-4 py-6">
      <header>
        <h1 className="text-balance text-2xl font-bold tracking-tight text-ink-950">
          What are you designing?
        </h1>
        <p className="mt-1 text-sm text-ink-400">
          Pick a product to open the canvas.
        </p>
      </header>

      <div className="mt-5 columns-2 gap-3 [&>*]:mb-3">
        {PRODUCTS.map((p, i) => {
          const category = getCategory(p.categoryId);
          return (
            <Link
              key={p.id}
              href={`/design?product=${p.slug}`}
              className="group block break-inside-avoid"
            >
              <div className="overflow-hidden rounded-3xl bg-ink-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.image}
                  alt={p.name}
                  loading="lazy"
                  className={`w-full object-cover transition-transform duration-300 group-hover:scale-[1.03] ${i % 2 === 0 ? "aspect-[3/4]" : "aspect-square"}`}
                />
              </div>
              <div className="flex items-center justify-between gap-2 px-1.5 pt-2 pb-1">
                <div className="min-w-0">
                  <h2 className="line-clamp-1 text-sm font-bold text-ink-900">
                    {p.name}
                  </h2>
                  <p className="text-xs text-ink-400">
                    {category?.shortName}
                  </p>
                </div>
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-600 text-white">
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
