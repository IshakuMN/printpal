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
    id: "tattoos",
    slug: "tattoos",
    name: "Temporary Tattoos",
    shortName: "Tattoos",
    description: "Custom temporary tattoos for events, parties and trials.",
    image: img("photo-1568515045052-f9a854d70bfd"),
  },
  {
    id: "signage",
    slug: "signage",
    name: "Ad Banners",
    shortName: "Banners",
    description: "Vinyl ad banners for shopfronts, events and promotions.",
    image: img("photo-1557804506-669a67965ba0"),
  },
  {
    id: "apparel",
    slug: "apparel",
    name: "Shirts",
    shortName: "Shirts",
    description: "T-shirts printed with your artwork. One off or bulk.",
    image: img("photo-1576566588028-4147f3842f27"),
  },
  {
    id: "photo",
    slug: "photo",
    name: "Photo Prints",
    shortName: "Photos",
    description: "Photo prints that turn your favourites into keepsakes.",
    image: img("photo-1492571350019-22de08371fd3"),
  },
  {
    id: "passport",
    slug: "passport",
    name: "Passport Photos",
    shortName: "Passports",
    description: "ID and passport photos printed to official sizes.",
    image: img("photo-1507003211169-0a1dd7228f2d"),
  },
];

const temporaryTattoos: Product = {
  id: "temporary-tattoos",
  slug: "temporary-tattoos",
  name: "Temporary Tattoos",
  categoryId: "tattoos",
  tagline: "Custom temporary tattoos, skin-safe and easy to apply.",
  description:
    "Personalised temporary tattoos printed with skin-safe inks. Upload your artwork or text — great for parties, events, brand promos and trying a design before the real thing. Lasts 3–5 days.",
  image: img("photo-1568515045052-f9a854d70bfd"),
  price: 0.8,
  unitLabel: "tattoo",
  minQty: 10,
  bulk: [
    { minQty: 10, unitPrice: 0.8 },
    { minQty: 50, unitPrice: 0.6 },
    { minQty: 100, unitPrice: 0.45 },
    { minQty: 500, unitPrice: 0.32 },
  ],
  options: [
    {
      id: "size",
      label: "Size",
      defaultValue: "medium",
      choices: [
        { id: "small", label: "Small (5 × 5 cm)", price: -0.1 },
        { id: "medium", label: "Medium (9 × 9 cm)" },
        { id: "large", label: "Large (A6 sheet)", price: 0.5 },
      ],
    },
    {
      id: "finish",
      label: "Finish",
      defaultValue: "matte",
      choices: [
        { id: "matte", label: "Matte" },
        { id: "glitter", label: "Glitter", price: 0.2 },
      ],
    },
  ],
  design: {
    canvasWidth: 600,
    canvasHeight: 600,
    canvasLabel: "Tattoo artwork",
    safeMargin: 30,
    background: false,
    text: true,
    image: true,
    defaultBackground: "#ffffff",
  },
  productionDays: [2, 4],
  popular: true,
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

const passportPhotos: Product = {
  id: "passport-photos",
  slug: "passport-photos",
  name: "Passport Photos",
  categoryId: "passport",
  tagline: "Official-size ID and passport photos, printed ready to use.",
  description:
    "Upload a portrait and we'll size, crop and print it to passport / ID requirements. Printed on regulation photo paper, cut to size and ready to submit.",
  image: img("photo-1507003211169-0a1dd7228f2d"),
  price: 6,
  unitLabel: "set",
  minQty: 1,
  step: 1,
  bulk: [
    { minQty: 1, unitPrice: 6 },
    { minQty: 4, unitPrice: 5 },
    { minQty: 10, unitPrice: 4 },
  ],
  options: [
    {
      id: "standard",
      label: "Standard",
      defaultValue: "uk",
      choices: [
        { id: "uk", label: "UK 35 × 45 mm (set of 4)" },
        { id: "us", label: "US 2 × 2 in (set of 4)" },
        { id: "eu", label: "EU 35 × 45 mm (set of 6)", price: 2 },
      ],
    },
    {
      id: "finish",
      label: "Finish",
      defaultValue: "matte",
      choices: [
        { id: "matte", label: "Matte (recommended for passports)" },
        { id: "glossy", label: "Glossy" },
      ],
    },
  ],
  design: {
    canvasWidth: 600,
    canvasHeight: 750,
    canvasLabel: "Portrait area",
    safeMargin: 20,
    background: false,
    text: false,
    image: true,
    fit: "cover",
    defaultBackground: "#ffffff",
  },
  productionDays: [1, 2],
  popular: true,
};

const banners: Product = {
  id: "banners",
  slug: "ad-banners",
  name: "Ad Banners",
  categoryId: "signage",
  tagline: "Heavy-duty vinyl ad banners with reinforced hems.",
  description:
    "440gsm scrim vinyl ad banners with sewn hems and eyelets. Indoor and outdoor rated, printed edge to edge — perfect for shopfronts, launches and promotions.",
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
  popular: true,
};

export const PRODUCTS: Product[] = [
  temporaryTattoos,
  banners,
  tshirts,
  photoPrints,
  passportPhotos,
];

export const FEATURED_SLUGS = [
  "temporary-tattoos",
  "ad-banners",
  "t-shirts",
  "photo-prints",
  "passport-photos",
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
