import { pillars } from "@/content/mission";

/** Slight "tossed on the table" tilt for each card; straightens on hover. */
const tilts = ["-rotate-2", "rotate-1", "-rotate-1"];

/**
 * Continues the circuit traces from the bottom-left of the events section
 * above. Only two of its traces cross the boundary: a blue one 23px from the
 * left and a gold one at 342px (the events pattern is a fixed 38rem wide, so
 * these spots don't move). This picks both up at y = 0 and carries them down
 * and away from the heading, ending each in a node like the rest of the
 * pattern, instead of showing the loose cut-off pieces of the pattern.
 */
function MissionTraces() {
  const blue = "#4a90c8";
  const gold = "#e0a800";
  return (
    <svg
      aria-hidden="true"
      focusable={false}
      viewBox="0 0 560 140"
      fill="none"
      className="pointer-events-none absolute top-0 left-0 -z-10 w-[35rem] opacity-25"
    >
      <g strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path stroke={blue} d="M23.2 0 V64 L53 94 H124" />
        <path stroke={gold} d="M342.4 0 V34 L364 56 H516" />
        <path stroke={gold} d="M342.4 34 L320 56 V96" />
      </g>
      <g>
        <circle cx="124" cy="94" r="5.3" fill={blue} />
        <circle cx="516" cy="56" r="5.3" fill={gold} />
        <circle cx="320" cy="96" r="5.3" fill={gold} />
      </g>
    </svg>
  );
}

/**
 * Fills one screen below the fixed header (4.5rem), with the content centred
 * slightly above the middle (extra bottom padding) and the cards growing with
 * the screen height.
 */
export function Pillars() {
  return (
    <section
      aria-labelledby="mission-heading"
      className="bg-solar section-y flex min-h-[calc(100svh-4.5rem)] flex-col justify-center overflow-hidden bg-background pb-[clamp(6rem,12vw,10rem)]"
    >
      <MissionTraces />
      <div className="container-x w-full">
        <h2 id="mission-heading" className="display-lg reveal">
          Our mission
        </h2>
        <ul className="count-list mt-7 grid gap-8 md:grid-cols-3 md:gap-6">
          {pillars.map((pillar, index) => (
            <li key={pillar.title} className="reveal">
              <div
                className={`tone-dark card-dark count-item flex h-full min-h-[clamp(20rem,46svh,28rem)] flex-col border border-gold/45 p-7 shadow-[0_24px_48px_-24px_rgb(0_0_0/0.45)] transition-[rotate,translate,border-color] duration-200 hover:-translate-y-2 hover:rotate-0 hover:border-gold ${tilts[index % tilts.length]}`}
              >
                <div className="mt-auto pt-16">
                  <h3 className="font-display text-2xl leading-tight font-extrabold tracking-tight">
                    {pillar.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-muted">
                    {pillar.body}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
