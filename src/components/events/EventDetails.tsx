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
    <div className="flex max-w-3xl flex-col gap-10">
      <dl className="tone-dark card-dark reveal grid gap-x-10 gap-y-1 p-7 sm:grid-cols-[auto_1fr] sm:gap-y-5 sm:p-9">
        <dt className="eyebrow pt-1 text-gold">Date</dt>
        <dd className="text-muted sm:col-start-2">
          <time dateTime={event.start}>{formatEventLongDate(event)}</time>
        </dd>
        <dt className="eyebrow mt-4 pt-1 text-gold sm:mt-0">Time</dt>
        <dd className="text-muted sm:col-start-2">
          {formatEventTimeRangeWithZone(event)}
        </dd>
        <dt className="eyebrow mt-4 pt-1 text-gold sm:mt-0">Location</dt>
        <dd className="text-muted sm:col-start-2">{event.location}</dd>
        {event.type && (
          <>
            <dt className="eyebrow mt-4 pt-1 text-gold sm:mt-0">Type</dt>
            <dd className="sm:col-start-2">
              <span className="tag text-gold">
                {eventTypeLabels[event.type]}
              </span>
            </dd>
          </>
        )}
      </dl>

      {event.description && (
        <p className="lede max-w-2xl text-pretty text-muted">
          {event.description}
        </p>
      )}

      {ended ? (
        <p
          role="status"
          className="rounded-lg border border-dashed border-muted/50 p-5 text-muted"
        >
          This event has ended.
        </p>
      ) : (
        event.rsvpUrl && (
          <a
            href={event.rsvpUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold w-fit border-ink bg-ink text-paper hover:-translate-y-0.5 hover:border-gold hover:bg-gold hover:text-ink"
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
