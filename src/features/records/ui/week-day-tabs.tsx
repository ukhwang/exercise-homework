"use client";

import { cn } from "@/shared/lib/utils";
import type { DayIndex } from "@/features/records/lib/weekly-plan";
import { useRecordStore } from "@/features/records/model/record.store";

const DAYS: DayIndex[] = [1, 2, 3, 4, 5, 6, 7];

export function WeekDayTabs() {
  const activeDay = useRecordStore((s) => s.activeDay);
  const setActiveDay = useRecordStore((s) => s.setActiveDay);
  const planByDay = useRecordStore((s) => s.planByDay);

  return (
    <section className="border-b-2 border-black bg-white px-4 py-3 text-black">
      <h2 className="mb-2 text-sm font-bold">일차별 숙제 (1~7일)</h2>
      <div className="flex gap-1 overflow-x-auto pb-1">
        {DAYS.map((day) => {
          const count = planByDay[day]?.length ?? 0;
          return (
            <button
              key={day}
              type="button"
              onClick={() => setActiveDay(day)}
              className={cn(
                "min-w-[3rem] shrink-0 border-2 border-black px-3 py-2 text-center text-sm font-bold",
                activeDay === day
                  ? "bg-primary text-black"
                  : "bg-white text-black hover:bg-neutral-100"
              )}
            >
              {day}일
              {count > 0 ? (
                <span className="mt-0.5 block text-[10px] font-black">
                  {count}
                </span>
              ) : null}
            </button>
          );
        })}
      </div>
    </section>
  );
}
