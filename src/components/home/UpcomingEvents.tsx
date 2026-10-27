import { cacheLife } from "next/cache";
import Link from "next/link";
import { dayKey, getUpcomingEvents } from "@/lib/events";
import { getEvents } from "@/server/content";
import { EventCalendar } from "./EventCalendar";
import { EventList } from "./EventList";

const UPCOMING_LIMIT = 3;

// "Now" is cached for an hour, so the page stays prerendered and events drop off
// within an hour of ending.
async function getEventsSnapshot() {
  "use cache";
  cacheLife("hours");
  const events = await getEvents();
  const now = new Date();
  return {
    events,
    todayKey: dayKey(now),
    upcoming: getUpcomingEvents(events, now, UPCOMING_LIMIT),
  };
}

export async function UpcomingEvents() {
  const { events, todayKey, upcoming } = await getEventsSnapshot();

  return (
    <section
      id="events"
      aria-labelledby="events-heading"
      className="scroll-mt-4 bg-surface-alt py-16 sm:py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2
          id="events-heading"
          className="text-center text-3xl font-bold tracking-tight sm:text-4xl"
        >
          Upcoming events
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-muted">
          Speaker series, workshops, journal clubs and site tours. Everyone is
          welcome.
        </p>
        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <EventCalendar events={events} todayKey={todayKey} />
          <div>
            <h3 className="mb-4 text-xl font-semibold">Coming up</h3>
            <EventList events={upcoming} />
            <Link
              href="/events"
              className="mt-6 inline-block font-semibold text-accent underline underline-offset-4"
            >
              See all events
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
