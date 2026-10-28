import { useId } from "react";
import type { Cover } from "@/lib/types";
import { cn, wrapText } from "@/lib/utils";

const SERIF = "var(--font-fraunces), 'Iowan Old Style', Georgia, serif";

function Sparkle({ x, y, s, fill, opacity = 1 }: { x: number; y: number; s: number; fill: string; opacity?: number }) {
  return (
    <path
      d="M0 -8 C1.6 -2.2 2.2 -1.6 8 0 C2.2 1.6 1.6 2.2 0 8 C-1.6 2.2 -2.2 1.6 -8 0 C-2.2 -1.6 -1.6 -2.2 0 -8 Z"
      transform={`translate(${x} ${y}) scale(${s})`}
      fill={fill}
      opacity={opacity}
    />
  );
}

function Diamond({ x, y, s, fill }: { x: number; y: number; s: number; fill: string }) {
  return <rect x={-s / 2} y={-s / 2} width={s} height={s} transform={`translate(${x} ${y}) rotate(45)`} fill={fill} />;
}

function MotifArt({ motif, ink, accent }: { motif: Cover["motif"]; ink: string; accent: string }) {
  const sw = 2.2;
  const line = { stroke: ink, strokeWidth: sw, fill: "none", strokeLinecap: "round", strokeLinejoin: "round" } as const;

  switch (motif) {
    case "celestial":
      return (
        <g>
          <circle r={88} {...line} strokeDasharray="1 7" opacity={0.55} />
          <path d="M18 -52 A56 56 0 1 0 18 52 A72 72 0 1 1 18 -52 Z" fill={ink} opacity={0.92} />
          <circle cx={58} cy={-52} r={13} fill={accent} />
          {[-160, -140, -120, -100, -80, -60].map((a) => (
            <line
              key={a}
              x1={58 + 20 * Math.cos((a * Math.PI) / 180)}
              y1={-52 + 20 * Math.sin((a * Math.PI) / 180)}
              x2={58 + 28 * Math.cos((a * Math.PI) / 180)}
              y2={-52 + 28 * Math.sin((a * Math.PI) / 180)}
              stroke={accent}
              strokeWidth={2}
              strokeLinecap="round"
            />
          ))}
          <Sparkle x={-62} y={-58} s={1.2} fill={accent} />
          <Sparkle x={70} y={30} s={0.9} fill={ink} opacity={0.8} />
          <Sparkle x={-48} y={66} s={0.7} fill={ink} opacity={0.6} />
          <Sparkle x={16} y={-84} s={0.6} fill={accent} opacity={0.8} />
        </g>
      );
    case "botanical":
      return (
        <g>
          <path d="M0 96 C-8 48 8 -16 0 -84" {...line} strokeWidth={2.6} />
          {[
            [62, -1, 20], [34, 1, 24], [4, -1, 27], [-26, 1, 24], [-54, -1, 19], [-76, 1, 13],
          ].map(([y, side, len], i) => (
            <g key={i} transform={`translate(0 ${y}) rotate(${side * 32})`}>
              <path d={`M0 0 Q ${len * 0.55} -10 ${len + 8} -4 Q ${len * 0.5} 8 0 0 Z`} stroke={ink} strokeWidth={sw} fill={accent} fillOpacity={i % 2 ? 0.22 : 0.12} />
            </g>
          ))}
          {[[0, 0.55, -70], [0, -0.55, -40]].map(([x, dir, yy], i) => (
            <path key={i} d={`M${x} ${yy + 70} C ${x + 26 * dir} ${yy + 30} ${x + 30 * dir} ${yy - 10} ${x + 18 * dir} ${yy - 60}`} {...line} opacity={0.75} strokeWidth={1.8} />
          ))}
          <g transform="translate(0 -96)">
            {[0, 72, 144, 216, 288].map((a) => (
              <ellipse key={a} rx={6} ry={11} transform={`rotate(${a}) translate(0 -13)`} stroke={accent} strokeWidth={1.8} fill={accent} fillOpacity={0.35} />
            ))}
            <circle r={5.5} fill={accent} />
          </g>
          <circle cx={26} cy={-120} r={3.4} fill={ink} opacity={0.7} />
          <circle cx={-22} cy={-104} r={2.6} fill={ink} opacity={0.5} />
        </g>
      );
    case "fern":
      return (
        <g>
          <path d="M0 100 C 10 40 -12 -30 2 -98" {...line} strokeWidth={2.6} />
          {[86, 66, 46, 26, 6, -14, -34, -54, -72, -88].map((y, i) => {
            const len = 52 - i * 4.6;
            const off = 2 * Math.sin(y / 12);
            return (
              <g key={y}>
                <path d={`M${off} ${y} Q ${off + len * 0.6} ${y - 6} ${off + len} ${y - 22} Q ${off + len * 0.5} ${y - 2} ${off} ${y + 3}`} stroke={ink} strokeWidth={1.7} fill={ink} fillOpacity={0.08} />
                <path d={`M${off} ${y} Q ${off - len * 0.6} ${y - 6} ${off - len} ${y - 22} Q ${off - len * 0.5} ${y - 2} ${off} ${y + 3}`} stroke={ink} strokeWidth={1.7} fill={ink} fillOpacity={0.08} />
              </g>
            );
          })}
          <path d="M2 -98 q 14 -2 16 -14" {...line} strokeWidth={2} />
          <circle cx={20} cy={-114} r={3} fill={accent} />
          <path d="M-26 104 a 30 14 0 0 1 56 0" {...line} opacity={0.6} strokeWidth={1.6} />
        </g>
      );
    case "arches":
      return (
        <g>
          <path d="M-78 92 V-6 A78 78 0 0 1 78 -6 V92" {...line} strokeWidth={2.6} />
          <path d="M-56 92 V-2 A56 56 0 0 1 56 -2 V92" {...line} opacity={0.7} />
          <path d="M-34 92 V2 A34 34 0 0 1 34 2 V92" {...line} opacity={0.45} strokeWidth={1.6} />
          <circle cy={-26} r={17} fill={accent} />
          <line x1={-104} y1={92} x2={104} y2={92} {...line} strokeWidth={2.6} />
          <line x1={-86} y1={106} x2={86} y2={106} {...line} opacity={0.4} strokeWidth={1.6} />
          <Sparkle x={-70} y={-70} s={0.8} fill={ink} opacity={0.6} />
          <Sparkle x={74} y={-58} s={0.65} fill={ink} opacity={0.5} />
        </g>
      );
    case "waves":
      return (
        <g>
          {[-46, -10, 26, 62].map((y, i) => (
            <path
              key={y}
              d="M-132 0 q 33 -30 66 0 t 66 0 t 66 0 t 66 0"
              transform={`translate(0 ${y})`}
              stroke={i === 1 ? accent : ink}
              strokeWidth={i === 1 ? 2.6 : 2}
              fill="none"
              strokeLinecap="round"
              opacity={i === 1 ? 0.95 : 0.75 - i * 0.12}
            />
          ))}
          <circle cx={-78} cy={-76} r={4} stroke={ink} strokeWidth={1.6} fill="none" opacity={0.6} />
          <circle cx={96} cy={-66} r={6} stroke={accent} strokeWidth={1.6} fill="none" opacity={0.8} />
          <circle cx={72} cy={98} r={3} stroke={ink} strokeWidth={1.4} fill="none" opacity={0.5} />
        </g>
      );
    case "rays":
      return (
        <g>
          {[-165, -140, -115, -90, -65, -40, -15].map((a) => {
            const r1 = 44;
            const r2 = 108;
            const rad = (a * Math.PI) / 180;
            return (
              <line
                key={a}
                x1={r1 * Math.cos(rad)}
                y1={52 + r1 * Math.sin(rad)}
                x2={r2 * Math.cos(rad)}
                y2={52 + r2 * Math.sin(rad)}
                stroke={ink}
                strokeWidth={2.2}
                strokeLinecap="round"
                opacity={0.8}
              />
            );
          })}
          <path d="M-70 52 A70 70 0 0 1 70 52" {...line} opacity={0.5} strokeWidth={1.6} />
          <circle cy={52} r={30} fill={accent} stroke={ink} strokeWidth={2.2} />
          <line x1={-118} y1={52} x2={118} y2={52} {...line} strokeWidth={2.6} />
          <Sparkle x={-104} y={-58} s={0.85} fill={ink} opacity={0.65} />
          <Sparkle x={106} y={-56} s={0.85} fill={ink} opacity={0.65} />
        </g>
      );
    case "atlas":
      return (
        <g>
          <circle r={84} {...line} strokeWidth={2.4} />
          <circle r={70} {...line} strokeWidth={1.4} opacity={0.6} />
          <ellipse rx={114} ry={34} {...line} strokeDasharray="2 6" opacity={0.5} strokeWidth={1.6} />
          <ellipse rx={114} ry={62} {...line} strokeDasharray="2 6" opacity={0.32} strokeWidth={1.4} />
          <path d="M0 -76 L15 0 L0 76 L-15 0 Z" fill={accent} stroke={ink} strokeWidth={1.6} />
          <path d="M-76 0 L0 15 L76 0 L0 -15 Z" fill={ink} opacity={0.85} />
          {[45, 135, 225, 315].map((a) => {
            const rad = (a * Math.PI) / 180;
            return <line key={a} x1={-8 * Math.cos(rad)} y1={-8 * Math.sin(rad)} x2={-64 * Math.cos(rad)} y2={-64 * Math.sin(rad)} stroke={ink} strokeWidth={1.6} opacity={0.7} />;
          })}
          <circle r={7} fill={ink} />
          <circle r={3} fill={accent} />
        </g>
      );
    case "ember":
      return (
        <g>
          <line x1={-56} y1={78} x2={44} y2={92} stroke={ink} strokeWidth={7} strokeLinecap="round" opacity={0.9} />
          <line x1={-44} y1={92} x2={56} y2={76} stroke={ink} strokeWidth={7} strokeLinecap="round" opacity={0.7} />
          <path d="M0 74 C-52 34 -44 -8 -10 -58 C-8 -32 12 -30 10 -62 C44 -26 54 28 0 74 Z" fill={accent} fillOpacity={0.28} stroke={ink} strokeWidth={2.4} strokeLinejoin="round" />
          <path d="M2 60 C-22 38 -18 12 -2 -12 C0 6 12 8 10 -10 C26 8 28 38 2 60 Z" fill={accent} opacity={0.85} />
          <circle cx={-30} cy={-76} r={2.8} fill={ink} opacity={0.7} />
          <circle cx={20} cy={-92} r={2.2} fill={accent} />
          <circle cx={2} cy={-108} r={1.8} fill={ink} opacity={0.5} />
        </g>
      );
    case "maze":
      return (
        <g>
          <path
            d="M-84 -84 H84 V84 H-84 V-46 H46 V46 H-46 V8 H10"
            {...line}
            strokeWidth={7}
            opacity={0.92}
          />
          <path d="M-84 -84 H84 V84 H-84 V-46 H46 V46 H-46 V8 H10" {...line} strokeWidth={2} stroke={accent} />
          <circle cx={10} cy={8} r={7} fill={accent} stroke={ink} strokeWidth={2} />
          <path d="M-104 -104 l 12 12 M-92 -104 l -12 12" stroke={ink} strokeWidth={2} strokeLinecap="round" opacity={0.6} />
        </g>
      );
    case "grid":
      return (
        <g>
          {[-60, -30, 0, 30, 60].map((x) =>
            [-60, -30, 0, 30, 60].map((y) => (
              <circle key={`${x}-${y}`} cx={x} cy={y} r={2.6} fill={ink} opacity={0.55} />
            )),
          )}
          <path d="M-60 -30 H30 V60 M-30 -60 V30 H60" stroke={accent} strokeWidth={2.2} fill="none" strokeLinecap="round" />
          <circle cx={30} cy={-60} r={17} {...line} fill={accent} fillOpacity={0.25} />
          <rect x={-67} y={23} width={14} height={14} transform="rotate(45 -60 30)" {...line} />
          <path d="M-98 -84 h14 M-91 -91 v14 M84 76 h14 M91 69 v14" stroke={ink} strokeWidth={1.8} strokeLinecap="round" opacity={0.6} />
        </g>
      );
    case "tide":
      return (
        <g>
          {[-30, 6, 42].map((y, r) => (
            <g key={y} transform={`translate(0 ${y})`}>
              {[-4, -2, 0, 2, 4].map((k) => (
                <path key={k} d={`M${-20 - r * 20 + k * 40 - 20} 0 a20 20 0 0 1 40 0`} stroke={r === 1 ? accent : ink} strokeWidth={2.1} fill="none" strokeLinecap="round" opacity={r === 1 ? 0.95 : 0.7} />
              ))}
            </g>
          ))}
          <circle cx={-64} cy={-66} r={12} fill={accent} opacity={0.9} />
          <circle cx={-64} cy={-66} r={18} {...line} opacity={0.5} strokeWidth={1.6} />
          <path d="M38 -64 q 14 -12 30 0 q -16 12 -30 0 Z" stroke={ink} strokeWidth={2} fill={ink} fillOpacity={0.15} />
          <path d="M38 -64 l -10 -7 v14 Z" fill={ink} opacity={0.6} />
          <circle cx={52} cy={-68} r={1.6} fill={ink} />
          <circle cx={90} cy={64} r={4.5} {...line} strokeWidth={1.6} fill="none" opacity={0.6} />
        </g>
      );
    case "type":
      return null;
    default:
      return null;
  }
}

function Barcode({ title, accent, ink }: { title: string; accent: string; ink: string }) {
  const bars: { w: number; h: number }[] = [];
  let seed = 0;
  for (const ch of title) seed += ch.charCodeAt(0);
  for (let i = 0; i < 34; i++) {
    seed = (seed * 9301 + 49297) % 233280;
    bars.push({ w: seed % 3 === 0 ? 3 : seed % 2 === 0 ? 2 : 1.2, h: 34 + (seed % 5) });
  }
  let x = 0;
  return (
    <g>
      <rect x={238} y={472} width={128} height={64} rx={3} fill="#FBF7EE" opacity={0.94} />
      <g transform="translate(248 482)" fill={ink}>
        {bars.map((b, i) => {
          const el = <rect key={i} x={x} y={0} width={b.w} height={b.h} />;
          x += b.w + 1.6;
          return el;
        })}
      </g>
      <text x={302} y={530} textAnchor="middle" fontSize={7.5} letterSpacing={2.5} fill={ink} fontFamily="var(--font-inter), ui-sans-serif">
        978-1-BHUB{title.length}-PRESS
      </text>
      <text x={302} y={466} textAnchor="middle" fontSize={8.5} letterSpacing={3} fill={accent} fontFamily={SERIF} fontStyle="italic">
        pagecraft press
      </text>
    </g>
  );
}

export function BookCover({
  cover,
  title,
  author,
  variant = "front",
  className,
}: {
  cover: Cover;
  title: string;
  author: string;
  variant?: "front" | "back";
  className?: string;
}) {
  const uid = useId().replace(/[:]/g, "");
  const gid = `g-${uid}`;
  const fid = `f-${uid}`;
  const longest = Math.max(...cover.lines.map((l) => l.length));
  const titleSize = longest > 15 ? 27 : longest > 11 ? 32 : longest > 7 ? 37 : 42;
  const watermark = cover.lines.join(" ").charAt(0);
  const quoteLines = wrapText(title.toUpperCase() === title ? title : title, 26);

  return (
    <svg viewBox="0 0 400 600" className={cn("block h-full w-full", className)} role="img" aria-label={`${title} cover`}>
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={cover.bg} />
          <stop offset="1" stopColor={cover.bg2} />
        </linearGradient>
        <filter id={fid}>
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" result="n" />
          <feColorMatrix in="n" type="saturate" values="0" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.06" />
          </feComponentTransfer>
        </filter>
      </defs>

      <rect width="400" height="600" fill={`url(#${gid})`} />
      {/* spine shading */}
      <rect width="14" height="600" fill="#000" opacity="0.14" />
      <rect x="14" width="1.5" height="600" fill="#fff" opacity="0.28" />

      {variant === "front" ? (
        <>
          <rect x="26" y="26" width="348" height="548" fill="none" stroke={cover.ink} strokeWidth="1.4" opacity="0.5" />
          <rect x="33" y="33" width="334" height="534" fill="none" stroke={cover.ink} strokeWidth="0.7" opacity="0.35" />

          {cover.motif === "type" && (
            <text x={200} y={430} textAnchor="middle" fontSize={380} fill={cover.ink} opacity={0.1} fontFamily={SERIF} fontStyle="italic">
              {watermark}
            </text>
          )}

          <g fontFamily={SERIF} fill={cover.ink} textAnchor="middle">
            {cover.lines.map((line, i) => (
              <text
                key={i}
                x={200}
                y={112 + i * (titleSize + 10)}
                fontSize={titleSize}
                letterSpacing={1}
                style={{ fontVariationSettings: '"opsz" 40', fontWeight: 500 }}
              >
                {line}
              </text>
            ))}
          </g>

          <Diamond x={200} y={112 + cover.lines.length * (titleSize + 10) - titleSize * 0.4 + 14} s={5} fill={cover.accent} />

          {cover.motif !== "type" && (
            <g transform="translate(200 352)">
              <MotifArt motif={cover.motif} ink={cover.ink} accent={cover.accent} />
            </g>
          )}

          {cover.kicker && (
            <text x={200} y={512} textAnchor="middle" fontSize={11} letterSpacing={3.4} fill={cover.ink} opacity={0.85} style={{ textTransform: "uppercase" }} fontFamily="var(--font-inter), ui-sans-serif">
              {cover.kicker.toUpperCase()}
            </text>
          )}
          <line x1={170} y1={526} x2={230} y2={526} stroke={cover.accent} strokeWidth={1.2} />
          <text x={200} y={552} textAnchor="middle" fontSize={12.5} letterSpacing={2.6} fill={cover.ink} fontFamily={SERIF} fontStyle="italic">
            {author}
          </text>
        </>
      ) : (
        <>
          <rect x="26" y="26" width="348" height="548" fill="none" stroke={cover.ink} strokeWidth="1.4" opacity="0.5" />
          <text x={200} y={72} textAnchor="middle" fontSize={12} letterSpacing={4} fill={cover.ink} fontFamily="var(--font-inter), ui-sans-serif">
            {title.toUpperCase()}
          </text>
          <line x1={150} y1={88} x2={250} y2={88} stroke={cover.accent} strokeWidth={1.1} />
          <g transform="translate(200 165) scale(0.42)" opacity={0.75}>
            <MotifArt motif={cover.motif} ink={cover.ink} accent={cover.accent} />
          </g>
          <text x={200} y={280} textAnchor="middle" fontSize={34} fill={cover.accent} fontFamily={SERIF}>
            “
          </text>
          <g fontFamily={SERIF} fontStyle="italic" fill={cover.ink} textAnchor="middle" fontSize={16.5}>
            {wrapText(`A good book is an event in a reader's life.`, 22).slice(0, 3).map((line, i) => (
              <text key={i} x={200} y={310 + i * 26} opacity={0.92}>
                {line}
              </text>
            ))}
          </g>
          <g fontFamily="var(--font-inter), ui-sans-serif" fill={cover.ink} textAnchor="middle">
            <text x={200} y={420} fontSize={9.5} letterSpacing={2.6} opacity={0.8}>
              PRINTED ON DEMAND
            </text>
            <text x={200} y={438} fontSize={9.5} letterSpacing={2.6} opacity={0.8}>
              SHIPS IN 3–5 DAYS
            </text>
          </g>
          <Barcode title={title} accent={cover.accent} ink={cover.ink} />
          <text x={70} y={530} textAnchor="middle" fontSize={9} letterSpacing={1.8} fill={cover.ink} opacity={0.75} fontFamily={SERIF} fontStyle="italic">
            {quoteLines[0]?.slice(0, 12) ?? ""}
          </text>
        </>
      )}

      {/* paper grain */}
      <rect width="400" height="600" fill="transparent" filter={`url(#${fid})`} />
    </svg>
  );
}
