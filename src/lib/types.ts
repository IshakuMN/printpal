export type Currency = "USD";

export type Category = {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  description: string;
  image: string;
};

export type OptionChoice = {
  id: string;
  label: string;
  /** Added to the unit price. */
  price?: number;
  hint?: string;
};

export type OptionGroup = {
  id: string;
  label: string;
  /** id of the default (first) choice. */
  defaultValue: string;
  choices: OptionChoice[];
};

export type BulkTier = {
  minQty: number;
  /** Price per unit at this quantity. */
  unitPrice: number;
};

export type DesignCapabilities = {
  /** Aspect ratio of the print area in design units. */
  canvasWidth: number;
  canvasHeight: number;
  canvasLabel: string;
  /** "Design must not reach the physical edges." */
  safeMargin: number;
  background: boolean;
  text: boolean;
  image: boolean;
  fit?: "contain" | "cover";
  defaultBackground: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  categoryId: string;
  tagline: string;
  description: string;
  image: string;
  price: number;
  unitLabel: string;
  minQty: number;
  step?: number;
  bulk: BulkTier[];
  options: OptionGroup[];
  design: DesignCapabilities;
  productionDays: [number, number];
  popular?: boolean;
};

export type DesignText = {
  id: string;
  kind: "text";
  text: string;
  font: string;
  size: number;
  color: string;
  x: number;
  y: number;
  width: number;
  height: number;
  align: "left" | "center" | "right";
};

export type DesignImage = {
  id: string;
  kind: "image";
  src: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
};

export type DesignShape = {
  id: string;
  kind: "shape";
  shape: "rect" | "circle";
  fill: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
};

export type DesignElement = DesignText | DesignImage | DesignShape;

export type Design = {
  backgroundColor: string;
  elements: DesignElement[];
};

export type SelectedOptions = Record<string, string>;

export type CartItem = {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  unitLabel: string;
  canvasWidth: number;
  canvasHeight: number;
  options: SelectedOptions;
  optionLabels: { group: string; choice: string }[];
  design: Design;
  hasDesign: boolean;
  quantity: number;
  /** Computed per unit. */
  unitPrice: number;
  lineTotal: number;
};

export type DeliveryMethod = {
  id: string;
  label: string;
  eta: string;
  price: number;
};

export type Order = {
  id: string;
  reference: string;
  createdAt: number;
  statusIndex: number;
  contact: {
    name: string;
    email: string;
    phone: string;
  };
  delivery: {
    methodId: string;
    eta: string;
    fee: number;
    address: {
      line1: string;
      line2?: string;
      city: string;
      region: string;
      postalCode: string;
      country: string;
    };
    notes?: string;
  };
  items: CartItem[];
  subtotal: number;
  total: number;
};

export const ORDER_STAGES = [
  "Order received",
  "Preparing your design",
  "In production",
  "Quality check",
  "Shipped",
  "Delivered",
] as const;
