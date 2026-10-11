"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { House, LayoutGrid, ShoppingBag, UserRound } from "lucide-react";
import { useCart } from "./cart-provider";
import { cn } from "./ui";

const TABS = [
  { href: "/", label: "Home", icon: House },
  { href: "/categories", label: "Shop", icon: LayoutGrid },
  { href: "/cart", label: "Cart", icon: ShoppingBag },
  { href: "/profile", label: "Saved", icon: UserRound },
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
    <nav className="fixed inset-x-0 bottom-0 z-40 bg-white/95 backdrop-blur-md border-t border-ink-100 lg:hidden">
      <div className="flex items-center px-2 pt-1 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        {TABS.map((tab) => {
          const active = isActive(pathname, tab.href);
          const Icon = tab.icon;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                "relative flex flex-1 flex-col items-center gap-1 rounded-2xl py-2 transition-colors",
                active ? "text-ink-900" : "text-ink-400 hover:text-ink-600",
              )}
            >
              <span className="relative">
                <Icon size={22} strokeWidth={active ? 2.5 : 2} />
                {tab.href === "/cart" && count > 0 && (
                  <span className="absolute -top-1.5 -right-2.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand-600 px-1 text-[10px] font-bold text-white">
                    {count > 99 ? "99+" : count}
                  </span>
                )}
              </span>
              <span className="text-[11px] font-semibold">{tab.label}</span>
              <span
                className={cn(
                  "h-1 w-1 rounded-full transition-colors",
                  active ? "bg-brand-600" : "bg-transparent",
                )}
              />
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
