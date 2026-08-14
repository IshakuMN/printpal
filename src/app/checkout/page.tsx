import type { Metadata } from "next";
import { CheckoutForm } from "@/components/checkout-form";

export const metadata: Metadata = {
  title: "Checkout",
  description:
    "Confirm your delivery details and place your print order.",
};

export default function CheckoutPage() {
  return <CheckoutForm />;
}
