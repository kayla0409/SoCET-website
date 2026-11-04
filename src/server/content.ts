import { events, type ClubEvent } from "@/content/events";
import { team, type TeamMember } from "@/content/team";

/**
 * The only way pages read events. When BE-3 lands, swap this body for a
 * database query; callers don't change.
 */
export async function getEvents(): Promise<ClubEvent[]> {
  return [...events].sort((a, b) => a.start.localeCompare(b.start));
}

/**
 * The only way pages read officers, in display order. When BE-4 lands, swap
 * this body for a database query ordered by sort order; callers don't change.
 */
export async function getTeam(): Promise<TeamMember[]> {
  return [...team];
}
