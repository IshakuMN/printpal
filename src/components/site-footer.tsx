import Link from "next/link";
import { CATEGORIES } from "@/lib/data";

export function SiteFooter() {
  return (
    <footer className="border-t border-ink-200 bg-ink-50">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-ink-950">
                <span className="h-3 w-3 rounded-full bg-brand-500" />
              </span>
              <span className="font-display text-lg font-bold tracking-tight text-ink-950">
                inksmith
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-600">
              Design it your way. We print, pack and deliver it to your door.
              Your one-stop custom print platform.
            </p>
            <p className="mt-4 text-sm text-ink-500">
              Design → Print → Deliver
            </p>
          </div>

          <div>
            <p className="mb-3 text-xs font-semibold tracking-widest text-ink-500 uppercase">
              Shop
            </p>
            <ul className="space-y-2">
              {CATEGORIES.slice(0, 6).map((c) => (
                <li key={c.id}>
                  <Link
                    href={`/shop?category=${c.slug}`}
                    className="text-sm text-ink-700 transition-colors hover:text-ink-950"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-3 text-xs font-semibold tracking-widest text-ink-500 uppercase">
              Explore
            </p>
            <ul className="space-y-2">
              <li>
                <Link href="/design" className="text-sm text-ink-700 hover:text-ink-950">
                  Design studio
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="text-sm text-ink-700 hover:text-ink-950">
                  How it works
                </Link>
              </li>
              <li>
                <Link href="/orders" className="text-sm text-ink-700 hover:text-ink-950">
                  Track an order
                </Link>
              </li>
              <li>
                <Link href="/cart" className="text-sm text-ink-700 hover:text-ink-950">
                  Your cart
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="mb-3 text-xs font-semibold tracking-widest text-ink-500 uppercase">
              Support
            </p>
            <ul className="space-y-2">
              <li>
                <Link href="/how-it-works#faq" className="text-sm text-ink-700 hover:text-ink-950">
                  FAQs
                </Link>
              </li>
              <li>
                <span className="text-sm text-ink-600">hello@inksmith.example</span>
              </li>
              <li>
                <span className="text-sm text-ink-600">Mon–Sat, 9–6</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-ink-200 pt-6 text-xs text-ink-500 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Inksmith. An MVP print platform demo.</p>
          <p>All orders are fulfilled and shipped by Inksmith.</p>
        </div>
      </div>
    </footer>
  );
}