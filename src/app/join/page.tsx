import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Join",
  description:
    "Join SoCET at UCLA in three steps. The club is open to all majors: fill out the sign-up form, join the Discord and follow us on Instagram.",
};

// Copy needs Niteesh's sign-off (PD-4). Only facts from src/lib/site.ts.
const linkClass =
  "font-semibold text-accent underline decoration-2 underline-offset-4 hover:decoration-ucla-gold";

export default function JoinPage() {
  return (
    <>
      <section
        aria-labelledby="join-heading"
        className="bg-ucla-blue-darkest py-16 text-white sm:py-20"
      >
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h1
            id="join-heading"
            className="text-4xl font-bold tracking-tight text-balance text-ucla-gold sm:text-5xl"
          >
            Join SoCET
          </h1>
          <p className="mt-6 text-lg text-pretty text-white">
            SoCET is open to all majors. If you care about clean energy and
            technology, you&apos;re welcome here.
          </p>
        </div>
      </section>

      <section
        aria-labelledby="steps-heading"
        className="bg-background py-16 sm:py-20"
      >
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2
            id="steps-heading"
            className="text-3xl font-bold tracking-tight sm:text-4xl"
          >
            How to join
          </h2>
          <ol className="mt-8 space-y-6">
            <li className="rounded-2xl border border-border border-t-4 border-t-ucla-gold bg-surface p-6 shadow-sm">
              <h3 className="text-xl font-semibold">
                <span className="text-muted">1. </span>Fill out the sign-up form
              </h3>
              <p className="mt-3 text-muted">
                This signs you up to the club and adds you to the mailing list.
              </p>
              <a
                href={site.joinFormUrl}
                className="mt-5 inline-block rounded-full bg-ucla-gold px-8 py-3 font-semibold text-ucla-blue-darkest shadow-sm transition hover:bg-ucla-blue-darkest hover:text-ucla-gold focus-visible:outline-ucla-blue-darkest dark:hover:bg-white dark:hover:text-ucla-blue-darkest"
              >
                Open the sign-up form
              </a>
            </li>
            <li className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
              <h3 className="text-xl font-semibold">
                <span className="text-muted">2. </span>Join the Discord
              </h3>
              <p className="mt-3 text-muted">
                Chat with members and hear about plans first.
              </p>
              <a
                href={site.discordUrl}
                className={`mt-5 inline-block ${linkClass}`}
              >
                Join the SoCET Discord
              </a>
            </li>
            <li className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
              <h3 className="text-xl font-semibold">
                <span className="text-muted">3. </span>Follow us and come to an
                event
              </h3>
              <p className="mt-3 text-muted">
                Follow along on Instagram, then drop in to an upcoming event.
              </p>
              <p className="mt-5 flex flex-col gap-3 sm:flex-row sm:gap-8">
                <a href={site.instagramUrl} className={linkClass}>
                  Follow SoCET on Instagram
                </a>
                <Link href="/#events" className={linkClass}>
                  See upcoming events
                </Link>
              </p>
            </li>
          </ol>
        </div>
      </section>

      <section
        aria-labelledby="next-heading"
        className="bg-surface-alt py-16 sm:py-20"
      >
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2
            id="next-heading"
            className="text-3xl font-bold tracking-tight sm:text-4xl"
          >
            What happens next
          </h2>
          <ul className="mt-6 list-disc space-y-3 pl-6 text-lg">
            <li>You&apos;ll get event invites and club news by email.</li>
            <li>Discord is where members talk day to day.</li>
          </ul>
          <p className="mt-8 text-lg">
            Questions? Email us at{" "}
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
