import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { CircuitLines } from "@/components/decor/Decor";
import { site, socialLinks } from "@/lib/site";
import { sendContactMessage } from "@/server/contact";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact SoCET at UCLA. Send the officers a message about events, membership or partnerships, and we'll reply by email.",
};

// Copy needs Niteesh's sign-off (PD-6).
export default function ContactPage() {
  return (
    <>
      {/* Contact opens near-black with a short, direct headline. */}
      <section
        aria-labelledby="contact-heading"
        data-tone="dark"
        className="tone-dark relative isolate overflow-hidden bg-ink"
      >
        <CircuitLines className="top-24 right-[-5rem] -z-10 w-[min(30rem,80vw)] opacity-30" />
        <div className="container-x pt-40 pb-20 sm:pt-52 sm:pb-24">
          <p className="eyebrow rise text-lime">01 — Contact</p>
          <h1
            id="contact-heading"
            className="display-xl rise mt-6 text-paper [--rise-delay:80ms]"
          >
            Get in <span className="text-lime">touch</span>
          </h1>
          <p className="lede rise mt-8 text-muted [--rise-delay:160ms]">
            Questions about events, membership or working with us? Send the
            officers a message and we&apos;ll reply by email.
          </p>
        </div>
      </section>

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

            <h3 className="eyebrow mt-14 text-muted">Other ways to reach us</h3>
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
