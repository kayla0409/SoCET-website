"use client";

import { useId, useMemo, useState } from "react";
import type { ClubEvent } from "@/content/events";
import {
  addMonths,
  formatDayLabel,
  formatEventTimeRange,
  formatMonthLabel,
  groupEventsByDay,
  monthGrid,
  parseDayKey,
  type DayKey,
  type YearMonth,
} from "@/lib/events";

const weekdays = [
  ["S", "Sunday"],
  ["M", "Monday"],
  ["T", "Tuesday"],
  ["W", "Wednesday"],
  ["T", "Thursday"],
  ["F", "Friday"],
  ["S", "Saturday"],
] as const;

interface EventCalendarProps {
  events: ClubEvent[];
  /** Today in the club's time zone, decided on the server so both renders agree. */
  todayKey: DayKey;
}

export function EventCalendar({ events, todayKey }: EventCalendarProps) {
  const headingId = useId();
  const today = parseDayKey(todayKey);
  const [visibleMonth, setVisibleMonth] = useState<YearMonth>({
    year: today.year,
    month: today.month,
  });
  const [selectedDay, setSelectedDay] = useState<DayKey | null>(null);
  const eventsByDay = useMemo(() => groupEventsByDay(events), [events]);
  const selectedEvents = selectedDay
    ? (eventsByDay.get(selectedDay) ?? [])
    : [];

  const changeMonth = (delta: number) => {
    setVisibleMonth((current) => addMonths(current, delta));
    setSelectedDay(null);
  };

  return (
    <div className="rounded-2xl border border-border bg-surface p-4 shadow-sm sm:p-6">
      <div className="flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={() => changeMonth(-1)}
          className="flex size-11 items-center justify-center rounded-full text-xl hover:bg-accent-soft"
          aria-label="Previous month"
        >
          <span aria-hidden="true">‹</span>
        </button>
        <h3 id={headingId} className="text-lg font-semibold" aria-live="polite">
          {formatMonthLabel(visibleMonth)}
        </h3>
        <button
          type="button"
          onClick={() => changeMonth(1)}
          className="flex size-11 items-center justify-center rounded-full text-xl hover:bg-accent-soft"
          aria-label="Next month"
        >
          <span aria-hidden="true">›</span>
        </button>
      </div>

      <table
        className="mt-4 w-full table-fixed border-collapse text-center"
        aria-labelledby={headingId}
      >
        <thead>
          <tr>
            {weekdays.map(([short, long]) => (
              <th
                key={long}
                scope="col"
                className="pb-2 text-xs font-semibold text-muted"
              >
                <span aria-hidden="true">{short}</span>
                <span className="sr-only">{long}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {monthGrid(visibleMonth).map((week, weekIndex) => (
            <tr key={weekIndex}>
              {week.map((key, dayIndex) => (
                <td key={key ?? `empty-${dayIndex}`} className="p-0.5">
                  {key && (
                    <DayCell
                      dayKey={key}
                      isToday={key === todayKey}
                      eventCount={eventsByDay.get(key)?.length ?? 0}
                      isSelected={key === selectedDay}
                      onSelect={() =>
                        setSelectedDay(key === selectedDay ? null : key)
                      }
                    />
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div
        aria-live="polite"
        className="mt-4 min-h-12 border-t border-border pt-4 text-sm"
      >
        {selectedDay ? (
          <>
            <p className="font-semibold">{formatDayLabel(selectedDay)}</p>
            <ul className="mt-2 flex flex-col gap-2">
              {selectedEvents.map((event) => (
                <li key={event.id}>
                  <span className="font-medium">{event.title}</span>
                  <span className="text-muted">
                    {" "}
                    · {formatEventTimeRange(event)} · {event.location}
                  </span>
                  {event.rsvpUrl && (
                    <>
                      {" "}
                      <a
                        href={event.rsvpUrl}
                        aria-label={`RSVP for ${event.title}`}
                        className="font-semibold text-accent underline underline-offset-4"
                      >
                        RSVP
                      </a>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p className="text-muted">
            Select a highlighted date to see what&apos;s on.
          </p>
        )}
      </div>
    </div>
  );
}

interface DayCellProps {
  dayKey: DayKey;
  isToday: boolean;
  eventCount: number;
  isSelected: boolean;
  onSelect: () => void;
}

function DayCell({
  dayKey,
  isToday,
  eventCount,
  isSelected,
  onSelect,
}: DayCellProps) {
  const dayNumber = parseDayKey(dayKey).day;
  const todayRing = isToday ? "ring-2 ring-ucla-blue dark:ring-ucla-gold" : "";

  if (eventCount === 0) {
    return (
      <span
        aria-current={isToday ? "date" : undefined}
        className={`mx-auto flex size-10 items-center justify-center rounded-full text-sm text-muted ${todayRing}`}
      >
        {dayNumber}
      </span>
    );
  }

  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={isSelected}
      aria-current={isToday ? "date" : undefined}
      aria-label={`${formatDayLabel(dayKey)}, ${eventCount} ${eventCount === 1 ? "event" : "events"}`}
      className={`relative mx-auto flex size-10 items-center justify-center rounded-full text-sm font-bold ${todayRing} ${
        isSelected
          ? "bg-ucla-gold text-ucla-blue-darkest"
          : "bg-ucla-blue-darkest text-white hover:bg-ucla-blue-dark"
      }`}
    >
      {dayNumber}
    </button>
  );
}
