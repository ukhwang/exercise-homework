"use client";

import type { SelectedExercise } from "@/features/records/model/record.types";
import { BrutalButton } from "@/shared/ui/design-system/button";
import { BrutalCard } from "@/shared/ui/design-system/card";

type CompletedScreenProps = {
  exercises?: SelectedExercise[];
  dayLabel?: string;
};

export function CompletedScreen({
  exercises = [],
  dayLabel,
}: CompletedScreenProps) {
  const totalSets = exercises.reduce((sum, ex) => sum + ex.sets, 0);

  return (
    <div className="mx-auto flex min-h-screen max-w-lg items-center justify-center bg-black p-4">
      <BrutalCard className="w-full max-w-md p-8 text-center">
        <div className="text-6xl">🎉</div>
        <h1 className="mt-4 text-2xl font-bold">
          {dayLabel ? `${dayLabel} ` : ""}오늘도 완료!
        </h1>
        {exercises.length > 0 ? (
          <p className="mt-2 text-lg font-medium">
            {exercises.length}개 운동 / {totalSets}세트 완수
          </p>
        ) : (
          <p className="mt-2 text-lg font-medium">운동이 완료되었습니다.</p>
        )}
        <BrutalButton
          variant="secondary"
          size="large"
          className="mt-8 w-full normal-case"
          onClick={() => window.close()}
        >
          닫기
        </BrutalButton>
      </BrutalCard>
    </div>
  );
}
