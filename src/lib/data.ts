import type { Category, DeliveryMethod, Product } from "./types";

export const DELIVERY_METHODS: DeliveryMethod[] = [
  {
    id: "standard",
    label: "Standard",
    eta: "5–9 working days",
    price: 4.99,
  },
  {
    id: "express",
    label: "Express",
    eta: "2–4 working days",
    price: 12.99,
  },
];

export const FREE_DELIVERY_THRESHOLD = 49;

const img = (id: string, w = 900) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const CATEGORIES: Category[] = [
  {
    id: "stickers",
    slug: "stickers",
    name: "Stickers & Labels",
    shortName: "Stickers",
    description:
      "Die-cut, kiss-cut and holographic stickers for brands, laptops and water bottles.",
    image: img("photo-1620799140408-edc6dcb6d633"),
  },
  {
    id: "stationery",
    slug: "stationery",
    name: "Stationery & Cards",
    shortName: "Stationery",
    description:
      "Business cards, flyers, invitations and branded print for any occasion.",
    image: img("photo-1454165804606-c3d57bc86b40"),
  },
  {
    id: "apparel",
    slug: "apparel",
    name: "Apparel",
    shortName: "Apparel",
    description:
      "T-shirts, hoodies and totes printed with your artwork. One off or bulk.",
    image: img("photo-1576566588028-4147f3842f27"),
  },
  {
    id: "photo",
    slug: "photo",
    name: "Photo Prints",
    shortName: "Photo",
    description:
      "Photo prints and books that turn your favourites into keepsakes.",
    image: img("photo-1492571350019-22de08371fd3"),
  },
  {
    id: "wall-art",
    slug: "wall-art",
    name: "Wall Art",
    shortName: "Wall Art",
    description:
      "Canvas, framed prints and posters in premium finishes for any space.",
    image: img("photo-1572044162444-ad60f128bdea"),
  },
  {
    id: "signage",
    slug: "signage",
    name: "Banners & Signage",
    shortName: "Banners",
    description:
      "Vinyl banners and roll-ups for launches, events and retail.",
    image: img("photo-1557804506-669a67965ba0"),
  },
  {
    id: "gifts",
    slug: "gifts",
    name: "Gifts & Home",
    shortName: "Gifts",
    description:
      "Mugs and personalised products that make everyday things yours.",
    image: img("photo-1514228742587-6b1558fcca3d"),
  },
];

const stickers: Product = {
  id: "stickers",
  slug: "die-cut-stickers",
  name: "Die-Cut Stickers",
  categoryId: "stickers",
  tagline: "Kiss-cut & die-cut vinyl stickers, ready to peel.",
  description:
    "Weatherproof vinyl stickers printed in full colour and cut to any shape. Great for branding, laptops, packaging and events. Matte and glossy finishes available.",
  image: img("photo-1620799140408-edc6dcb6d633"),
  price: 1.2,
  unitLabel: "sticker",
  minQty: 10,
  bulk: [
    { minQty: 10, unitPrice: 1.2 },
    { minQty: 50, unitPrice: 0.95 },
    { minQty: 100, unitPrice: 0.8 },
    { minQty: 500, unitPrice: 0.6 },
  ],
  options: [
    {
      id: "material",
      label: "Material",
      defaultValue: "matte",
      choices: [
        { id: "matte", label: "Matte vinyl", price: 0 },
        { id: "glossy", label: "Glossy vinyl", price: 0 },
        { id: "transparent", label: "Transparent", price: 0.15 },
        { id: "holographic", label: "Holographic", price: 0.4 },
      ],
    },
    {
      id: "cut",
      label: "Cut type",
      defaultValue: "diecut",
      choices: [
        { id: "diecut", label: "Die-cut (custom shape)" },
        { id: "kisscut", label: "Kiss-cut sheet" },
      ],
    },
  ],
  design: {
    canvasWidth: 600,
    canvasHeight: 600,
    canvasLabel: "Sticker artwork",
    safeMargin: 30,
    background: true,
    text: true,
    image: true,
    defaultBackground: "#ffffff",
  },
  productionDays: [3, 5],
  popular: true,
};

const stickerSheets: Product = {
  id: "sticker-sheets",
  slug: "sticker-sheets",
  name: "Sticker Sheets",
  categoryId: "stickers",
  tagline: "Kiss-cut sheets with multiple stickers per sheet.",
  description:
    "One A5 sheet packed with kiss-cut stickers. Perfect for kids' parties, product labels or sellable sticker packs. You design, we cut and score.",
  image: img("photo-1609840114035-3c981b782dfe"),
  price: 0.9,
  unitLabel: "sheet",
  minQty: 25,
  bulk: [
    { minQty: 25, unitPrice: 0.9 },
    { minQty: 100, unitPrice: 0.7 },
    { minQty: 500, unitPrice: 0.55 },
  ],
  options: [
    {
      id: "material",
      label: "Material",
      defaultValue: "matte",
      choices: [
        { id: "matte", label: "Matte vinyl" },
        { id: "glossy", label: "Glossy vinyl" },
        { id: "transparent", label: "Transparent" },
      ],
    },
  ],
  design: {
    canvasWidth: 600,
    canvasHeight: 400,
    canvasLabel: "Sheet artwork (A5)",
    safeMargin: 20,
    background: true,
    text: true,
    image: true,
    defaultBackground: "#ffffff",
  },
  productionDays: [3, 5],
};

const businessCards: Product = {
  id: "business-cards",
  slug: "business-cards",
  name: "Business Cards",
  categoryId: "stationery",
  tagline: "Premium cards with optional foil and spot gloss.",
  description:
    "Classic 3.5 × 2 in cards on thick 400gsm stock with rounded corners, spot gloss or soft-touch lamination. Your design, our press.",
  image: img("photo-1454165804606-c3d57bc86b40"),
  price: 0.18,
  unitLabel: "card",
  minQty: 50,
  bulk: [
    { minQty: 50, unitPrice: 0.18 },
    { minQty: 100, unitPrice: 0.14 },
    { minQty: 250, unitPrice: 0.11 },
    { minQty: 500, unitPrice: 0.09 },
  ],
  options: [
    {
      id: "stock",
      label: "Stock",
      defaultValue: "matte",
      choices: [
        { id: "matte", label: "400gsm matte" },
        { id: "softtouch", label: "Soft-touch", price: 0.02 },
        { id: "gloss", label: "Spot gloss", price: 0.03 },
        { id: "foil", label: "Gold foil", price: 0.12 },
      ],
    },
    {
      id: "shape",
      label: "Shape",
      defaultValue: "standard",
      choices: [
        { id: "standard", label: "Standard" },
        { id: "rounded", label: "Rounded corners", price: 0.01 },
      ],
    },
  ],
  design: {
    canvasWidth: 600,
    canvasHeight: 343,
    canvasLabel: "Card face",
    safeMargin: 28,
    background: true,
    text: true,
    image: true,
    defaultBackground: "#ffffff",
  },
  productionDays: [2, 4],
  popular: true,
};

const flyers: Product = {
  id: "flyers",
  slug: "flyers",
  name: "Flyers",
  categoryId: "stationery",
  tagline: "A5 & A4 flyers for events, promos and local business.",
  description:
    "Full-colour flyers on 150gsm gloss or uncoated stock. Hand them out, slip them in mailers or pin them on noticeboards.",
  image: img("photo-1560472354-b33ff0c44a43"),
  price: 0.14,
  unitLabel: "flyer",
  minQty: 50,
  bulk: [
    { minQty: 50, unitPrice: 0.14 },
    { minQty: 100, unitPrice: 0.1 },
    { minQty: 500, unitPrice: 0.07 },
    { minQty: 1000, unitPrice: 0.05 },
  ],
  options: [
    {
      id: "size",
      label: "Size",
      defaultValue: "a5",
      choices: [
        { id: "a5", label: "A5" },
        { id: "a4", label: "A4", price: 0.08 },
      ],
    },
    {
      id: "paper",
      label: "Paper",
      defaultValue: "gloss",
      choices: [
        { id: "gloss", label: "150gsm gloss" },
        { id: "uncoated", label: "150gsm uncoated" },
        { id: "recycled", label: "Recycled", price: 0.02 },
      ],
    },
  ],
  design: {
    canvasWidth: 600,
    canvasHeight: 848,
    canvasLabel: "Flyer (A5 portrait)",
    safeMargin: 30,
    background: true,
    text: true,
    image: true,
    defaultBackground: "#ffffff",
  },
  productionDays: [2, 4],
};

const invitations: Product = {
  id: "invitations",
  slug: "invitations",
  name: "Wedding Invitations",
  categoryId: "stationery",
  tagline: "A5 cards with envelopes, foil and vellum options.",
  description:
    "Beautiful A5 invitations with matching envelopes. Add foil, belly bands or keep it minimal — we handle the details.",
  image: img("photo-1511795409834-ef04bbd61622"),
  price: 1.5,
  unitLabel: "invitation",
  minQty: 25,
  bulk: [
    { minQty: 25, unitPrice: 1.5 },
    { minQty: 50, unitPrice: 1.2 },
    { minQty: 100, unitPrice: 0.95 },
  ],
  options: [
    {
      id: "finish",
      label: "Finish",
      defaultValue: "matte",
      choices: [
        { id: "matte", label: "400gsm matte" },
        { id: "foil", label: "Gold foil", price: 0.8 },
        { id: "velvet", label: "Velvet finish", price: 0.5 },
      ],
    },
    {
      id: "envelope",
      label: "Envelopes",
      defaultValue: "included",
      choices: [
        { id: "included", label: "Matching envelopes" },
        { id: "none", label: "No envelopes", price: -0.3 },
      ],
    },
  ],
  design: {
    canvasWidth: 600,
    canvasHeight: 857,
    canvasLabel: "Invitation (A5)",
    safeMargin: 30,
    background: true,
    text: true,
    image: true,
    defaultBackground: "#fdf8f0",
  },
  productionDays: [4, 7],
};

const tshirts: Product = {
  id: "tshirts",
  slug: "t-shirts",
  name: "T-Shirts",
  categoryId: "apparel",
  tagline: "Direct-to-garment tees in 10+ colours and sizes.",
  description:
    "Premium 100% combed cotton tees printed with DTG for soft, vivid artwork. One-off or bulk, in sizes XS–3XL.",
  image: img("photo-1576566588028-4147f3842f27"),
  price: 18,
  unitLabel: "tee",
  minQty: 1,
  step: 1,
  bulk: [
    { minQty: 1, unitPrice: 18 },
    { minQty: 10, unitPrice: 15 },
    { minQty: 25, unitPrice: 12 },
  ],
  options: [
    {
      id: "colour",
      label: "Garment colour",
      defaultValue: "black",
      choices: [
        { id: "black", label: "Black" },
        { id: "white", label: "White" },
        { id: "navy", label: "Navy" },
        { id: "heather-grey", label: "Heather grey" },
        { id: "sand", label: "Sand" },
      ],
    },
    {
      id: "style",
      label: "Style",
      defaultValue: "unisex",
      choices: [
        { id: "unisex", label: "Unisex crew" },
        { id: "women", label: "Women's fit" },
        { id: "oversized", label: "Oversized", price: 2 },
      ],
    },
    {
      id: "size",
      label: "Size",
      defaultValue: "m",
      choices: [
        { id: "xs", label: "XS" },
        { id: "s", label: "S" },
        { id: "m", label: "M" },
        { id: "l", label: "L" },
        { id: "xl", label: "XL" },
        { id: "2xl", label: "2XL", price: 2 },
        { id: "3xl", label: "3XL", price: 3 },
      ],
    },
  ],
  design: {
    canvasWidth: 600,
    canvasHeight: 600,
    canvasLabel: "Front print area",
    safeMargin: 40,
    background: false,
    text: true,
    image: true,
    defaultBackground: "#ffffff",
  },
  productionDays: [4, 7],
  popular: true,
};

const hoodies: Product = {
  id: "hoodies",
  slug: "hoodies",
  name: "Hoodies",
  categoryId: "apparel",
  tagline: "Heavyweight fleece hoodies with your print.",
  description:
    "280gsm brushed-fleece hoodies with kangaroo pocket and drawstrings. Printed or embroidered on front, back or sleeve.",
  image: img("photo-1556821840-3a63f95609a7"),
  price: 34,
  unitLabel: "hoodie",
  minQty: 1,
  step: 1,
  bulk: [
    { minQty: 1, unitPrice: 34 },
    { minQty: 10, unitPrice: 28 },
    { minQty: 25, unitPrice: 24 },
  ],
  options: [
    {
      id: "colour",
      label: "Colour",
      defaultValue: "black",
      choices: [
        { id: "black", label: "Black" },
        { id: "white", label: "White" },
        { id: "heather", label: "Heather grey" },
        { id: "olive", label: "Olive" },
      ],
    },
    {
      id: "size",
      label: "Size",
      defaultValue: "m",
      choices: [
        { id: "s", label: "S" },
        { id: "m", label: "M" },
        { id: "l", label: "L" },
        { id: "xl", label: "XL" },
        { id: "2xl", label: "2XL", price: 3 },
      ],
    },
  ],
  design: {
    canvasWidth: 600,
    canvasHeight: 600,
    canvasLabel: "Front print area",
    safeMargin: 40,
    background: false,
    text: true,
    image: true,
    defaultBackground: "#ffffff",
  },
  productionDays: [5, 8],
};

const totes: Product = {
  id: "totes",
  slug: "tote-bags",
  name: "Tote Bags",
  categoryId: "apparel",
  tagline: "Heavy cotton totes — the everyday billboard.",
  description:
    "100% cotton canvas tote with long handles, printed with your artwork. Brilliant for merch, events and retail bags.",
  image: img("photo-1594223274512-ad4803739b7c"),
  price: 12,
  unitLabel: "tote",
  minQty: 5,
  bulk: [
    { minQty: 5, unitPrice: 12 },
    { minQty: 25, unitPrice: 9 },
    { minQty: 100, unitPrice: 7 },
  ],
  options: [
    {
      id: "colour",
      label: "Colour",
      defaultValue: "natural",
      choices: [
        { id: "natural", label: "Natural" },
        { id: "black", label: "Black" },
        { id: "white", label: "White" },
      ],
    },
    {
      id: "print",
      label: "Print type",
      defaultValue: "screen",
      choices: [
        { id: "screen", label: "Screen print" },
        { id: "dtg", label: "DTG (full colour)", price: 3 },
      ],
    },
  ],
  design: {
    canvasWidth: 600,
    canvasHeight: 600,
    canvasLabel: "Front print area",
    safeMargin: 40,
    background: false,
    text: true,
    image: true,
    defaultBackground: "#ffffff",
  },
  productionDays: [4, 7],
};

const photoPrints: Product = {
  id: "photo-prints",
  slug: "photo-prints",
  name: "Photo Prints",
  categoryId: "photo",
  tagline: "Archive-grade prints of your favourite photos.",
  description:
    "Lab-quality photographic prints on lustre or glossy paper. Upload your photos and we'll colour-correct, print and ship.",
  image: img("photo-1492571350019-22de08371fd3"),
  price: 3,
  unitLabel: "print",
  minQty: 1,
  step: 1,
  bulk: [
    { minQty: 1, unitPrice: 3 },
    { minQty: 10, unitPrice: 2.2 },
    { minQty: 50, unitPrice: 1.8 },
  ],
  options: [
    {
      id: "size",
      label: "Size",
      defaultValue: "6x4",
      choices: [
        { id: "6x4", label: "6 × 4 in" },
        { id: "7x5", label: "7 × 5 in", price: 1 },
        { id: "8x6", label: "8 × 6 in", price: 2 },
        { id: "a4", label: "A4", price: 5 },
      ],
    },
    {
      id: "paper",
      label: "Paper",
      defaultValue: "lustre",
      choices: [
        { id: "lustre", label: "Lustre" },
        { id: "glossy", label: "Glossy" },
        { id: "matte", label: "Matte" },
      ],
    },
  ],
  design: {
    canvasWidth: 600,
    canvasHeight: 800,
    canvasLabel: "Photo area",
    safeMargin: 20,
    background: false,
    text: false,
    image: true,
    fit: "cover",
    defaultBackground: "#ffffff",
  },
  productionDays: [2, 4],
  popular: true,
};

const photoBooks: Product = {
  id: "photo-books",
  slug: "photo-books",
  name: "Photo Books",
  categoryId: "photo",
  tagline: "Hardcover photo books that last a lifetime.",
  description:
    "Print your story as a 20-page hardcover photo book. Layflat pages, thick cover, and your photos colour-managed from upload.",
  image: img("photo-1524995997946-a1c2e315a42f"),
  price: 29,
  unitLabel: "book",
  minQty: 1,
  step: 1,
  bulk: [
    { minQty: 1, unitPrice: 29 },
    { minQty: 10, unitPrice: 24 },
  ],
  options: [
    {
      id: "size",
      label: "Size",
      defaultValue: "square",
      choices: [
        { id: "square", label: "8 × 8 in (20 pages)" },
        { id: "landscape", label: "11 × 8 in (20 pages)", price: 4 },
      ],
    },
    {
      id: "cover",
      label: "Cover",
      defaultValue: "hard",
      choices: [
        { id: "hard", label: "Hardcover" },
        { id: "soft", label: "Softcover", price: -6 },
      ],
    },
  ],
  design: {
    canvasWidth: 600,
    canvasHeight: 600,
    canvasLabel: "Front cover",
    safeMargin: 30,
    background: true,
    text: true,
    image: true,
    defaultBackground: "#ffffff",
  },
  productionDays: [5, 8],
};

const canvas: Product = {
  id: "canvas",
  slug: "canvas-prints",
  name: "Canvas Prints",
  categoryId: "wall-art",
  tagline: "Gallery-wrapped canvas on solid pine frames.",
  description:
    "Vivid prints wrapped around a thick, solid wood frame. Printed with pigment inks and coated to protect against UV and dust.",
  image: img("photo-1515405295579-ba7b45403062"),
  price: 24,
  unitLabel: "print",
  minQty: 1,
  step: 1,
  bulk: [{ minQty: 1, unitPrice: 24 }, { minQty: 5, unitPrice: 20 }],
  options: [
    {
      id: "size",
      label: "Size",
      defaultValue: "12x12",
      choices: [
        { id: "12x12", label: "12 × 12 in" },
        { id: "16x16", label: "16 × 16 in", price: 10 },
        { id: "20x20", label: "20 × 20 in", price: 22 },
        { id: "24x36", label: "24 × 36 in", price: 40 },
      ],
    },
    {
      id: "depth",
      label: "Frame depth",
      defaultValue: "38mm",
      choices: [
        { id: "25mm", label: "25mm slim" },
        { id: "38mm", label: "38mm standard" },
      ],
    },
  ],
  design: {
    canvasWidth: 600,
    canvasHeight: 600,
    canvasLabel: "Print area",
    safeMargin: 30,
    background: false,
    text: false,
    image: true,
    fit: "cover",
    defaultBackground: "#ffffff",
  },
  productionDays: [4, 6],
  popular: true,
};

const framed: Product = {
  id: "framed",
  slug: "framed-prints",
  name: "Framed Prints",
  categoryId: "wall-art",
  tagline: "Ready-to-hang prints with premium wood frames.",
  description:
    "Museum-quality giclée prints mounted in solid wood frames with acrylic glazing. Arrives ready to hang.",
  image: img("photo-1572044162444-ad60f128bdea"),
  price: 39,
  unitLabel: "print",
  minQty: 1,
  step: 1,
  bulk: [{ minQty: 1, unitPrice: 39 }, { minQty: 5, unitPrice: 32 }],
  options: [
    {
      id: "size",
      label: "Size",
      defaultValue: "a4",
      choices: [
        { id: "a4", label: "A4" },
        { id: "a3", label: "A3", price: 18 },
        { id: "a2", label: "A2", price: 45 },
      ],
    },
    {
      id: "frame",
      label: "Frame",
      defaultValue: "oak",
      choices: [
        { id: "oak", label: "Natural oak" },
        { id: "black", label: "Matte black" },
        { id: "walnut", label: "Walnut", price: 8 },
      ],
    },
  ],
  design: {
    canvasWidth: 600,
    canvasHeight: 848,
    canvasLabel: "Print area (A4)",
    safeMargin: 25,
    background: false,
    text: false,
    image: true,
    fit: "cover",
    defaultBackground: "#ffffff",
  },
  productionDays: [5, 8],
};

const posters: Product = {
  id: "posters",
  slug: "posters",
  name: "Posters",
  categoryId: "wall-art",
  tagline: "High-opacity matte posters with vivid colour.",
  description:
    "170gsm matte posters that look sharp in any frame or pinned to the wall. Text and image design welcome.",
  image: img("photo-1550399105-c4db5fb85c18"),
  price: 8,
  unitLabel: "poster",
  minQty: 1,
  step: 1,
  bulk: [
    { minQty: 1, unitPrice: 8 },
    { minQty: 10, unitPrice: 6 },
    { minQty: 50, unitPrice: 4.5 },
  ],
  options: [
    {
      id: "size",
      label: "Size",
      defaultValue: "a3",
      choices: [
        { id: "a4", label: "A4", price: -2 },
        { id: "a3", label: "A3" },
        { id: "a2", label: "A2", price: 6 },
        { id: "a1", label: "A1", price: 14 },
      ],
    },
    {
      id: "paper",
      label: "Paper",
      defaultValue: "matte",
      choices: [
        { id: "matte", label: "170gsm matte" },
        { id: "satin", label: "200gsm satin", price: 2 },
      ],
    },
  ],
  design: {
    canvasWidth: 600,
    canvasHeight: 848,
    canvasLabel: "Poster (A3 portrait)",
    safeMargin: 30,
    background: true,
    text: true,
    image: true,
    defaultBackground: "#ffffff",
  },
  productionDays: [2, 4],
};

const banners: Product = {
  id: "banners",
  slug: "vinyl-banners",
  name: "Vinyl Banners",
  categoryId: "signage",
  tagline: "Heavy-duty vinyl banners with reinforced hems.",
  description:
    "440gsm scrim vinyl banners with sewn hems and eyelets. Indoor and outdoor rated, printed edge to edge.",
  image: img("photo-1557804506-669a67965ba0"),
  price: 12,
  unitLabel: "per sq ft",
  minQty: 1,
  step: 1,
  bulk: [
    { minQty: 1, unitPrice: 12 },
    { minQty: 10, unitPrice: 9 },
    { minQty: 25, unitPrice: 7 },
  ],
  options: [
    {
      id: "material",
      label: "Material",
      defaultValue: "standard",
      choices: [
        { id: "standard", label: "440gsm scrim vinyl" },
        { id: "mesh", label: "Mesh (windy sites)", price: 2 },
        { id: "blockout", label: "Blockout vinyl", price: 3 },
      ],
    },
    {
      id: "finish",
      label: "Finish",
      defaultValue: "hems",
      choices: [
        { id: "hems", label: "Hems + eyelets" },
        { id: "poles", label: "Pole pockets", price: 4 },
      ],
    },
  ],
  design: {
    canvasWidth: 900,
    canvasHeight: 300,
    canvasLabel: "Banner (wide)",
    safeMargin: 40,
    background: true,
    text: true,
    image: true,
    defaultBackground: "#ffffff",
  },
  productionDays: [3, 5],
};

const rollups: Product = {
  id: "rollups",
  slug: "roll-up-banners",
  name: "Roll-Up Banners",
  categoryId: "signage",
  tagline: "Lightweight pull-up stands that set up in seconds.",
  description:
    "Fully retractable 85 × 200cm roll-up banners with a carry bag. Print once, roll out everywhere.",
  image: img("photo-1584467735815-f778f274e296"),
  price: 65,
  unitLabel: "stand",
  minQty: 1,
  step: 1,
  bulk: [{ minQty: 1, unitPrice: 65 }, { minQty: 5, unitPrice: 55 }],
  options: [
    {
      id: "size",
      label: "Size",
      defaultValue: "85x200",
      choices: [
        { id: "85x200", label: "85 × 200 cm" },
        { id: "85x160", label: "85 × 160 cm", price: -10 },
      ],
    },
    {
      id: "base",
      label: "Base",
      defaultValue: "standard",
      choices: [
        { id: "standard", label: "Standard base" },
        { id: "premium", label: "Aluminium premium", price: 15 },
      ],
    },
  ],
  design: {
    canvasWidth: 600,
    canvasHeight: 848,
    canvasLabel: "Banner panel",
    safeMargin: 40,
    background: true,
    text: true,
    image: true,
    defaultBackground: "#ffffff",
  },
  productionDays: [4, 6],
};

const mugs: Product = {
  id: "mugs",
  slug: "ceramic-mugs",
  name: "Ceramic Mugs",
  categoryId: "gifts",
  tagline: "11oz ceramic mugs with dishwasher-safe print.",
  description:
    "Bright, full-colour print on 11oz white ceramic mugs. Sublimation-printed and safe for the dishwasher and microwave.",
  image: img("photo-1514228742587-6b1558fcca3d"),
  price: 12,
  unitLabel: "mug",
  minQty: 1,
  step: 1,
  bulk: [
    { minQty: 1, unitPrice: 12 },
    { minQty: 10, unitPrice: 9.5 },
    { minQty: 25, unitPrice: 8 },
  ],
  options: [
    {
      id: "style",
      label: "Style",
      defaultValue: "classic",
      choices: [
        { id: "classic", label: "Classic 11oz" },
        { id: "matte", label: "Matte black 11oz", price: 2 },
        { id: "espresso", label: "Espresso 6oz", price: -3 },
      ],
    },
    {
      id: "personalisation",
      label: "Add-on",
      defaultValue: "none",
      choices: [
        { id: "none", label: "Print only" },
        { id: "giftbox", label: "Gift box", price: 3 },
      ],
    },
  ],
  design: {
    canvasWidth: 600,
    canvasHeight: 600,
    canvasLabel: "Mug design",
    safeMargin: 40,
    background: false,
    text: true,
    image: true,
    defaultBackground: "#ffffff",
  },
  productionDays: [3, 5],
  popular: true,
};

export const PRODUCTS: Product[] = [
  stickers,
  stickerSheets,
  businessCards,
  flyers,
  invitations,
  tshirts,
  hoodies,
  totes,
  photoPrints,
  photoBooks,
  canvas,
  framed,
  posters,
  banners,
  rollups,
  mugs,
];

export const FEATURED_SLUGS = [
  "die-cut-stickers",
  "business-cards",
  "t-shirts",
  "photo-prints",
  "canvas-prints",
  "ceramic-mugs",
];

export const getCategory = (id: string) =>
  CATEGORIES.find((c) => c.id === id);

export const getProduct = (slug: string) =>
  PRODUCTS.find((p) => p.slug === slug);

export const getProductsByCategory = (categoryId: string) =>
  PRODUCTS.filter((p) => p.categoryId === categoryId);

export const getFeaturedProducts = () =>
  FEATURED_SLUGS.map((slug) => getProduct(slug)).filter(
    (p): p is Product => Boolean(p),
  );

export const getUnitPrice = (product: Product, quantity: number) => {
  const tier = [...product.bulk]
    .sort((a, b) => a.minQty - b.minQty)
    .filter((t) => quantity >= t.minQty)
    .at(-1);
  return tier?.unitPrice ?? product.price;
};

export const getOptionModifiers = (
  product: Product,
  selected: Record<string, string>,
) => {
  let modifiers = 0;
  for (const group of product.options) {
    const choice = group.choices.find((c) => c.id === selected[group.id]);
    modifiers += choice?.price ?? 0;
  }
  return modifiers;
};

export const getLineUnitPrice = (
  product: Product,
  quantity: number,
  selected: Record<string, string>,
) => {
  const bulk = getUnitPrice(product, quantity);
  const mods = getOptionModifiers(product, selected);
  return Math.max(0, Math.round((bulk + mods) * 100) / 100);
};

export const getOptionLabels = (
  product: Product,
  selected: Record<string, string>,
) =>
  product.options
    .map((group) => {
      const choice = group.choices.find((c) => c.id === selected[group.id]);
      return choice ? { group: group.label, choice: choice.label } : null;
    })
    .filter((o): o is { group: string; choice: string } => Boolean(o));

export const PRODUCT_COUNT = PRODUCTS.length;
