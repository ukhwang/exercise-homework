import type { Client } from "@/features/clients/model/client.types";
import type { ExerciseCatalogItem } from "@/features/exercise-library/model/exercise.types";

export type SelectedExercise = ExerciseCatalogItem & {
  sets: number;
  reps: number;
  selectedTags: string[];
};

export type { WeeklyDayPlan } from "@/features/records/lib/weekly-plan";
