import type { Metadata } from "next";
import Link from "next/link";
import type { Resource } from "@/content/resources";
import { site } from "@/lib/site";
import { getResources } from "@/server/content";
import { PageHeader } from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Resources from SoCET at UCLA: ways to get involved with the club and readings on clean energy and climate.",
};

// Copy needs officer sign-off. Resources come only from getResources().
export default async function ResourcesPage() {
  const { club, reading } = await getResources();

  return (
    <>
      <PageHeader
        id="resources-heading"
        title={
          <>
            Learn, <span className="text-gold">connect</span>, get involved
          </>
        }
        lede="Links for getting into the club, plus readings from our journal clubs."
      />

      <section
        aria-labelledby="club-resources-heading"
        className="section-y bg-background"
      >
        <div className="container-x">
          <p className="eyebrow text-muted">02 — The club</p>
          <h2 id="club-resources-heading" className="display-lg reveal mt-4">
            Club resources
          </h2>
          <ul className="mt-9 grid gap-5 sm:grid-cols-2">
            {club.map((resource) => (
              <ResourceCard key={resource.href} resource={resource} />
            ))}
          </ul>
        </div>
      </section>

      <section
        aria-labelledby="reading-heading"
        className="section-y border-t border-border bg-surface-alt"
      >
        <div className="container-x">
          <p className="eyebrow text-muted">03 — Reading list</p>
          <h2 id="reading-heading" className="display-lg reveal mt-4">
            Reading list
          </h2>
          {reading.length === 0 ? (
            <p className="mt-9 max-w-2xl rounded-lg border border-dashed border-muted/50 p-6 text-muted">
              Journal-club readings are coming soon. Have one to suggest?{" "}
              <Link href="/contact" className="link-u">
                Send it to us
              </Link>{" "}
              or email{" "}
              <a href={`mailto:${site.email}`} className="link-u break-all">
                {site.email}
              </a>
              .
            </p>
          ) : (
            <ul className="mt-9 border-t border-border">
              {reading.map((resource) => (
                <li
                  key={resource.href}
                  className="reveal border-b border-border py-8"
                >
                  <a
                    href={resource.href}
                    className="font-display text-2xl font-extrabold tracking-tight underline-offset-[6px] hover:underline"
                  >
                    {resource.title}
                  </a>
                  <p className="mt-2 max-w-2xl text-muted">
                    {resource.description}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  );
}

function ResourceCard({ resource }: { resource: Resource }) {
  const internal = resource.href.startsWith("/");
  const className =
    "group tone-dark card-dark flex h-full flex-col p-7 transition-transform duration-200 hover:-translate-y-1.5";
  const body = (
    <>
      <span className="font-display text-2xl font-extrabold tracking-tight group-hover:text-gold">
        {resource.title}
        <span aria-hidden="true"> {internal ? "→" : "↗"}</span>
      </span>
      <span className="mt-3 leading-relaxed text-muted">
        {resource.description}
      </span>
    </>
  );

  return (
    <li className="reveal">
      {internal ? (
        <Link href={resource.href} className={className}>
          {body}
        </Link>
      ) : (
        <a href={resource.href} className={className}>
          {body}
        </a>
      )}
    </li>
  );
}