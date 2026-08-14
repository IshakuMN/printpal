"use client";

import { Copy, Trash2 } from "lucide-react";
import type { DesignElement, Product } from "@/lib/types";
import { DESIGN_FONTS, SWATCHES, TEXT_SWATCHES } from "@/lib/design";
import { cn } from "@/components/ui";

export function ElementProperties({
  product,
  element,
  onChange,
  onDelete,
  onDuplicate,
}: {
  product: Product;
  element: DesignElement;
  onChange: (el: DesignElement) => void;
  onDelete: () => void;
  onDuplicate: () => void;
}) {
  const cw = product.design.canvasWidth;
  const maxSize = Math.round(cw / 2);

  const set = (patch: Partial<DesignElement>) =>
    onChange({ ...element, ...patch } as DesignElement);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-ink-900 capitalize">
          {element.kind === "text"
            ? "Text"
            : element.kind === "image"
              ? "Photo"
              : "Shape"}
        </p>
        <div className="flex gap-1">
          <button
            type="button"
            onClick={onDuplicate}
            title="Duplicate"
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-ink-600 hover:bg-ink-100"
          >
            <Copy size={15} />
          </button>
          <button
            type="button"
            onClick={onDelete}
            title="Delete"
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-red-600 hover:bg-red-50"
          >
            <Trash2 size={15} />
          </button>
        </div>
      </div>

      {element.kind === "text" && (
        <>
          <label className="block">
            <span className="mb-1.5 block text-xs font-medium text-ink-600">
              Text
            </span>
            <textarea
              value={element.text}
              onChange={(e) => set({ text: e.target.value })}
              rows={3}
              className="w-full resize-none rounded-xl border border-ink-300 bg-white px-3 py-2 text-sm focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-600/20"
            />
          </label>

          <div>
            <span className="mb-1.5 block text-xs font-medium text-ink-600">
              Font
            </span>
            <div className="grid grid-cols-2 gap-1.5">
              {DESIGN_FONTS.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => set({ font: f.id })}
                  className={cn(
                    "cursor-pointer rounded-lg border px-2 py-1.5 text-xs font-medium transition-colors",
                    element.font === f.id
                      ? "border-brand-600 bg-brand-50 text-brand-800"
                      : "border-ink-200 text-ink-700 hover:border-ink-400",
                  )}
                  style={{ fontFamily: f.stack }}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <span className="text-xs font-medium text-ink-600">Size</span>
              <span className="text-xs text-ink-500">{element.size}px</span>
            </div>
            <input
              type="range"
              min={12}
              max={maxSize}
              value={element.size}
              onChange={(e) => set({ size: Number(e.target.value) })}
              className="w-full accent-brand-600"
            />
          </div>

          <div>
            <span className="mb-1.5 block text-xs font-medium text-ink-600">
              Colour
            </span>
            <div className="flex flex-wrap gap-1.5">
              {TEXT_SWATCHES.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => set({ color: c })}
                  className={cn(
                    "h-7 w-7 cursor-pointer rounded-full border border-ink-200 transition-transform",
                    element.color === c && "scale-110 ring-2 ring-brand-600 ring-offset-1",
                  )}
                  style={{ backgroundColor: c }}
                  aria-label={`Colour ${c}`}
                />
              ))}
            </div>
          </div>

          <div>
            <span className="mb-1.5 block text-xs font-medium text-ink-600">
              Align
            </span>
            <div className="flex gap-1.5">
              {(["left", "center", "right"] as const).map((a) => (
                <button
                  key={a}
                  type="button"
                  onClick={() => set({ align: a })}
                  className={cn(
                    "flex-1 cursor-pointer rounded-lg border px-3 py-1.5 text-xs font-medium capitalize transition-colors",
                    element.align === a
                      ? "border-ink-950 bg-ink-950 text-white"
                      : "border-ink-200 text-ink-700 hover:border-ink-400",
                  )}
                >
                  {a}
                </button>
              ))}
            </div>
          </div>
        </>
      )}

      {element.kind === "image" && (
        <>
          <SliderRow
            label="Width"
            value={element.width}
            max={cw}
            onChange={(v) => set({ width: v })}
          />
          <SliderRow
            label="Height"
            value={element.height}
            max={cw}
            onChange={(v) => set({ height: v })}
          />
          <SliderRow
            label="Rotation"
            value={element.rotation}
            max={360}
            min={0}
            onChange={(v) => set({ rotation: v })}
          />
        </>
      )}

      {element.kind === "shape" && (
        <>
          <div>
            <span className="mb-1.5 block text-xs font-medium text-ink-600">
              Shape
            </span>
            <div className="flex gap-1.5">
              {(["rect", "circle"] as const).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => set({ shape: s })}
                  className={cn(
                    "flex-1 cursor-pointer rounded-lg border px-3 py-1.5 text-xs font-medium capitalize transition-colors",
                    element.shape === s
                      ? "border-ink-950 bg-ink-950 text-white"
                      : "border-ink-200 text-ink-700 hover:border-ink-400",
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div>
            <span className="mb-1.5 block text-xs font-medium text-ink-600">
              Fill
            </span>
            <div className="flex flex-wrap gap-1.5">
              {SWATCHES.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => set({ fill: c })}
                  className={cn(
                    "h-7 w-7 cursor-pointer rounded-full border border-ink-200 transition-transform",
                    element.fill === c && "scale-110 ring-2 ring-brand-600 ring-offset-1",
                  )}
                  style={{ backgroundColor: c }}
                  aria-label={`Fill ${c}`}
                />
              ))}
            </div>
          </div>
          <SliderRow
            label="Width"
            value={element.width}
            max={cw}
            onChange={(v) => set({ width: v })}
          />
          <SliderRow
            label="Height"
            value={element.height}
            max={cw}
            onChange={(v) => set({ height: v })}
          />
          <SliderRow
            label="Rotation"
            value={element.rotation}
            max={360}
            min={0}
            onChange={(v) => set({ rotation: v })}
          />
        </>
      )}

      <p className="text-xs leading-relaxed text-ink-500">
        Drag on the canvas to move. Use the corner handles to resize. Delete
        with the Delete key.
      </p>
    </div>
  );
}

function SliderRow({
  label,
  value,
  max,
  min = 10,
  onChange,
}: {
  label: string;
  value: number;
  max: number;
  min?: number;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between">
        <span className="text-xs font-medium text-ink-600">{label}</span>
        <span className="text-xs text-ink-500">{Math.round(value)}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-brand-600"
      />
    </div>
  );
}
