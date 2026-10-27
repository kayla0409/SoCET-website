import type { ClubEvent } from "@/content/events";
import {
  eventDateTile,
  formatEventDate,
  formatEventTimeRange,
} from "@/lib/events";

export function EventList({ events }: { events: ClubEvent[] }) {
  if (events.length === 0) {
    return (
      <p className="rounded-2xl border border-dashed border-border bg-surface p-6 text-muted">
        No upcoming events are posted yet. Join the mailing list below to hear
        about the next one first.
      </p>
    );
  }

  return (
    <ul className="flex flex-col gap-4">
      {events.map((event) => {
        const tile = eventDateTile(event);
        return (
          <li
            key={event.id}
            className="flex gap-4 rounded-2xl border border-border bg-surface p-4 shadow-sm"
          >
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
              <h3 className="font-semibold">{event.title}</h3>
              <p className="text-sm text-muted">
                <time dateTime={event.start}>
                  {formatEventDate(event)}, {formatEventTimeRange(event)}
                </time>
                {" · "}
                {event.location}
              </p>
              {event.rsvpUrl && (
                <a
                  href={event.rsvpUrl}
                  aria-label={`RSVP on Partiful for ${event.title}`}
                  className="mt-2 inline-block text-sm font-semibold text-accent underline underline-offset-4"
                >
                  RSVP on Partiful
                </a>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
