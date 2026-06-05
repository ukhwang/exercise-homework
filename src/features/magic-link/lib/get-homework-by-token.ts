import { z } from "zod";

import {
  getExercisesForDay,
  getTodayDayIndex,
  parseExercisesJson,
} from "@/features/records/lib/weekly-plan";
import type { HomeworkRecord } from "@/features/magic-link/model/homework.types";
import { createSupabaseAdmin } from "@/shared/lib/supabase/admin";

const dayCompletionSchema = z.array(
  z.object({
    day: z.number().int(),
    answer: z.string(),
    completed_at: z.string().optional(),
  })
);

type RecordRow = {
  id: string;
  status: string;
  exercises_json: unknown;
  micro_hurdle_question: string | null;
  sent_at: string | null;
  routine_start_date: string | null;
  day_completions: unknown;
  clients: { name: string } | { name: string }[] | null;
};

export async function getHomeworkByToken(
  token: string
): Promise<HomeworkRecord | null> {
  const supabase = createSupabaseAdmin();

  const { data, error } = await supabase
    .from("records")
    .select(
      "id, status, exercises_json, micro_hurdle_question, sent_at, routine_start_date, day_completions, clients(name)"
    )
    .eq("magic_token", token)
    .maybeSingle();

  if (error) {
    console.error("getHomeworkByToken error:", error);
    return null;
  }

  if (!data) return null;

  const row = data as RecordRow;
  const weeklyPlan = parseExercisesJson(row.exercises_json);

  if (!weeklyPlan) {
    console.error("Invalid exercises_json for record:", row.id);
    return null;
  }

  const todayDay = getTodayDayIndex(
    row.routine_start_date,
    row.sent_at
  );

  const todayExercises = getExercisesForDay(weeklyPlan, todayDay);

  if (todayExercises.length === 0) {
    console.error("No exercises for today day:", todayDay, row.id);
    return null;
  }

  const completionsParsed = dayCompletionSchema.safeParse(
    row.day_completions ?? []
  );
  const completions = completionsParsed.success ? completionsParsed.data : [];
  const todayDayCompleted = completions.some((c) => c.day === todayDay);

  const clientRelation = row.clients;
  const clientName = Array.isArray(clientRelation)
    ? clientRelation[0]?.name
    : clientRelation?.name;

  if (!clientName) {
    console.error("Client name missing for record:", row.id);
    return null;
  }

  return {
    id: row.id,
    status: row.status,
    exercises: todayExercises,
    microHurdleQuestion: row.micro_hurdle_question,
    clientName,
    todayDay,
    todayDayCompleted,
  };
}
