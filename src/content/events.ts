/**
 * Club events, maintained by officers until the database lands (BE-1, BE-3).
 *
 * To add an event, append an entry. Times are ISO 8601 with the Los Angeles
 * offset (-07:00 in daylight time, -08:00 in standard time). Only publish
 * events officers have confirmed (CP-1); leave rsvpUrl out until the Partiful
 * page exists.
 */

export type EventType =
  | "speaker"
  | "workshop"
  | "journal-club"
  | "site-tour"
  | "hackathon"
  | "social";

export interface ClubEvent {
  /** Stable, URL-safe id, e.g. "2026-11-05-speaker-series". */
  id: string;
  title: string;
  /** ISO 8601 with offset, e.g. "2026-11-05T18:00:00-08:00". */
  start: string;
  end: string;
  location: string;
  description?: string;
  /** Partiful RSVP link. */
  rsvpUrl?: string;
  type?: EventType;
}

export const events: ClubEvent[] = [
  {
    id: "2026-04-22-earth-day",
    title: "UCLA Earth Day tabling",
    start: "2026-04-22T12:00:00-07:00",
    end: "2026-04-22T17:00:00-07:00",
    location: "Wilson Plaza",
    description:
      "An interactive quiz on UCLA Sustainability, a video about a solarpunk future, and stickers.",
  },
];
