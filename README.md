# Inksmith — Custom Print Platform (MVP)

A functional print-on-demand storefront MVP. Users pick a printable product
(stickers, apparel, photo prints, wall art, banners, gifts…), customise it in a
built-in design studio, check out with a delivery address, and track the order
from production to delivery.

Positioning: **Design → Print → Deliver.**

## Features

- **Catalog** — 16 products across 7 categories with search, category filters
  and sorting (`/shop`).
- **Product pages** — per-product options (material, size, finish), live bulk
  pricing and quantity tiers (`/products/[slug]`).
- **Design studio** — a drag-and-drop canvas editor (`/design?product=…`):
  - Add editable **text** (fonts, size, colour, alignment)
  - Upload **photos** and place/resize them
  - Add **shapes** (rect / circle) and change background colour
  - Ready-made **templates** per product
  - Drag to move, corner handles to resize, arrow keys to nudge
  - Undo / redo (⌘Z / ⌘⇧Z), and **Download PNG** export
- **Cart** — persisted in `localStorage`, quantity editing, design thumbnails.
- **Checkout** — validated contact + delivery form, delivery-speed options with
  free-delivery threshold, order summary (`/checkout`).
- **Order tracking** — status timeline (received → production → shipped →
  delivered) with a demo "simulate next stage" control (`/orders/[id]`).
- **How it works** — explains that Inksmith handles production and delivery
  (`/how-it-works`).

## Stack

- Next.js 16 (App Router, Turbopack), React 19, TypeScript
- Tailwind CSS v4
- framer-motion, lucide-react
- No backend — cart and orders live in `localStorage`. No auth, no payments
  (out of scope for this MVP).

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Project structure

```
src/
  app/
    page.tsx               # Home
    shop/page.tsx          # Catalog (search / filter / sort)
    products/[slug]/page   # Product detail + customizer
    design/page.tsx        # Design studio + product picker
    cart/page.tsx
    checkout/page.tsx
    orders/page.tsx        # Order list
    orders/[id]/page.tsx   # Order tracking
    how-it-works/page.tsx
  components/
    design-studio.tsx      # Studio shell (state, history, cart)
    studio/stage.tsx       # Interactive canvas (drag/resize/select)
    studio/element-properties.tsx
    design-preview.tsx     # Shared non-interactive design renderer
    cart-provider.tsx      # Cart context + localStorage persistence
  lib/
    data.ts                # Categories, products, pricing
    design.ts              # Templates, fonts, image downscaling
    canvas-export.ts       # PNG export of a design
    types.ts
```

## Design model

Every product defines a design canvas (width × height), a safe margin, and
which inputs are allowed (text / image / background). A design is a background
colour plus a list of elements:

```ts
type DesignElement =
  | { kind: "text"; text; font; size; color; x; y; width; height; align }
  | { kind: "image"; src; x; y; width; height; rotation }
  | { kind: "shape"; shape: "rect" | "circle"; fill; x; y; width; height; rotation };
```

The studio renders elements with container-query units (`cqw`) so the same
design scales perfectly from a 24px cart thumbnail to the full editor. The PNG
exporter re-draws the same layout onto a `<canvas>` for download.