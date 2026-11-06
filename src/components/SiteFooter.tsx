import Link from "next/link";
import { site, socialLinks } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="bg-background text-foreground">
      <div className="container-x pt-20 pb-12">
        <div className="grid gap-12 border-b border-border pb-14 md:grid-cols-4 md:gap-8">
          <div className="md:col-span-2">
            <p className="font-display text-2xl font-extrabold tracking-tight">
              {site.name}
            </p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">
              {site.fullName}
            </p>
          </div>
          <div className="flex flex-col gap-4 md:col-start-4">
            <p className="eyebrow text-muted">Stay in touch</p>
            <ul className="flex flex-col gap-2 text-sm font-medium">
              <li>
                <Link
                  href="/contact"
                  className="inline-block py-1 underline-offset-4 transition-colors duration-200 hover:underline"
                >
                  Contact
                </Link>
              </li>
              {socialLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="inline-block py-1 underline-offset-4 transition-colors duration-200 hover:underline"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="inline-block py-1 break-all underline-offset-4 transition-colors duration-200 hover:underline"
                >
                  {site.email}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
