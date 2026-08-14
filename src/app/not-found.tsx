import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6">
      <p className="font-display text-7xl font-bold text-brand-600">404</p>
      <h1 className="mt-3 font-display text-2xl font-bold text-ink-950">
        That page couldn&apos;t be printed
      </h1>
      <p className="mt-2 text-sm text-ink-600">
        The page you&apos;re looking for doesn&apos;t exist or has moved.
      </p>
      <div className="mt-7 flex justify-center gap-3">
        <Link
          href="/shop"
          className="inline-flex h-12 items-center gap-2 rounded-full bg-ink-950 px-6 text-sm font-semibold text-white hover:bg-ink-800"
        >
          Browse the shop <ArrowRight size={15} />
        </Link>
        <Link
          href="/"
          className="inline-flex h-12 items-center rounded-full border border-ink-300 bg-white px-6 text-sm font-semibold text-ink-900 hover:border-ink-500"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}
