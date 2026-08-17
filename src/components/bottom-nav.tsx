"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { House, LayoutGrid, ShoppingBag, UserRound } from "lucide-react";
import { useCart } from "./cart-provider";
import { cn } from "./ui";

const TABS = [
  { href: "/", label: "Home", icon: House },
  { href: "/categories", label: "Categories", icon: LayoutGrid },
  { href: "/cart", label: "Cart", icon: ShoppingBag },
  { href: "/profile", label: "Profile", icon: UserRound },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  if (href === "/categories") return pathname.startsWith("/categories");
  if (href === "/cart") return pathname === "/cart" || pathname === "/checkout";
  return pathname === href;
}

export function BottomNav() {
  const pathname = usePathname();
  const { itemCount, isLoaded } = useCart();
  const count = isLoaded ? itemCount : 0;

  return (
    <nav className="sticky bottom-0 z-40 bg-gradient-to-t from-white via-white to-transparent px-4 pt-3 pb-5">
      <div className="flex items-center gap-1 rounded-2xl bg-ink-950 p-1.5 shadow-lift">
        {TABS.map((tab) => {
          const active = isActive(pathname, tab.href);
          const Icon = tab.icon;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                "relative flex flex-1 flex-col items-center gap-0.5 rounded-xl py-2 transition-colors",
                active ? "text-brand-500" : "text-white/50 hover:text-white/80",
              )}
            >
              <span className="relative">
                <Icon size={21} strokeWidth={active ? 2.4 : 2} />
                {tab.href === "/cart" && count > 0 && (
                  <span className="absolute -top-1.5 -right-2.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand-500 px-1 text-[10px] font-bold text-white">
                    {count > 99 ? "99+" : count}
                  </span>
                )}
              </span>
              <span className="text-[10px] font-semibold tracking-tight">
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}