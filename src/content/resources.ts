import { site } from "@/lib/site";

/**
 * Resources for members, maintained by officers until the database lands.
 * Copy needs officer sign-off. Only link to sources the officers have checked.
 */

export type Resource = {
  title: string;
  description: string;
  href: string;
};

/** Ways into the club. These come from the club's own links in site.ts. */
export const clubResources: Resource[] = [
  {
    title: "Join SoCET",
    description:
      "Sign up for the club and the mailing list with our Google Form.",
    href: site.joinFormUrl,
  },
  {
    title: "Event calendar",
    description:
      "Speaker series, workshops, journal clubs and site tours, with add-to-calendar links.",
    href: "/events",
  },
  {
    title: "Discord",
    description: "Chat with members and hear about events first.",
    href: site.discordUrl,
  },
  {
    title: "LinkedIn",
    description: "Club news, speakers and opportunities.",
    href: site.linkedinUrl,
  },
];

/**
 * Journal-club readings and other learning material (P3-2). Add entries as
 * officers approve them; the page shows a "coming soon" note while empty.
 */
export const readingList: Resource[] = [];
