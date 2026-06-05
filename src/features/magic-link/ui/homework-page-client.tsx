"use client";

import { useState } from "react";

import type { HomeworkRecord } from "@/features/magic-link/model/homework.types";
import { CompletedScreen } from "@/features/magic-link/ui/completed-screen";
import { HomeworkSession } from "@/features/magic-link/ui/homework-session";

type HomeworkPageClientProps = {
  token: string;
  homework: HomeworkRecord;
};

export function HomeworkPageClient({ token, homework }: HomeworkPageClientProps) {
  const [isCompleted, setIsCompleted] = useState(homework.todayDayCompleted);

  if (isCompleted) {
    return (
      <CompletedScreen
        exercises={homework.exercises}
        dayLabel={`${homework.todayDay}일차`}
      />
    );
  }

  return (
    <HomeworkSession
      token={token}
      clientName={homework.clientName}
      exercises={homework.exercises}
      todayDay={homework.todayDay}
      microHurdleQuestion={homework.microHurdleQuestion}
      onCompleted={() => setIsCompleted(true)}
    />
  );
}
