import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6">
      <p className="text-7xl font-bold text-brand-600">404</p>
      <h1 className="mt-3 text-2xl font-bold text-ink-950">
        Page not found
      </h1>
      <p className="mt-2 text-sm text-ink-400">
        Try exploring ideas instead.
      </p>
      <div className="mt-7 flex justify-center">
        <Link
          href="/"
          className="inline-flex h-12 items-center gap-2 rounded-full bg-brand-600 px-6 text-sm font-semibold text-white hover:bg-brand-700"
        >
          Explore ideas <ArrowRight size={15} />
        </Link>
      </div>
    </div>
  );
}
