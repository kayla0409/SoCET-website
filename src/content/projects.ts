/**
 * Club projects, maintained by officers until the database lands (BE-10).
 *
 * Entries show on /projects in the order listed here. Copy needs officer
 * sign-off (CP-4.1); only add what the club has agreed to publish.
 */

export type Project = {
  /** Stable, URL-safe id, e.g. "ev-charging-survey". */
  id: string;
  title: string;
  /** One or two sentences on what the project is. */
  summary: string;
  /** Leave out if unsure. */
  status?: "Ongoing" | "Completed";
  /** Short topic labels, e.g. ["Transportation"]. */
  tags?: string[];
  /** Optional link to a write-up, report or repo. */
  link?: { href: string; label: string };
};

export const projects: Project[] = [
  {
    id: "ev-charging-survey",
    title: "EV Charging Infrastructure Survey",
    summary: "A survey of the electric-vehicle chargers on UCLA's campus.",
    tags: ["Transportation", "Campus"],
  },
];
