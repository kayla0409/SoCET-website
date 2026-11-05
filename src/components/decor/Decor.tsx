/**
 * Decorative graphics for the editorial design. All of them are inline SVG,
 * aria-hidden and pointer-events-none, so they never reach assistive tech or
 * get in the way of clicks.
 */

const decorative = {
  "aria-hidden": true,
  focusable: false,
} as const;

/** A glowing lime light streak sweeping from top-center to bottom-right. */
export function LightStreak({ className = "" }: { className?: string }) {
  return (
    <svg
      {...decorative}
      viewBox="0 0 1440 900"
      preserveAspectRatio="none"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    >
      <defs>
        <linearGradient id="streak-fade" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#d4ff7a" stopOpacity="0" />
          <stop offset="0.35" stopColor="#d4ff7a" stopOpacity="0.9" />
          <stop offset="0.75" stopColor="#e9ffb8" stopOpacity="1" />
          <stop offset="1" stopColor="#d4ff7a" stopOpacity="0.2" />
        </linearGradient>
        <filter
          id="streak-blur-wide"
          x="-20%"
          y="-20%"
          width="140%"
          height="140%"
        >
          <feGaussianBlur stdDeviation="60" />
        </filter>
        <filter id="streak-blur" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="14" />
        </filter>
      </defs>
      <g className="streak-glow">
        <path
          d="M640 -60 C 820 220, 1060 520, 1520 860"
          stroke="url(#streak-fade)"
          strokeWidth="220"
          fill="none"
          opacity="0.35"
          filter="url(#streak-blur-wide)"
        />
        <path
          d="M660 -60 C 830 220, 1070 520, 1520 860"
          stroke="url(#streak-fade)"
          strokeWidth="46"
          fill="none"
          opacity="0.7"
          filter="url(#streak-blur)"
        />
      </g>
      <path
        d="M668 -60 C 836 220, 1074 520, 1520 860"
        stroke="url(#streak-fade)"
        strokeWidth="3"
        fill="none"
      />
    </svg>
  );
}

const panelRows = [
  // x, y (top of panel), width, count, gap
  { x: 0, y: 150, w: 92, count: 7, gap: 10 },
  { x: 760, y: 158, w: 80, count: 4, gap: 8 },
];

function PanelRow({
  x,
  y,
  w,
  count,
  gap,
}: {
  x: number;
  y: number;
  w: number;
  count: number;
  gap: number;
}) {
  const h = w * 0.42;
  return (
    <g>
      {Array.from({ length: count }, (_, i) => {
        const px = x + i * (w + gap);
        return (
          <g key={i}>
            {/* Tilted panel face */}
            <path
              d={`M${px} ${y + h} L${px + w * 0.18} ${y} L${px + w} ${y} L${px + w * 0.82} ${y + h} Z`}
            />
            {/* Legs */}
            <rect x={px + w * 0.2} y={y + h} width="3" height="18" />
            <rect x={px + w * 0.72} y={y + h - 4} width="3" height="22" />
          </g>
        );
      })}
    </g>
  );
}

function Turbine({
  x,
  base,
  height,
}: {
  x: number;
  base: number;
  height: number;
}) {
  const hubY = base - height;
  const blade = height * 0.55;
  return (
    <g>
      <path
        d={`M${x - 4} ${base} L${x - 1.5} ${hubY} L${x + 1.5} ${hubY} L${x + 4} ${base} Z`}
      />
      <g
        className="turbine-blades"
        style={{
          transformOrigin: `${x}px ${hubY}px`,
          transformBox: "view-box",
        }}
      >
        {[0, 120, 240].map((angle) => (
          <path
            key={angle}
            transform={`rotate(${angle} ${x} ${hubY})`}
            d={`M${x - 2} ${hubY} Q ${x - 5} ${hubY - blade * 0.5} ${x} ${hubY - blade} Q ${x + 3} ${hubY - blade * 0.5} ${x + 2.5} ${hubY} Z`}
          />
        ))}
      </g>
      <circle cx={x} cy={hubY} r="4.5" />
    </g>
  );
}

/**
 * Black silhouette skyline of solar panels and wind turbines along the bottom
 * edge, with thin line-art panel outlines on the right.
 */
export function Skyline({ className = "" }: { className?: string }) {
  return (
    <svg
      {...decorative}
      viewBox="0 0 1440 240"
      preserveAspectRatio="xMidYMax slice"
      className={`pointer-events-none absolute inset-x-0 bottom-0 h-[clamp(140px,22vw,260px)] w-full ${className}`}
    >
      {/* Line-art panel outlines, right side */}
      <g fill="none" stroke="#f0f0f0" strokeOpacity="0.35" strokeWidth="1.2">
        {[0, 1, 2].map((row) =>
          [0, 1, 2, 3].map((col) => {
            const x = 1060 + col * 92 + row * 26;
            const y = 40 + row * 40;
            return (
              <g key={`${row}-${col}`}>
                <path
                  d={`M${x} ${y + 32} L${x + 18} ${y} L${x + 96} ${y} L${x + 78} ${y + 32} Z`}
                />
                <path d={`M${x + 9} ${y + 16} L${x + 87} ${y + 16}`} />
                <path d={`M${x + 44} ${y + 32} L${x + 57} ${y}`} />
              </g>
            );
          }),
        )}
      </g>
      <g fill="#0b0b0b">
        <Turbine x={210} base={200} height={150} />
        <Turbine x={430} base={200} height={110} />
        <Turbine x={600} base={200} height={170} />
        <Turbine x={1240} base={210} height={125} />
        {panelRows.map((row, i) => (
          <PanelRow key={i} {...row} />
        ))}
        {/* Ground line with a gentle rise */}
        <path d="M0 196 C 240 186, 480 200, 720 192 S 1200 184, 1440 196 L1440 240 L0 240 Z" />
      </g>
    </svg>
  );
}

/** Faint green circuit-board traces. */
export function CircuitLines({ className = "" }: { className?: string }) {
  const traces = [
    "M0 40 H120 L150 70 H260 L290 40 H400",
    "M0 100 H80 L110 130 H220",
    "M40 160 H180 L210 190 H330 L360 160 H400",
    "M0 220 H140 L170 250 H300",
    "M60 280 H200 L230 250 H400",
    "M160 0 V30 L190 60 V120",
    "M320 300 V230 L290 200 V110",
  ];
  const nodes = [
    [120, 40],
    [260, 70],
    [400, 40],
    [220, 130],
    [180, 160],
    [330, 190],
    [300, 250],
    [200, 280],
    [190, 120],
    [290, 110],
  ];
  return (
    <svg
      {...decorative}
      viewBox="0 0 400 300"
      fill="none"
      className={`pointer-events-none absolute ${className}`}
    >
      <g
        stroke="#7fae3c"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {traces.map((d) => (
          <path key={d} d={d} />
        ))}
      </g>
      <g fill="#7fae3c">
        {nodes.map(([cx, cy]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="3.5" />
        ))}
      </g>
    </svg>
  );
}

/** Lime topographic contour lines. */
export function TopoLines({ className = "" }: { className?: string }) {
  const rings = Array.from({ length: 11 }, (_, i) => i);
  return (
    <svg
      {...decorative}
      viewBox="0 0 600 600"
      fill="none"
      className={`pointer-events-none absolute ${className}`}
    >
      <g stroke="#d4ff7a" strokeWidth="1.1">
        {rings.map((i) => {
          const s = 1 + i * 0.32;
          return (
            <path
              key={i}
              transform={`translate(380 220) scale(${s}) rotate(${i * 4})`}
              d="M0 -38 C 26 -42, 52 -24, 50 2 C 48 30, 22 44, -6 40 C -36 36, -54 14, -48 -10 C -42 -30, -22 -36, 0 -38 Z"
              opacity={1 - i * 0.06}
              vectorEffect="non-scaling-stroke"
            />
          );
        })}
        {rings.slice(0, 6).map((i) => {
          const s = 1 + i * 0.4;
          return (
            <path
              key={`b${i}`}
              transform={`translate(110 470) scale(${s}) rotate(${-i * 6})`}
              d="M0 -24 C 20 -26, 34 -10, 30 6 C 26 22, 8 28, -10 24 C -28 20, -34 4, -28 -10 C -22 -20, -12 -23, 0 -24 Z"
              opacity={0.7 - i * 0.08}
              vectorEffect="non-scaling-stroke"
            />
          );
        })}
      </g>
    </svg>
  );
}
