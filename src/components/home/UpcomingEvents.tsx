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
      className="section-y relative isolate overflow-hidden bg-background pt-[clamp(5rem,9vw,7.5rem)]"
    >
      {/*
        Two smaller sets of circuit traces tucked into opposite corners, kept
        out from behind the text: top right (pulled mostly off the edge) and
        bottom left (mirrored), peeking out below the calendar.
      */}
      <CircuitLines className="-top-6 right-[-12rem] -z-10 w-[min(38rem,75vw)] opacity-25" />
      {/* Fixed width (not vw) so the two traces that cross into the mission
          section below always cross at the same spots; Pillars continues them. */}
      <CircuitLines className="bottom-[-10rem] left-[-9rem] -z-10 w-[38rem] -scale-x-100 opacity-25" />
      {/*
        On wide screens the heading sits beside the calendar instead of above
        it, so the whole section fits in one screen without scrolling. Source
        order (heading, calendar, list) is kept for small screens and screen
        readers; the grid only moves things visually.
      */}
      <div className="container-x grid items-start gap-x-14 gap-y-8 lg:grid-cols-[minmax(0,30rem)_1fr] lg:items-center">
        <div className="lg:col-start-2 lg:row-start-1 lg:self-end">
          <h2 id="events-heading" className="display-lg reveal max-w-[12ch]">
            Upcoming events
          </h2>
          <p className="lede reveal mt-5 text-muted">
            Speaker series, workshops, journal clubs and site tours. Everyone is
            welcome.
          </p>
        </div>
        <div className="reveal lg:col-start-1 lg:row-span-2 lg:row-start-1">
          <EventCalendar events={events} todayKey={todayKey} />
        </div>
        <div className="lg:col-start-2 lg:row-start-2 lg:self-start">
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
