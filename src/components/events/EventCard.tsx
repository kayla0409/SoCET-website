import Link from "next/link";
import type { ClubEvent } from "@/content/events";
import {
  eventDateTile,
  eventTypeLabels,
  formatEventDate,
  formatEventTimeRange,
} from "@/lib/events";

export function eventHref(event: ClubEvent): string {
  return `/events/${event.id}`;
}

/** One event in a list. The whole card opens the event's detail page. */
export function EventCard({ event }: { event: ClubEvent }) {
  const tile = eventDateTile(event);

  return (
    <article className="tone-dark card-dark relative flex gap-5 border border-transparent p-5 transition duration-200 hover:-translate-y-1 hover:border-lime/60 sm:p-6">
      <div
        aria-hidden="true"
        className="flex w-16 shrink-0 flex-col items-center justify-center rounded-md border border-lime/60 py-2 text-paper"
      >
        <span className="eyebrow text-lime">{tile.month}</span>
        <span className="font-display text-3xl font-black tracking-tight">
          {tile.day}
        </span>
      </div>
      <div className="min-w-0">
        {event.type && (
          <p className="tag mb-3 text-lime">{eventTypeLabels[event.type]}</p>
        )}
        <h3 className="text-lg font-bold tracking-tight text-pretty sm:text-xl">
          {/* The ::after overlay stretches this link over the whole card. */}
          <Link
            href={eventHref(event)}
            className="underline-offset-4 after:absolute after:inset-0 after:rounded-lg hover:underline focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-accent"
          >
            {event.title}
          </Link>
        </h3>
        <p className="mt-1 text-sm text-muted">
          <time dateTime={event.start}>
            {formatEventDate(event)}, {formatEventTimeRange(event)}
          </time>
          {" · "}
          {event.location}
        </p>
      </div>
    </article>
  );
}
