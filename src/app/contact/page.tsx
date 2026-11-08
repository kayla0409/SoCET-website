import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { site, socialLinks } from "@/lib/site";
import { sendContactMessage } from "@/server/contact";
import { PageHeader } from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact SoCET at UCLA. Send the officers a message about events, membership or partnerships, and we'll reply by email.",
};

// Copy needs Niteesh's sign-off (PD-6).
export default function ContactPage() {
  return (
    <>
      <PageHeader
        id="contact-heading"
        title={
          <>
            Get in <span className="text-gold">touch</span>
          </>
        }
        lede={
          <>
            Questions about events, membership or working with us? Send the
            officers a message and we&apos;ll reply by email.
          </>
        }
      />

      <section
        aria-labelledby="message-heading"
        className="section-y bg-background"
      >
        <div className="container-x grid gap-14 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
          <div>
            <p className="eyebrow text-muted">02 — Send a message</p>
            <h2
              id="message-heading"
              className="display-md reveal mt-4 max-w-[12ch]"
            >
              Write to the officers
            </h2>
            <p className="mt-6 max-w-sm leading-relaxed text-muted">
              Every field is required. We use your email only to reply to you.
            </p>

            <h3 className="eyebrow mt-9 text-muted">Other ways to reach us</h3>
            <ul className="mt-4 flex flex-col gap-3">
              <li>
                <a href={`mailto:${site.email}`} className="link-u break-all">
                  {site.email}
                </a>
              </li>
              {socialLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="link-u">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="tone-dark card-dark reveal p-6 sm:p-10">
            <ContactForm action={sendContactMessage} />
          </div>
        </div>
      </section>
    </>
  );
}
