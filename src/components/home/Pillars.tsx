import { pillars } from "@/content/mission";

/** Slight "tossed on the table" tilt for each card; straightens on hover. */
const tilts = ["-rotate-2", "rotate-1", "-rotate-1"];

export function Pillars() {
  return (
    <section
      aria-labelledby="mission-heading"
      className="bg-solar section-y overflow-hidden bg-background"
    >
      <div className="container-x">
        <h2 id="mission-heading" className="display-lg reveal">
          Our mission
        </h2>
        <ul className="count-list mt-16 grid gap-8 md:grid-cols-3 md:gap-6">
          {pillars.map((pillar, index) => (
            <li key={pillar.title} className="reveal">
              <div
                className={`tone-dark card-dark count-item flex h-full min-h-[22rem] flex-col border border-lime/45 p-7 shadow-[0_24px_48px_-24px_rgb(0_0_0/0.45)] transition-[rotate,translate,border-color] duration-200 hover:-translate-y-2 hover:rotate-0 hover:border-lime ${tilts[index % tilts.length]}`}
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
