"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ChevronRight,
  CircleHelp,
  FileText,
  LayoutGrid,
  LogOut,
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
      <p className="text-xs font-bold tracking-widest text-brand-600 uppercase">
        Your account
      </p>

      <div className="mt-4 flex items-center gap-4 rounded-3xl bg-ink-950 p-5">
        <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-brand-600 font-display text-2xl font-bold text-white">
          G
        </span>
        <div className="min-w-0">
          <h1 className="font-display text-xl font-bold text-white">
            Guest shopper
          </h1>
          <p className="truncate text-sm text-white/60">
            Orders are saved on this device
          </p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <Link
          href="/orders"
          className="flex items-center gap-3 rounded-2xl border border-ink-100 bg-white p-4"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
            <Package size={18} />
          </span>
          <span>
            <span className="block font-display text-lg font-bold text-ink-950">
              {orderCount}
            </span>
            <span className="block text-xs text-ink-500">Orders</span>
          </span>
        </Link>
        <Link
          href="/cart"
          className="flex items-center gap-3 rounded-2xl border border-ink-100 bg-white p-4"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
            <ShoppingBag size={18} />
          </span>
          <span>
            <span className="block font-display text-lg font-bold text-ink-950">
              {itemCount}
            </span>
            <span className="block text-xs text-ink-500">In cart</span>
          </span>
        </Link>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-ink-100 bg-white">
        <MenuLink href="/orders" icon={PackageSearch} label="My orders" />
        <MenuLink href="/categories" icon={LayoutGrid} label="Categories" />
        <MenuLink href="/how-it-works" icon={FileText} label="How it works" />
        <MenuLink
          href="/how-it-works#faq"
          icon={CircleHelp}
          label="Help & FAQs"
        />
        <MenuLink href="/" icon={LogOut} label="Sign out" />
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
      className="flex items-center gap-3 border-b border-ink-100 px-4 py-4 text-sm font-semibold text-ink-900 transition-colors last:border-b-0 hover:bg-ink-50"
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-ink-100 text-ink-700">
        <Icon size={17} />
      </span>
      <span className="flex-1">{label}</span>
      <ChevronRight size={16} className="text-ink-300" />
    </Link>
  );
}