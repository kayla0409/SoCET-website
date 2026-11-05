import Link from "next/link";
import { navLinks, site } from "@/lib/site";
import { HeaderShell } from "./HeaderShell";

// Minimal shell for the home page. TS-5 replaces this with the full header and mobile nav.
export function SiteHeader() {
  return (
    <HeaderShell>
      <div className="container-x flex flex-wrap items-center justify-between gap-x-8 gap-y-1 py-4 sm:py-5">
        <Link
          href="/"
          className="font-display text-base font-extrabold tracking-tight"
        >
          {site.name}
        </Link>
        <nav aria-label="Main">
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-1 text-xs font-semibold uppercase tracking-[0.06em] sm:gap-x-7">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={
                    link.href === "/join"
                      ? "btn-outline px-4 py-2 hover:bg-current/10"
                      : "inline-block py-2 underline-offset-[6px] hover:underline"
                  }
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </HeaderShell>
  );
}
