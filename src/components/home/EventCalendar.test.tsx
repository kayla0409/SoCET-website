import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import type { ClubEvent } from "@/content/events";
import { EventCalendar } from "./EventCalendar";
import { EventList } from "./EventList";

afterEach(cleanup);

const talk: ClubEvent = {
  id: "talk",
  title: "CleanTech Speaker Series",
  start: "2026-11-05T18:00:00-08:00",
  end: "2026-11-05T19:30:00-08:00",
  location: "Boelter Hall",
  rsvpUrl: "https://partiful.com/e/example",
};

describe("EventCalendar", () => {
  it("opens on today's month and marks today", () => {
    render(<EventCalendar events={[talk]} todayKey="2026-11-02" />);
    expect(screen.getByRole("heading", { name: "November 2026" })).toBeTruthy();
    expect(screen.getByText("2").getAttribute("aria-current")).toBe("date");
  });

  it("shows a day's events when its date is selected", async () => {
    const user = userEvent.setup();
    render(<EventCalendar events={[talk]} todayKey="2026-11-02" />);

    const day = screen.getByRole("button", {
      name: "Thursday, November 5, 1 event",
    });
    await user.click(day);

    expect(day.getAttribute("aria-pressed")).toBe("true");
    expect(screen.getByText("CleanTech Speaker Series")).toBeTruthy();
    expect(
      screen
        .getByRole("link", { name: "RSVP for CleanTech Speaker Series" })
        .getAttribute("href"),
    ).toBe(talk.rsvpUrl);
  });

  it("moves between months", async () => {
    const user = userEvent.setup();
    render(<EventCalendar events={[talk]} todayKey="2026-11-02" />);

    await user.click(screen.getByRole("button", { name: "Next month" }));
    expect(screen.getByRole("heading", { name: "December 2026" })).toBeTruthy();
    expect(screen.queryByRole("button", { name: /1 event/ })).toBeNull();

    await user.click(screen.getByRole("button", { name: "Previous month" }));
    await user.click(screen.getByRole("button", { name: "Previous month" }));
    expect(screen.getByRole("heading", { name: "October 2026" })).toBeTruthy();
  });
});

describe("EventList", () => {
  it("shows an empty state when nothing is scheduled", () => {
    render(<EventList events={[]} />);
    expect(screen.getByText(/No upcoming events are posted yet/)).toBeTruthy();
  });

  it("lists events with an RSVP link", () => {
    render(<EventList events={[talk]} />);
    expect(
      screen.getByRole("heading", { name: "CleanTech Speaker Series" }),
    ).toBeTruthy();
    expect(
      screen.getByRole("link", {
        name: "RSVP on Partiful for CleanTech Speaker Series",
      }),
    ).toBeTruthy();
  });
});
