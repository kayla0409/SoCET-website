import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

const secondaryLinks = [
  { href: "/", label: "Home" },
  { href: "/events", label: "Events" },
  { href: "/join", label: "Join" },
] as const;

export default function NotFound() {
  return (
    <section
      aria-labelledby="not-found-heading"
      className="bg-ucla-blue-darkest text-white"
    >
      <div className="mx-auto flex max-w-3xl flex-col items-center px-4 py-20 text-center sm:px-6 sm:py-28">
        <p aria-hidden="true" className="text-6xl font-bold text-ucla-gold">
          404
        </p>
        <h1
          id="not-found-heading"
          className="mt-4 text-4xl font-bold tracking-tight text-balance text-ucla-gold sm:text-5xl"
        >
          Page not found
        </h1>
        <p className="mt-6 max-w-xl text-lg text-pretty text-white">
          Sorry, we couldn&apos;t find the page you were looking for.
        </p>
        <Link
          href="/"
          data-button="primary"
          className="mt-8 rounded-full bg-ucla-gold px-8 py-3 text-base font-semibold text-ucla-blue-darkest shadow-sm transition hover:bg-white"
        >
          Back to home
        </Link>
        <nav aria-label="Other pages" className="mt-8">
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {secondaryLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="font-semibold text-white underline underline-offset-4 hover:text-ucla-gold hover:no-underline"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <p className="mt-10 text-white">
          Think this is a mistake? Email{" "}
          <a
            href={`mailto:${site.email}`}
            className="font-semibold text-ucla-gold underline underline-offset-4 hover:no-underline"
          >
            {site.email}
          </a>
          .
        </p>
      </div>
    </section>
  );
}
