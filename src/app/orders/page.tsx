import type { Metadata } from "next";
import { OrdersView } from "@/components/orders-view";

export const metadata: Metadata = {
  title: "Your orders",
  description: "Track the progress of your print orders.",
};

export default function OrdersPage() {
  return <OrdersView />;
}
