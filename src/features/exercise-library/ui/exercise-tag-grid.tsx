"use client";

import { Plus } from "lucide-react";

import { cn } from "@/shared/lib/utils";
import type { ExerciseCatalogItem } from "@/features/exercise-library/model/exercise.types";
import { useRecordStore } from "@/features/records/model/record.store";

type ExerciseTagGridProps = {
  exercises: ExerciseCatalogItem[];
  title?: string;
};

export function ExerciseTagGrid({
  exercises,
  title = "추가 가능한 운동",
}: ExerciseTagGridProps) {
  const selectedExercises = useRecordStore(
    (s) => s.planByDay[s.activeDay] ?? []
  );
  const toggleExercise = useRecordStore((s) => s.toggleExercise);

  const selectedIds = new Set(selectedExercises.map((item) => item.id));
  const available = exercises.filter((ex) => !selectedIds.has(ex.id));

  if (available.length === 0) return null;

  return (
    <div className="space-y-2">
      <p className="text-sm font-bold">{title}</p>
      <ul className="flex flex-col gap-2">
        {available.map((exercise) => (
          <li key={exercise.id}>
            <button
              type="button"
              onClick={() => toggleExercise(exercise)}
              className="flex min-h-14 w-full items-center gap-3 border-2 border-black bg-white px-4 py-3 text-left hover:bg-neutral-100"
            >
              <Plus className="h-5 w-5 shrink-0" strokeWidth={3} />
              <span className="font-bold">{exercise.name}</span>
              {exercise.id.startsWith("custom_") ? (
                <span className="ml-auto border-2 border-black bg-primary px-2 py-0.5 text-[10px] font-black">
                  MY
                </span>
              ) : null}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
