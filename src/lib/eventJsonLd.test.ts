import { describe, expect, it } from "vitest";
import type { ClubEvent } from "@/content/events";
import { eventJsonLd, serializeJsonLd } from "./eventJsonLd";

// Made-up event; no real data in fixtures.
const talk: ClubEvent = {
  id: "2026-11-05-example-talk",
  title: "Example talk",
  start: "2026-11-05T18:00:00-08:00",
  end: "2026-11-05T20:00:00-08:00",
  location: "Boelter Hall 3400",
  description: "A made-up talk for tests.",
};

describe("eventJsonLd", () => {
  it("describes an in-person schema.org Event with offset times", () => {
    const data = eventJsonLd(talk);
    expect(data).toMatchObject({
      "@context": "https://schema.org",
      "@type": "Event",
      name: "Example talk",
      startDate: "2026-11-05T18:00:00-08:00",
      endDate: "2026-11-05T20:00:00-08:00",
      eventStatus: "https://schema.org/EventScheduled",
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      location: { "@type": "Place", name: "Boelter Hall 3400" },
      organizer: { "@type": "Organization" },
      description: "A made-up talk for tests.",
    });
  });

  it("leaves out the description when there isn't one", () => {
    const noDescription: ClubEvent = { ...talk, description: undefined };
    expect(eventJsonLd(noDescription)).not.toHaveProperty("description");
  });
});

describe("serializeJsonLd", () => {
  it("escapes < so the text can't close the script tag", () => {
    const json = serializeJsonLd({ name: "</script><b>hi" });
    expect(json).not.toContain("<");
    expect(JSON.parse(json)).toEqual({ name: "</script><b>hi" });
  });
});
