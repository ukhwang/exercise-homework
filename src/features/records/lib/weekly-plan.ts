import { z } from "zod";

import { selectedExerciseSchema } from "@/features/records/model/selected-exercise.schema";
import type { SelectedExercise } from "@/features/records/model/record.types";

export const DAY_COUNT = 7 as const;

export type DayIndex = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export const weeklyDayPlanSchema = z.object({
  day: z.number().int().min(1).max(7),
  exercises: z.array(selectedExerciseSchema),
});

export const weeklyExercisesJsonSchema = z.array(weeklyDayPlanSchema).min(1);

export type WeeklyDayPlan = z.infer<typeof weeklyDayPlanSchema>;

export function createEmptyWeeklyPlan(): WeeklyDayPlan[] {
  return Array.from({ length: DAY_COUNT }, (_, i) => ({
    day: (i + 1) as DayIndex,
    exercises: [],
  }));
}

export function planRecordToArray(
  planByDay: Record<number, SelectedExercise[]>
): WeeklyDayPlan[] {
  return Array.from({ length: DAY_COUNT }, (_, i) => {
    const day = i + 1;
    return {
      day,
      exercises: planByDay[day] ?? [],
    };
  });
}

export function arrayToPlanRecord(
  plans: WeeklyDayPlan[]
): Record<number, SelectedExercise[]> {
  const record: Record<number, SelectedExercise[]> = {};
  for (let d = 1; d <= DAY_COUNT; d++) {
    record[d] = [];
  }
  for (const item of plans) {
    if (item.day >= 1 && item.day <= DAY_COUNT) {
      record[item.day] = item.exercises;
    }
  }
  return record;
}

/** Legacy flat array → day 1 only */
export function parseExercisesJson(raw: unknown): WeeklyDayPlan[] | null {
  const weekly = weeklyExercisesJsonSchema.safeParse(raw);
  if (weekly.success) return weekly.data;

  const legacy = z.array(selectedExerciseSchema).safeParse(raw);
  if (legacy.success && legacy.data.length > 0) {
    const empty = createEmptyWeeklyPlan();
    empty[0] = { day: 1, exercises: legacy.data };
    return empty;
  }

  return null;
}

export function getExercisesForDay(
  plans: WeeklyDayPlan[],
  day: number
): SelectedExercise[] {
  return plans.find((p) => p.day === day)?.exercises ?? [];
}

export function countPlanExercises(plans: WeeklyDayPlan[]): number {
  return plans.reduce((sum, p) => sum + p.exercises.length, 0);
}

export function hasAnyExercises(plans: WeeklyDayPlan[]): boolean {
  return plans.some((p) => p.exercises.length > 0);
}

function startOfDay(date: Date): Date {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

/**
 * sent_at / routine_start_date 기준 오늘 일차 (1~7)
 */
export function getTodayDayIndex(
  routineStartDate: string | null,
  sentAt: string | null,
  now: Date = new Date()
): DayIndex {
  const base =
    routineStartDate ??
    (sentAt ? sentAt.slice(0, 10) : now.toISOString().slice(0, 10));

  const start = startOfDay(new Date(`${base}T00:00:00`));
  const today = startOfDay(now);
  const diffMs = today.getTime() - start.getTime();
  const diffDays = Math.floor(diffMs / 86_400_000) + 1;
  const clamped = Math.min(DAY_COUNT, Math.max(1, diffDays));
  return clamped as DayIndex;
}

export function defaultAppointmentTimeLocal(): string {
  const d = new Date();
  d.setMinutes(0, 0, 0);
  d.setHours(d.getHours() + 1);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}
