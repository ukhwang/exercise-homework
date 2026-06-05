"use client";

import { Minus, Plus, X } from "lucide-react";

import { BrutalButton } from "@/shared/ui/design-system/button";
import { BrutalCard } from "@/shared/ui/design-system/card";
import { CueChipEditor } from "@/features/exercise-library/ui/cue-chip-editor";
import { useRecordStore } from "@/features/records/model/record.store";

function Stepper({
  label,
  value,
  onDecrement,
  onIncrement,
}: {
  label: string;
  value: number;
  onDecrement: () => void;
  onIncrement: () => void;
}) {
  return (
    <div className="flex flex-1 flex-col gap-2">
      <span className="text-xs font-bold uppercase tracking-wide text-black/60">
        {label}
      </span>
      <div className="flex h-14 border-2 border-black">
        <button
          type="button"
          onClick={onDecrement}
          className="flex h-full w-14 items-center justify-center border-r-2 border-black bg-white"
          aria-label={`${label} 감소`}
        >
          <Minus className="h-5 w-5" strokeWidth={3} />
        </button>
        <div className="flex flex-1 items-center justify-center text-2xl font-bold">
          {value}
        </div>
        <button
          type="button"
          onClick={onIncrement}
          className="flex h-full w-14 items-center justify-center border-l-2 border-black bg-white"
          aria-label={`${label} 증가`}
        >
          <Plus className="h-5 w-5" strokeWidth={3} />
        </button>
      </div>
    </div>
  );
}

export function SelectedExercisePanel() {
  const selectedExercises = useRecordStore(
    (s) => s.planByDay[s.activeDay] ?? []
  );
  const activeDay = useRecordStore((s) => s.activeDay);
  const removeExercise = useRecordStore((s) => s.removeExercise);
  const incrementSets = useRecordStore((s) => s.incrementSets);
  const decrementSets = useRecordStore((s) => s.decrementSets);
  const incrementReps = useRecordStore((s) => s.incrementReps);
  const decrementReps = useRecordStore((s) => s.decrementReps);
  const applyToRemaining = useRecordStore(
    (s) => s.applyCurrentDayToRemainingDays
  );

  const remainingDayCount = 7 - activeDay;

  if (selectedExercises.length === 0) {
    return null;
  }

  return (
    <section className="space-y-3">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-sm font-bold">{activeDay}일차 선택된 운동</h2>
        {remainingDayCount > 0 ? (
          <BrutalButton
            type="button"
            variant="secondary"
            size="small"
            onClick={applyToRemaining}
            className="shrink-0 whitespace-nowrap normal-case"
          >
            {activeDay + 1}~7일차에 동일 적용
          </BrutalButton>
        ) : null}
      </div>
      {selectedExercises.map((exercise) => (
        <BrutalCard key={exercise.id}>
          <div className="flex items-start justify-between gap-3">
            <div className="flex flex-1 items-start gap-2">
              <div className="mt-0.5 h-5 w-5 shrink-0 border-2 border-black bg-primary" />
              <div>
                <h3 className="text-lg font-bold">{exercise.name}</h3>
                <p className="mt-1 text-sm font-medium">
                  {exercise.sets}세트 × {exercise.reps}회
                </p>
                {exercise.selectedTags.length > 0 ? (
                  <p className="mt-2 text-sm text-black/70">
                    큐잉: &quot;{exercise.selectedTags.join(" ")}&quot;
                  </p>
                ) : null}
              </div>
            </div>
            <button
              type="button"
              onClick={() => removeExercise(exercise.id)}
              className="flex h-10 w-10 shrink-0 items-center justify-center border-2 border-black bg-white hover:bg-neutral-100"
              aria-label="운동 제거"
            >
              <X className="h-4 w-4" strokeWidth={3} />
            </button>
          </div>

          <div className="mt-4 flex gap-3">
            <Stepper
              label="세트"
              value={exercise.sets}
              onDecrement={() => decrementSets(exercise.id)}
              onIncrement={() => incrementSets(exercise.id)}
            />
            <Stepper
              label="횟수"
              value={exercise.reps}
              onDecrement={() => decrementReps(exercise.id)}
              onIncrement={() => incrementReps(exercise.id)}
            />
          </div>

          <CueChipEditor
            exerciseId={exercise.id}
            selectedTags={exercise.selectedTags}
          />
        </BrutalCard>
      ))}
    </section>
  );
}
