import { TopoLines } from "@/components/decor/Decor";
import { getMailchimpConfig } from "@/lib/mailchimp";
import { site, socialLinks } from "@/lib/site";
import { joinMailingList } from "@/server/mailing-list";
import { MailingListForm } from "./MailingListForm";

export function MailingList() {
  return (
    <section
      aria-labelledby="mailing-list-heading"
      data-tone="dark"
      className="tone-dark section-y relative isolate overflow-hidden bg-ink"
    >
      <TopoLines className="top-[-8rem] right-[-10rem] -z-10 w-[min(48rem,110vw)] opacity-70" />
      <div className="container-x flex flex-col items-start">
        <h2 id="mailing-list-heading" className="display-lg reveal">
          Never miss <span className="block text-gold">an event</span>
        </h2>
        <p className="lede reveal mt-8 text-muted">
          Join the mailing list for event invites, site-tour sign-ups and club
          news. Open to every UCLA student, any major.
        </p>
        {/* Until the Mailchimp keys are set, fall back to the club's Google Form. */}
        {getMailchimpConfig() ? (
          <MailingListForm action={joinMailingList} />
        ) : (
          <a
            href={site.joinFormUrl}
            className="btn-gold mt-7 hover:-translate-y-0.5 hover:bg-paper hover:border-paper"
          >
            Join the mailing list
          </a>
        )}
        <p className="mt-7 text-sm text-muted">
          Or find us on{" "}
          {socialLinks.map((link, index) => (
            <span key={link.href}>
              {index > 0 && (index === socialLinks.length - 1 ? " and " : ", ")}
              <a href={link.href} className="link-u">
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
