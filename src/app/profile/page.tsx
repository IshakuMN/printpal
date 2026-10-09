"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ChevronRight,
  CircleHelp,
  FileText,
  LayoutGrid,
  Package,
  PackageSearch,
  ShoppingBag,
} from "lucide-react";
import type { Order } from "@/lib/types";
import { readStorage } from "@/lib/store";
import { useCart } from "@/components/cart-provider";

export default function ProfilePage() {
  const { itemCount } = useCart();
  const [orders, setOrders] = useState<Order[] | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOrders(readStorage<Order[]>("orders", []));
  }, []);

  const orderCount = orders?.length ?? 0;

  return (
    <div className="px-4 pt-6 pb-4">
      <div className="flex flex-col items-center pt-2 text-center">
        <span className="flex h-24 w-24 items-center justify-center rounded-full bg-brand-600 text-4xl font-bold text-white">
          G
        </span>
        <h1 className="mt-3 text-2xl font-bold text-ink-950">
          Guest shopper
        </h1>
        <p className="text-sm text-ink-400">
          Orders are saved on this device
        </p>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <Link
          href="/orders"
          className="flex items-center gap-3 rounded-3xl bg-ink-100 p-4 hover:bg-ink-200"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-ink-900">
            <Package size={18} />
          </span>
          <span>
            <span className="block text-lg font-bold text-ink-950">
              {orderCount}
            </span>
            <span className="block text-xs text-ink-400">Orders</span>
          </span>
        </Link>
        <Link
          href="/cart"
          className="flex items-center gap-3 rounded-3xl bg-ink-100 p-4 hover:bg-ink-200"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-ink-900">
            <ShoppingBag size={18} />
          </span>
          <span>
            <span className="block text-lg font-bold text-ink-950">
              {itemCount}
            </span>
            <span className="block text-xs text-ink-400">Cart</span>
          </span>
        </Link>
      </div>

      <div className="mt-4 overflow-hidden rounded-3xl bg-ink-100">
        <MenuLink href="/orders" icon={PackageSearch} label="My orders" />
        <MenuLink href="/categories" icon={LayoutGrid} label="Shop ideas" />
        <MenuLink href="/how-it-works" icon={FileText} label="How it works" />
        <MenuLink
          href="/how-it-works#faq"
          icon={CircleHelp}
          label="Help"
        />
      </div>
    </div>
  );
}

function MenuLink({
  href,
  icon: Icon,
  label,
}: {
  href: string;
  icon: React.ComponentType<{ size?: number | string; className?: string }>;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 border-b border-white px-4 py-3.5 text-sm font-semibold text-ink-900 transition-colors last:border-b-0 hover:bg-ink-200/60"
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-ink-900">
        <Icon size={17} />
      </span>
      <span className="flex-1">{label}</span>
      <ChevronRight size={16} className="text-ink-300" />
    </Link>
  );
}
