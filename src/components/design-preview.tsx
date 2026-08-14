import type { CSSProperties } from "react";
import type { Design, DesignElement } from "@/lib/types";
import { DESIGN_FONTS } from "@/lib/design";

export function elementStyle(
  el: DesignElement,
  canvasWidth: number,
  canvasHeight: number,
): CSSProperties {
  const w = (el.width / canvasWidth) * 100;

  if (el.kind === "text") {
    const font = DESIGN_FONTS.find((f) => f.id === el.font) ?? DESIGN_FONTS[0];
    const fontSize = (el.size / canvasWidth) * 100;
    return {
      position: "absolute",
      left: `${(el.x / canvasWidth) * 100}%`,
      top: `${(el.y / canvasHeight) * 100}%`,
      width: `${w}%`,
      color: el.color,
      fontFamily: font.stack,
      fontSize: `${fontSize}cqw`,
      lineHeight: 1.15,
      fontWeight: 600,
      textAlign: el.align,
      whiteSpace: "pre-wrap",
      wordBreak: "break-word",
      letterSpacing: "-0.01em",
    };
  }

  if (el.kind === "shape") {
    return {
      position: "absolute",
      left: `${(el.x / canvasWidth) * 100}%`,
      top: `${(el.y / canvasHeight) * 100}%`,
      width: `${w}%`,
      height: `${(el.height / canvasHeight) * 100}%`,
      backgroundColor: el.fill,
      borderRadius: el.shape === "circle" ? "9999px" : "0",
      transform: el.rotation ? `rotate(${el.rotation}deg)` : undefined,
    };
  }

  return {
    position: "absolute",
    left: `${(el.x / canvasWidth) * 100}%`,
    top: `${(el.y / canvasHeight) * 100}%`,
    width: `${w}%`,
    height: `${(el.height / canvasHeight) * 100}%`,
    transform: el.rotation ? `rotate(${el.rotation}deg)` : undefined,
  };
}

export function DesignPreview({
  design,
  canvasWidth,
  canvasHeight,
  className = "",
}: {
  design: Design;
  canvasWidth: number;
  canvasHeight: number;
  className?: string;
}) {
  return (
    <div
      className={`relative w-full overflow-hidden ${className}`}
      style={{
        aspectRatio: `${canvasWidth} / ${canvasHeight}`,
        backgroundColor: design.backgroundColor,
        containerType: "inline-size",
      }}
    >
      {design.elements.map((el) => {
        if (el.kind === "image") {
          return (
            <div
              key={el.id}
              style={elementStyle(el, canvasWidth, canvasHeight)}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={el.src}
                alt=""
                draggable={false}
                className="h-full w-full object-fill"
              />
            </div>
          );
        }
        return (
          <div
            key={el.id}
            style={elementStyle(el, canvasWidth, canvasHeight)}
          />
        );
      })}
    </div>
  );
}
