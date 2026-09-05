"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ArrowLeft, Search } from "lucide-react";
import { CartButton } from "./cart-button";

const ROOT = new Set(["/", "/categories", "/cart", "/profile"]);

export function AppHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const isRoot = ROOT.has(pathname);

  const goBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };

  return (
    <header className="sticky top-0 z-40 border-b border-ink-100 bg-white/90 backdrop-blur-md"></header>
  );
}
