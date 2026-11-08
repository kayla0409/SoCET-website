import type { ClubEvent } from "@/content/events";
import {
  eventDateTile,
  formatEventDate,
  formatEventTimeRange,
} from "@/lib/events";

export function EventList({ events }: { events: ClubEvent[] }) {
  if (events.length === 0) {
    return (
      <p className="rounded-lg border border-dashed border-muted/50 p-6 text-muted">
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
            className="tone-dark card-dark flex gap-5 p-5 transition-transform duration-200 hover:-translate-y-1"
          >
            <div
              aria-hidden="true"
              className="flex w-16 shrink-0 flex-col items-center justify-center rounded-md border border-gold/60 py-2 text-paper"
            >
              <span className="eyebrow text-gold">{tile.month}</span>
              <span className="font-display text-3xl font-black tracking-tight">
                {tile.day}
              </span>
            </div>
            <div className="min-w-0">
              <h3 className="text-lg font-bold tracking-tight">
                {event.title}
              </h3>
              <p className="mt-1 text-sm text-muted">
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
                  className="link-u mt-3 inline-block text-sm"
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
