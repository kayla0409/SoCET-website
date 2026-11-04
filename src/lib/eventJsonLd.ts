import type { ClubEvent } from "@/content/events";
import { site } from "@/lib/site";

/**
 * schema.org Event data for one event, so search engines can show it as an
 * event. `url` and `image` are left out until the site has a production domain
 * (metadataBase) and events have images.
 */
export function eventJsonLd(event: ClubEvent) {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    startDate: event.start,
    endDate: event.end,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: event.location,
      address: event.location,
    },
    organizer: {
      "@type": "Organization",
      name: site.fullName,
      email: site.email,
    },
    ...(event.description && { description: event.description }),
  };
}

/**
 * JSON for a <script type="application/ld+json"> tag. `<` is escaped so text
 * in an event can't close the script tag early.
 */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
