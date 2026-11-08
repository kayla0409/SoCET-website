import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { sendContactMessage } from "@/server/contact";
import { PageHeader } from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact SoCET at UCLA. Ask the officers about events, membership or partnerships, or pitch an idea for the club, and we'll reply by email.",
};

const topics = [
  {
    title: "Events and membership",
    body: "How to join, what to expect at an event, or how to get more involved. Every major is welcome.",
  },
  {
    title: "Your idea",
    body: "Have an idea for an event or a project? Maybe a workshop, a site visit or something you'd like to build. Tell us about it! It doesn't need to be polished.",
  },
  {
    title: "Partnerships",
    body: "We'd love to hear from companies, labs and speakers, whether it's a site visit, a talk or a project together. We're always up for new connections!",
  },
];
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
            Have questions or ideas? Write directly to the officers and
            we&apos;ll get back to you within a few days by email!
          </>
        }
      />

      <section
        aria-labelledby="message-heading"
        className="section-y bg-background"
      >
        <div className="container-x grid gap-14 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
          <div>
            <h2 id="message-heading" className="display-md reveal mt-4">
              What you can write about
            </h2>
            <ul className="mt-8 border-t border-border">
              {topics.map((topic, i) => (
                <li
                  key={topic.title}
                  className="reveal grid grid-cols-[2.25rem_1fr] border-b border-border py-5"
                >
                  <span className="eyebrow pt-0.5 font-display text-gold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-display text-base leading-tight font-bold tracking-tight sm:text-lg">
                      {topic.title}
                    </h3>
                    <p className="mt-1.5 max-w-md text-sm leading-relaxed text-muted sm:text-base">
                      {topic.body}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="tone-dark card-dark reveal p-6 sm:p-10">
              <ContactForm action={sendContactMessage} />
            </div>
            <p className="mt-4 leading-relaxed text-muted">
              Every field is required. We use your email only to reply to you.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
