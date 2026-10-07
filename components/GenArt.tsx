import { arcPath, composition } from "@/lib/art";

export default function GenArt({
  seed,
  palette,
  className,
  ratio = "4 / 5",
}: {
  seed: number;
  palette: string[];
  className?: string;
  ratio?: string;
}) {
  const { bg, shapes } = composition(seed, palette);
  const id = `g${seed}`;
  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      style={{ aspectRatio: ratio, width: "100%", height: "100%", display: "block", background: bg }}
      aria-hidden
    >
      <defs>
        <filter id={`${id}-grain`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
          <feComponentTransfer>
            <feFuncA type="table" tableValues="0 0.18" />
          </feComponentTransfer>
          <feBlend in="SourceGraphic" mode="overlay" />
        </filter>
      </defs>
      <rect width="100" height="100" fill={bg} />
      {shapes.map((s, i) => {
        if (s.kind === "circle") return <circle key={i} cx={s.x} cy={s.y} r={s.r} fill={s.fill} opacity={s.o} />;
        if (s.kind === "rect")
          return (
            <rect key={i} x={s.x} y={s.y} width={s.w} height={s.h} fill={s.fill} opacity={s.o} transform={`rotate(${s.rot} ${s.x} ${s.y})`} />
          );
        if (s.kind === "arc")
          return <path key={i} d={arcPath(s.x, s.y, s.r, s.start, s.end)} fill="none" stroke={s.stroke} strokeWidth={s.sw} strokeLinecap="round" />;
        return <line key={i} x1={s.x1} y1={s.y1} x2={s.x2} y2={s.y2} stroke={s.stroke} strokeWidth={s.sw} strokeLinecap="round" />;
      })}
      <rect width="100" height="100" fill="transparent" filter={`url(#${id}-grain)`} opacity="0.22" style={{ mixBlendMode: "overlay" }} />
    </svg>
  );
}
