import { cacheLife } from "next/cache";
import Link from "next/link";
import { CircuitLines } from "@/components/decor/Decor";
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
      className="section-y relative isolate overflow-hidden bg-background"
    >
      <CircuitLines className="-top-4 right-[-5rem] -z-10 w-[min(32rem,70vw)] opacity-30" />
      <div className="container-x">
        <h2 id="events-heading" className="display-lg reveal max-w-[12ch]">
          Upcoming events
        </h2>
        <p className="lede reveal mt-6 text-muted">
          Speaker series, workshops, journal clubs and site tours. Everyone is
          welcome.
        </p>
        <div className="mt-9 grid items-start gap-6 lg:grid-cols-2">
          <div className="reveal">
            <EventCalendar events={events} todayKey={todayKey} />
          </div>
          <div className="reveal">
            <h3 className="eyebrow mb-4 text-muted">Coming up</h3>
            <EventList events={upcoming} />
            <Link
              href="/events"
              className="btn-outline mt-8 hover:bg-ink hover:text-paper"
            >
              See all events
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
