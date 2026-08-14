import type { Design, DesignImage, DesignText } from "./types";
import { getFontById } from "./design";

const loadImage = (src: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Image failed to load"));
    img.src = src;
  });

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
): string[] {
  const lines: string[] = [];
  for (const paragraph of text.split("\n")) {
    const words = paragraph.split(/\s+/).filter(Boolean);
    if (words.length === 0) {
      lines.push("");
      continue;
    }
    let line = "";
    for (const word of words) {
      const test = line ? `${line} ${word}` : word;
      if (ctx.measureText(test).width > maxWidth && line) {
        lines.push(line);
        line = word;
      } else {
        line = test;
      }
    }
    lines.push(line);
  }
  return lines;
}

function drawText(
  ctx: CanvasRenderingContext2D,
  el: DesignText,
  scale: number,
) {
  const font = getFontById(el.font);
  ctx.font = `600 ${el.size * scale}px ${font.stack}`;
  ctx.fillStyle = el.color;
  ctx.textBaseline = "top";

  const lines = wrapText(ctx, el.text, el.width * scale);
  const lineHeight = el.size * scale * 1.15;

  lines.forEach((line, i) => {
    const y = el.y * scale + i * lineHeight;
    switch (el.align) {
      case "center":
        ctx.textAlign = "center";
        ctx.fillText(line, (el.x + el.width / 2) * scale, y);
        break;
      case "right":
        ctx.textAlign = "right";
        ctx.fillText(line, (el.x + el.width) * scale, y);
        break;
      default:
        ctx.textAlign = "left";
        ctx.fillText(line, el.x * scale, y);
    }
  });
}

function drawImage(
  ctx: CanvasRenderingContext2D,
  el: DesignImage,
  image: HTMLImageElement,
  scale: number,
) {
  ctx.save();
  ctx.translate(
    (el.x + el.width / 2) * scale,
    (el.y + el.height / 2) * scale,
  );
  if (el.rotation) ctx.rotate((el.rotation * Math.PI) / 180);
  ctx.drawImage(
    image,
    (-el.width / 2) * scale,
    (-el.height / 2) * scale,
    el.width * scale,
    el.height * scale,
  );
  ctx.restore();
}

export async function renderDesignToCanvas(
  design: Design,
  canvasWidth: number,
  canvasHeight: number,
  scale = 1,
): Promise<HTMLCanvasElement> {
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(canvasWidth * scale);
  canvas.height = Math.round(canvasHeight * scale);
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas not supported");

  ctx.fillStyle = design.backgroundColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const imageElements = design.elements.filter(
    (e): e is DesignImage => e.kind === "image",
  );
  const images = await Promise.all(
    imageElements.map((el) => loadImage(el.src)),
  );

  for (const el of design.elements) {
    if (el.kind === "text") {
      drawText(ctx, el, scale);
    } else if (el.kind === "shape") {
      ctx.save();
      ctx.translate(
        (el.x + el.width / 2) * scale,
        (el.y + el.height / 2) * scale,
      );
      if (el.rotation) ctx.rotate((el.rotation * Math.PI) / 180);
      ctx.fillStyle = el.fill;
      ctx.beginPath();
      if (el.shape === "circle") {
        ctx.arc(
          0,
          0,
          (Math.min(el.width, el.height) / 2) * scale,
          0,
          Math.PI * 2,
        );
      } else {
        ctx.rect(
          (-el.width / 2) * scale,
          (-el.height / 2) * scale,
          el.width * scale,
          el.height * scale,
        );
      }
      ctx.fill();
      ctx.restore();
    } else {
      const image = images[imageElements.indexOf(el)];
      if (image) drawImage(ctx, el, image, scale);
    }
  }

  return canvas;
}

export function downloadCanvas(canvas: HTMLCanvasElement, filename: string) {
  const link = document.createElement("a");
  link.download = filename;
  link.href = canvas.toDataURL("image/png");
  link.click();
}
