// Deterministic generative "artworks" so the prototype looks finished
// without needing real photography. Replace with real images later.

export function rng(seed: number) {
  let s = seed >>> 0 || 1;
  return () => {
    s ^= s << 13;
    s ^= s >>> 17;
    s ^= s << 5;
    return ((s >>> 0) % 100000) / 100000;
  };
}

export type Shape =
  | { kind: "circle"; x: number; y: number; r: number; fill: string; o: number }
  | { kind: "rect"; x: number; y: number; w: number; h: number; rot: number; fill: string; o: number }
  | { kind: "arc"; x: number; y: number; r: number; sw: number; stroke: string; start: number; end: number }
  | { kind: "line"; x1: number; y1: number; x2: number; y2: number; sw: number; stroke: string };

export function composition(seed: number, palette: string[]) {
  const r = rng(seed * 9301 + 49297);
  const [a, b, c] = palette;
  const bg = c;
  const shapes: Shape[] = [];
  const pick = () => [a, b, a, b, "#F2EBE3"][Math.floor(r() * 5)];
  const style = Math.floor(r() * 3);

  // big anchor form
  shapes.push({ kind: "circle", x: 30 + r() * 40, y: 30 + r() * 40, r: 22 + r() * 18, fill: a, o: 0.95 });

  if (style === 0) {
    for (let i = 0; i < 5; i++)
      shapes.push({ kind: "rect", x: r() * 80, y: r() * 90, w: 8 + r() * 30, h: 4 + r() * 22, rot: r() * 90 - 45, fill: pick(), o: 0.75 + r() * 0.25 });
  } else if (style === 1) {
    for (let i = 0; i < 4; i++)
      shapes.push({ kind: "arc", x: 50, y: 50, r: 12 + i * 9, sw: 2 + r() * 4, stroke: pick(), start: r() * 360, end: r() * 360 + 90 });
  } else {
    for (let i = 0; i < 9; i++) {
      const y = 10 + i * 10 + r() * 4;
      shapes.push({ kind: "line", x1: r() * 30, y1: y, x2: 70 + r() * 30, y2: y + (r() - 0.5) * 12, sw: 0.6 + r() * 2.4, stroke: pick() });
    }
  }
  shapes.push({ kind: "circle", x: r() * 100, y: r() * 100, r: 4 + r() * 10, fill: b, o: 0.9 });
  shapes.push({ kind: "circle", x: r() * 100, y: r() * 100, r: 2 + r() * 4, fill: "#F2EBE3", o: 0.9 });
  return { bg, shapes };
}

function polar(cx: number, cy: number, r: number, deg: number) {
  const rad = ((deg - 90) * Math.PI) / 180;
  return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)];
}

export function arcPath(x: number, y: number, r: number, start: number, end: number) {
  const [sx, sy] = polar(x, y, r, end);
  const [ex, ey] = polar(x, y, r, start);
  const large = (end - start) % 360 <= 180 ? 0 : 1;
  return `M ${sx} ${sy} A ${r} ${r} 0 ${large} 0 ${ex} ${ey}`;
}

/** Paint the same composition into a 2D canvas (used as a three.js texture). */
export function paintCanvas(seed: number, palette: string[], w = 512, h = 640) {
  const cv = document.createElement("canvas");
  cv.width = w;
  cv.height = h;
  const g = cv.getContext("2d")!;
  const { bg, shapes } = composition(seed, palette);
  g.fillStyle = bg;
  g.fillRect(0, 0, w, h);
  const sx = w / 100,
    sy = h / 100,
    s = Math.min(sx, sy);
  for (const sh of shapes) {
    g.save();
    if (sh.kind === "circle") {
      g.globalAlpha = sh.o;
      g.fillStyle = sh.fill;
      g.beginPath();
      g.arc(sh.x * sx, sh.y * sy, sh.r * s, 0, Math.PI * 2);
      g.fill();
    } else if (sh.kind === "rect") {
      g.globalAlpha = sh.o;
      g.fillStyle = sh.fill;
      g.translate(sh.x * sx, sh.y * sy);
      g.rotate((sh.rot * Math.PI) / 180);
      g.fillRect(0, 0, sh.w * s, sh.h * s);
    } else if (sh.kind === "arc") {
      g.strokeStyle = sh.stroke;
      g.lineWidth = sh.sw * s;
      g.lineCap = "round";
      g.beginPath();
      g.arc(sh.x * sx, sh.y * sy, sh.r * s, ((sh.start - 90) * Math.PI) / 180, ((sh.end - 90) * Math.PI) / 180);
      g.stroke();
    } else {
      g.strokeStyle = sh.stroke;
      g.lineWidth = sh.sw * s;
      g.lineCap = "round";
      g.beginPath();
      g.moveTo(sh.x1 * sx, sh.y1 * sy);
      g.lineTo(sh.x2 * sx, sh.y2 * sy);
      g.stroke();
    }
    g.restore();
  }
  // paper grain
  const img = g.getImageData(0, 0, w, h);
  const r = rng(seed);
  for (let i = 0; i < img.data.length; i += 4) {
    const n = (r() - 0.5) * 22;
    img.data[i] += n;
    img.data[i + 1] += n;
    img.data[i + 2] += n;
  }
  g.putImageData(img, 0, 0);
  return cv;
}
