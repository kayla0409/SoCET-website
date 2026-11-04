/**
 * Club officers, maintained by officers until the database lands (BE-1, BE-4).
 *
 * Entries show on /team in the order listed here. Only add someone once their
 * written publishing consent is on file (open question #5). Leave `photo` out
 * until they've also agreed to a photo; the page shows their initials instead.
 * Photos go in `public/team/`, e.g. `photo: "/team/jane-doe.jpg"`.
 */

export interface TeamMember {
  /** Stable, URL-safe id, e.g. "jane-doe". */
  id: string;
  name: string;
  /** Officer position, e.g. "President". */
  role: string;
  /** One or two sentences, approved by the officer. */
  bio?: string;
  /** Path under `public/`, square works best. */
  photo?: string;
  /** Required with `photo`. Describe the photo, e.g. "Jane smiling outside Royce Hall". */
  photoAlt?: string;
}

export const team: TeamMember[] = [];
