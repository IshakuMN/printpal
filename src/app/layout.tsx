import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/cart-provider";
import { SearchProvider } from "@/components/search-provider";
import { AppHeader } from "@/components/app-header";
import { BottomNav } from "@/components/bottom-nav";
import { SiteFooter } from "@/components/site-footer";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export const metadata: Metadata = {
  title: {
    default: "PrintPal — Print on demand",
    template: "%s · PrintPal",
  },
  description:
    "Stickers, apparel, photo prints, wall art and more. Shop bold prints — made to order and delivered to your door.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={geist.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Studio fonts must load globally by family name for canvas export. */}
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Playfair+Display:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans bg-ink-50 antialiased">
        <CartProvider>
          <SearchProvider>
            <div className="relative mx-auto flex min-h-screen w-full flex-col bg-white">
              <AppHeader />
              <main className="flex-1 pb-28 lg:pb-8">{children}</main>
              <SiteFooter />
              <BottomNav />
            </div>
          </SearchProvider>
        </CartProvider>
      </body>
    </html>
  );
}