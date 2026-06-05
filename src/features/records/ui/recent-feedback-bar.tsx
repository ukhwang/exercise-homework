"use client";

import { useRecentFeedback } from "@/features/records/api/record.queries";

type RecentFeedbackBarProps = {
  clientId: string;
};

export function RecentFeedbackBar({ clientId }: RecentFeedbackBarProps) {
  const { data: items, isLoading } = useRecentFeedback(clientId);

  if (isLoading || !items || items.length === 0) {
    return null;
  }

  const labels = items.map((item) => item.micro_hurdle_answer);

  return (
    <div className="border-t-2 border-black bg-alert px-4 py-3 text-sm font-bold text-black">
      최근 피드백: {labels.join(", ")}
    </div>
  );
}
