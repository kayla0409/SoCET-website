import Link from "next/link";
import type { ReactNode } from "react";
import { site, socialLinks } from "@/lib/site";

const linkClass = "link-u";

const discord = socialLinks[0];
const instagram = socialLinks[1];

const items: { question: string; answer: ReactNode }[] = [
  {
    question: "Do I need to be an engineering major?",
    answer: (
      <p>
        No. SoCET is open to all majors. Our members come from all 13 UCLA
        colleges and more than 20 majors.
      </p>
    ),
  },
  {
    question: "How do I join?",
    answer: (
      <p>
        Head to the{" "}
        <Link href="/join" className={linkClass}>
          Join page
        </Link>{" "}
        to sign up for the club and the mailing list.
      </p>
    ),
  },
  {
    question: "How do I hear about events?",
    answer: (
      <p>
        Join the mailing list for event invites and site-tour sign-ups, and
        follow us on{" "}
        <a href={discord.href} className={linkClass}>
          {discord.label}
        </a>{" "}
        and{" "}
        <a href={instagram.href} className={linkClass}>
          {instagram.label}
        </a>
        .
      </p>
    ),
  },
  {
    question: "How do I contact the officers?",
    answer: (
      <p>
        Email us at{" "}
        <a href={`mailto:${site.email}`} className={linkClass}>
          {site.email}
        </a>
        .
      </p>
    ),
  },
];

/** Native <details>/<summary>: keyboard operable and no JavaScript needed. */
export function Faq() {
  return (
    <div className="mt-14 divide-y divide-border border-y border-border">
      {items.map((item) => (
        <details key={item.question} className="group">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-left font-display text-xl font-bold tracking-tight transition-colors duration-200 marker:content-none hover:text-muted focus-visible:outline-3 focus-visible:outline-offset-2 sm:text-2xl [&::-webkit-details-marker]:hidden">
            {item.question}
            <svg
              aria-hidden="true"
              viewBox="0 0 20 20"
              className="size-9 shrink-0 rounded-full border border-current p-2 text-foreground transition-transform duration-200 group-open:rotate-180 group-open:bg-lime group-open:border-lime group-open:text-ink"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m5 8 5 5 5-5" />
            </svg>
          </summary>
          <div className="max-w-2xl pb-7 text-lg leading-relaxed text-muted">
            {item.answer}
          </div>
        </details>
      ))}
    </div>
  );
}
