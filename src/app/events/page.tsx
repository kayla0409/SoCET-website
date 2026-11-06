import type { Metadata } from "next";
import { cacheLife } from "next/cache";
import type { ReactNode } from "react";
import { EventCard } from "@/components/events/EventCard";
import { CircuitLines } from "@/components/decor/Decor";
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
      {/* Events opens near-black with circuit traces and a two-column header. */}
      <section
        aria-labelledby="events-page-heading"
        data-tone="dark"
        className="tone-dark relative isolate overflow-hidden bg-ink"
      >
        <CircuitLines className="bottom-[-5rem] left-[-6rem] -z-10 w-[min(38rem,90vw)] opacity-35" />
        <div className="container-x grid gap-10 pt-32 pb-12 sm:pt-36 sm:pb-16 md:grid-cols-[3fr_2fr] md:items-end">
          <h1
            id="events-page-heading"
            className="display-xl rise text-[clamp(3rem,9vw,6.5rem)] text-paper"
          >
            Events
          </h1>
          <p className="lede rise border-l-2 border-gold pl-6 text-muted [--rise-delay:120ms]">
            Speaker series, workshops, journal clubs and site tours. Everyone is
            welcome.
          </p>
        </div>
      </section>

      <div className="container-x section-y flex flex-col gap-16">
        {total === 0 ? (
          <p className="max-w-2xl rounded-lg border border-dashed border-muted/50 p-6 text-muted">
            No events are posted yet. Questions? Email{" "}
            <a href={`mailto:${site.email}`} className="link-u break-all">
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
              <p className="max-w-2xl rounded-lg border border-dashed border-muted/50 p-6 text-muted">
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
      <h2 id={`${id}-heading`} className="display-lg reveal mb-12">
        {title}
      </h2>
      {events.length === 0 ? (
        emptyState
      ) : (
        <ul className="grid gap-5 md:grid-cols-2">
          {events.map((event) => (
            <li key={event.id} className="reveal">
              <EventCard event={event} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
