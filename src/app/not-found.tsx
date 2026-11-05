import type { Metadata } from "next";
import Link from "next/link";
import { CircuitLines } from "@/components/decor/Decor";
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
      data-tone="dark"
      className="tone-dark relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-ink"
    >
      <CircuitLines className="right-[-4rem] bottom-10 -z-10 w-[min(36rem,85vw)] opacity-40" />
      <div className="container-x flex flex-1 flex-col items-start justify-center pt-36 pb-24">
        <p
          aria-hidden="true"
          className="display-xl rise text-[clamp(7rem,26vw,20rem)] leading-[0.8] text-lime"
        >
          404
        </p>
        <h1
          id="not-found-heading"
          className="display-lg rise mt-4 text-balance text-paper [--rise-delay:80ms]"
        >
          Page not found
        </h1>
        <p className="lede rise mt-8 text-pretty text-[#dcdcdc] [--rise-delay:160ms]">
          Sorry, we couldn&apos;t find the page you were looking for.
        </p>
        <Link
          href="/"
          data-button="primary"
          className="btn-lime mt-10 hover:-translate-y-0.5 hover:border-paper hover:bg-paper"
        >
          Back to home
        </Link>
        <nav aria-label="Other pages" className="mt-8">
          <ul className="flex flex-wrap gap-x-8 gap-y-2">
            {secondaryLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="eyebrow inline-block py-1 text-paper underline underline-offset-4 hover:text-lime"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <p className="mt-10 text-[#dcdcdc]">
          Think this is a mistake? Email{" "}
          <a href={`mailto:${site.email}`} className="link-u break-all">
            {site.email}
          </a>
          .
        </p>
      </div>
    </section>
  );
}
