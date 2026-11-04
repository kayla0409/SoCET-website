import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import type { ClubEvent } from "@/content/events";
import { EventCard } from "./EventCard";

afterEach(cleanup);

// Made-up event; no real data in fixtures.
const talk: ClubEvent = {
  id: "2026-11-05-example-talk",
  title: "Example talk",
  start: "2026-11-05T18:00:00-08:00",
  end: "2026-11-05T20:00:00-08:00",
  location: "Boelter Hall 3400",
  type: "speaker",
};

describe("EventCard", () => {
  it("links the title to the event's detail page", () => {
    render(<EventCard event={talk} />);
    expect(
      screen.getByRole("link", { name: "Example talk" }).getAttribute("href"),
    ).toBe("/events/2026-11-05-example-talk");
  });

  it("shows the date, time, location and type", () => {
    render(<EventCard event={talk} />);
    expect(screen.getByText(/Thu, Nov 5, 6:00/)).toBeTruthy();
    expect(screen.getByText(/Boelter Hall 3400/)).toBeTruthy();
    expect(screen.getByText("Speaker")).toBeTruthy();
  });

  it("leaves out the type badge when there's no type", () => {
    const untyped: ClubEvent = { ...talk, type: undefined };
    render(<EventCard event={untyped} />);
    expect(screen.queryByText("Speaker")).toBeNull();
  });
});
