import { pillars } from "@/content/mission";

export function Pillars() {
  return (
    <section
      aria-labelledby="mission-heading"
      className="bg-background py-16 sm:py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2
          id="mission-heading"
          className="text-center text-3xl font-bold tracking-tight sm:text-4xl"
        >
          Our mission
        </h2>
        <ul className="mt-10 grid gap-6 md:grid-cols-3">
          {pillars.map((pillar) => (
            <li
              key={pillar.title}
              className="rounded-2xl border border-border border-t-4 border-t-ucla-gold bg-surface p-6 shadow-sm"
            >
              <h3 className="text-xl font-semibold">{pillar.title}</h3>
              <p className="mt-3 text-muted">{pillar.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
