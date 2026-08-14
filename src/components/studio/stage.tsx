"use client";

import { useRef } from "react";
import type { CSSProperties, PointerEvent } from "react";
import type { Design, DesignElement, Product } from "@/lib/types";
import { getFontById } from "@/lib/design";
import { elementStyle } from "@/components/design-preview";

const HANDLES = ["nw", "ne", "sw", "se"] as const;
type Handle = (typeof HANDLES)[number];

type DragState = {
  mode: "move" | "resize";
  id: string;
  handle?: Handle;
  startX: number;
  startY: number;
  scale: number;
  orig: DesignElement;
};

export function StudioStage({
  product,
  design,
  selectedId,
  onSelect,
  onChange,
}: {
  product: Product;
  design: Design;
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  onChange: (elements: DesignElement[]) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<DragState | null>(null);
  const { canvasWidth: cw, canvasHeight: ch, safeMargin } = product.design;

  const applyDrag = (
    clientX: number,
    clientY: number,
    onChange: (elements: DesignElement[]) => void,
    design: Design,
    cw: number,
    ch: number,
  ) => {
    const drag = dragRef.current;
    if (!drag) return;
    const dx = (clientX - drag.startX) / drag.scale;
    const dy = (clientY - drag.startY) / drag.scale;

    let next: DesignElement = { ...drag.orig };

    if (drag.mode === "move") {
      next = {
        ...next,
        x: Math.max(0, Math.min(cw - next.width, drag.orig.x + dx)),
        y: Math.max(0, Math.min(ch - next.height, drag.orig.y + dy)),
      };
    } else {
      const handle = drag.handle ?? "se";
      const el = drag.orig;
      const min = 24;
      let x = el.x;
      let y = el.y;
      let w = el.width;
      let h = el.height;

      if (handle.includes("w")) {
        const nw = Math.min(el.x + el.width - min, el.x + dx);
        x = nw;
        w = el.x + el.width - nw;
      } else {
        w = Math.max(min, el.width + dx);
      }
      if (handle.includes("n")) {
        const nh = Math.min(el.y + el.height - min, el.y + dy);
        y = nh;
        h = el.y + el.height - nh;
      } else {
        h = Math.max(min, el.height + dy);
      }

      if (next.kind === "text") {
        next = { ...next, x, y, width: Math.max(min, w) };
      } else {
        next = { ...next, x, y, width: w, height: h };
      }
    }

    const elements = design.elements.map((e) =>
      e.id === drag.id ? next : e,
    );
    onChange(elements);
  };

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    const container = containerRef.current;
    if (!container) return;

    const handle = target.dataset.handle as Handle | undefined;
    const elementEl = target.closest("[data-el-id]") as HTMLElement | null;
    const id = handle ? target.closest("[data-el-id]")?.getAttribute("data-el-id") ?? null : elementEl?.getAttribute("data-el-id") ?? null;
    if (!id) {
      onSelect(null);
      return;
    }

    e.preventDefault();
    onSelect(id);
    const scale = container.getBoundingClientRect().width / cw;
    const element = design.elements.find((el) => el.id === id);
    if (!element) return;

    dragRef.current = {
      mode: handle ? "resize" : "move",
      id,
      handle,
      startX: e.clientX,
      startY: e.clientY,
      scale,
      orig: element,
    };
    container.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current) return;
    applyDrag(e.clientX, e.clientY, onChange, design, cw, ch);
  };

  const onPointerUp = (e: PointerEvent<HTMLDivElement>) => {
    dragRef.current = null;
    containerRef.current?.releasePointerCapture(e.pointerId);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!selectedId) return;
    const el = design.elements.find((x) => x.id === selectedId);
    if (!el) return;
    if (e.key === "Delete" || e.key === "Backspace") {
      e.preventDefault();
      onChange(design.elements.filter((x) => x.id !== selectedId));
      onSelect(null);
      return;
    }
    const nudge = e.shiftKey ? 10 : 2;
    let nx = el.x;
    let ny = el.y;
    if (e.key === "ArrowLeft") nx = Math.max(0, el.x - nudge);
    if (e.key === "ArrowRight") nx = Math.min(cw - el.width, el.x + nudge);
    if (e.key === "ArrowUp") ny = Math.max(0, el.y - nudge);
    if (e.key === "ArrowDown") ny = Math.min(ch - el.height, el.y + nudge);
    if (nx !== el.x || ny !== el.y) {
      e.preventDefault();
      onChange(
        design.elements.map((x) => (x.id === selectedId ? { ...x, x: nx, y: ny } : x)),
      );
    }
  };

  const renderElement = (el: DesignElement) => {
    const style = elementStyle(el, cw, ch);
    const selected = el.id === selectedId;
    const base: CSSProperties = {
      ...style,
      touchAction: "none",
      userSelect: "none",
      cursor: "move",
      ...(selected
        ? { outline: "2px solid var(--color-brand-600)", outlineOffset: "1px" }
        : {}),
    };

    let inner;
    if (el.kind === "text") {
      const font = getFontById(el.font);
      inner = (
        <div
          className="h-full w-full"
          style={{
            color: el.color,
            fontFamily: font.stack,
            fontSize: `${(el.size / cw) * 100}cqw`,
            lineHeight: 1.15,
            fontWeight: 600,
            textAlign: el.align,
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
            letterSpacing: "-0.01em",
          }}
        >
          {el.text}
        </div>
      );
    } else if (el.kind === "image") {
      inner = (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={el.src}
          alt=""
          draggable={false}
          className="h-full w-full object-fill"
        />
      );
    } else {
      inner = (
        <div
          className="h-full w-full"
          style={{
            backgroundColor: el.fill,
            borderRadius: el.shape === "circle" ? "9999px" : "0",
            transform: el.rotation ? `rotate(${el.rotation}deg)` : undefined,
          }}
        />
      );
    }

    return (
      <div
        key={el.id}
        data-el-id={el.id}
        style={base}
        onPointerDown={onPointerDown}
      >
        {inner}
        {selected && (
          <>
            {HANDLES.map((h) => (
              <div
                key={h}
                data-handle={h}
                onPointerDown={onPointerDown}
                className="absolute h-[2.4cqw] w-[2.4cqw] cursor-nwse-resize rounded-[2px] border border-white bg-brand-600 shadow-sm"
                style={{
                  left: h.includes("w") ? "-1.2cqw" : "auto",
                  right: h.includes("e") ? "-1.2cqw" : "auto",
                  top: h.includes("n") ? "-1.2cqw" : "auto",
                  bottom: h.includes("s") ? "-1.2cqw" : "auto",
                }}
                aria-hidden
              />
            ))}
          </>
        )}
      </div>
    );
  };

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      onKeyDown={onKeyDown}
      className="relative mx-auto w-full max-w-[720px] overflow-hidden rounded-2xl border border-ink-200 bg-white shadow-soft focus:outline-none"
      style={{
        aspectRatio: `${cw} / ${ch}`,
        backgroundColor: design.backgroundColor,
        containerType: "inline-size",
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      role="img"
      aria-label={`${product.design.canvasLabel} editor`}
    >
      {design.elements.map(renderElement)}

      <div
        className="pointer-events-none absolute border border-dashed border-black/10"
        style={{
          left: `${(safeMargin / cw) * 100}%`,
          top: `${(safeMargin / ch) * 100}%`,
          right: `${(safeMargin / cw) * 100}%`,
          bottom: `${(safeMargin / ch) * 100}%`,
        }}
      />
    </div>
  );
}
