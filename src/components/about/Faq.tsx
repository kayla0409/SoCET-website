import Link from "next/link";
import type { ReactNode } from "react";
import { site, socialLinks } from "@/lib/site";

const linkClass =
  "font-semibold text-accent underline underline-offset-4 hover:no-underline";

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
    <div className="mt-8 divide-y divide-border rounded-2xl border border-border bg-surface">
      {items.map((item) => (
        <details key={item.question} className="group">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-2xl px-5 py-4 text-left text-lg font-semibold marker:content-none hover:bg-surface-alt group-open:rounded-b-none focus-visible:outline-3 focus-visible:outline-offset-[-3px] [&::-webkit-details-marker]:hidden">
            {item.question}
            <svg
              aria-hidden="true"
              viewBox="0 0 20 20"
              className="size-5 shrink-0 text-accent transition-transform group-open:rotate-180"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m5 8 5 5 5-5" />
            </svg>
          </summary>
          <div className="px-5 pb-5 text-muted">{item.answer}</div>
        </details>
      ))}
    </div>
  );
}
