import Link from "next/link";
import { LightStreak, Skyline } from "@/components/decor/Decor";
import { site } from "@/lib/site";

/** Splits "… at UCLA" so the last line can be set in gold. Text is unchanged. */
function splitTail(name: string): [string, string] {
  const at = name.lastIndexOf(" at ");
  return at === -1 ? [name, ""] : [name.slice(0, at), name.slice(at + 1)];
}

export function Hero() {
  const [lead, tail] = splitTail(site.fullName);
  return (
    <section
      aria-labelledby="hero-heading"
      data-tone="dark"
      className="tone-dark bg-concrete relative isolate flex min-h-[100svh] flex-col overflow-hidden"
    >
      <LightStreak className="-z-10 max-sm:opacity-45" />
      {/* Soft scrim behind the copy so it reads over the lighter top of the gradient. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(100deg,rgb(11_27_46/0.55)_0%,rgb(11_27_46/0.2)_45%,transparent_70%)]"
      />
      <Skyline className="-z-10" />

      <div className="container-x flex flex-1 flex-col justify-end pt-32 pb-[clamp(140px,18vw,220px)]">
        <p className="rise flex flex-wrap gap-2">
          <span className="tag bg-ink/45 text-gold backdrop-blur-sm">
            UCLA student organization
          </span>
          <span className="sr-only"> · </span>
          <span className="tag bg-ink/45 text-paper backdrop-blur-sm">
            Open to all majors
          </span>
        </p>
        <h1
          id="hero-heading"
          className="display-xl rise mt-7 text-paper [--rise-delay:80ms] sm:max-w-[15ch]"
        >
          {lead}
          {tail && (
            <>
              {" "}
              <span className="block text-gold">{tail}</span>
            </>
          )}
        </h1>
        <div className="rise mt-7 flex flex-col gap-10 [--rise-delay:180ms] md:flex-row md:items-end md:justify-between">
          <p className="lede text-[#dcdcdc]">
            We bring students from every major into Los Angeles&apos;s clean
            technology sector through education, cross-disciplinary teamwork and
            real-world site visits.
          </p>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-5">
            <Link
              href="/join"
              className="btn-outline text-paper hover:border-gold hover:bg-gold hover:text-ink"
            >
              Join SoCET
              <ArrowRight />
            </Link>
            <a
              href="#events"
              className="eyebrow inline-flex items-center gap-2 py-3 text-paper underline-offset-4 hover:text-gold"
            >
              See upcoming events
              <ArrowDown />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function ArrowRight() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className="size-3.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M2 8h11M9 4l4 4-4 4" />
    </svg>
  );
}

function ArrowDown() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className="size-3.5 motion-safe:animate-bounce"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M8 2v11M4 9l4 4 4-4" />
    </svg>
  );
}
