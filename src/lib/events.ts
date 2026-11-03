import type { ClubEvent } from "@/content/events";

/** All dates on the site are shown in the club's time zone, whatever the visitor's. */
export const CLUB_TIME_ZONE = "America/Los_Angeles";

/** A calendar day in the club's time zone, as "YYYY-MM-DD". */
export type DayKey = string;

export interface YearMonth {
  year: number;
  /** 1 to 12. */
  month: number;
}

const dayKeyFormat = new Intl.DateTimeFormat("en-CA", {
  timeZone: CLUB_TIME_ZONE,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

export function dayKey(date: Date): DayKey {
  return dayKeyFormat.format(date);
}

export function parseDayKey(key: DayKey): {
  year: number;
  month: number;
  day: number;
} {
  const [year, month, day] = key.split("-").map(Number);
  return { year, month, day };
}

/** An event is upcoming until it ends, so a talk in progress still shows. */
export function getUpcomingEvents(
  events: ClubEvent[],
  now: Date,
  limit?: number,
): ClubEvent[] {
  const upcoming = events
    .filter((event) => new Date(event.end).getTime() > now.getTime())
    .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());
  return limit === undefined ? upcoming : upcoming.slice(0, limit);
}

/** Groups events by the day they start on. */
export function groupEventsByDay(
  events: ClubEvent[],
): Map<DayKey, ClubEvent[]> {
  const byDay = new Map<DayKey, ClubEvent[]>();
  for (const event of events) {
    const key = dayKey(new Date(event.start));
    byDay.set(key, [...(byDay.get(key) ?? []), event]);
  }
  return byDay;
}

export function addMonths(
  { year, month }: YearMonth,
  delta: number,
): YearMonth {
  const index = year * 12 + (month - 1) + delta;
  return { year: Math.floor(index / 12), month: (index % 12) + 1 };
}

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * The weeks of a month, Sunday first. Each week has 7 slots; days outside the
 * month are null.
 */
export function monthGrid({ year, month }: YearMonth): (DayKey | null)[][] {
  const firstWeekday = new Date(Date.UTC(year, month - 1, 1)).getUTCDay();
  const daysInMonth = new Date(Date.UTC(year, month, 0)).getUTCDate();
  const slots: (DayKey | null)[] = Array(firstWeekday).fill(null);
  for (let day = 1; day <= daysInMonth; day++) {
    slots.push(`${year}-${pad(month)}-${pad(day)}`);
  }
  while (slots.length % 7 !== 0) slots.push(null);
  const weeks: (DayKey | null)[][] = [];
  for (let i = 0; i < slots.length; i += 7) weeks.push(slots.slice(i, i + 7));
  return weeks;
}

// Day keys and months are calendar values, not instants, so format them in UTC.
const monthLabelFormat = new Intl.DateTimeFormat("en-US", {
  timeZone: "UTC",
  month: "long",
  year: "numeric",
});
const dayLabelFormat = new Intl.DateTimeFormat("en-US", {
  timeZone: "UTC",
  weekday: "long",
  month: "long",
  day: "numeric",
});

export function formatMonthLabel({ year, month }: YearMonth): string {
  return monthLabelFormat.format(new Date(Date.UTC(year, month - 1, 1)));
}

export function formatDayLabel(key: DayKey): string {
  const { year, month, day } = parseDayKey(key);
  return dayLabelFormat.format(new Date(Date.UTC(year, month - 1, day)));
}

const eventDateFormat = new Intl.DateTimeFormat("en-US", {
  timeZone: CLUB_TIME_ZONE,
  weekday: "short",
  month: "short",
  day: "numeric",
});
const eventTimeFormat = new Intl.DateTimeFormat("en-US", {
  timeZone: CLUB_TIME_ZONE,
  hour: "numeric",
  minute: "2-digit",
});
const monthShortFormat = new Intl.DateTimeFormat("en-US", {
  timeZone: CLUB_TIME_ZONE,
  month: "short",
});
const dayNumberFormat = new Intl.DateTimeFormat("en-US", {
  timeZone: CLUB_TIME_ZONE,
  day: "numeric",
});

/** e.g. "Thu, Nov 5". */
export function formatEventDate(event: ClubEvent): string {
  return eventDateFormat.format(new Date(event.start));
}

/** e.g. "6:00 – 8:00 PM". */
export function formatEventTimeRange(event: ClubEvent): string {
  return eventTimeFormat.formatRange(
    new Date(event.start),
    new Date(event.end),
  );
}

/** Parts for a date tile, e.g. { month: "Nov", day: "5" }. */
export function eventDateTile(event: ClubEvent): {
  month: string;
  day: string;
} {
  const start = new Date(event.start);
  return {
    month: monthShortFormat.format(start),
    day: dayNumberFormat.format(start),
  };
}
