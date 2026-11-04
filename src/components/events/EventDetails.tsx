import type { ClubEvent } from "@/content/events";
import {
  eventTypeLabels,
  formatEventLongDate,
  formatEventTimeRangeWithZone,
} from "@/lib/events";

/**
 * The body of an event's detail page. `ended` is passed in (not computed here)
 * so the page decides what "now" is and this stays easy to test.
 */
export function EventDetails({
  event,
  ended,
}: {
  event: ClubEvent;
  ended: boolean;
}) {
  return (
    <div className="flex flex-col gap-8">
      <dl className="grid gap-4 rounded-2xl border border-border bg-surface p-6 sm:grid-cols-[auto_1fr] sm:gap-x-6">
        <dt className="font-semibold">Date</dt>
        <dd className="text-muted sm:col-start-2">
          <time dateTime={event.start}>{formatEventLongDate(event)}</time>
        </dd>
        <dt className="font-semibold">Time</dt>
        <dd className="text-muted sm:col-start-2">
          {formatEventTimeRangeWithZone(event)}
        </dd>
        <dt className="font-semibold">Location</dt>
        <dd className="text-muted sm:col-start-2">{event.location}</dd>
        {event.type && (
          <>
            <dt className="font-semibold">Type</dt>
            <dd className="sm:col-start-2">
              <span className="inline-block rounded-full bg-accent-soft px-2 py-0.5 text-sm font-semibold">
                {eventTypeLabels[event.type]}
              </span>
            </dd>
          </>
        )}
      </dl>

      {event.description && (
        <p className="text-lg text-pretty">{event.description}</p>
      )}

      {ended ? (
        <p
          role="status"
          className="rounded-2xl border border-dashed border-border bg-surface-alt p-4 text-muted"
        >
          This event has ended.
        </p>
      ) : (
        event.rsvpUrl && (
          <a
            href={event.rsvpUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center gap-2 rounded-full bg-ucla-gold px-6 py-3 font-semibold text-ucla-blue-darkest hover:bg-ucla-gold/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            RSVP on Partiful
            <span aria-hidden="true">↗</span>
            <span className="sr-only">
              (opens an external site in a new tab)
            </span>
          </a>
        )
      )}

      {/* IF-2.1: the add-to-calendar control goes here. */}
    </div>
  );
}
