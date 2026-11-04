import type { Metadata } from "next";
import { cacheLife } from "next/cache";
import type { ReactNode } from "react";
import { EventCard } from "@/components/events/EventCard";
import type { ClubEvent } from "@/content/events";
import { getPastEvents, getUpcomingEvents } from "@/lib/events";
import { site } from "@/lib/site";
import { getEvents } from "@/server/content";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Upcoming and past SoCET events at UCLA: speaker series, workshops, journal clubs and site tours.",
};

// "Now" is cached for an hour, like the home page, so the page stays
// prerendered and an event moves to "Past events" within an hour of ending.
async function getEventsSnapshot() {
  "use cache";
  cacheLife("hours");
  const events = await getEvents();
  const now = new Date();
  return {
    total: events.length,
    upcoming: getUpcomingEvents(events, now),
    past: getPastEvents(events, now),
  };
}

// Copy needs Niteesh's sign-off (PD-3). Events come only from getEvents().
export default async function EventsPage() {
  const { total, upcoming, past } = await getEventsSnapshot();

  return (
    <>
      <section
        aria-labelledby="events-page-heading"
        className="bg-ucla-blue-darkest py-16 text-white sm:py-20"
      >
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h1
            id="events-page-heading"
            className="text-4xl font-bold tracking-tight text-balance text-ucla-gold sm:text-5xl"
          >
            Events
          </h1>
          <p className="mt-6 text-lg text-pretty text-white">
            Speaker series, workshops, journal clubs and site tours. Everyone is
            welcome.
          </p>
        </div>
      </section>

      <div className="mx-auto flex max-w-3xl flex-col gap-16 px-4 py-16 sm:px-6 sm:py-20">
        {total === 0 ? (
          <p className="rounded-2xl border border-dashed border-border bg-surface p-6 text-muted">
            No events are posted yet. Questions? Email{" "}
            <a
              href={`mailto:${site.email}`}
              className="font-semibold text-accent underline underline-offset-4"
            >
              {site.email}
            </a>
            .
          </p>
        ) : (
          <>
            <EventSection
              id="upcoming"
              title="Upcoming events"
              events={upcoming}
            >
              <p className="rounded-2xl border border-dashed border-border bg-surface p-6 text-muted">
                No upcoming events are posted yet. Check back soon.
              </p>
            </EventSection>
            {past.length > 0 && (
              <EventSection id="past" title="Past events" events={past} />
            )}
          </>
        )}
      </div>
    </>
  );
}

function EventSection({
  id,
  title,
  events,
  children: emptyState,
}: {
  id: string;
  title: string;
  events: ClubEvent[];
  /** Shown instead of the list when there are no events in this section. */
  children?: ReactNode;
}) {
  return (
    <section aria-labelledby={`${id}-heading`}>
      <h2
        id={`${id}-heading`}
        className="mb-6 text-2xl font-bold tracking-tight sm:text-3xl"
      >
        {title}
      </h2>
      {events.length === 0 ? (
        emptyState
      ) : (
        <ul className="flex flex-col gap-4">
          {events.map((event) => (
            <li key={event.id}>
              <EventCard event={event} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
