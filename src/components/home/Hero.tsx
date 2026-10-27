import { site } from "@/lib/site";

export function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden bg-ucla-blue-darkest text-white"
    >
      {/* Sky-to-solar-panel backdrop, a nod to the club's current site. Decorative only. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-b from-ucla-blue-darkest via-ucla-blue-dark to-ucla-blue"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-2/5 opacity-25 [background-image:linear-gradient(to_right,rgba(255,255,255,.5)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.5)_1px,transparent_1px)] [background-size:56px_32px] [mask-image:linear-gradient(to_bottom,transparent,black)]"
      />
      <div className="mx-auto flex max-w-4xl flex-col items-center px-4 py-20 text-center sm:px-6 sm:py-28">
        <p className="text-sm font-semibold uppercase tracking-widest text-white/90">
          UCLA student organization · Open to all majors
        </p>
        <h1
          id="hero-heading"
          className="mt-4 text-4xl font-bold tracking-tight text-balance text-ucla-gold sm:text-6xl"
        >
          {site.fullName}
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-pretty text-white">
          We bring students from every major into Los Angeles&apos;s clean
          technology sector through education, cross-disciplinary teamwork and
          real-world site visits.
        </p>
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
          <a
            href={site.joinFormUrl}
            className="rounded-full bg-ucla-gold px-8 py-3 text-base font-semibold text-ucla-blue-darkest shadow-sm transition hover:bg-white"
          >
            Join SoCET
          </a>
          <a
            href="#events"
            className="py-3 font-semibold text-white underline decoration-ucla-gold decoration-2 underline-offset-4 hover:decoration-white"
          >
            See upcoming events
          </a>
        </div>
      </div>
    </section>
  );
}
