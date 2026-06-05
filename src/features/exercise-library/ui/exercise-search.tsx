"use client";

import { Search, X } from "lucide-react";

import { cn } from "@/shared/lib/utils";
import { BrutalButton } from "@/shared/ui/design-system/button";
import {
  EXERCISE_FILTER_CHIPS,
  type ExerciseFilterId,
} from "@/features/exercise-library/model/exercise.types";

type ExerciseSearchProps = {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeFilter: ExerciseFilterId;
  onFilterChange: (filterId: ExerciseFilterId) => void;
  resultCount: number;
};

export function ExerciseSearch({
  searchQuery,
  onSearchChange,
  activeFilter,
  onFilterChange,
  resultCount,
}: ExerciseSearchProps) {
  return (
    <section className="border-b-2 border-black bg-white p-4 text-black">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-base font-bold">운동 추가</h2>
        <span className="text-xs font-bold text-black/50">{resultCount}개</span>
      </div>

      <div className="relative mb-3">
        <Search
          className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2"
          strokeWidth={2.5}
        />
        <input
          type="search"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="운동 이름 검색 (예: 스콰트, 푸시업)"
          className="h-14 w-full border-2 border-black bg-white pl-12 pr-14 text-base font-medium focus:outline-none"
          autoComplete="off"
        />
        {searchQuery ? (
          <button
            type="button"
            onClick={() => onSearchChange("")}
            className="absolute right-0 top-0 flex h-14 w-14 items-center justify-center border-l-2 border-black"
            aria-label="검색어 지우기"
          >
            <X className="h-5 w-5" strokeWidth={2.5} />
          </button>
        ) : null}
      </div>

      <div className="flex gap-2">
        {EXERCISE_FILTER_CHIPS.map((chip) => {
          const isActive = activeFilter === chip.id;
          return (
            <BrutalButton
              key={chip.id}
              variant={isActive ? "primary" : "secondary"}
              size="small"
              onClick={() => onFilterChange(chip.id)}
              className={cn("min-w-[4rem]", isActive && "ring-0")}
            >
              {chip.label}
            </BrutalButton>
          );
        })}
      </div>
    </section>
  );
}
