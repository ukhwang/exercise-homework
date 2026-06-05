"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import { cn } from "@/shared/lib/utils";
import { useExerciseStore } from "@/features/exercise-library/model/exercise.store";
import { useRecordStore } from "@/features/records/model/record.store";

type CustomExerciseAddProps = {
  /** 검색어가 있을 때 빠른 추가에 사용 */
  suggestedName?: string;
  compact?: boolean;
};

export function CustomExerciseAdd({
  suggestedName = "",
  compact = false,
}: CustomExerciseAddProps) {
  const addCustomExercise = useExerciseStore((s) => s.addCustomExercise);
  const addExerciseToRecord = useRecordStore((s) => s.addExerciseToRecord);
  const [name, setName] = useState(suggestedName);
  const [description, setDescription] = useState("");

  const handleAdd = (exerciseName: string, exerciseDesc?: string) => {
    const trimmed = exerciseName.trim();
    if (!trimmed) return;

    const exercise = addCustomExercise(trimmed, exerciseDesc);
    addExerciseToRecord(exercise);
    setName("");
    setDescription("");
  };

  if (compact && suggestedName) {
    return (
      <button
        type="button"
        onClick={() => handleAdd(suggestedName)}
        className="flex h-16 w-full items-center justify-center gap-2 border-2 border-black bg-primary text-base font-bold"
      >
        <Plus className="h-5 w-5" strokeWidth={3} />
        &quot;{suggestedName}&quot; 운동 추가 후 선택
      </button>
    );
  }

  return (
    <section className="border-2 border-black bg-white p-4">
      <h3 className="text-xs font-black uppercase tracking-[0.15em]">
        운동 직접 추가
      </h3>
      <p className="mt-1 text-xs font-bold text-black/60">
        목록에 없는 운동은 여기서 만들 수 있습니다. 추가 시 자동 선택됩니다.
      </p>

      <div className="mt-3 flex flex-col gap-2">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="운동 이름 (예: 밴드 외회전)"
          className="h-14 w-full border-4 border-black bg-white px-4 text-base font-bold placeholder:font-bold placeholder:text-black/40 focus:outline-none"
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleAdd(name, description);
            }
          }}
          placeholder="메모 (선택, 예: 밴드 장력 유지)"
          className="h-14 w-full border-4 border-black bg-white px-4 text-base font-bold placeholder:font-bold placeholder:text-black/40 focus:outline-none"
        />
        <button
          type="button"
          disabled={!name.trim()}
          onClick={() => handleAdd(name, description)}
          className={cn(
            "flex h-16 w-full items-center justify-center gap-2 border-4 border-black text-base font-black",
            name.trim()
              ? "bg-black text-white"
              : "bg-neutral-200 text-neutral-500"
          )}
        >
          <Plus className="h-5 w-5" strokeWidth={3} />
          추가하고 선택하기
        </button>
      </div>
    </section>
  );
}
