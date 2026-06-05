import type { DayIndex } from "@/features/records/lib/weekly-plan";
import type { SelectedExercise } from "@/features/records/model/record.types";

export type HomeworkRecord = {
  id: string;
  status: string;
  exercises: SelectedExercise[];
  microHurdleQuestion: string | null;
  clientName: string;
  todayDay: DayIndex;
  todayDayCompleted: boolean;
};
