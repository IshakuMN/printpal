"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ChevronRight,
  Download,
  ImagePlus,
  Redo2,
  Square,
  TextCursor,
  Undo2,
  Wand2,
} from "lucide-react";
import type { CartItem, Design, DesignElement, Product } from "@/lib/types";
import {
  downscaleImage,
  getDefaultDesign,
  getTemplate,
  hasDesignContent,
  SWATCHES,
  TEMPLATES,
} from "@/lib/design";
import { getLineUnitPrice, getOptionLabels } from "@/lib/data";
import { formatMoney, uid } from "@/lib/format";
import { renderDesignToCanvas, downloadCanvas } from "@/lib/canvas-export";
import { useCart } from "./cart-provider";
import { StudioStage } from "./studio/stage";
import { ElementProperties } from "./studio/element-properties";
import { Button, QuantityStepper, cn } from "./ui";

export function DesignStudio({
  product,
  initialOptions,
  initialQuantity,
}: {
  product: Product;
  initialOptions: Record<string, string>;
  initialQuantity: number;
}) {
  const router = useRouter();
  const { addItem } = useCart();

  const [options, setOptions] = useState(initialOptions);
  const [quantity, setQuantity] = useState(initialQuantity);
  const [design, setDesign] = useState<Design>(() =>
    getDefaultDesign(product),
  );
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [activeTemplate, setActiveTemplate] = useState<string>("blank");
  const [downloading, setDownloading] = useState(false);

  const designRef = useRef(design);
  const historyRef = useRef<{ past: Design[]; future: Design[] }>({
    past: [],
    future: [],
  });
  const pendingRef = useRef<Design | null>(null);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    designRef.current = design;
  }, [design]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const commitNow = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (pendingRef.current) {
      const h = historyRef.current;
      h.past.push(pendingRef.current);
      if (h.past.length > 60) h.past.shift();
      h.future = [];
      pendingRef.current = null;
    }
  }, []);

  const scheduleCommit = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => {
      commitNow();
    }, 400);
  }, [commitNow]);

  const updateDesign = useCallback(
    (updater: (prev: Design) => Design, immediate = false) => {
      const current = designRef.current;
      const next = updater(current);
      designRef.current = next;
      if (!pendingRef.current) pendingRef.current = current;
      if (immediate) commitNow();
      else scheduleCommit();
      setDesign(next);
    },
    [commitNow, scheduleCommit],
  );

  const undo = useCallback(() => {
    commitNow();
    const h = historyRef.current;
    const prev = h.past.pop();
    if (!prev) return;
    h.future.push(designRef.current);
    designRef.current = prev;
    setDesign(prev);
    setActiveTemplate("custom");
  }, [commitNow]);

  const redo = useCallback(() => {
    const h = historyRef.current;
    const next = h.future.pop();
    if (!next) return;
    h.past.push(designRef.current);
    designRef.current = next;
    setDesign(next);
    setActiveTemplate("custom");
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "z") {
        e.preventDefault();
        if (e.shiftKey) redo();
        else undo();
      }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "y") {
        e.preventDefault();
        redo();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [undo, redo]);

  const applyTemplate = (id: string) => {
    const template = getTemplate(id);
    const next = template.build(product);
    updateDesign(() => next, true);
    setActiveTemplate(id);
    setSelectedId(null);
  };

  const addText = () => {
    const el: DesignElement = {
      id: uid(),
      kind: "text",
      text: "Your text",
      font: "Space Grotesk",
      size: Math.round(product.design.canvasWidth / 6),
      color: "#121216",
      x: Math.round(product.design.canvasWidth * 0.12),
      y: Math.round(product.design.canvasHeight * 0.35),
      width: Math.round(product.design.canvasWidth * 0.76),
      height: Math.round(product.design.canvasHeight * 0.25),
      align: "center",
    };
    updateDesign((d) => ({ ...d, elements: [...d.elements, el] }), true);
    setSelectedId(el.id);
    setActiveTemplate("custom");
  };

  const addShape = () => {
    const size = Math.round(product.design.canvasWidth / 4);
    const el: DesignElement = {
      id: uid(),
      kind: "shape",
      shape: "rect",
      fill: "#7c3aed",
      x: Math.round((product.design.canvasWidth - size) / 2),
      y: Math.round((product.design.canvasHeight - size) / 2),
      width: size,
      height: size,
      rotation: 0,
    };
    updateDesign((d) => ({ ...d, elements: [...d.elements, el] }), true);
    setSelectedId(el.id);
    setActiveTemplate("custom");
  };

  const addImage = async (file: File) => {
    const src = await downscaleImage(file);
    const targetW = Math.round(product.design.canvasWidth * 0.7);
    const img = new Image();
    await new Promise<void>((resolve) => {
      img.onload = () => resolve();
      img.src = src;
    });
    const aspect = img.height / img.width;
    const width = targetW;
    const height = Math.round(width * aspect);
    const el: DesignElement = {
      id: uid(),
      kind: "image",
      src,
      x: Math.round((product.design.canvasWidth - width) / 2),
      y: Math.round((product.design.canvasHeight - height) / 2),
      width,
      height,
      rotation: 0,
    };
    updateDesign((d) => ({ ...d, elements: [...d.elements, el] }), true);
    setSelectedId(el.id);
    setActiveTemplate("custom");
  };

  const onElementsChange = (elements: DesignElement[]) => {
    updateDesign((d) => ({ ...d, elements }));
  };

  const onElementChange = (el: DesignElement) => {
    updateDesign((d) => ({
      ...d,
      elements: d.elements.map((x) => (x.id === el.id ? el : x)),
    }));
    setActiveTemplate("custom");
  };

  const deleteElement = () => {
    if (!selectedId) return;
    updateDesign(
      (d) => ({
        ...d,
        elements: d.elements.filter((x) => x.id !== selectedId),
      }),
      true,
    );
    setSelectedId(null);
  };

  const duplicateElement = () => {
    if (!selectedId) return;
    const src = designRef.current.elements.find((x) => x.id === selectedId);
    if (!src) return;
    const copy: DesignElement = {
      ...src,
      id: uid(),
      x: Math.min(src.x + 24, product.design.canvasWidth - src.width),
      y: Math.min(src.y + 24, product.design.canvasHeight - src.height),
    };
    updateDesign(
      (d) => ({ ...d, elements: [...d.elements, copy] }),
      true,
    );
    setSelectedId(copy.id);
  };

  const selectedElement =
    design.elements.find((el) => el.id === selectedId) ?? null;

  const unitPrice = getLineUnitPrice(product, quantity, options);
  const subtotal = Math.round(unitPrice * quantity * 100) / 100;
  const optionLabels = getOptionLabels(product, options);
  const isEmpty = !hasDesignContent(design);

  const addToCart = () => {
    const item: CartItem = {
      id: uid(),
      productId: product.id,
      productName: product.name,
      productImage: product.image,
      unitLabel: product.unitLabel,
      canvasWidth: product.design.canvasWidth,
      canvasHeight: product.design.canvasHeight,
      options,
      optionLabels,
      design: designRef.current,
      hasDesign: !isEmpty,
      quantity,
      unitPrice,
      lineTotal: subtotal,
    };
    addItem(item);
    router.push("/cart");
  };

  const onDownload = async () => {
    setDownloading(true);
    try {
      await document.fonts.ready;
      const scale = 2;
      const canvas = await renderDesignToCanvas(
        designRef.current,
        product.design.canvasWidth,
        product.design.canvasHeight,
        scale,
      );
      downloadCanvas(canvas, `${product.slug}-design.png`);
    } finally {
      setDownloading(false);
    }
  };

  const setOption = (groupId: string, choiceId: string) =>
    setOptions((prev) => ({ ...prev, [groupId]: choiceId }));

  const toolBtn =
    "flex cursor-pointer items-center gap-2 rounded-xl border border-ink-200 bg-white px-3 py-2.5 text-sm font-medium text-ink-800 transition-colors hover:border-brand-500 hover:text-brand-700";

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 pb-28 sm:px-6 lg:pb-6">
      {/* Top bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <Link
            href={`/products/${product.slug}`}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-ink-200 text-ink-600 transition-colors hover:bg-ink-100"
            aria-label="Back to product"
          >
            <ArrowLeft size={16} />
          </Link>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="truncate font-display text-lg font-bold text-ink-950">
                {product.name}
              </h1>
              <span className="hidden rounded-full bg-ink-100 px-2.5 py-0.5 text-xs font-medium text-ink-600 sm:inline">
                {product.design.canvasLabel}
              </span>
            </div>
            <p className="truncate text-xs text-ink-500">
              {activeTemplate === "custom" ? "Custom design" : activeTemplate === "blank" ? "Blank canvas" : "Template applied"}
              {isEmpty ? " · no artwork yet" : ""}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={undo}
            title="Undo (⌘Z)"
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-ink-200 text-ink-600 hover:bg-ink-100"
          >
            <Undo2 size={15} />
          </button>
          <button
            type="button"
            onClick={redo}
            title="Redo (⌘⇧Z)"
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-ink-200 text-ink-600 hover:bg-ink-100"
          >
            <Redo2 size={15} />
          </button>
          <Button variant="outline" size="sm" onClick={onDownload} disabled={downloading}>
            <Download size={14} />
            {downloading ? "Exporting…" : "Download PNG"}
          </Button>
          <Link
            href={`/products/${product.slug}`}
            className="hidden items-center gap-1 text-sm font-medium text-ink-500 hover:text-ink-900 sm:inline-flex"
          >
            Info <ChevronRight size={13} />
          </Link>
        </div>
      </div>

      {/* Workspace */}
      <div className="mt-6 grid gap-6 lg:grid-cols-[230px_minmax(0,1fr)_300px]">
        {/* Tools */}
        <aside className="rounded-2xl border border-ink-200 bg-ink-50 p-4">
          <div className="flex gap-2 lg:flex-col">
            <button type="button" onClick={addText} className={toolBtn}>
              <TextCursor size={16} />
              <span className="lg:hidden">Text</span>
              <span className="hidden lg:inline">Add text</span>
            </button>
            <label className={toolBtn}>
              <ImagePlus size={16} />
              <span className="lg:hidden">Photo</span>
              <span className="hidden lg:inline">Add photo</span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) void addImage(file);
                  e.target.value = "";
                }}
              />
            </label>
            <button type="button" onClick={addShape} className={toolBtn}>
              <Square size={16} />
              <span className="lg:hidden">Shape</span>
              <span className="hidden lg:inline">Add shape</span>
            </button>
          </div>

          {product.design.background && (
            <div className="mt-5">
              <p className="mb-2 text-xs font-semibold tracking-widest text-ink-500 uppercase">
                Background
              </p>
              <div className="flex flex-wrap gap-1.5">
                {SWATCHES.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() =>
                      updateDesign((d) => ({ ...d, backgroundColor: c }), true)
                    }
                    className={cn(
                      "h-7 w-7 cursor-pointer rounded-full border border-ink-200 transition-transform",
                      design.backgroundColor === c &&
                        "scale-110 ring-2 ring-brand-600 ring-offset-1",
                    )}
                    style={{ backgroundColor: c }}
                    aria-label={`Background ${c}`}
                  />
                ))}
              </div>
            </div>
          )}

          <div className="mt-5">
            <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold tracking-widest text-ink-500 uppercase">
              <Wand2 size={12} /> Templates
            </p>
            <div className="flex gap-1.5 lg:flex-col">
              {TEMPLATES.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => applyTemplate(t.id)}
                  className={cn(
                    "flex-1 cursor-pointer rounded-lg border px-3 py-1.5 text-left text-xs font-medium transition-colors",
                    activeTemplate === t.id
                      ? "border-brand-600 bg-white text-brand-800 shadow-sm"
                      : "border-ink-200 bg-white/60 text-ink-700 hover:border-ink-400",
                  )}
                >
                  {t.name}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Stage */}
        <div>
          <StudioStage
            product={product}
            design={design}
            selectedId={selectedId}
            onSelect={setSelectedId}
            onChange={onElementsChange}
          />
          <p className="mt-2 text-center text-xs text-ink-500">
            Drag to move · corner handles to resize · arrow keys to nudge · ⌘Z to undo
          </p>
        </div>

        {/* Right panel */}
        <aside className="space-y-4">
          {selectedElement ? (
            <div className="rounded-2xl border border-ink-200 bg-white p-4 shadow-soft">
              <ElementProperties
                product={product}
                element={selectedElement}
                onChange={onElementChange}
                onDelete={deleteElement}
                onDuplicate={duplicateElement}
              />
            </div>
          ) : (
            <div className="rounded-2xl border border-ink-200 bg-ink-50 p-4">
              <p className="text-sm font-semibold text-ink-900">
                {isEmpty ? "Start with a blank canvas" : "Nice design!"}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-ink-600">
                {isEmpty
                  ? "Add text, a photo or a shape — or pick a template to get going."
                  : "Select an element on the canvas to edit its style, size and position."}
              </p>
            </div>
          )}

          <div className="rounded-2xl border border-ink-200 bg-white p-4 shadow-soft">
            <p className="mb-3 text-sm font-semibold text-ink-900">
              Product options
            </p>
            <div className="space-y-4">
              {product.options.map((group) => (
                <div key={group.id}>
                  <p className="mb-1.5 text-xs font-medium text-ink-600">
                    {group.label}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {group.choices.map((choice) => (
                      <button
                        key={choice.id}
                        type="button"
                        onClick={() => setOption(group.id, choice.id)}
                        className={cn(
                          "cursor-pointer rounded-lg border px-2.5 py-1.5 text-xs font-medium transition-colors",
                          options[group.id] === choice.id
                            ? "border-ink-950 bg-ink-950 text-white"
                            : "border-ink-200 bg-white text-ink-700 hover:border-ink-400",
                        )}
                      >
                        {choice.label}
                        {choice.price ? (
                          <span
                            className={cn(
                              "ml-1",
                              options[group.id] === choice.id
                                ? "text-white/60"
                                : "text-ink-400",
                            )}
                          >
                            {choice.price > 0 ? "+" : ""}
                            {formatMoney(choice.price)}
                          </span>
                        ) : null}
                      </button>
                    ))}
                  </div>
                </div>
              ))}

              <div className="flex items-center justify-between gap-3 border-t border-ink-100 pt-3">
                <div>
                  <p className="mb-1.5 text-xs font-medium text-ink-600">
                    Quantity
                  </p>
                  <QuantityStepper
                    value={quantity}
                    onChange={setQuantity}
                    min={product.minQty}
                    step={product.step ?? Math.max(1, product.minQty)}
                  />
                </div>
                <div className="text-right">
                  <p className="text-xs text-ink-500">
                    {formatMoney(unitPrice)} / {product.unitLabel}
                  </p>
                  <p className="font-display text-xl font-bold text-ink-950">
                    {formatMoney(subtotal)}
                  </p>
                </div>
              </div>

              {isEmpty && (
                <p className="rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-800">
                  No artwork added yet — you can still order this blank, or add
                  something to the canvas.
                </p>
              )}

              <Button size="lg" onClick={addToCart} className="w-full">
                Add to cart — {formatMoney(subtotal)}
              </Button>
              <p className="text-center text-xs text-ink-500">
                Free delivery on orders over {formatMoney(49)}. Ships in{" "}
                {product.productionDays[0]}–{product.productionDays[1]} days.
              </p>
            </div>
          </div>
        </aside>
      </div>

      {/* Mobile sticky order bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-ink-200 bg-white/95 px-4 py-3 backdrop-blur lg:hidden">
        <div className="flex items-center gap-3">
          <QuantityStepper
            value={quantity}
            onChange={setQuantity}
            min={product.minQty}
            step={product.step ?? Math.max(1, product.minQty)}
          />
          <div className="min-w-0 flex-1">
            <p className="text-xs text-ink-500">
              {formatMoney(unitPrice)} / {product.unitLabel}
            </p>
            <p className="truncate font-display text-lg font-bold text-ink-950">
              {formatMoney(subtotal)}
            </p>
          </div>
          <Button onClick={addToCart} className="shrink-0">
            Add to cart
          </Button>
        </div>
      </div>
    </div>
  );
}
