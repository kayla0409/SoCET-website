import type { Metadata } from "next";
import { cacheLife } from "next/cache";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EventDetails } from "@/components/events/EventDetails";
import { eventJsonLd, serializeJsonLd } from "@/lib/eventJsonLd";
import { formatEventDate, hasEnded } from "@/lib/events";
import { getEvent, getEvents } from "@/server/content";

// Every real event is prerendered by generateStaticParams below, so navigating
// to one is already instant. Only unknown slugs render at request time, and
// those must block so notFound() can send a real HTTP 404 (wrapping them in
// <Suspense> would stream a 200 first).
export const instant = false;

// With Cache Components on, this has to return at least one slug or the build
// fails. If there are no events yet, the placeholder slug just renders a 404.
export async function generateStaticParams() {
  const events = await getEvents();
  if (events.length === 0) return [{ slug: "no-events-yet" }];
  return events.map((event) => ({ slug: event.id }));
}

// "Now" is cached for an hour, like the events list, so the RSVP button
// switches to the "ended" notice within an hour of the event ending.
async function getEventSnapshot(slug: string) {
  "use cache";
  cacheLife("hours");
  const event = await getEvent(slug);
  return event && { event, ended: hasEnded(event, new Date()) };
}

export async function generateMetadata({
  params,
}: PageProps<"/events/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEvent(slug);
  if (!event) return {};
  return {
    title: event.title,
    description:
      event.description ??
      `${event.title}: ${formatEventDate(event)} at ${event.location}.`,
  };
}

export default async function EventPage({
  params,
}: PageProps<"/events/[slug]">) {
  const { slug } = await params;
  const snapshot = await getEventSnapshot(slug);
  if (!snapshot) notFound();
  const { event, ended } = snapshot;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(eventJsonLd(event)),
        }}
      />
      <section
        aria-labelledby="event-heading"
        className="bg-ucla-blue-darkest py-16 text-white sm:py-20"
      >
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <Link
            href="/events"
            className="text-sm font-semibold text-white underline underline-offset-4 hover:decoration-ucla-gold"
          >
            <span aria-hidden="true">← </span>All events
          </Link>
          <h1
            id="event-heading"
            className="mt-4 text-4xl font-bold tracking-tight text-balance text-ucla-gold sm:text-5xl"
          >
            {event.title}
          </h1>
        </div>
      </section>
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
        <EventDetails event={event} ended={ended} />
      </div>
    </>
  );
}
