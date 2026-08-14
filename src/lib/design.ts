import type {
  Design,
  DesignElement,
  DesignText,
  Product,
} from "./types";
import { uid } from "./format";

export const DESIGN_FONTS = [
  { id: "Inter", label: "Modern", stack: "'Inter', ui-sans-serif, system-ui, sans-serif" },
  { id: "Space Grotesk", label: "Geometric", stack: "'Space Grotesk', ui-sans-serif, system-ui, sans-serif" },
  { id: "Playfair Display", label: "Elegant serif", stack: "'Playfair Display', Georgia, serif" },
  { id: "Georgia", label: "Classic serif", stack: "Georgia, 'Times New Roman', serif" },
  { id: "Courier New", label: "Typewriter", stack: "'Courier New', 'Courier', monospace" },
] as const;

export const SWATCHES = [
  "#121216",
  "#ffffff",
  "#7c3aed",
  "#2563eb",
  "#0d9488",
  "#16a34a",
  "#d97706",
  "#dc2626",
  "#db2777",
  "#f5f5f4",
  "#f4f1ea",
  "#e7e5e4",
];

export const TEXT_SWATCHES = [
  "#121216",
  "#ffffff",
  "#7c3aed",
  "#2563eb",
  "#0d9488",
  "#16a34a",
  "#d97706",
  "#dc2626",
  "#db2777",
];

export const getDefaultDesign = (product: Product): Design => ({
  backgroundColor: product.design.defaultBackground,
  elements: [],
});

const makeText = (partial: Partial<DesignText>): DesignText => ({
  id: uid(),
  kind: "text",
  text: "Your text",
  font: "Space Grotesk",
  size: 64,
  color: "#121216",
  x: 0,
  y: 0,
  width: 400,
  height: 160,
  align: "center",
  ...partial,
});

type Template = {
  id: string;
  name: string;
  build: (product: Product) => Design;
};

export const TEMPLATES: Template[] = [
  {
    id: "blank",
    name: "Blank",
    build: (p) => getDefaultDesign(p),
  },
  {
    id: "bold",
    name: "Bold centre",
    build: (p) => ({
      backgroundColor: "#121216",
      elements: [
        makeText({
          text: "MAKE IT\nYOURS",
          font: "Space Grotesk",
          size: 110,
          color: "#ffffff",
          x: 50,
          y: 150,
          width: p.design.canvasWidth - 100,
          align: "center",
        }),
        makeText({
          text: "PRINTED BY INKSMITH",
          font: "Inter",
          size: 24,
          color: "#a78bfa",
          x: 50,
          y: 420,
          width: p.design.canvasWidth - 100,
          align: "center",
        }),
      ],
    }),
  },
  {
    id: "minimal",
    name: "Minimal",
    build: (p) => ({
      backgroundColor: "#f4f1ea",
      elements: [
        makeText({
          text: "Est. 2026",
          font: "Playfair Display",
          size: 56,
          color: "#121216",
          x: 50,
          y: 250,
          width: p.design.canvasWidth - 100,
          align: "center",
        }),
      ],
    }),
  },
  {
    id: "business",
    name: "Name card",
    build: (p) => ({
      backgroundColor: "#ffffff",
      elements: [
        {
          id: uid(),
          kind: "shape",
          shape: "rect",
          fill: "#7c3aed",
          x: 0,
          y: 0,
          width: 48,
          height: p.design.canvasHeight,
          rotation: 0,
        },
        makeText({
          text: "Your Name",
          font: "Space Grotesk",
          size: 84,
          color: "#121216",
          x: 120,
          y: 150,
          width: p.design.canvasWidth - 180,
          align: "left",
        }),
        makeText({
          text: "ROLE · COMPANY",
          font: "Inter",
          size: 30,
          color: "#6d28d9",
          x: 120,
          y: 260,
          width: p.design.canvasWidth - 180,
          align: "left",
        }),
      ],
    }),
  },
  {
    id: "centered",
    name: "Centered",
    build: (p) => ({
      backgroundColor: "#f5f3ff",
      elements: [
        makeText({
          text: "NEW\nCOLLECTION",
          font: "Playfair Display",
          size: 96,
          color: "#4c1d95",
          x: 50,
          y: 120,
          width: p.design.canvasWidth - 100,
          align: "center",
        }),
        makeText({
          text: "DESIGN · PRINT · DELIVER",
          font: "Inter",
          size: 24,
          color: "#6d28d9",
          x: 50,
          y: 400,
          width: p.design.canvasWidth - 100,
          align: "center",
        }),
      ],
    }),
  },
];

export const DESIGN_TEMPLATES = TEMPLATES;

export const getTemplate = (id: string) =>
  TEMPLATES.find((t) => t.id === id) ?? TEMPLATES[0];

export const hasDesignContent = (design: Design) => design.elements.length > 0;

export const cloneElement = (el: DesignElement): DesignElement => ({
  ...el,
  id: uid(),
  x: el.x + 24,
  y: el.y + 24,
});

export const clampElementToCanvas = (
  el: DesignElement,
  width: number,
  height: number,
) => {
  const copy = { ...el };
  copy.x = Math.max(0, Math.min(copy.x, width - copy.width));
  copy.y = Math.max(0, Math.min(copy.y, height - copy.height));
  return copy;
};

export const getFontById = (id: string) =>
  DESIGN_FONTS.find((f) => f.id === id) ?? DESIGN_FONTS[0];

export function downscaleImage(file: File, max = 1400): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const scale = Math.min(1, max / Math.max(img.width, img.height));
        const w = Math.round(img.width * scale);
        const h = Math.round(img.height * scale);
        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d");
        if (!ctx) return reject(new Error("Canvas not supported"));
        ctx.drawImage(img, 0, 0, w, h);
        resolve(canvas.toDataURL("image/png"));
      };
      img.onerror = () => reject(new Error("Could not read image"));
      img.src = String(reader.result);
    };
    reader.onerror = () => reject(new Error("Could not read file"));
    reader.readAsDataURL(file);
  });
}
