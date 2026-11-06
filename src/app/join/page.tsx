import type { Metadata } from "next";
import Link from "next/link";
import { TopoLines } from "@/components/decor/Decor";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Join",
  description:
    "Join SoCET at UCLA in three steps. The club is open to all majors: fill out the sign-up form, join the Discord and follow us on Instagram.",
};

// Copy needs Niteesh's sign-off (PD-4). Only facts from src/lib/site.ts.
const linkClass = "link-u";

const darkCard =
  "tone-dark card-dark relative flex flex-col border border-blue p-7 transition duration-200 hover:-translate-y-1.5 hover:border-gold sm:p-8";

function CardArrow({ className = "text-gold" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className={`absolute top-7 right-7 size-6 ${className}`}
    >
      <path d="M4 12h15M13 6l6 6-6 6" />
    </svg>
  );
}

export default function JoinPage() {
  return (
    <>
      {/* Join opens on solid gold: the site's call-to-action color, full bleed. */}
      <section aria-labelledby="join-heading" className="bg-gold text-ink">
        <div className="container-x pt-32 pb-12 sm:pt-36 sm:pb-16">
          <h1
            id="join-heading"
            className="display-xl rise text-[clamp(3rem,9vw,6.5rem)]"
          >
            Join{" "}
            <span className="bg-ink px-[0.08em] text-gold box-decoration-clone">
              SoCET
            </span>
          </h1>
          <p className="lede rise mt-7 text-xl font-medium text-ink [--rise-delay:120ms]">
            SoCET is open to all majors. If you care about clean energy and
            technology, you&apos;re welcome here.
          </p>
        </div>
      </section>

      <section
        aria-labelledby="steps-heading"
        data-tone="dark"
        className="tone-dark section-y relative isolate overflow-hidden bg-ink"
      >
        <TopoLines className="top-[-8rem] right-[-10rem] -z-10 w-[min(48rem,110vw)] opacity-70" />
        <div className="container-x">
          <h2 id="steps-heading" className="display-lg reveal">
            How to join
          </h2>
          <ol className="mt-9 grid gap-5 lg:grid-cols-3">
            <li className={`reveal ${darkCard}`}>
              <CardArrow />
              <h3 className="pr-10 font-display text-2xl leading-tight font-extrabold tracking-tight">
                <span className="eyebrow mb-4 block font-display text-gold">
                  1.{" "}
                </span>
                Fill out the sign-up form
              </h3>
              <p className="mt-3 mb-8 text-muted">
                This signs you up to the club and adds you to the mailing list.
              </p>
              <a
                href={site.joinFormUrl}
                className="btn-gold mt-auto self-start hover:border-paper hover:bg-paper"
              >
                Open the sign-up form
              </a>
            </li>
            <li className={`reveal ${darkCard}`}>
              <CardArrow />
              <h3 className="pr-10 font-display text-2xl leading-tight font-extrabold tracking-tight">
                <span className="eyebrow mb-4 block font-display text-gold">
                  2.{" "}
                </span>
                Join the Discord
              </h3>
              <p className="mt-3 text-muted">Chat with other members.</p>
              <a
                href={site.discordUrl}
                className={`mt-8 inline-block self-start ${linkClass}`}
              >
                Join the SoCET Discord
              </a>
            </li>
            <li className="reveal relative flex flex-col rounded-lg border border-gold bg-gold p-7 text-ink transition duration-200 hover:-translate-y-1.5 hover:shadow-[0_18px_40px_-18px_rgb(255_209_0/0.6)] sm:p-8">
              <CardArrow className="text-ink" />
              <h3 className="pr-10 font-display text-2xl leading-tight font-extrabold tracking-tight">
                <span className="eyebrow mb-4 block font-display text-blue-deep">
                  3.{" "}
                </span>
                Follow us and come to an event
              </h3>
              <p className="mt-3 text-ink/80">
                Follow along on Instagram, then come to an upcoming event.
              </p>
              <p className="mt-8 flex flex-col gap-3 [&_a]:text-ink [&_a]:decoration-ink">
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
        className="section-y bg-background"
      >
        <div className="container-x">
          <h2 id="next-heading" className="display-lg reveal">
            What happens next
          </h2>
          <ul className="mt-8 border-t border-border">
            <li className="reveal border-b border-border py-6 font-display text-xl font-bold tracking-tight sm:text-2xl">
              You&apos;ll get event invites and club news by email.
            </li>
            <li className="reveal border-b border-border py-6 font-display text-xl font-bold tracking-tight sm:text-2xl">
              Discord is where members chat.
            </li>
          </ul>
          <p className="mt-7 text-lg text-muted">
            Questions? Email us at{" "}
            <a
              href={`mailto:${site.email}`}
              className={`break-all ${linkClass}`}
            >
              {site.email}
            </a>
            .
          </p>
        </div>
      </section>
    </>
  );
}
