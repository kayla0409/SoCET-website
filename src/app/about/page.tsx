import type { Metadata } from "next";
import Link from "next/link";
import { Faq } from "@/components/about/Faq";
import { pillars } from "@/content/mission";
import { site } from "@/lib/site";

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

const linkClass =
  "font-semibold text-accent underline underline-offset-4 hover:no-underline";

export default function AboutPage() {
  return (
    <>
      <section
        aria-labelledby="about-heading"
        className="bg-ucla-blue-darkest text-white"
      >
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 sm:py-24">
          <h1
            id="about-heading"
            className="text-4xl font-bold tracking-tight text-balance text-ucla-gold sm:text-5xl"
          >
            About SoCET
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-pretty text-white">
            {site.description}
          </p>
        </div>
      </section>

      <section
        aria-labelledby="mission-heading"
        className="bg-background py-16 sm:py-20"
      >
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2
            id="mission-heading"
            className="text-3xl font-bold tracking-tight sm:text-4xl"
          >
            Our mission
          </h2>
          <ol className="mt-8 space-y-8">
            {pillars.map((pillar, index) => (
              <li key={pillar.title} className="flex gap-5">
                <span
                  aria-hidden="true"
                  className="flex size-10 shrink-0 items-center justify-center rounded-full bg-ucla-gold text-lg font-bold text-ucla-blue-darkest"
                >
                  {index + 1}
                </span>
                <div>
                  <h3 className="text-xl font-semibold">{pillar.title}</h3>
                  <p className="mt-2 text-muted">{pillar.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section
        aria-labelledby="what-we-do-heading"
        className="bg-surface-alt py-16 sm:py-20"
      >
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2
            id="what-we-do-heading"
            className="text-3xl font-bold tracking-tight sm:text-4xl"
          >
            What we do
          </h2>
          <div className="mt-6 space-y-4 text-lg text-muted">
            <p>
              We take students out to see clean energy at work, with site visits
              and tours, and we bring them together across majors to work on
              climate problems as a team.
            </p>
            <p>Here is some of what we have done so far:</p>
          </div>
          <ul className="mt-4 list-disc space-y-2 pl-6 text-lg marker:text-accent">
            {pastWork.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section
        aria-labelledby="faq-heading"
        className="bg-background py-16 sm:py-20"
      >
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2
            id="faq-heading"
            className="text-3xl font-bold tracking-tight sm:text-4xl"
          >
            Frequently asked questions
          </h2>
          <Faq />
        </div>
      </section>

      <section
        aria-labelledby="get-involved-heading"
        className="bg-surface-alt py-16 sm:py-20"
      >
        <div className="mx-auto flex max-w-3xl flex-col items-center px-4 text-center sm:px-6">
          <h2
            id="get-involved-heading"
            className="text-3xl font-bold tracking-tight sm:text-4xl"
          >
            Ready to get involved?
          </h2>
          <p className="mt-4 max-w-xl text-lg text-muted">
            SoCET is open to every UCLA student, any major.
          </p>
          <Link
            href="/join"
            data-button="primary"
            className="mt-8 rounded-full bg-ucla-gold px-8 py-3 text-base font-semibold text-ucla-blue-darkest shadow-sm transition hover:bg-ucla-blue-darkest hover:text-white"
          >
            Join SoCET
          </Link>
          <p className="mt-6 text-muted">
            Questions? Email{" "}
            <a href={`mailto:${site.email}`} className={linkClass}>
              {site.email}
            </a>
            .
          </p>
        </div>
      </section>
    </>
  );
}
