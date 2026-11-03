// Condensed from the club's current site. Needs Niteesh's copy sign-off (decision log #2).
const pillars = [
  {
    title: "Build the cleantech workforce",
    body: "Learn the sectors, the capital stack, policy and startups through journal clubs, guest lectures, employer info sessions and research projects.",
  },
  {
    title: "Solve problems across disciplines",
    body: "Members come from all 13 UCLA colleges and more than 20 majors, because climate problems need more than one kind of expertise.",
  },
  {
    title: "See climate solutions in action",
    body: "Tour UCLA's trigeneration plant and campus tunnels, visit LA startup incubators, and meet the people deploying clean energy locally.",
  },
] as const;

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
