"use client";

import { useMemo, useState } from "react";

import type { SelectedExercise } from "@/features/records/model/record.types";
import { BrutalButton } from "@/shared/ui/design-system/button";
import { BrutalCard } from "@/shared/ui/design-system/card";
import { BrutalProgressBar } from "@/shared/ui/design-system/progress-bar";
import { cn } from "@/shared/lib/utils";

type CompletedSetsMap = Record<string, number[]>;

function getTotalSets(exercises: SelectedExercise[]): number {
  return exercises.reduce((sum, ex) => sum + ex.sets, 0);
}

function getCompletedCount(completedSets: CompletedSetsMap): number {
  return Object.values(completedSets).reduce((sum, sets) => sum + sets.length, 0);
}

function isAllSetsDone(
  exercises: SelectedExercise[],
  completedSets: CompletedSetsMap
): boolean {
  return exercises.every((exercise) => {
    const done = completedSets[exercise.id] ?? [];
    return done.length >= exercise.sets;
  });
}

type HomeworkSessionProps = {
  token: string;
  clientName: string;
  exercises: SelectedExercise[];
  todayDay: number;
  microHurdleQuestion?: string | null;
  onCompleted: () => void;
};

export function HomeworkSession({
  token,
  clientName,
  exercises,
  todayDay,
  microHurdleQuestion,
  onCompleted,
}: HomeworkSessionProps) {
  const [completedSets, setCompletedSets] = useState<CompletedSetsMap>({});
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const totalSets = useMemo(() => getTotalSets(exercises), [exercises]);
  const doneCount = useMemo(
    () => getCompletedCount(completedSets),
    [completedSets]
  );
  const allSetsDone = useMemo(
    () => isAllSetsDone(exercises, completedSets),
    [exercises, completedSets]
  );

  const progressPercent =
    totalSets > 0 ? Math.round((doneCount / totalSets) * 100) : 0;

  const today = new Date().toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const toggleSet = (exerciseId: string, setNumber: number) => {
    setCompletedSets((prev) => {
      const current = prev[exerciseId] ?? [];
      if (current.includes(setNumber)) {
        return {
          ...prev,
          [exerciseId]: current.filter((n) => n !== setNumber),
        };
      }
      return {
        ...prev,
        [exerciseId]: [...current, setNumber].sort((a, b) => a - b),
      };
    });
  };

  const handleComplete = async () => {
    if (!selectedAnswer || isSubmitting || !allSetsDone) return;

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await fetch("/api/records/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          answer: selectedAnswer,
          day: todayDay,
        }),
      });

      const json: unknown = await response.json();

      if (!response.ok) {
        const err =
          typeof json === "object" &&
          json !== null &&
          "error" in json &&
          typeof (json as { error: unknown }).error === "string"
            ? (json as { error: string }).error
            : "완료 처리에 실패했습니다.";
        throw new Error(err);
      }

      onCompleted();
    } catch (err) {
      setErrorMessage(
        err instanceof Error ? err.message : "완료 처리에 실패했습니다."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const setGridClass = (setCount: number) =>
    setCount > 5 ? "grid-cols-1" : "grid-cols-2";

  return (
    <div className="mx-auto flex min-h-screen max-w-lg flex-col bg-black pb-36">
      <header className="border-b-2 border-black bg-white p-4 text-black">
        <h1 className="text-lg font-bold">
          {todayDay}일차 운동 숙제 🏋️
        </h1>
        <p className="mt-1 text-sm text-black/60">
          {clientName}님 | {today}
        </p>
      </header>

      <div className="border-b-2 border-black bg-white p-4 text-black">
        <div className="mb-2 flex items-center justify-between">
          <span className="font-bold">진행률</span>
          <span className="text-sm font-medium">
            {progressPercent}% ({doneCount}/{totalSets})
          </span>
        </div>
        <BrutalProgressBar value={progressPercent} />
      </div>

      <div className="flex-1 space-y-4 bg-white p-4 text-black">
        {exercises.map((exercise, index) => {
          const doneForExercise = completedSets[exercise.id] ?? [];
          const cueText =
            exercise.selectedTags.length > 0
              ? exercise.selectedTags.join(" ")
              : exercise.default_desc;

          return (
            <BrutalCard key={exercise.id}>
              <h2 className="text-lg font-bold">
                {index + 1}. {exercise.name}
              </h2>
              <p className="mt-1 text-sm font-medium">
                {exercise.sets}세트 × {exercise.reps}회
              </p>
              <p className="mt-2 border border-black bg-neutral-100 p-2 text-sm">
                💬 &quot;{cueText}&quot;
              </p>

              <div
                className={cn(
                  "mt-3 grid gap-2",
                  setGridClass(exercise.sets)
                )}
              >
                {Array.from({ length: exercise.sets }, (_, i) => i + 1).map(
                  (setNumber) => {
                    const isDone = doneForExercise.includes(setNumber);
                    return (
                      <BrutalButton
                        key={setNumber}
                        variant="set"
                        size="set"
                        checked={isDone}
                        onClick={() => toggleSet(exercise.id, setNumber)}
                      >
                        SET {setNumber}
                        {isDone ? " ✓" : ""}
                      </BrutalButton>
                    );
                  }
                )}
              </div>
            </BrutalCard>
          );
        })}
      </div>

      {allSetsDone ? (
        <section className="border-t-2 border-black bg-white p-4 text-black">
          <h2 className="text-lg font-bold leading-snug">
            {microHurdleQuestion ?? "오늘 가장 힘들었던 운동은 무엇인가요?"}
          </h2>
          <p className="mt-1 text-xs text-black/60">
            모든 세트를 완료했습니다. 하나만 선택해 주세요.
          </p>

          <div className="mt-4 flex flex-col gap-2">
            {exercises.map((exercise) => (
              <BrutalButton
                key={exercise.id}
                variant={selectedAnswer === exercise.name ? "primary" : "secondary"}
                size="large"
                onClick={() => setSelectedAnswer(exercise.name)}
                className="justify-start px-4 text-left normal-case"
              >
                {exercise.name}
              </BrutalButton>
            ))}
          </div>

          {errorMessage ? (
            <p className="mt-4 text-center text-sm font-bold">{errorMessage}</p>
          ) : null}
        </section>
      ) : (
        <section className="border-t-2 border-black bg-white p-4 text-center text-sm font-bold text-black">
          각 운동의 SET 버튼을 모두 눌러 주세요.
        </section>
      )}

      {allSetsDone && selectedAnswer ? (
        <div className="fixed bottom-0 left-0 right-0 z-50 mx-auto max-w-lg border-t-2 border-black bg-white p-4">
          <BrutalButton
            variant="primary"
            size="large"
            disabled={isSubmitting}
            onClick={handleComplete}
            className="w-full disabled:bg-brutal-gray"
          >
            {isSubmitting ? "처리 중..." : "완료하기"}
          </BrutalButton>
        </div>
      ) : null}
    </div>
  );
}
