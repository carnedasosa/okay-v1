"use client";

import { useToday } from "@/hooks/useToday";
import { cn } from "@/lib/cn";
import { dayLabel } from "@/lib/format";
import type { Weekday } from "@/types";
import styles from "./page.module.css";

type HoursTableProps = {
  schedule: Array<{ day: Weekday; ranges: string[] }>;
};

/** Weekly hours; today's row is marked once the browser knows the date. */
export function HoursTable({ schedule }: HoursTableProps) {
  const today = useToday();

  return (
    <table className={styles.hours}>
      <caption className="sr-only">Orari di apertura settimanali</caption>
      <tbody>
        {schedule.map(({ day, ranges }) => {
          const isToday = day === today;
          return (
            <tr
              key={day}
              className={cn(ranges.length === 0 && styles.closed, isToday && styles.today)}
              aria-current={isToday ? "date" : undefined}
            >
              <th scope="row">
                {dayLabel(day)}
                {isToday && (
                  <>
                    {" "}
                    <span className={cn("pill", styles.todayTag)}>Oggi</span>
                  </>
                )}
              </th>
              <td>{ranges.length > 0 ? ranges.join(", ") : "Chiuso"}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
