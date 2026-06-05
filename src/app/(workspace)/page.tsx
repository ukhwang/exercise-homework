"use client";

import { useMemo, useState } from "react";

import { EXERCISES } from "@lib/constants/exercises";
import { ClientSelector } from "@/features/clients/ui/client-selector";
import type { ExerciseFilterId } from "@/features/exercise-library/model/exercise.types";
import { useExerciseStore } from "@/features/exercise-library/model/exercise.store";
import { searchAndFilterExercises } from "@/features/exercise-library/lib/exercise-filter";
import { CustomExerciseAdd } from "@/features/exercise-library/ui/custom-exercise-add";
import { ExerciseSearch } from "@/features/exercise-library/ui/exercise-search";
import { ExerciseTagGrid } from "@/features/exercise-library/ui/exercise-tag-grid";
import { useLatestCompletedRecord } from "@/features/records/api/record.queries";
import { ContextAlert } from "@/features/records/ui/context-alert";
import { RecentFeedbackBar } from "@/features/records/ui/recent-feedback-bar";
import { RecordSendPanel } from "@/features/records/ui/record-send-panel";
import { SelectedExercisePanel } from "@/features/records/ui/selected-exercise-panel";
import { WeekDayTabs } from "@/features/records/ui/week-day-tabs";
import { useRecordStore } from "@/features/records/model/record.store";
import { WorkspaceHeader } from "@/shared/ui/workspace-header";

export default function WorkspacePage() {
  const [activeFilter, setActiveFilter] = useState<ExerciseFilterId>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const selectedClient = useRecordStore((s) => s.selectedClient);
  const activeDay = useRecordStore((s) => s.activeDay);
  const dayExerciseCount = useRecordStore(
    (s) => s.planByDay[s.activeDay]?.length ?? 0
  );
  const totalCount = useRecordStore((s) =>
    Object.values(s.planByDay).reduce((sum, list) => sum + list.length, 0)
  );
  const customExercises = useExerciseStore((s) => s.customExercises);

  const { data: latestRecord } = useLatestCompletedRecord(
    selectedClient?.id ?? null
  );

  const filteredExercises = useMemo(
    () =>
      searchAndFilterExercises(
        EXERCISES,
        customExercises,
        activeFilter,
        searchQuery
      ),
    [activeFilter, searchQuery, customExercises]
  );

  const showContextAlert =
    selectedClient !== null &&
    latestRecord?.micro_hurdle_answer !== undefined &&
    latestRecord.micro_hurdle_answer.length > 0;

  const noResults =
    searchQuery.trim().length > 0 && filteredExercises.length === 0;

  return (
    <div className="mx-auto flex min-h-screen max-w-lg flex-col bg-black pb-52">
      <WorkspaceHeader />

      <ClientSelector />

      {selectedClient ? <WeekDayTabs /> : null}

      {showContextAlert && selectedClient ? (
        <ContextAlert
          clientName={selectedClient.name}
          hardestExercise={latestRecord.micro_hurdle_answer}
        />
      ) : null}

      <main className="flex-1 bg-white text-black">
        <ExerciseSearch
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          resultCount={filteredExercises.length}
        />

        <div className="space-y-6 p-4">
          <SelectedExercisePanel />

          {noResults ? (
            <div className="space-y-3">
              <p className="border-2 border-black p-4 text-center text-sm font-bold">
                &quot;{searchQuery}&quot; 검색 결과가 없습니다.
              </p>
              <CustomExerciseAdd suggestedName={searchQuery.trim()} compact />
            </div>
          ) : (
            <ExerciseTagGrid exercises={filteredExercises} />
          )}

          <CustomExerciseAdd />
        </div>
      </main>

      {selectedClient ? (
        <RecentFeedbackBar clientId={selectedClient.id} />
      ) : null}

      <RecordSendPanel />

      {totalCount > 0 ? (
        <div className="pointer-events-none fixed right-4 top-20 border-2 border-black bg-primary px-3 py-2 text-sm font-bold text-black">
          {activeDay}일차 {dayExerciseCount}개 · 전체 {totalCount}개
        </div>
      ) : null}
    </div>
  );
}
