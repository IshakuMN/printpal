import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PrintPal Nigeria | Print it. Love it. Get it delivered.",
  description:
    "Custom prints for your walls, business, and big ideas — delivered across Lagos.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
