import { site, socialLinks } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="bg-ucla-blue-darkest text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-start sm:justify-between sm:px-6">
        <div>
          <p className="font-bold">{site.name}</p>
          <p className="mt-1 max-w-sm text-sm text-white/80">{site.fullName}</p>
        </div>
        <div className="flex flex-col gap-2 text-sm">
          <p className="font-semibold text-ucla-gold">Stay in touch</p>
          <ul className="flex flex-wrap gap-x-5 gap-y-1">
            {socialLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="inline-block py-1 underline-offset-4 hover:underline"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={`mailto:${site.email}`}
                className="inline-block py-1 underline-offset-4 hover:underline"
              >
                {site.email}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
