import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import type { ClubEvent } from "@/content/events";
import { EventDetails } from "./EventDetails";

afterEach(cleanup);

// Made-up event and Partiful URL; no real data in fixtures.
const talk: ClubEvent = {
  id: "2026-11-05-example-talk",
  title: "Example talk",
  start: "2026-11-05T18:00:00-08:00",
  end: "2026-11-05T20:00:00-08:00",
  location: "Boelter Hall 3400",
  description: "A made-up talk for tests.",
  rsvpUrl: "https://partiful.com/e/example123",
};

describe("EventDetails", () => {
  it("shows the date, time with time zone, location and description", () => {
    render(<EventDetails event={talk} ended={false} />);
    expect(screen.getByText("Thursday, November 5, 2026")).toBeTruthy();
    expect(screen.getByText(/PST$/)).toBeTruthy();
    expect(screen.getByText("Boelter Hall 3400")).toBeTruthy();
    expect(screen.getByText("A made-up talk for tests.")).toBeTruthy();
  });

  it("opens the stored Partiful URL in a new tab for an upcoming event", () => {
    render(<EventDetails event={talk} ended={false} />);
    const rsvp = screen.getByRole("link", { name: /RSVP on Partiful/ });
    expect(rsvp.getAttribute("href")).toBe("https://partiful.com/e/example123");
    expect(rsvp.getAttribute("target")).toBe("_blank");
    expect(rsvp.getAttribute("rel")).toBe("noopener noreferrer");
    // The accessible name warns screen reader users before they leave the site.
    expect(
      screen.getByRole("link", { name: /opens an external site in a new tab/ }),
    ).toBe(rsvp);
  });

  it("shows the ended notice and no RSVP button for a past event", () => {
    render(<EventDetails event={talk} ended={true} />);
    expect(screen.getByRole("status").textContent).toBe(
      "This event has ended.",
    );
    expect(screen.queryByRole("link", { name: /RSVP/ })).toBeNull();
  });

  it("shows no RSVP button when there's no Partiful link yet", () => {
    const noLink: ClubEvent = { ...talk, rsvpUrl: undefined };
    render(<EventDetails event={noLink} ended={false} />);
    expect(screen.queryByRole("link", { name: /RSVP/ })).toBeNull();
    expect(screen.queryByRole("status")).toBeNull();
  });
});
