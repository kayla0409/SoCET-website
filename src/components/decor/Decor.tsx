/**
 * Decorative graphics for the editorial design. All of them are inline SVG,
 * aria-hidden and pointer-events-none, so they never reach assistive tech or
 * get in the way of clicks.
 */

const decorative = {
  "aria-hidden": true,
  focusable: false,
} as const;

/** The light source: exactly the top-right corner of the hero. */
const sunAt = "100% 0%";

/** A beam: [centre angle in deg, width in deg, peak opacity]. */
type Ray = readonly [number, number, number];

/**
 * Conic-gradient stops for a set of beams centred on the top-right corner
 * (0deg points up, 180deg straight down, 270deg left). Each beam ramps up
 * and down through a soft shoulder rather than a hard wedge, so the edges
 * read as light, not stripes.
 */
function rayStops(rays: readonly Ray[], color: string) {
  const stops = ["transparent 0deg"];
  for (const [centre, width, alpha] of [...rays].sort((x, y) => x[0] - y[0])) {
    const half = width / 2;
    stops.push(
      `transparent ${centre - half}deg`,
      `rgb(${color} / ${alpha * 0.45}) ${centre - half * 0.45}deg`,
      `rgb(${color} / ${alpha}) ${centre}deg`,
      `rgb(${color} / ${alpha * 0.45}) ${centre + half * 0.45}deg`,
      `transparent ${centre + half}deg`,
    );
  }
  stops.push("transparent 360deg");
  return stops.join(", ");
}

/**
 * Broad, soft shafts of light: a few wide, faint bands with uneven gaps,
 * like light through haze. Heaviest pointing down onto the skyline.
 */
const hazeRays: readonly Ray[] = [
  [190, 16, 0.12],
  [212, 22, 0.14],
  [236, 14, 0.08],
  [254, 12, 0.05],
];

/**
 * Crisper beams on top of the haze, irregular in angle, width and strength
 * so they don't read as a fan of identical stripes. The ones pointing left,
 * toward the headline, are the thinnest and faintest.
 */
const beamRays: readonly Ray[] = [
  [184, 3, 0.16],
  [193, 6, 0.22],
  [199, 2.5, 0.12],
  [208, 8, 0.24],
  [218, 3.5, 0.15],
  [224, 5, 0.18],
  [233, 2.5, 0.1],
  [241, 4, 0.11],
  [252, 2, 0.07],
  [261, 3, 0.05],
];

/**
 * Sunlight streaming in from the top-right corner of the hero: a warm gold
 * glow in the corner, broad beams falling toward the skyline, and light
 * pooling where it reaches the ground.
 */
export function Sun({ className = "" }: { className?: string }) {
  const fade = `radial-gradient(circle at ${sunAt}, #000 0%, rgb(0 0 0 / 0.7) 45%, transparent 95%)`;
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {/* Warm light pooling on the horizon, behind the skyline */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_65%_32%_at_72%_100%,rgb(255_196_70/0.38),rgb(255_196_70/0.12)_55%,transparent_80%)]" />
      {/* Broad haze shafts, very soft, on a slower breath than the beams */}
      <div
        className="sun-glow absolute inset-0 blur-[28px]"
        style={{
          backgroundImage: `conic-gradient(from 0deg at ${sunAt}, ${rayStops(hazeRays, "255 205 70")})`,
          maskImage: fade,
          WebkitMaskImage: fade,
          animationDuration: "9s",
          animationDelay: "-2s",
        }}
      />
      {/* Beams */}
      <div
        className="sun-glow absolute inset-0 blur-[7px]"
        style={{
          backgroundImage: `conic-gradient(from 0deg at ${sunAt}, ${rayStops(beamRays, "255 200 40")})`,
          maskImage: fade,
          WebkitMaskImage: fade,
        }}
      />
      {/* Corner glow */}
      <div
        className="sun-glow absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle at ${sunAt}, rgb(255 198 45 / 0.42) 0, rgb(255 198 45 / 0.16) clamp(180px, 22vw, 360px), transparent clamp(380px, 48vw, 760px))`,
        }}
      />
      {/* Bright core right at the corner, where the sun is strongest */}
      <div
        className="sun-glow absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle at ${sunAt}, rgb(255 236 150 / 0.85) 0, rgb(255 214 70 / 0.5) clamp(40px, 5vw, 80px), rgb(255 198 45 / 0.15) clamp(140px, 16vw, 260px), transparent clamp(240px, 28vw, 440px))`,
        }}
      />
    </div>
  );
}

/**
 * Single solar panels scattered across the skyline in different sizes:
 * [left x, width]. Larger panels sit a little lower, as if closer to the
 * viewer; every panel's bottom edge stays above the ground line (y ~186).
 */
const scatteredPanels = [
  [150, 70],
  [228, 96],
  [340, 60],
  [470, 84],
  [560, 58],
  [650, 100],
  [770, 66],
  [850, 88],
  [960, 72],
  [1045, 104],
  [1160, 62],
  [1240, 90],
] as const;

const panelRows = scatteredPanels.map(([x, w]) => {
  const bottom = 166 + w * 0.14;
  return { x, y: bottom - w * 0.42, w, count: 1, gap: 0 };
});

/** Panel legs run down to this y, below the ground line, so they always meet it. */
const legBottom = 205;

type PanelRowProps = {
  x: number;
  y: number;
  w: number;
  count: number;
  gap: number;
};

/** Left edge x of each panel in a row. */
function panelXs({ x, w, count, gap }: PanelRowProps) {
  return Array.from({ length: count }, (_, i) => x + i * (w + gap));
}

function PanelRow(row: PanelRowProps) {
  const { y, w } = row;
  const h = w * 0.42;
  return (
    <g>
      {panelXs(row).map((px) => (
        <g key={px}>
          {/* Tilted panel face */}
          <path
            d={`M${px} ${y + h} L${px + w * 0.18} ${y} L${px + w} ${y} L${px + w * 0.82} ${y + h} Z`}
          />
          {/* Legs */}
          <rect
            x={px + w * 0.2}
            y={y + h}
            width="3"
            height={legBottom - (y + h)}
          />
          <rect
            x={px + w * 0.72}
            y={y + h - 4}
            width="3"
            height={legBottom - (y + h - 4)}
          />
        </g>
      ))}
    </g>
  );
}

/** Thin white outline on each panel face, split into four cells. */
function PanelOutlines(row: PanelRowProps) {
  const { y, w } = row;
  const h = w * 0.42;
  return (
    <g>
      {panelXs(row).map((px) => (
        <g key={px}>
          <path
            d={`M${px} ${y + h} L${px + w * 0.18} ${y} L${px + w} ${y} L${px + w * 0.82} ${y + h} Z`}
          />
          {/* Horizontal divider through the middle */}
          <path
            d={`M${px + w * 0.09} ${y + h / 2} L${px + w * 0.91} ${y + h / 2}`}
          />
          {/* Divider from the middle of the bottom edge to the middle of the top */}
          <path d={`M${px + w * 0.41} ${y + h} L${px + w * 0.59} ${y}`} />
        </g>
      ))}
    </g>
  );
}

function Turbine({
  x,
  base,
  height,
  seconds = 9,
}: {
  x: number;
  base: number;
  height: number;
  /** Time for one full turn, so the turbines don't spin in lockstep. */
  seconds?: number;
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
          animationDuration: `${seconds}s`,
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

const turbines = [
  { x: 210, base: 200, height: 150 },
  { x: 430, base: 200, height: 110, seconds: 11 },
  { x: 600, base: 200, height: 170, seconds: 8 },
  { x: 910, base: 200, height: 140, seconds: 10 },
  { x: 1180, base: 205, height: 125, seconds: 9.5 },
];

const groundPath =
  "M0 196 C 240 186, 480 200, 720 192 S 1200 184, 1440 196 L1440 240 L0 240 Z";

type Shift = { dx?: number; dy?: number };

/** Solar panels shifted by (dx, dy), optionally with their white outlines. */
function PanelShapes({
  dx = 0,
  dy = 0,
  outlines = false,
}: Shift & { outlines?: boolean }) {
  const rows = panelRows.map((row) => ({
    ...row,
    x: row.x + dx,
    y: row.y + dy,
  }));
  return (
    <>
      {rows.map((row, i) => (
        <PanelRow key={i} {...row} />
      ))}
      {outlines && (
        <g
          fill="none"
          stroke="#f5f3ee"
          strokeOpacity="0.4"
          strokeWidth="1.2"
          strokeLinejoin="round"
        >
          {rows.map((row, i) => (
            <PanelOutlines key={i} {...row} />
          ))}
        </g>
      )}
    </>
  );
}

function TurbineShapes({ dx = 0, dy = 0 }: Shift) {
  return (
    <>
      {turbines.map((t) => (
        <Turbine key={t.x} {...t} x={t.x + dx} base={t.base + dy} />
      ))}
    </>
  );
}

function GroundShape({ dx = 0, dy = 0 }: Shift) {
  return <path d={groundPath} transform={`translate(${dx} ${dy})`} />;
}

/** How far each dark silhouette sits down-left of the gold copy behind it. */
const rim = { dx: -2, dy: 2 };

/** Panels are a touch lighter than the turbines, so a tower in front reads as in front. */
const panelFill = "#11243a";
const silhouetteFill = "#07121f";

/**
 * Silhouette skyline of solar panels and wind turbines along the bottom
 * edge, lit from the sun in the upper right. Each layer (panels, then
 * turbines, then ground) is drawn as a gold copy with a dark copy nudged
 * down-left on top, so a thin sunlit edge shows on the sides facing the sun.
 * Because the turbines get their own pass after the panels, their sunlit
 * edge also shows where a tower or blade crosses in front of a panel.
 */
export function Skyline({ className = "" }: { className?: string }) {
  return (
    <svg
      {...decorative}
      viewBox="0 0 1440 240"
      preserveAspectRatio="xMidYMax slice"
      // The tallest turbines' blades sweep above the top of the viewBox as they
      // turn; let them draw outside it instead of being clipped flat.
      overflow="visible"
      className={`pointer-events-none absolute inset-x-0 bottom-0 h-[clamp(140px,22vw,260px)] w-full overflow-visible ${className}`}
    >
      <defs>
        {/* Brightest on the side nearest the sun, fading toward the left. */}
        <linearGradient
          id="sunlit"
          gradientUnits="userSpaceOnUse"
          x1="1440"
          y1="0"
          x2="0"
          y2="240"
        >
          <stop offset="0" stopColor="#ffe680" />
          <stop offset="0.45" stopColor="#ffd100" stopOpacity="0.85" />
          <stop offset="1" stopColor="#ffd100" stopOpacity="0.2" />
        </linearGradient>
      </defs>
      {/* Back: solar panels */}
      <g fill="url(#sunlit)">
        <PanelShapes />
      </g>
      <g fill={panelFill}>
        <PanelShapes {...rim} outlines />
      </g>
      {/* Middle: turbines, in front of the panels */}
      <g fill="url(#sunlit)">
        <TurbineShapes />
      </g>
      <g fill={silhouetteFill}>
        <TurbineShapes {...rim} />
      </g>
      {/* Front: the ground, covering the leg and tower bases */}
      <g fill="url(#sunlit)">
        <GroundShape />
      </g>
      <g fill={silhouetteFill}>
        <GroundShape {...rim} />
      </g>
    </svg>
  );
}

/** Faint circuit-board traces, mostly blue with a few gold ones mixed in. */
export function CircuitLines({ className = "" }: { className?: string }) {
  // Split by total line length, not just count, so the colors read as about
  // 60% blue and 40% gold: the long top trace is gold, short stubs are blue.
  const traces = [
    "M0 100 H80 L110 130 H220",
    "M40 160 H180 L210 190 H330 L360 160 H400",
    "M0 220 H140 L170 250 H300",
    "M60 280 H200 L230 250 H400",
    "M160 0 V30 L190 60 V120",
    "M320 300 V230 L290 200 V110",
    "M60 0 V10 L80 25 H130",
  ];
  const nodes = [
    [220, 130],
    [180, 160],
    [330, 190],
    [300, 250],
    [200, 280],
    [190, 120],
    [290, 110],
    [130, 25],
  ];
  const goldTraces = [
    "M0 40 H120 L150 70 H260 L290 40 H400",
    "M400 200 H370 L345 225 V270",
    "M340 0 V20 L370 50 V140",
    "M0 130 H50 L80 160 V205",
    "M240 130 H320 L350 100 H400",
    "M190 300 V265 L220 235 H260",
  ];
  const goldNodes = [
    [120, 40],
    [260, 70],
    [345, 270],
    [370, 140],
    [80, 205],
    [240, 130],
  ];
  return (
    <svg
      {...decorative}
      viewBox="0 0 400 300"
      fill="none"
      className={`pointer-events-none absolute ${className}`}
    >
      <g
        stroke="#4a90c8"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {traces.map((d) => (
          <path key={d} d={d} />
        ))}
      </g>
      <g fill="#4a90c8">
        {nodes.map(([cx, cy]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="3.5" />
        ))}
      </g>
      {/*
        A deeper gold than the palette #ffd100, so it still shows at the low
        opacities these traces are used at on the light paper background.
      */}
      <g
        stroke="#e0a800"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {goldTraces.map((d) => (
          <path key={d} d={d} />
        ))}
      </g>
      <g fill="#e0a800">
        {goldNodes.map(([cx, cy]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="3.5" />
        ))}
      </g>
    </svg>
  );
}

/** Gold topographic contour lines. */
export function TopoLines({ className = "" }: { className?: string }) {
  const rings = Array.from({ length: 11 }, (_, i) => i);
  return (
    <svg
      {...decorative}
      viewBox="0 0 600 600"
      fill="none"
      className={`pointer-events-none absolute ${className}`}
    >
      <g stroke="#ffd100" strokeWidth="1.1">
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
