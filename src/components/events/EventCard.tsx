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
    <article className="relative flex gap-4 rounded-2xl border border-border bg-surface p-4 shadow-sm transition-colors hover:border-accent">
      <div
        aria-hidden="true"
        className="flex w-16 shrink-0 flex-col items-center justify-center rounded-xl bg-ucla-blue-darkest py-2 text-white"
      >
        <span className="text-xs font-semibold uppercase tracking-wide text-ucla-gold">
          {tile.month}
        </span>
        <span className="text-2xl font-bold">{tile.day}</span>
      </div>
      <div className="min-w-0">
        {event.type && (
          <p className="mb-1 inline-block rounded-full bg-accent-soft px-2 py-0.5 text-xs font-semibold text-foreground">
            {eventTypeLabels[event.type]}
          </p>
        )}
        <h3 className="font-semibold text-pretty">
          {/* The ::after overlay stretches this link over the whole card. */}
          <Link
            href={eventHref(event)}
            className="underline-offset-4 after:absolute after:inset-0 after:rounded-2xl hover:underline focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-accent"
          >
            {event.title}
          </Link>
        </h3>
        <p className="text-sm text-muted">
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
