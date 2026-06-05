"use client";

import { useState } from "react";

import type { SelectedExercise } from "@/features/records/model/record.types";
import { cn } from "@/shared/lib/utils";

type MicroHurdleFormProps = {
  token: string;
  exercises: SelectedExercise[];
  question?: string | null;
  onCompleted: () => void;
};

export function MicroHurdleForm({
  token,
  exercises,
  question,
  onCompleted,
}: MicroHurdleFormProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const hurdleQuestion =
    question ?? "오늘 가장 힘들었던 운동은 무엇인가요?";

  const handleComplete = async () => {
    if (!selectedAnswer || isSubmitting) return;

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await fetch("/api/records/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, answer: selectedAnswer }),
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

  return (
    <section className="border-t-4 border-black bg-white px-4 py-6 pb-32">
      <h2 className="text-lg font-black uppercase leading-snug">
        {hurdleQuestion}
      </h2>

      <div className="mt-4 flex flex-col gap-2">
        {exercises.map((exercise) => {
          const isActive = selectedAnswer === exercise.name;
          return (
            <button
              key={exercise.id}
              type="button"
              onClick={() => setSelectedAnswer(exercise.name)}
              className={cn(
                "h-16 w-full border-4 border-black px-4 text-left text-lg font-black uppercase",
                isActive ? "bg-black text-white" : "bg-white text-black"
              )}
            >
              {exercise.name}
            </button>
          );
        })}
      </div>

      {selectedAnswer ? (
        <div className="fixed bottom-0 left-0 right-0 z-50 border-t-4 border-black bg-white p-4">
          <button
            type="button"
            disabled={isSubmitting}
            onClick={handleComplete}
            className="h-16 w-full border-4 border-black bg-black text-lg font-black uppercase tracking-widest text-white disabled:bg-neutral-400"
          >
            {isSubmitting ? "처리 중..." : "완료하기"}
          </button>
        </div>
      ) : null}

      {errorMessage ? (
        <p className="mt-4 text-center text-sm font-black uppercase text-black">
          {errorMessage}
        </p>
      ) : null}
    </section>
  );
}
