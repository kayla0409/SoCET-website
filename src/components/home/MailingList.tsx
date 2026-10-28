import { site, socialLinks } from "@/lib/site";

export function MailingList() {
  return (
    <section
      aria-labelledby="mailing-list-heading"
      className="bg-ucla-blue-dark py-16 text-white sm:py-20"
    >
      <div className="mx-auto flex max-w-3xl flex-col items-center px-4 text-center sm:px-6">
        <h2
          id="mailing-list-heading"
          className="text-3xl font-bold tracking-tight sm:text-4xl"
        >
          Never miss an event
        </h2>
        <p className="mt-4 max-w-xl text-lg text-white/90">
          Join the mailing list for event invites, site-tour sign-ups and club
          news. Open to every UCLA student, any major.
        </p>
        <a
          href={site.joinFormUrl}
          className="mt-8 rounded-full border-2 border-ucla-gold px-8 py-3 font-semibold text-ucla-gold transition hover:bg-ucla-gold hover:text-ucla-blue-darkest"
        >
          Join the mailing list
        </a>
        <p className="mt-8 text-sm text-white/90">
          Or find us on{" "}
          {socialLinks.map((link, index) => (
            <span key={link.href}>
              {index > 0 && (index === socialLinks.length - 1 ? " and " : ", ")}
              <a
                href={link.href}
                className="font-semibold underline underline-offset-4"
              >
                {link.label}
              </a>
            </span>
          ))}
          .
        </p>
      </div>
    </section>
  );
}
