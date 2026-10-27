import { describe, expect, it } from "vitest";
import type { ClubEvent } from "@/content/events";
import {
  addMonths,
  dayKey,
  formatEventTimeRange,
  getUpcomingEvents,
  groupEventsByDay,
  monthGrid,
} from "./events";

const event = (id: string, start: string, end: string): ClubEvent => ({
  id,
  title: id,
  start,
  end,
  location: "Boelter Hall",
});

describe("dayKey", () => {
  it("uses the Los Angeles calendar day, not UTC", () => {
    // 8pm in LA on Nov 5 is already Nov 6 in UTC.
    expect(dayKey(new Date("2026-11-06T04:00:00Z"))).toBe("2026-11-05");
  });
});

describe("getUpcomingEvents", () => {
  const events = [
    event("later", "2026-11-20T18:00:00-08:00", "2026-11-20T19:00:00-08:00"),
    event("past", "2026-10-01T18:00:00-07:00", "2026-10-01T19:00:00-07:00"),
    event("soon", "2026-11-05T18:00:00-08:00", "2026-11-05T19:00:00-08:00"),
    event(
      "in-progress",
      "2026-11-01T09:00:00-08:00",
      "2026-11-01T12:00:00-08:00",
    ),
  ];
  const now = new Date("2026-11-01T10:00:00-08:00");

  it("keeps events that haven't ended, soonest first", () => {
    expect(getUpcomingEvents(events, now).map((e) => e.id)).toEqual([
      "in-progress",
      "soon",
      "later",
    ]);
  });

  it("applies the limit", () => {
    expect(getUpcomingEvents(events, now, 1).map((e) => e.id)).toEqual([
      "in-progress",
    ]);
  });
});

describe("groupEventsByDay", () => {
  it("groups by the LA start day", () => {
    const byDay = groupEventsByDay([
      event("a", "2026-11-05T18:00:00-08:00", "2026-11-05T19:00:00-08:00"),
      event("b", "2026-11-05T20:30:00-08:00", "2026-11-05T21:00:00-08:00"),
    ]);
    expect(byDay.get("2026-11-05")?.map((e) => e.id)).toEqual(["a", "b"]);
    expect(byDay.size).toBe(1);
  });
});

describe("monthGrid", () => {
  it("starts on the right weekday and pads full weeks", () => {
    // November 2026 starts on a Sunday and has 30 days.
    const weeks = monthGrid({ year: 2026, month: 11 });
    expect(weeks[0][0]).toBe("2026-11-01");
    expect(weeks.flat().filter(Boolean)).toHaveLength(30);
    expect(weeks.every((week) => week.length === 7)).toBe(true);
  });

  it("leaves leading blanks before the first day", () => {
    // October 2026 starts on a Thursday.
    const [firstWeek] = monthGrid({ year: 2026, month: 10 });
    expect(firstWeek.slice(0, 4)).toEqual([null, null, null, null]);
    expect(firstWeek[4]).toBe("2026-10-01");
  });
});

describe("addMonths", () => {
  it("rolls over year boundaries both ways", () => {
    expect(addMonths({ year: 2026, month: 12 }, 1)).toEqual({
      year: 2027,
      month: 1,
    });
    expect(addMonths({ year: 2026, month: 1 }, -1)).toEqual({
      year: 2025,
      month: 12,
    });
  });
});

describe("formatEventTimeRange", () => {
  it("formats in LA time", () => {
    const text = formatEventTimeRange(
      event("x", "2026-11-05T18:00:00-08:00", "2026-11-05T20:00:00-08:00"),
    );
    expect(text.replace(/\s/g, " ")).toMatch(/^6:00 – 8:00 PM$/);
  });
});
