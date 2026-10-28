import { events, type ClubEvent } from "@/content/events";

/**
 * The only way pages read events. When BE-3 lands, swap this body for a
 * database query; callers don't change.
 */
export async function getEvents(): Promise<ClubEvent[]> {
  return [...events].sort((a, b) => a.start.localeCompare(b.start));
}
