import type { Metadata } from "next";
import Link from "next/link";
import { Faq } from "@/components/about/Faq";
import { TopoLines } from "@/components/decor/Decor";
import { pillars } from "@/content/mission";
import { site } from "@/lib/site";
import { PageHeader } from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "About",
  description:
    "What SoCET at UCLA is about: our mission, what we do, and answers to common questions. Open to all majors.",
};

const pastWork = [
  "Tours of UCLA's trigeneration plant",
  "Volunteering at UCLA Anderson's 2026 Energy Innovation Conference",
  "An EV Charging Infrastructure Survey of campus chargers",
];

/** Slight "tossed on the table" tilt for each card; straightens on hover. */
const tilts = ["-rotate-2", "rotate-1", "-rotate-1"];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        id="about-heading"
        title={
          <>
            About <span className="text-gold">SoCET</span>
          </>
        }
        lede={site.description}
      />

      <section
        aria-labelledby="mission-heading"
        className="section-y border-t border-border bg-background"
      >
        <div className="container-x">
          <h2 id="mission-heading" className="display-lg reveal">
            Our mission
          </h2>
          <ol className="mt-9 border-t border-border">
            {pillars.map((pillar, index) => (
              <li
                key={pillar.title}
                className="reveal grid gap-4 border-b border-border py-10 sm:grid-cols-[minmax(7rem,12rem)_1fr] sm:gap-10 sm:py-12"
              >
                <span
                  aria-hidden="true"
                  className="font-display text-[clamp(2.25rem,5vw,3.5rem)] leading-[0.85] font-black tracking-[-0.05em] text-ink"
                >
                  {index + 1}
                </span>
                <div className="max-w-xl sm:pt-2">
                  <h3 className="font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
                    {pillar.title}
                  </h3>
                  <p className="mt-3 text-lg leading-relaxed text-muted">
                    {pillar.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section
        aria-labelledby="what-we-do-heading"
        className="bg-solar section-y overflow-hidden bg-surface-alt"
      >
        <div className="container-x">
          <h2 id="what-we-do-heading" className="display-lg reveal">
            What we do
          </h2>
          <div className="lede reveal mt-8 space-y-4 text-muted">
            <p>
              We take students out to see clean energy at work, with site visits
              and tours, and we bring them together across majors to work on
              climate problems as a team.
            </p>
            <p>Here is some of what we have done so far:</p>
          </div>
          <ul className="count-list mt-9 grid gap-8 md:grid-cols-3 md:gap-6">
            {pastWork.map((item, index) => (
              <li key={item} className="reveal">
                <div
                  className={`tone-dark card-dark count-item flex h-full min-h-[12rem] flex-col border border-gold/45 p-7 shadow-[0_24px_48px_-24px_rgb(0_0_0/0.45)] transition-[rotate,translate,border-color] duration-200 hover:-translate-y-2 hover:rotate-0 hover:border-gold ${tilts[index % tilts.length]}`}
                >
                  <p className="mt-auto pt-12 font-display text-xl leading-snug font-bold tracking-tight">
                    {item}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        aria-labelledby="faq-heading"
        className="section-y bg-background"
      >
        <div className="container-x">
          <h2 id="faq-heading" className="display-lg reveal max-w-[14ch]">
            Frequently asked questions
          </h2>
          <Faq />
        </div>
      </section>

      <section
        aria-labelledby="get-involved-heading"
        data-tone="dark"
        className="tone-dark section-y relative isolate overflow-hidden bg-ink"
      >
        <TopoLines className="top-[-8rem] right-[-10rem] -z-10 w-[min(48rem,110vw)] opacity-70" />
        <div className="container-x flex flex-col items-start">
          <h2 id="get-involved-heading" className="display-lg reveal">
            Ready to <span className="block text-gold">get involved?</span>
          </h2>
          <p className="lede reveal mt-8 text-muted">
            SoCET is open to every UCLA student, any major.
          </p>
          <Link
            href="/join"
            data-button="primary"
            className="btn-gold mt-7 hover:-translate-y-0.5 hover:border-paper hover:bg-paper"
          >
            Join SoCET
          </Link>
          <p className="mt-8 text-muted">
            Questions? Email{" "}
            <a href={`mailto:${site.email}`} className="link-u break-all">
              {site.email}
            </a>
            .
          </p>
        </div>
      </section>
    </>
  );
}
